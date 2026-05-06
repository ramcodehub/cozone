import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import ws from "ws";

// Set global WebSocket for Supabase compatibility in Node < 22
global.WebSocket = ws;

import { insertContactMessage, insertServiceEnquiry } from "./services/contactService.js";
import aiRoutes from "./routes/aiRoutes.js";
import { contactFormTemplate, serviceEnquiryTemplate } from "./utils/emailTemplates.js";
import { validateLoggingSystem } from "./services/chatbotService.js";

const app = express();
const PORT = process.env.PORT || 5005;

/**
 * ---------------- EXPRESS SECURITY & PERFORMANCE ----------------
 */
app.use(helmet()); // Secure headers
app.use(compression()); // Compress responses
app.use(express.json());
app.use(bodyParser.json());

/**
 * ---------------- STARTUP LOGGING & DIAGNOSTICS ----------------
 */
console.log("=== CoZone Backend Startup ===");
console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
console.log(`Port: ${PORT}`);
console.log(`AI Provider: ${process.env.AI_PROVIDER || "openrouter"}`);
console.log(`AI Model: ${process.env.AI_MODEL || "openai/gpt-3.5-turbo"}`);
console.log(`OpenRouter Configured: ${!!process.env.OPENROUTER_API_KEY}`);
console.log(`Supabase Configured: ${!!process.env.SUPABASE_URL}`);
console.log("===============================");

// Validate logging system
validateLoggingSystem();

/**
 * ---------------- GLOBAL ERROR HANDLING ----------------
 */
process.on("unhandledRejection", (reason, promise) => {
  console.error("[Fatal] Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("[Fatal] Uncaught Exception:", error);
});

/**
 * ---------------- CORS CONFIG ----------------
 */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://cozone.in",
  "https://www.cozone.in"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== "production") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

/**
 * ---------------- ROUTES ----------------
 */
app.use("/api/ai", aiRoutes);

// ---------------- EMAIL TRANSPORT SETUP ----------------
let transporter = null;
if (process.env.EMAIL_USERNAME && process.env.EMAIL_PASSWORD) {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

// ---------------- CONTACT FORM ROUTE ----------------
app.post("/api/contact", async (req, res) => {
  const { fullName, email, companyName, phone, message } = req.body;

  try {
    await insertContactMessage({
      full_name: fullName,
      email,
      company_name: companyName,
      phone,
      message,
    });

    if (transporter) {
      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USERNAME,
        to: process.env.EMAIL_USERNAME,
        subject: `New Contact Form Submission from ${fullName}`,
        html: contactFormTemplate({ fullName, email, companyName, phone, message }),
      };
      transporter.sendMail(mailOptions).catch((err) => console.error("Error sending contact email:", err.message));
    }

    res.json({
      success: true,
      message: `Thank you ${fullName}, we received your concern. Our team will contact you very soon.`,
    });
  } catch (err) {
    console.error("[Contact Error]", err.message);
    res.status(500).json({ success: false, message: "Error submitting contact form." });
  }
});

// ---------------- SERVICE ENQUIRY ROUTE ----------------
app.post("/api/enquiry", async (req, res) => {
  const { fullName, mobile, email, service, message } = req.body;

  try {
    await insertServiceEnquiry({
      full_name: fullName,
      mobile,
      email,
      service,
      message,
    });

    if (transporter) {
      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USERNAME,
        to: process.env.EMAIL_USERNAME,
        subject: `New Service Enquiry: ${service} from ${fullName}`,
        html: serviceEnquiryTemplate({ fullName, mobile, email, service, message }),
      };
      transporter.sendMail(mailOptions).catch((err) => console.error("Error sending enquiry email:", err.message));
    }

    res.json({
      success: true,
      message: `Thank you ${fullName}, we received your concern. Our team will contact you very soon.`,
    });
  } catch (err) {
    console.error("[Enquiry Error]", err.message);
    res.status(500).json({ success: false, message: "Error submitting service enquiry." });
  }
});

// ---------------- HEALTH CHECK ----------------
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// ---------------- GLOBAL ERROR HANDLER ----------------
app.use((err, req, res, next) => {
  console.error("[Global Error Handled]", err);
  res.status(500).json({ success: false, message: "An internal server error occurred" });
});

/**
 * ---------------- START SERVER ----------------
 */
const server = app.listen(PORT, () => {
  console.log(`>>> CoZone API successfully running on port ${PORT}`);
});

// Graceful shutdown for Render
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Closing HTTP server...");
  server.close(() => {
    console.log("HTTP server closed.");
  });
});
