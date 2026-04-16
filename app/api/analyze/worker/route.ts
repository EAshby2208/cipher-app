// app/api/analyze/worker/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateText } from "ai";
import {openai} from "@ai-sdk/openai";

export async function POST() {
  const supabase = await createClient();

  // Get next pending job
  const {data: job} = await supabase
    .from("jobs")
    .select("*")
    .eq("status", "pending")
    .order("created_at")
    .limit(1)
    .single();

  if (!job) {
    return NextResponse.json({ message: "No jobs" });
  }
  try {
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

    Keep it concise and easy to understand.
    `;

    const { text } = await generateText({
      model: openai(process.env.OPENAI_MODEL!),
      prompt,
      temperature: 0.5,
    });

    // save result back to database
    await supabase
      .from("analysis_jobs")
      .update({
        status: "complete",
        result: text,
      })
      .eq("id", job.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    await supabase
      .from("analysis_jobs")
      .update({ status: "failed" })
      .eq("id", job.id);

    return NextResponse.json({ error: "Worker failed" }, { status: 500 });
  }
}