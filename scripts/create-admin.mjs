/**
 * One-time admin user bootstrap against Neon Auth.
 *
 * Usage:
 *   node scripts/create-admin.mjs you@email.com 'your-password' 'Your Name'
 *
 * Requires NEON_AUTH_BASE_URL in .env.local (or the environment).
 * After the admin exists, disable public sign-up in the Neon Console
 * (Auth → email/password → allow sign-up off) if you want.
 */

import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  const path = resolve(process.cwd(), ".env.local");
  if (!existsSync(path)) return {};
  return Object.fromEntries(
    readFileSync(path, "utf8")
      .split("\n")
      .filter((l) => l && !l.startsWith("#") && l.includes("="))
      .map((l) => {
        const i = l.indexOf("=");
        return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
      })
  );
}

const env = { ...loadEnv(), ...process.env };
const baseUrl = env.NEON_AUTH_BASE_URL?.replace(/\/$/, "");
const [email, password, name = "Admin"] = process.argv.slice(2);

if (!baseUrl) {
  console.error("NEON_AUTH_BASE_URL is missing");
  process.exit(1);
}
if (!email || !password) {
  console.error("Usage: node scripts/create-admin.mjs <email> <password> [name]");
  process.exit(1);
}

const res = await fetch(`${baseUrl}/sign-up/email`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Origin: env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
  body: JSON.stringify({ email, password, name }),
});

const text = await res.text();
let body;
try {
  body = JSON.parse(text);
} catch {
  body = text;
}

if (!res.ok) {
  console.error("Failed to create admin:", res.status, body);
  process.exit(1);
}

console.log("Admin user created successfully.");
console.log("Email:", email);
console.log("Sign in at /admin/login");
