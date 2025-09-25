import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createCv = mutation({
  args: {
    linkedinUrl: v.string(),
    rawContent: v.string(),
    htmlContent: v.string(),
    cssContent: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("cvs", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getCv = query({
  args: { id: v.id("cvs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});