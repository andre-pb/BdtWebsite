"use client";

import { useState } from "react";
import { newsletter } from "@/content/site";
import { colors } from "@/constants/colors";
import { subscribeToNewsletter } from "@/lib/listmonk";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pendingConfirmation, setPendingConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || submitting) return;

    setSubmitting(true);
    setError(null);

    const result = await subscribeToNewsletter(trimmedEmail);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setPendingConfirmation(result.pendingConfirmation);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        role="status"
        style={{
          maxWidth: "480px",
          margin: "0 auto",
          padding: "20px 24px",
          borderRadius: "16px",
          background: "rgba(96, 165, 250, 0.12)",
          border: "1px solid rgba(96, 165, 250, 0.35)",
          color: "white",
          fontSize: "1rem",
          fontWeight: 600,
        }}
      >
        {pendingConfirmation ? newsletter.successConfirm : newsletter.success}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "520px", margin: "0 auto" }}>
      <p
        style={{
          margin: "0 0 12px",
          fontSize: "0.95rem",
          fontWeight: 600,
          color: "rgba(255,255,255,0.85)",
        }}
      >
        {newsletter.label}
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          className={`newsletter-input-group${focused ? " newsletter-input-group--focused" : ""}`}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            disabled={submitting}
            placeholder={newsletter.placeholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="newsletter-input"
          />
          <button
            type="submit"
            disabled={submitting}
            className="newsletter-submit"
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            style={{
              background: buttonHovered && !submitting ? colors.brandBlueHover : colors.brandBlue,
              transform: buttonHovered && !submitting ? "translateY(-1px)" : "translateY(0)",
              opacity: submitting ? 0.7 : 1,
              cursor: submitting ? "not-allowed" : "pointer",
            }}
          >
            {submitting ? newsletter.buttonSubmitting : newsletter.button}
          </button>
        </div>

        {error ? (
          <p
            role="alert"
            style={{
              margin: 0,
              fontSize: "0.8125rem",
              color: "#fca5a5",
            }}
          >
            {error}
          </p>
        ) : null}

        <p
          style={{
            margin: 0,
            fontSize: "0.8125rem",
            color: "rgba(255,255,255,0.45)",
          }}
        >
          {newsletter.disclaimer}
        </p>
      </form>
    </div>
  );
}
