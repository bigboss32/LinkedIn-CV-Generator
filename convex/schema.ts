import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  cvs: defineTable({
    linkedinUrl: v.string(),
    rawContent: v.string(),
    htmlContent: v.string(),
    cssContent: v.string(),
    createdAt: v.number(),
  }),
});