import { Product, useSearchProductsQuery } from "@/redux/apis/productApis";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/redux/reducers/cartReducer";
import { RootState } from "@/redux/store";
import { skipToken } from "@reduxjs/toolkit/query";
import axios from "axios";
import { Search, Shirt, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";




export default function Navbar({shoesSectionRef}:any) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: results = [], isLoading } = useSearchProductsQuery(
    query ? { name: query } : skipToken
  );
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    addressLine: "",
    city: "",
    postalCode: "",
  });
  const handleScrollToShoes = () => {
    if (shoesSectionRef.current) {
      shoesSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  
  const handleSearchSubmit = (e:any) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery(""); 
    }
  }
  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/payment/checkout`,
        {
          cartItems: cartItems.map(item => ({
            productId: item.product._id,
            name: item.product.name,
            image: item.product.imageUrls[0],
            price: item.product.price,
            quantity: item.quantity,
          })),
          shippingAddress: {
            fullName: shippingInfo.fullName,
            addressLine: shippingInfo.addressLine,
            city: shippingInfo.city,
            postalCode: shippingInfo.postalCode
          },          
          totalAmount: subtotal,
          userEmail: "test@example.com",
        },
        {
          withCredentials: true,
        }
      );
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to initiate checkout. Please try again.");
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
            <Link to="/" className="hover:text-neutral-900 hover:underline underline-offset-4 transition">Fashion</Link>
            <Link to="/" onClick={handleScrollToShoes} className="hover:text-neutral-900 hover:underline underline-offset-4 transition">Shoes</Link>
            <Link to="/" className="hover:text-neutral-900 hover:underline underline-offset-4 transition">Accessories</Link>
            <Link to="/" className="hover:text-neutral-900 hover:underline underline-offset-4 transition">About</Link>
            <Link to="/" className="hover:text-neutral-900 hover:underline underline-offset-4 transition">Contact</Link>
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
                    ) : isLoading ? (
                      <p className="text-sm text-neutral-500 text-center mt-6">Loading...</p>
                    ) : results.length === 0 ? (
                      <p className="text-sm text-neutral-500 text-center mt-6">
                        No products found
                      </p>
                    ) : (
                      results.map((item:Product) => (
                        <SheetClose asChild>
                        <Link
                          to={`/product/${item._id}`}
                          key={item._id}
                          className="flex items-center gap-4 hover:bg-neutral-200 p-2 rounded-md transition"
                        >
                          <img
                            src={item.imageUrls[0]}
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
                        </SheetClose>
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
            <Sheet>
              <SheetTrigger asChild>
              <button className="hover:text-neutral-900 transition relative">
                <ShoppingCart className="w-5 h-5" />
                
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-full sm:max-w-[550px] p-6 bg-[#ffffff] flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  
                  <div className="flex items-center gap-2 mb-6">
                    <ShoppingCart className="w-5 h-5" />
                    <h2 className="text-lg font-bold">{cartItems.length} {cartItems.length === 1 ? "ITEM" : "ITEMS"}</h2>
                  </div>

                  <div className="border-b border-neutral-300 mb-6"></div>

                  <div className="flex flex-col gap-6">
                    {cartItems.map((item) => (
                      <div key={item.product._id} className="flex items-start gap-4">
                        <img
                          src={item.product.imageUrls[0]}
                          alt={item.product.name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1 flex flex-col gap-2">
                          <div>
                            <p className="font-semibold text-md text-neutral-800 leading-tight">
                              {item.product.name}
                            </p>
                            <p className="text-sm text-neutral-500 mt-1">Conditon: {item.product.condition || "N/A"}</p>
                          </div>

                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center border rounded-full overflow-hidden w-fit">
                              <button
                                onClick={() => dispatch(decreaseQuantity(item.product._id))}
                                className="px-3 py-1 text-lg hover:bg-neutral-100"
                              >-</button>

                              <span className="px-4 py-1 text-md">{item.quantity}</span>

                              <button
                                onClick={() => dispatch(increaseQuantity(item.product._id))}
                                className="px-3 py-1 text-lg hover:bg-neutral-100"
                              >+</button>
                            </div>
                            <button
                              onClick={() => dispatch(removeFromCart(item.product._id))}
                              className="text-sm text-gray-400 underline hover:text-gray-600"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <div className="text-md font-semibold text-neutral-800">
                          ₹{item.product.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10">
                  <div className="border-t border-neutral-300 pt-4">
                    <p className="text-center text-sm font-semibold mb-2">Get any 2 bottoms @ ₹3199</p>
                  </div>

                  <div className="flex justify-between text-md font-semibold py-4">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full mt-4 text-sm tracking-wide bg-black hover:bg-neutral-800 text-white rounded-md py-3">
                        PLACE ORDER
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] max-h-[95vh] overflow-y-auto px-4 py-6 rounded-xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">Edit Shipping Address</DialogTitle>
                        <DialogDescription className="text-sm text-muted-foreground">
                          Make changes to your shipping address here. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="flex flex-col gap-5 py-6">
                        <div className="flex items-center gap-3">
                          <Label htmlFor="fullName" className="w-20 text-sm font-medium text-right">
                            Full Name
                          </Label>
                          <div className="flex-1">
                          <Input
                            id="fullName"
                            placeholder="John Doe"
                            className="w-full p-2 border rounded-md"
                            value={shippingInfo.fullName}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                            required
                          />
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Label htmlFor="addressLine" className="w-20 text-sm font-medium text-right">
                            Address Line
                          </Label>
                          <div className="flex-1">
                          <Input
                            id="addressLine"
                            placeholder="123 Main Street"
                            className="w-full p-2 border rounded-md"
                            value={shippingInfo.addressLine}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, addressLine: e.target.value })}
                            required
                          />
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Label htmlFor="city" className="w-20 text-sm font-medium text-right">
                            City
                          </Label>
                          <div className="flex-1">
                          <Input
                            id="city"
                            placeholder="Mumbai"
                            className="w-full p-2 border rounded-md"
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                            required
                          />
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Label htmlFor="postalCode" className="w-20 text-sm font-medium text-right">
                            Postal Code
                          </Label>
                          <div className="flex-1">
                          <Input
                            id="postalCode"
                            placeholder="400001"
                            className="w-full p-2 border rounded-md"
                            value={shippingInfo.postalCode}
                            onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                            required
                          />
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={handleCheckout}
                          type="submit"
                          className="w-full py-3 text-white bg-black rounded-md hover:bg-neutral-800 text-sm font-medium tracking-wide"
                          disabled={
                            !shippingInfo.fullName ||
                            !shippingInfo.addressLine ||
                            !shippingInfo.city ||
                            !shippingInfo.postalCode
                          }
                        >
                          Place Order
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}







