import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";


dotenv.config();

const app = express();


app.use(cors({ origin: "*" })); 

app.use(bodyParser.json());

// ---------- SUPABASE SETUP ----------
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// ---------- EMAIL SETUP ----------
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ---------- ROUTES ----------

// Contact form route
app.post("/contact", async (req, res) => {
  const { fullName, email, companyName, phone, message } = req.body;

  try {
    // Save to Supabase (contact_messages table)
    await supabase.from("contact_messages").insert({
      full_name: fullName,
      email,
      company_name: companyName,
      phone,
      message,
    });

    // Send email
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
    console.log("Email sent successfully");


    res.json({ message: "Contact form submitted successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting contact form." });
  }
});

// Service enquiry route
app.post("/enquiry", async (req, res) => {
  const { fullName, mobile, email, service, message } = req.body;

  try {
    // Save to Supabase (enquiries table)
    await supabase.from("enquiries").insert({
      full_name: fullName,
      mobile,
      email,
      service,
      message,
    });

    // Send email
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
    console.log("Email sent successfully");


    res.json({ message: "Service enquiry submitted successfully!" });
} catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting service enquiry." });
}
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
