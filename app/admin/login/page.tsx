"use client";

import { useActionState } from "react";
import { signIn } from "@/actions/auth";

export default function AdminLogin() {
  const [state, action, pending] = useActionState(signIn, undefined);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        padding: "0 24px",
      }}
    >
      <form
        action={action}
        style={{
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <h1
            style={{
              fontFamily: "var(--serif)",
              fontSize: 28,
              color: "var(--text)",
              marginBottom: 8,
            }}
          >
            Admin Login
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted)", letterSpacing: "0.06em" }}>
            Sign in to manage your portfolio
          </p>
        </div>

        {state?.error && (
          <p
            style={{
              fontSize: 13,
              color: "#e74c3c",
              padding: "10px 14px",
              background: "rgba(231, 76, 60, 0.1)",
              border: "1px solid rgba(231, 76, 60, 0.2)",
              borderRadius: 2,
            }}
          >
            {state.error}
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label
            htmlFor="email"
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent2)",
            }}
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            style={{
              padding: "12px 16px",
              background: "var(--bg2)",
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
          <label
            htmlFor="password"
            style={{
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent2)",
            }}
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            style={{
              padding: "12px 16px",
              background: "var(--bg2)",
              border: "1px solid var(--border)",
              borderRadius: 2,
              color: "var(--text)",
              fontFamily: "var(--mono)",
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          style={{
            padding: "14px 24px",
            background: "var(--accent)",
            color: "#0a0a0a",
            border: "none",
            borderRadius: 2,
            fontFamily: "var(--mono)",
            fontSize: 13,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            opacity: pending ? 0.6 : 1,
            marginTop: 8,
          }}
        >
          {pending ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
