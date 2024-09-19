"use node";

import { v } from "convex/values";
import { ChatOpenAI } from "@langchain/openai";
import { internalAction } from "./_generated/server";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { complementSummary } from "./tables/complement_summary";
import { internal } from "./_generated/api";
import { StringOutputParser } from "@langchain/core/output_parsers";

const OPENAI_MODEL = "gpt-4o-mini";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}
export const summarize = internalAction({
  args: {
    contentToSummarize: v.string(),
    complementSummaryId: v.string(),
  },
  handler: async (ctx, { contentToSummarize, complementSummaryId }) => {
    const model = new ChatOpenAI({
      modelName: OPENAI_MODEL,
      apiKey: OPENAI_API_KEY,
    });
    console.log("Summarizing content", contentToSummarize);
    const messages = [
      new SystemMessage("Summarize the following message"),
      new HumanMessage(contentToSummarize),
    ];

    const parser = new StringOutputParser();
    const response = await model.invoke(messages);

    console.log("Summarized content", { response });
    if (!response.content) {
      await ctx.runMutation(internal.complement.updateComplementSummary, {
        complementSummaryId,
        summary: "null",
        status: "error",
        updatedAt: Date.now(),
        error: "No response content",
      });
    }
    await ctx.runMutation(internal.complement.updateComplementSummary, {
      complementSummaryId,
      summary: response.text,
      status: "completed",
      updatedAt: Date.now(),
    });
  },
});
