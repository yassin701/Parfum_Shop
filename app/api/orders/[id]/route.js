import { supabase } from "@/lib/supabase";

export async function PATCH(req, { params }) {
    try {
        const { id } = await params;
        const { status } = await req.json();

        const { data, error } = await supabase
            .from("orders")
            .update({ status })
            .eq("id", id)
            .select();

        if (error) {
            return Response.json({ error: error.message }, { status: 500 });
        }

        return Response.json(data[0]);
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = await params;
        const { error } = await supabase
            .from("orders")
            .delete()
            .eq("id", id);

        if (error) {
            return Response.json({ error: error.message }, { status: 500 });
        }

        return Response.json({ message: "Order deleted successfully" });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
