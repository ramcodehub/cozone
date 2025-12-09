import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------- CORS CONFIG ----------------
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "*"   // Allow all (you can remove if needed)
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// ---------------- MIDDLEWARE ----------------
app.use(express.json());
app.use(bodyParser.json());

// ---------------- SUPABASE SETUP ----------------
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// ---------------- EMAIL TRANSPORT SETUP ----------------
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ---------------- AI ROUTES ----------------
app.use("/api/ai", aiRoutes);

// ---------------- CONTACT FORM ROUTE ----------------
app.post("/contact", async (req, res) => {
  const { fullName, email, companyName, phone, message } = req.body;

  try {
    await supabase.from("contact_messages").insert({
      full_name: fullName,
      email,
      company_name: companyName,
      phone,
      message,
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USERNAME,
      subject: "New Contact Form Submission",
      text: `
New Contact Form Submission:

Full Name: ${fullName}
Email: ${email}
Company: ${companyName}
Phone: ${phone}

Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Contact email sent");

    res.json({ message: "Contact form submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting contact form." });
  }
});

// ---------------- SERVICE ENQUIRY ROUTE ----------------
app.post("/enquiry", async (req, res) => {
  const { fullName, mobile, email, service, message } = req.body;

  try {
    await supabase.from("enquiries").insert({
      full_name: fullName,
      mobile,
      email,
      service,
      message,
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_USERNAME,
      subject: `New Enquiry for ${service}`,
      text: `
New Service Enquiry:

Service: ${service}
Full Name: ${fullName}
Mobile: ${mobile}
Email: ${email}

Message:
${message}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Enquiry email sent");

    res.json({ message: "Service enquiry submitted successfully!" });
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
app.use("*", (req, res) => {
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
