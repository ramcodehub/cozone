import React, { useState } from "react";

const ServiceEnquiryModal = ({ serviceName, show, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg(null);

    // --- Validate Mobile Number ---
    if (!/^\d{10}$/.test(formData.mobile)) {
      setStatusMsg({ type: "error", text: "Mobile number must be 10 digits." });
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      service: serviceName,
    };

    try {
      const res = await fetch("http://localhost:5000/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Network error");

      const data = await res.json();

      setStatusMsg({ type: "success", text: data.message || "Enquiry submitted successfully!" });

      setFormData({
        fullName: "",
        mobile: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setStatusMsg({ type: "error", text: "Error submitting enquiry. Please try again." });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1050 }}
        onClick={onClose}
      ></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ zIndex: 1055 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">

            <div className="modal-header">
              <h3 className="modal-title fw-bold">Enquire {serviceName}</h3>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="fullName"
                  className=" mb-3"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="mobile"
                  className=" mb-3"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleChange}
                />

                <input
                  type="email"
                  name="email"
                  className=" mb-3"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={handleChange}
                />

                <textarea
                  name="message"
                  className=" mb-3"
                  rows="4"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>

                <button
                  className="text-white btn w-100"
                  style={{ background: "var(--muted-navy)" }}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Enquire Now"}
                </button>

                {statusMsg && (
                  <span className={`status ${statusMsg.type}`}>{statusMsg.text}</span>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceEnquiryModal;
