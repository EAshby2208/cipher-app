// app/api/messages/route.ts

import { NextResponse } from "next/server";
import {createClient } from "@/lib/supabase/server";
    
export async function GET() {
    const supabase = await createClient();
    
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) throw error;

        return NextResponse.json(data);

      } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json(
          { error: "Failed to fetch messages" },
          { status: 500 }
        );
    }
}