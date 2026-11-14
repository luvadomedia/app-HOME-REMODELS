import { createRouter, publicQuery } from "./middleware";
import { leadsRouter } from "./leads";
import { assistantRouter } from "./assistant";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  leads: leadsRouter,
  assistant: assistantRouter,
});

export type AppRouter = typeof appRouter;
