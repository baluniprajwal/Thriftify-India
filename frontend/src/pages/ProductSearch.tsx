import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useSearchProductsQuery } from "@/redux/apis/productApis";

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [selectedCondition, setSelectedCondition] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [appliedFilters, setAppliedFilters] = useState({
    name: "",
    minPrice: 0,
    maxPrice: 20000,
    condition: undefined as string | undefined,
    category: undefined as string | undefined,
  });
  const { data: products = [], isLoading } = useSearchProductsQuery({
    name: appliedFilters.name,
    minPrice: appliedFilters.minPrice,
    maxPrice: appliedFilters.maxPrice,
    ...(appliedFilters.condition ? { condition: appliedFilters.condition } : {}),
    ...(appliedFilters.category ? { category: appliedFilters.category } : {}),
  });
  
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-mutedBeige p-4">
      <div className="max-w-8xl mx-auto">
        {/* Product Display Section */}
        <section className="w-full">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Sheet>
                <SheetTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal size={16} />
                  Show Filters</Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-[#faf6ee]">
                  <SheetHeader>
                    <SheetTitle className="text-xl font-semibold flex items-center gap-2">
                      <SlidersHorizontal size={20} />
                      Filters
                    </SheetTitle>
                    <SheetDescription className="text-sm text-gray-500 mb-4 py-3">
                      Refine your search by category, condition, and price.
                    </SheetDescription>
                  </SheetHeader>

                  <aside className="text-[15px] text-[#2f2f2f]">
                    <div className="space-y-8">
                      {/* Condition Filter */}
                      <div>
                        <label className="block text-base font-medium text-gray-800 mb-3">Condition</label>
                        {["New", "Gently Used", "Like New", "Used", "Vintage"].map((condition) => (
                          <div key={condition} className="flex items-center gap-3 mb-2">
                            <input
                              type="radio"
                              id={condition}
                              name="condition"
                              value={condition}
                              checked={selectedCondition===condition}
                              className="w-5 h-5 accent-mutedBeige"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedCondition(condition);
                                } else {
                                  setSelectedCondition(condition);
                                }
                              }}
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
                              type="radio"
                              id={category}
                              name="category"
                              value={category}
                              className="w-5 h-5 accent-mutedBeige"
                              checked={selectedCategory===category}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedCategory(category);
                                } else {
                                  setSelectedCategory(category);
                                }
                              }}
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
                        <Slider
                          defaultValue={[0, 20000]}
                          min={0}
                          max={20000}
                          step={500}
                          value={priceRange}
                          onValueChange={(newRange: [number, number]) => setPriceRange(newRange)}
                        />
                        <p className="text-sm mt-2 text-muted-foreground">
                          ₹{priceRange[0]} – ₹{priceRange[1]}
                        </p>

                      </div>
                    </div>
                  </aside>

                  <div className="mt-8">
                    <SheetClose asChild>
                    <Button
                        className="w-full rounded-full bg-warmBrown text-white hover:bg-[#a26547]"
                        onClick={() => {
                          setAppliedFilters({
                            name: searchQuery,
                            minPrice: priceRange[0],
                            maxPrice: priceRange[1],
                            condition: selectedCondition,
                            category: selectedCategory,
                          });
                        }}
                      >
                        Apply Filters
                      </Button>
                    </SheetClose>
                  </div>
                </SheetContent>
              </Sheet>

            <div className="w-full">
              <PlaceholdersAndVanishInput
                placeholders={[
                  "Search for summer dresses...",
                  "Floral print, maxi, lace...",
                  "Explore trending styles...",
                  "Try: vintage chiffon...",
                  "Look for accessories...",
                ]}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Search submitted:", searchQuery);
                }}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-5 ">
                  Sort by
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem>Newest</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* No Results Message */}
          {isLoading? (
            <div className="text-center text-gray-500 mt-10">Loading...</div>
          ):
          filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              No products found matching your search.
            </div>
          ): 
          
          (<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative w-full overflow-hidden rounded-lg">
                  <img
                    src={product.imageUrls[0]}
                    alt={product.name}
                    className="w-full h-[450px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                  <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-sm px-4 py-2 rounded-full transition-opacity duration-300">
                    Quick View
                  </button>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium">{product.name.toUpperCase()}</p>
                  <p className="text-base font-semibold">
                    ₹{(product.price * 83).toFixed(0)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductSearch;








