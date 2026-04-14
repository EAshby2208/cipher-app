// app/api/cipher/route.ts

import { NextResponse } from "next/server";
import { processCipher } from "@/lib/cipher";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  
  try {
    const body = await req.json();
    const { phrase, keyphrase, keycode, mode } = body;

    // Basic validation (helps prevent crashes)
    if (!phrase || !mode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    // Run cipher logic
    const result = processCipher(phrase, keyphrase, keycode, mode);

    // Save to database
    const { error } = await supabase.from("messages").insert({
      phrase,
      result: result.result,
      keyphrase,
      keycode,
    });

    if (error) {
      console.error("Error saving message:", error);
      return NextResponse.json(
        { error: "Failed to save message" },
        { status: 500 }
      );
    }

    // Return the result to frontend
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process cipher" },
      { status: 500 }
    );
  }
}