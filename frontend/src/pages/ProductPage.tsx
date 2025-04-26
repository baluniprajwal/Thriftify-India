import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/redux/apis/productApis";
import { useState } from "react";
import { Heart } from "lucide-react";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id || "");

  const [mainImage, setMainImage] = useState<string | undefined>(undefined);

  if (isLoading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  if (error || !product) {
    return <div className="text-center text-red-500 mt-10">Product not found.</div>;
  }

  return (
    <div className="bg-mutedBeige min-h-screen p-8 text-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Image Gallery */}
        <div className="md:w-1/2">
          <img
            src={mainImage || product.imageUrls[0]}
            alt={product.name}
            className="rounded-md shadow-md object-cover w-full h-[600px]"
          />
          <div className="flex gap-3 mt-4">
            {product.imageUrls.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setMainImage(img)}
                className={`h-20 w-20 rounded-md object-cover cursor-pointer border 
                ${img === (mainImage || product.imageUrls[0]) ? "border-rose-400" : "border-transparent"}`}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-rose-600 font-semibold mb-2">₹{(product.price * 83).toFixed(0)}</p>

          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 text-sm rounded-full mb-1">
            {product.condition}
          </span>

          <div className="mt-4 mb-4">
            <p className="font-semibold">Material</p>
            <p>{product.material}</p>
          </div>

          <button className="bg-rose-600 text-white w-full py-3 rounded-md mb-2 hover:bg-rose-700 transition">
            Add to Cart
          </button>
          <button className="border border-neutral-500 text-black w-full py-3 rounded-md flex items-center justify-center gap-2 hover:bg-neutral-100 transition">
            <Heart className="w-4 h-4" /> Add to Wishlist
          </button>

          {/* Description */}
          <div className="bg-neutral-100 rounded-md p-4 mt-6 text-sm">
            <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs mb-2 capitalize">
              {product.category}
            </span>
            <p>{product.description}</p>
          </div>

          {/* Shipping & Care */}
          <div className="bg-orange-50 border border-orange-200 mt-6 p-4 text-sm rounded-md">
            <p className="font-semibold mb-2">📦 Shipping Info</p>
            <p>{product.shippingInfo}</p>

            {product.careInstructions.length > 0 && (
              <>
                <p className="font-semibold mt-4 mb-1">🧼 Care Instructions</p>
                <ul className="list-disc pl-5">
                  {product.careInstructions.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
