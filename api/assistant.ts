import { z } from "zod";
import { generateText } from "ai";
import { createRouter, publicQuery } from "./middleware";
import { kimiGw } from "./ai/provider";
import {
  listModels,
  classifyAiError,
  AiUnavailable,
  ContentRejected,
  AiTransient,
} from "./ai/ai-client";
import { logAssistantMessage } from "./queries/leads";

const SYSTEM_PROMPT = `You are the Home Remodels Project Assistant — the AI concierge on the Home Remodels website. Home Remodels is a premium residential remodeling company serving Southern California, primarily the Inland Empire, Los Angeles County, and the High Desert.

What you know (use only this — never invent facts):
- Services: kitchen remodeling, bathroom remodeling, full home remodeling, interior renovation, exterior renovation, flooring, cabinets & countertops, painting, custom finish work, room additions, outdoor living / patios, general remodeling.
- Process: Discover (understand the homeowner's goals) → Plan (scope, direction, details) → Build (careful execution) → Refine (finishing details and final walkthrough).
- Timelines and cost always depend on project size, scope, materials, design choices, structural changes, and permits. Never quote prices, dates, or fixed timelines — invite the visitor to request a project consultation through the contact form instead.
- If a visitor asks whether their specific city is covered, say the team serves the Inland Empire, Los Angeles County and the High Desert, and suggest confirming their exact location through the project inquiry form.

How to behave:
- Warm, professional, concise. Premium tone, never pushy. Plain sentences, no markdown, no bullet lists unless the user asks for a list.
- Keep replies under 110 words.
- Help visitors think through project ideas, explain the process, and guide them toward the next step: the START YOUR PROJECT inquiry form on this page.
- If asked for contact details: say the fastest way to reach the team is the project inquiry form on this page, and that Home Remodels responds personally.
- If asked something outside remodeling or about the company that you don't know, say so honestly and offer to help with what you do know.
- Never claim licenses, years in business, awards, guarantees, or availability. Never fabricate reviews.`;

export const assistantRouter = createRouter({
  chat: publicQuery
    .input(
      z.object({
        sessionId: z.string().trim().min(1).max(64),
        messages: z
          .array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string().min(1).max(2000),
            }),
          )
          .min(1)
          .max(40),
      }),
    )
    .mutation(async ({ input }) => {
      const lastUser = [...input.messages].reverse().find((m) => m.role === "user");
      try {
        const { defaultModelId } = await listModels();
        const result = await generateText({
          model: kimiGw(defaultModelId),
          system: SYSTEM_PROMPT,
          messages: input.messages.map((m) => ({ role: m.role, content: m.content })),
          providerOptions: {
            "kimi-gw": { max_completion_tokens: 512 },
          },
        });
        const reply = result.text.trim();
        if (lastUser) void logAssistantMessage(input.sessionId, "user", lastUser.content);
        void logAssistantMessage(input.sessionId, "assistant", reply);
        return { ok: true as const, reply };
      } catch (err) {
        const mapped = classifyAiError(err);
        if (mapped instanceof AiUnavailable) {
          return { ok: false as const, reason: "unavailable" as const };
        }
        if (mapped instanceof ContentRejected) {
          return { ok: false as const, reason: "rejected" as const };
        }
        if (mapped instanceof AiTransient) {
          return { ok: false as const, reason: "transient" as const };
        }
        return { ok: false as const, reason: "error" as const };
      }
    }),
});
