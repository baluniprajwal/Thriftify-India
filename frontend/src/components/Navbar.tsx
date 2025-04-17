import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Shirt, Search, User, ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e:any) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setSearchOpen(false); // optionally close input
      setQuery(""); // reset input
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
            <button onClick={() => setSearchOpen(!searchOpen)} className="hover:text-neutral-900 transition">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/profile" className="hover:text-neutral-900 transition">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="hover:text-neutral-900 transition">
              <ShoppingCart className="w-5 h-5" />
            </Link>

            {/* Inline Search Input */}
            {searchOpen && (
              <form onSubmit={handleSearchSubmit} className="absolute right-0 top-10 w-64">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  placeholder="Search products..."
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-rose-400 bg-white"
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}







