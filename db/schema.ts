import {
  mysqlTable,
  serial,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

export const leads = mysqlTable("leads", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  email: varchar("email", { length: 160 }),
  city: varchar("city", { length: 120 }),
  projectType: varchar("project_type", { length: 80 }),
  scope: varchar("scope", { length: 120 }),
  contactMethod: varchar("contact_method", { length: 40 }),
  message: text("message"),
  source: varchar("source", { length: 40 }).notNull().default("website"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const assistantMessages = mysqlTable("assistant_messages", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 64 }).notNull(),
  role: varchar("role", { length: 16 }).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Lead = typeof leads.$inferSelect;
export type AssistantMessage = typeof assistantMessages.$inferSelect;
