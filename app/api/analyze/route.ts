// app/api/analyze/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { runWorker } from "./worker/route";

export async function POST(req: Request) {
  const supabase = await createClient();

  try {
    const body = await req.json();
    const { phrase, keyphrase, keycode } = body;

    // Basic validation (helps prevent crashes)
    if (!phrase) { // only phrase is required, keyphrase and keycode can be optional because of defaults
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // create job (instead of running ai analysis directly, we create a job for the worker to process)
    const { data: job } = await supabase
      .from("analysis_jobs")
      .insert({
        user_id: user.id,
        phrase,
        keyphrase,
        keycode,
        status: "pending"
      })
      .select()
      .single();

    // trigger worker to process jobs immediately (instead of waiting for next scheduled run)
    // const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    // fetch(`${baseURL}/api/analyze/worker`, {
    //   method: "POST",
    // })
    runWorker().catch((err) => {
      console.error("Error triggering worker:", err);
    });

    if (!job) { // should never happen, but just in case
      return NextResponse.json(
        { error: "Failed to create analysis job" },
        { status: 500 }
      );
    }

    // return job id to frontend (frontend will poll for result using this id)
    return NextResponse.json({ jobId: job.id });
  } catch (error) {
    console.error("Error creating analysis job:", error);
    return NextResponse.json(
      { error: "Failed to create analysis job" },
      { status: 500 }
    );
  }
}