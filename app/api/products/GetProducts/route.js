import { supabase } from "@/lib/supabase";


// GET PRODUCTS
export async function GET() {

  try {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

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

