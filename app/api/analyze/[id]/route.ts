// app/api/analyze/[id]/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> },
) {
    const { id } = await context.params;
    const supabase = await createClient();
    const { data: job, error } = await supabase
        .from("analysis_jobs")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching analysis job:", error);
        return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
    }

    if (!job) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ job });
}
