import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { insertLead } from "./queries/leads";

const optionalField = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(""));

export const leadsRouter = createRouter({
  submit: publicQuery
    .input(
      z.object({
        name: z.string().trim().min(1, "Please enter your name.").max(120),
        phone: optionalField(40),
        email: z
          .string()
          .trim()
          .email("Please enter a valid email address.")
          .max(160)
          .optional()
          .or(z.literal("")),
        city: optionalField(120),
        projectType: optionalField(80),
        scope: optionalField(120),
        contactMethod: optionalField(40),
        message: optionalField(4000),
        source: z.string().trim().max(40).default("website"),
      }),
    )
    .mutation(async ({ input }) => {
      await insertLead(input);
      return { ok: true as const };
    }),
});
