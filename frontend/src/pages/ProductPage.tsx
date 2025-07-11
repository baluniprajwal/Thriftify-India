import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "@/redux/apis/productApis";
import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart, decreaseQuantity, increaseQuantity, removeFromCart } from "@/redux/reducers/cartReducer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useGetProductByIdQuery(id || "");
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

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

          
          <Sheet>
              <SheetTrigger asChild>
              <button
              onClick={handleAddToCart}
              className="w-full py-3 rounded-md mb-2 transition bg-rose-600 hover:bg-rose-700 text-white">Add to Cart
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
                  <Button className="w-full mt-2 text-sm tracking-wide bg-black hover:bg-neutral-800 text-white rounded-none py-4">
                    PLACE ORDER
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
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
                  {product.careInstructions.map((item, index) => (
                    <li key={index}>{item}</li>
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
