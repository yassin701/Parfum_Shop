import { supabase } from "@/lib/supabase";

export async function POST(req) {
    try {
        const body = await req.json();

        const { 
            name, 
            price, 
            gender, 
            product_type, 
            category_slug, 
            image_url 
        } = body;

        const { data, error } = await supabase
            .from("products")
            .insert([
                {
                    name,
                    price,
                    gender,
                    product_type,
                    category_slug,
                    image_url,
                },
            ])
            .select();

        if (error) {

            return Response.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return Response.json({
            message: "Product added",
            data,
        });
    } catch (err) {

        return Response.json(
            { error: err.message },
            { status: 500 }
        );
    }
}