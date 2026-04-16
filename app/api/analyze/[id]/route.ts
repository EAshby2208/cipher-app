import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    const supabase = await createClient();
    const { data: job } = await supabase
        .from("analysis_jobs")
        .select("*")
        .eq("id", params.id)
        .single();

    if (!job) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json({ job });
}
