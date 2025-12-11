import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import { createClient } from "@supabase/supabase-js";
import { insertContactMessage, insertServiceEnquiry } from "./services/contactService.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------- RATE LIMITING ----------------
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 50,
  message: {
    success: false,
    message: "Too many requests. Please try again soon.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/ai", aiLimiter);

// ---------------- CORS CONFIG ----------------
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "https://cozone.in",
    "https://cozone.com",
    "https://cozone-backend.onrender.com",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(bodyParser.json());

// ---------------- SUPABASE SETUP ----------------
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY // service role key
);

// ---------------- EMAIL TRANSPORT SETUP ----------------
let transporter = null;
if (process.env.EMAIL_USERNAME && process.env.EMAIL_PASSWORD) {
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
}

// ---------------- AI ROUTES ----------------
app.use("/api/ai", aiRoutes);

// ---------------- CONTACT FORM ROUTE ----------------
app.post("/contact", async (req, res) => {
  const { fullName, email, companyName, phone, message } = req.body;

  try {
    await insertContactMessage({
      full_name: fullName,
      email,
      company_name: companyName,
      phone,
      message,
    });

    res.json({
      message: `Thank you ${fullName}, we received your concern. Our team will contact you very soon.`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting contact form." });
  }
});

// ---------------- SERVICE ENQUIRY ROUTE ----------------
app.post("/enquiry", async (req, res) => {
  const { fullName, mobile, email, service, message } = req.body;

  try {
    await insertServiceEnquiry({
      full_name: fullName,
      mobile,
      email,
      service,
      message,
    });

    res.json({
      message: `Thank you ${fullName}, we received your concern. Our team will contact you very soon.`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting service enquiry." });
  }
});

// ---------------- HEALTH CHECK ----------------
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// ---------------- 404 HANDLER ----------------
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ---------------- GLOBAL ERROR HANDLER ----------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
