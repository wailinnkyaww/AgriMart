import { useState } from "react";
import "./ContactSection.css";

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert("Thank you! Your message has been received.");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="contact-section">
      <div className="contact-info">
        <span>CONTACT US</span>

        <h2>Let's Grow Together</h2>

        <p>
          Have questions about contract farming? We'd love to hear from you.
        </p>

        <div className="contact-item">📍 Yangon, Myanmar</div>

        <div className="contact-item">📞 +95 9 123 456 789</div>

        <div className="contact-item">📧 support@contractfarming.com</div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          rows={6}
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default ContactSection;
