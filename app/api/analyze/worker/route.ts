// app/api/analyze/worker/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateText } from "ai";
import {openai} from "@ai-sdk/openai";

export async function POST() {
  return await runWorker();
}
export async function GET() {
   return await runWorker();
}

export async function runWorker() {
  const supabase = await createClient();
  const maxJobsPerRun = 5; // limit how many jobs to process in one run to prevent long execution times
  let processedJobs = 0;
  while (processedJobs < maxJobsPerRun) {
    // Get next pending job
    const {data: jobs} = await supabase
      .from("analysis_jobs")
      .select("*")
      .eq("status", "pending")
      .order("created_at", {ascending: true})
      .limit(1);
    const job = jobs?.[0];

    if (!job) break; // no more jobs to process

    try {
      // if DRY_RUN is true, skip analysis and just mark job as completed (useful for testing without consuming OpenAI credits)
      if (process.env.DRY_RUN === "true") {
        await supabase
          .from("analysis_jobs")
          .update({
            status: "completed",
            result: "DRY RUN: analysis skipped",
          })
          .eq("id", job.id);

        // return NextResponse.json({ success: true });
        processedJobs++;
        continue;
      }
      // create prompt for ai analysis based on job data
      const prompt = `
      You are a cryptography assistant.
      A user is using a custom cipher based on:
      - A keyword substitution alphabet
      - A repeating numeric shift

      Given:
      Phrase: "${job.phrase}"
      Keyword: "${job.keyphrase}"
      Numeric Key: "${job.keycode}"

      Explain:
      1. How the cipher works
      2. What the keyword does
      3. What the numeric shifts do
      4. Whether this cipher is strong or weak

      Keep it concise and easy to understand. Don't offer to give an example or do any encoding/decoding - just explain how the cipher works and analyze its strength.
      `;

      const { text } = await generateText({
        model: openai(process.env.OPENAI_MODEL!),
        prompt,
        temperature: 0.5,
      });

      // log prompt and response for debugging
      // console.log("Calling OpenAI with prompt:", prompt);
      // console.log("OpenAI response:", text);

      // save result back to database
      await supabase
        .from("analysis_jobs")
        .update({
          status: "completed",
          result: text,
        })
        .eq("id", job.id);

      processedJobs++;

  } catch (err) {
    await supabase
      .from("analysis_jobs")
      .update({
        status: "failed",
        result: `Worker error: ${err instanceof Error ? err.message : String(err)}`,
      })
      .eq("id", job.id);

      processedJobs++;
      console.error("Error processing job:", err);
    }
  }
  return NextResponse.json({
    success: true,
    processedJobs,
  });
}