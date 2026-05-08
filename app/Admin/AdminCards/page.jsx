"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "@/app/components/Cards";

export default function AdminProducts() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    try {

      const res = await axios.get("/api/products/GetProducts");

      setProducts(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Admin Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {products.map((product) => (
          <Cards
            key={product.id}
            product={product}
            isAdmin={true}
          />
        ))}

      </div>
    </div>
  );
}