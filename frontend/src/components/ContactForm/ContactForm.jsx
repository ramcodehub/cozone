import React, { useState } from "react";
import Img from "../../assets/img/services.jpg";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Network error");

      const data = await res.json();
      setStatusMsg({ type: "success", text: data.message || "Submitted successfully!" });
      setFormData({
        fullName: "",
        email: "",
        companyName: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      setStatusMsg({ type: "error", text: "Error submitting form. Please try again." });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-layout">
      {/* LEFT IMAGE */}
      <div
        className="left-image"
        style={{ backgroundImage: `url(${Img})` }}
        aria-hidden="true"
      >
        <div className="left-overlay"></div>
      </div>

      {/* RIGHT FORM */}
      <div className="right-form">
        <h2 className="fw-bold">We’re here to help you get the <br/> <span className="cursive-heading">Right workspace</span></h2>
        <p className="lead">
          Fill in your details and we’ll get in touch to understand your requirements.
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="row">
            <input
              name="fullName"
              type="text"
              placeholder="Full name *"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email address *"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <input
              name="companyName"
              type="text"
              placeholder="Company name *"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone number *"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <div className="actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Submit"}
            </button>

            {statusMsg && (
              <span className={`status ${statusMsg.type}`}>{statusMsg.text}</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
