import { supabase } from "@/lib/supabase";

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            fullName,
            email,
            phone,
            address,
            city,
            notes,
            items,
            totalAmount
        } = body;

        const { data, error } = await supabase
            .from("orders")
            .insert([
                {
                    full_name: fullName,
                    email,
                    phone,
                    address,
                    city,
                    notes,
                    items, // This will be stored as JSONB
                    total_amount: totalAmount,
                    status: 'Pending'
                }
            ])
            .select();

        if (error) {

            return Response.json({
                error: error.message,
                details: error.details,
                hint: error.hint
            }, { status: 500 });
        }

        return Response.json({ message: "Order placed successfully", data: data[0] });
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            return Response.json({ error: error.message }, { status: 500 });
        }

        return Response.json(data);
    } catch (err) {
        return Response.json({ error: err.message }, { status: 500 });
    }
}
