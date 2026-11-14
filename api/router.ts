import { createRouter, publicQuery } from "./middleware.js";
import { leadsRouter } from "./leads.js";
import { assistantRouter } from "./assistant.js";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  leads: leadsRouter,
  assistant: assistantRouter,
});

export type AppRouter = typeof appRouter;
