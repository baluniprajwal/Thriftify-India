export default function ProductCard({ product }:any) {
    return (
      <div className="bg-white shadow-lg rounded-2xl p-4 w-72 transition-transform transform hover:scale-105">
        {/* Product Image */}
        <div className="relative w-full h-48 overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* Product Details */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-500 text-sm">{product.category}</p>
  
          {/* Price & Rating */}
          <div className="flex justify-between items-center mt-2">
            <span className="text-xl font-bold text-warmBrown">${product.price}</span>
            <span className="text-yellow-500 text-sm">⭐ {product.rating}</span>
          </div>
  
          {/* Add to Cart Button */}
          <button className="w-full mt-4 bg-warmBrown text-white py-2 rounded-lg hover:bg-opacity-80 transition">
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
  