export default function ProductCard({
  product,
  isAdmin,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-64 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold">
          {product.name}
        </h2>

        <p className="text-gray-600 mt-2">
          {product.price} MAD
        </p>

        <p className="text-sm text-gray-400 mt-1">
          {product.gender}
        </p>

        {/* ADMIN BUTTONS */}
        {isAdmin ? (
          <div className="flex gap-2 mt-4">

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Edit
            </button>

            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Delete
            </button>

          </div>
        ) : (
          /* USER BUTTON */
          <button
            className="w-full mt-4 bg-black text-white py-2 rounded-lg"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}