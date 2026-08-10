"use server";

import { getSql } from "@/lib/db";

export async function submitContactMessage(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }

  if (name.length > 100 || email.length > 200 || message.length > 5000) {
    return { error: "One or more fields exceed maximum length." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Invalid email address." };
  }

  const sanitize = (s: string) =>
    s.replace(/<[^>]*>/g, "").replace(/[<>]/g, "");

  try {
    const sql = getSql();
    await sql`
      INSERT INTO contact_messages (name, email, message)
      VALUES (
        ${sanitize(name)},
        ${sanitize(email)},
        ${sanitize(message)}
      )
    `;
  } catch (error) {
    console.error("Contact form error:", error);
    return { error: "Failed to send message. Please try again." };
  }

  return { success: true };
}
