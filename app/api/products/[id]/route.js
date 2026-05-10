import { supabase } from "@/lib/supabase";

// DELETE PRODUCT
export async function DELETE(req, { params }) {
  const { id } = await params;

  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase delete error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("API Delete error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// UPDATE PRODUCT
export async function PUT(req, { params }) {
  const { id } = await params;

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
      .update({
        name,
        price,
        gender,
        product_type,
        category_slug,
        image_url,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase update error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({
      message: "Product updated successfully",
      data,
    });
  } catch (err) {
    console.error("API Update error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
