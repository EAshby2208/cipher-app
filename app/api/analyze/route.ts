// app/api/analyze/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  try {
    const body = await req.json();
    const { phrase, keyphrase, keycode } = body;

    // Basic validation (helps prevent crashes)
    if (!phrase || !keyphrase || !keycode) {
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

    if (!job) {
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