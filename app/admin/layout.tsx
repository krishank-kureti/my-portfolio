"use client";

import { useEffect } from "react";
import Link from "next/link";
import { signOut } from "@/actions/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.style.cursor = "auto";
    return () => {
      document.body.style.cursor = "none";
    };
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <nav
        style={{
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border)",
          background: "var(--bg2)",
        }}
      >
        <Link
          href="/admin"
          style={{
            fontFamily: "var(--serif)",
            fontSize: 18,
            color: "var(--text)",
            textDecoration: "none",
          }}
        >
          Admin
        </Link>

        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <Link
            href="/admin/projects"
            style={{
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            Projects
          </Link>
          <Link
            href="/admin/messages"
            style={{
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            Messages
          </Link>
          <Link
            href="/"
            style={{
              fontSize: 13,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent2)",
              textDecoration: "none",
            }}
          >
            View Site
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              style={{
                background: "none",
                border: "1px solid var(--border)",
                color: "var(--muted)",
                padding: "6px 14px",
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "var(--mono)",
                borderRadius: 2,
              }}
            >
              Sign Out
            </button>
          </form>
        </div>
      </nav>

      <main style={{ padding: "48px 32px", maxWidth: 1100, margin: "0 auto" }}>
        {children}
      </main>
    </div>
  );
}
