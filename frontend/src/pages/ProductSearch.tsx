import { Filter, Search } from "lucide-react";
import { useState } from "react";

const ProductSearch = () => {
  const allProducts = [
    {
      id: 1,
      title: "Black Lace Evening Dress",
      price: 99.99,
      size: "M",
      category: "Dress",
      color: "Black",
      image: "https://picsum.photos/300/400?random=101",
    },
    {
      id: 2,
      title: "Classic Navy Bomber Jacket",
      price: 109.99,
      size: "M",
      category: "Jacket",
      color: "Navy",
      image: "https://picsum.photos/300/400?random=102",
    },
    {
      id: 3,
      title: "Retro Blue Denim Jeans",
      price: 119.99,
      size: "M",
      category: "Jeans",
      color: "Blue",
      image: "https://picsum.photos/300/400?random=103",
    },
    {
      id: 4,
      title: "Floral Embroidered Blouse",
      price: 129.99,
      size: "M",
      category: "Blouse",
      color: "White",
      image: "https://picsum.photos/300/400?random=104",
    },
    {
      id: 5,
      title: "Plaid A-Line Skirt",
      price: 139.99,
      size: "M",
      category: "Skirt",
      color: "Red",
      image: "https://picsum.photos/300/400?random=105",
    },
    {
      id: 6,
      title: "Camel Double-Breasted Coat",
      price: 149.99,
      size: "M",
      category: "Coat",
      color: "Brown",
      image: "https://picsum.photos/300/400?random=106",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br bg-mutedBeige p-4">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row gap-10">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-1/6 bg-creamyWhite p-6 rounded-2xl shadow-md text-[15px] text-[#2f2f2f]">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Filter size={20} />
            Filters
        </h2>

        <div className="space-y-8">
            {/* Condition Filter */}
            <div>
            <label className="block text-base font-medium text-gray-800 mb-3">Condition</label>
            {["New", "Gently Used", "Like New", "Used", "Vintage"].map((condition) => (
                <div key={condition} className="flex items-center gap-3 mb-2">
                <input
                    type="checkbox"
                    id={condition}
                    name="condition"
                    value={condition}
                    className="w-5 h-5 accent-mutedBeige"
                />
                <label htmlFor={condition} className="text-[15px] text-gray-800">{condition}</label>
                </div>
            ))}
            </div>

            {/* Category Filter */}
            <div>
            <label className="block text-base font-medium text-gray-800 mb-3">Category</label>
            {["clothing", "shoes", "accessories", "other"].map((category) => (
                <div key={category} className="flex items-center gap-3 mb-2">
                <input
                    type="checkbox"
                    id={category}
                    name="category"
                    value={category}
                    className="w-5 h-5 accent-mutedBeige"
                />
                <label htmlFor={category} className="text-[15px] text-gray-800 capitalize">{category}</label>
                </div>
            ))}
            </div>

            {/* Price Slider Filter */}
            <div>
            <label className="block text-base font-medium text-gray-800 mb-3">Price Range (₹)</label>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>₹0</span>
                <span>₹20,000</span>
            </div>
            <input
                type="range"
                min={0}
                max={20000}
                step={100}
                defaultValue={10000}
                className="w-full accent-mutedBeige h-2"
                onChange={(e) => console.log("Selected Price:", e.target.value)}
            />
            </div>
        </div>
        </aside>


        {/* Product Display Section */}
        <section className="w-full md:w-3/4">
          {/* Search Bar */}
          <div className="mb-6 relative">
            <Search className="absolute top-3.5 left-4 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search for styles..."
              className="w-full px-12 py-3 rounded-full border border-gray-300 bg-creamyWhite placeholder-gray-500 text-sm focus:outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* No Results Message */}
          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-500 mt-10">No products found matching your search.</div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredProducts.map((product) => (
                <div key={product.id} className="flex flex-col items-center text-center group">
              <div className="relative w-full overflow-hidden rounded-lg">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-[400px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <button
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-sm px-4 py-2 rounded-full transition-opacity duration-300"
                >
                  Quick View
                </button>
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium">{product.title.toUpperCase()}</p>
                <p className="text-base font-semibold">₹{(product.price * 83).toFixed(0)}</p>
              </div>
            </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
 

export default ProductSearch;







