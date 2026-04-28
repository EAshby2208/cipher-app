// app/api/messages/[id]/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
    
    console.log("Received DELETE request for message");

    const { id } = await context.params;
    const supabase = await createClient();

    // log current session for debugging
    const { data: session } = await supabase.auth.getSession();
    console.log("Current session:", session);
    // ensure user logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // debugging logs
    const { data: existing } = await supabase
        .from('messages')
        .select('*')
        .eq('id', id);
    console.log("Row in DB:", existing);

    const { data, error} = await supabase
        .from('messages')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id) // ensure user can only delete their own messages
        .select()
    console.log("DELETE RESULT:", { data, error });
    const { data: authCheck } = await supabase.rpc('auth.uid');
    console.log("RLS sees user as:", authCheck);


    console.log("Deleting message:", {id, userId: user.id});
    console.log("Supabase response:", { data, error });
    if (error) {
        console.error('Error deleting message:', error);
        return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
    }
    return NextResponse.json({ message: 'Message deleted successfully' });
}
