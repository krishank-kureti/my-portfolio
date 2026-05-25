"use client";

import { useState } from "react";
import { submitContactMessage } from "@/actions/contact";

export default function Contact() {
  const [modalOpen, setModalOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; error?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setResult(null);

    const formData = new FormData(e.currentTarget);
    const res = await submitContactMessage(formData);
    setResult(res);
    setSending(false);

    if (res?.success) {
      e.currentTarget.reset();
      setTimeout(() => {
        setModalOpen(false);
        setResult(null);
      }, 2000);
    }
  };

  return (
    <section id="contact">
      <div className="contact-inner">
        <div className="section-label" style={{ justifyContent: "center" }}>
          Contact
        </div>
        <h2 className="contact-headline">
          Let&apos;s build
          <br />
          something <em>great.</em>
        </h2>
        <p className="contact-sub">
          Have a project in mind? I&apos;m always open to discussing new
          opportunities, ideas, and collaborations.
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 64, flexWrap: "wrap" }}>
          <a href="mailto:kuretikrishank@gmail.com" className="contact-email-btn">
            <span>Get In Touch</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              style={{ position: "relative", zIndex: 1 }}
            >
              <path d="M2 12L12 2M12 2H6M12 2v6" />
            </svg>
          </a>

          <button
            onClick={() => setModalOpen(true)}
            style={{
              padding: "16px 40px",
              border: "1px solid var(--border2)",
              color: "var(--text)",
              background: "none",
              fontFamily: "var(--mono)",
              fontSize: 14,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "#0a0a0a";
              const pseudo = e.currentTarget.querySelector("span") as HTMLElement;
              if (pseudo) pseudo.style.color = "#0a0a0a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border2)";
              e.currentTarget.style.color = "var(--text)";
            }}
          >
            <span style={{ position: "relative", zIndex: 1 }}>
              Send Message
            </span>
          </button>
        </div>

        <div className="contact-links">
          <a
            href="https://github.com/krishank-kureti"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>

          <a
            href="https://linkedin.com/in/krishank-kureti-7a2771290"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>

          <a href="mailto:kuretikrishank@gmail.com" className="contact-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </a>
        </div>
      </div>

      {modalOpen && (
        <div
          onClick={() => { if (!result?.success) { setModalOpen(false); setResult(null); } }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(4px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              borderRadius: 2,
              padding: 40,
              width: "100%",
              maxWidth: 480,
              position: "relative",
            }}
          >
            <button
              onClick={() => { setModalOpen(false); setResult(null); }}
              style={{
                position: "absolute",
                top: 16,
                right: 20,
                background: "none",
                border: "none",
                color: "var(--muted)",
                fontSize: 20,
                cursor: "pointer",
                fontFamily: "var(--mono)",
              }}
            >
              &times;
            </button>

            <h3
              style={{
                fontFamily: "var(--serif)",
                fontSize: 24,
                color: "var(--text)",
                marginBottom: 8,
              }}
            >
              Send a Message
            </h3>
            <p
              style={{
                fontSize: 13,
                color: "var(--muted)",
                marginBottom: 28,
                lineHeight: 1.7,
              }}
            >
              Fill out the form below and I&apos;ll get back to you.
            </p>

            {result?.success && (
              <p
                style={{
                  fontSize: 13,
                  color: "#2ecc71",
                  padding: "10px 14px",
                  background: "rgba(46, 204, 113, 0.1)",
                  border: "1px solid rgba(46, 204, 113, 0.2)",
                  borderRadius: 2,
                  marginBottom: 16,
                }}
              >
                Message sent successfully!
              </p>
            )}

            {result?.error && (
              <p
                style={{
                  fontSize: 13,
                  color: "#e74c3c",
                  padding: "10px 14px",
                  background: "rgba(231, 76, 60, 0.1)",
                  border: "1px solid rgba(231, 76, 60, 0.2)",
                  borderRadius: 2,
                  marginBottom: 16,
                }}
              >
                {result.error}
              </p>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label htmlFor="name" style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent2)" }}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  style={{
                    padding: "10px 14px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 2,
                    color: "var(--text)",
                    fontFamily: "var(--mono)",
                    fontSize: 14,
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label htmlFor="email" style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent2)" }}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  style={{
                    padding: "10px 14px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 2,
                    color: "var(--text)",
                    fontFamily: "var(--mono)",
                    fontSize: 14,
                    outline: "none",
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label htmlFor="message" style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent2)" }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={5000}
                  style={{
                    padding: "10px 14px",
                    background: "var(--bg)",
                    border: "1px solid var(--border)",
                    borderRadius: 2,
                    color: "var(--text)",
                    fontFamily: "var(--mono)",
                    fontSize: 14,
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                style={{
                  padding: "14px 28px",
                  background: "var(--accent)",
                  color: "#0a0a0a",
                  border: "none",
                  borderRadius: 2,
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  opacity: sending ? 0.6 : 1,
                  marginTop: 8,
                }}
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
