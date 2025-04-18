import { Search, Shirt, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = [
    {
      id: 1,
      name: "CLASSIC TUCK MEN'S STRAIGHT JEANS",
      price: "₹1,999",
      image: "https://i.pinimg.com/736x/3b/28/58/3b2858b71bfc24d6cedcb959e994d8f2.jpg", // replace with actual image URLs
    },
    {
      id: 2,
      name: "FADED COBALT STRAIGHT FIT JEANS",
      price: "₹1,999",
      image: "https://i.pinimg.com/736x/a5/08/e5/a508e5c4a41edc69b0f00d30375287f0.jpg",
    },
    {
      id: 3,
      name: "MAYTIME STRAIGHT JEANS",
      price: "₹1,999",
      image: "https://i.pinimg.com/736x/44/a2/ed/44a2ed6d7315776d41847698a504402a.jpg",
    },
  ];


  const handleSearchSubmit = (e:any) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery(""); 
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 text-neutral-800 py-4 shadow-md backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-8xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1">
            <Shirt className="text-rose-400" />
            <span className="text-lg font-semibold tracking-tight">Thriftify India</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium text-neutral-600">
            <Link to="/" className="hover:text-neutral-900 hover:underline underline-offset-4 transition">Home</Link>
            <Link to="/fashion" className="hover:text-neutral-900 hover:underline underline-offset-4 transition">Fashion</Link>
            <Link to="/shoes" className="hover:text-neutral-900 hover:underline underline-offset-4 transition">Shoes</Link>
            <Link to="/accessories" className="hover:text-neutral-900 hover:underline underline-offset-4 transition">Accessories</Link>
            <Link to="/about" className="hover:text-neutral-900 hover:underline underline-offset-4 transition">About</Link>
            <Link to="/contact" className="hover:text-neutral-900 hover:underline underline-offset-4 transition">Contact</Link>
          </nav>

          {/* Icons + Search */}
          <div className="flex items-center gap-5 text-neutral-600 relative">
          <Sheet>
              <SheetTrigger asChild>
                <button className="hover:text-neutral-900 transition">
                  <Search className="w-5 h-5" />
                </button>
              </SheetTrigger>

              <SheetContent
                className="w-full sm:w-[500px] p-6 bg-[#faf6ee]"
                side={"left"}
              >
                <div className="flex items-center gap-2 border-b py-4">
                  <Search className="w-5 h-5 text-neutral-500" />
                  <form onSubmit={handleSearchSubmit} className="flex-1">
                    <Input
                      placeholder="Search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="border-none shadow-none focus-visible:ring-0 text-base"
                      autoFocus
                    />
                  </form>
                </div>

                <div className="mt-6">
                  <h3 className="text-xs font-semibold text-neutral-500 mb-2 tracking-wide">
                    PRODUCTS
                  </h3>

                  <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
                    {!query ? (
                      <p className="text-sm text-neutral-500 text-center mt-6">
                        Search for a product
                      </p>
                    ) : results.length === 0 ? (
                      <p className="text-sm text-neutral-500 text-center mt-6">
                        No products found
                      </p>
                    ) : (
                      results.map((item) => (
                        <Link
                          to={`/product/${item.id}`}
                          key={item.id}
                          className="flex items-center gap-4 hover:bg-neutral-200 p-2 rounded-md transition"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div>
                            <p className="text-sm font-medium text-neutral-800 line-clamp-2">
                              {item.name}
                            </p>
                            <p className="text-sm text-neutral-500">{item.price}</p>
                          </div>
                        </Link>
                      ))
                    )}
                  </div>

                  {query && results.length > 0 && (
                    <SheetClose asChild>
                      <Button
                        className="w-full mt-6 text-sm tracking-wide bg-warmBrown hover:bg-[#a26547]"
                        onClick={() => navigate(`/search?q=${encodeURIComponent(query)}`)}
                      >
                        VIEW ALL RESULTS
                      </Button>
                    </SheetClose>
                  )}
                </div>
              </SheetContent>
            </Sheet>

              
            <Link to="/profile" className="hover:text-neutral-900 transition">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="hover:text-neutral-900 transition">
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}







