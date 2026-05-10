import { supabase } from "@/lib/supabase";


// GET PRODUCTS
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const gender = searchParams.get("gender");
        const type = searchParams.get("type");
        const sort = searchParams.get("sort");

        let query = supabase
            .from("products")
            .select("*");

        // Apply gender filter if provided
        if (gender && gender !== "all") {
            query = query.ilike("gender", gender);
        }

        // Apply product type filter if provided
        if (type && type !== "all") {
            query = query.eq("product_type", type);
        }

        // Apply sorting logic
        if (sort === "price-asc") {
            query = query.order("price", { ascending: true });
        } else if (sort === "price-desc") {
            query = query.order("price", { ascending: false });
        } else {
            // Default to Newest
            query = query.order("created_at", { ascending: false });
        }

        const { data, error } = await query;

        if (error) {
            return Response.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return Response.json(data);
    } catch (err) {
        return Response.json(
            { error: err.message },
            { status: 500 }
        );
    }
}

