import { getDb } from "./connection";
import { leads, assistantMessages } from "../../db/schema";

export interface NewLead {
  name: string;
  phone?: string;
  email?: string;
  city?: string;
  projectType?: string;
  scope?: string;
  contactMethod?: string;
  message?: string;
  source?: string;
}

export async function insertLead(input: NewLead) {
  const db = getDb();
  await db.insert(leads).values({
    name: input.name,
    phone: input.phone || null,
    email: input.email || null,
    city: input.city || null,
    projectType: input.projectType || null,
    scope: input.scope || null,
    contactMethod: input.contactMethod || null,
    message: input.message || null,
    source: input.source || "website",
  });
}

export async function logAssistantMessage(
  sessionId: string,
  role: "user" | "assistant",
  content: string,
) {
  try {
    const db = getDb();
    await db.insert(assistantMessages).values({ sessionId, role, content });
  } catch {
    // logging is best-effort; never break the chat path
  }
}
