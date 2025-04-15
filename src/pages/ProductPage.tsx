import { useState } from "react";
import { Heart } from "lucide-react";

const product = {
  title: "1990s Levi's Denim Jacket",
  price: 85,
  condition: "Gently Used",
  available: true,
  material: "100% Cotton Denim",
  description:
    "A classic piece of American workwear history. This vintage Levi's denim jacket features the iconic fit and durability that made the brand famous. Perfect for layering and achieving that effortless vintage look.",
  shipping: "Ships within 1-2 business days. Free shipping on orders over $100",
  care: ["Machine wash cold", "Hang dry", "Do not bleach"],
  images: [
    "https://i.pinimg.com/736x/b4/a2/cb/b4a2cbd6a0bae774f4e864ff06172be7.jpg", "https://i.pinimg.com/736x/f4/64/76/f46476babaf383b5664ce1895bf66cb6.jpg", "/img3.jpg", "/img4.jpg",
  ],
};

export default function ProductPage() {
  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="bg-[#faf6ee] min-h-screen p-8 text-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Image Gallery */}
        <div className="md:w-1/2">
          <img src={mainImage} alt="Main" className="rounded-md shadow-md object-cover w-full h-[600px]" />
          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setMainImage(img)}
                className={`h-20 w-20 rounded-md object-cover cursor-pointer border 
                ${img === mainImage ? "border-rose-400" : "border-transparent"}`}
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2">
          <p className="text-sm text-gray-500 mb-2">Vintage Fashion</p>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl text-rose-600 font-semibold mb-2">${product.price.toFixed(2)}</p>

          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 text-sm rounded-full mb-1">{product.condition}</span>
          {!product.available && (
            <p className="text-red-500 mt-1">Out of stock</p>
          )}

          <div className="mb-4">
            
          </div>

          <div className="mb-4">
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
            <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs mb-2">90s Grunge</span>
            <p>{product.description}</p>
          </div>

          {/* Shipping & Care */}
          <div className="bg-orange-50 border border-orange-200 mt-6 p-4 text-sm rounded-md">
            <p className="font-semibold mb-2">📦 Shipping</p>
            <p>{product.shipping}</p>
            <p className="font-semibold mt-4 mb-1">🧼 Care Instructions</p>
            <ul className="list-disc pl-5">
              {product.care.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
