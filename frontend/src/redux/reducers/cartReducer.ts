import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../apis/productApis';

export interface CartItem {
    product: Product;
    quantity: number;
  }
  
export interface CartState {
    cartItems: CartItem[];
}
  
const saveCartToLocalStorage = (cartItems: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };
  
const loadCartFromLocalStorage = (): CartItem[] => {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
};
const initialState: CartState = {
    cartItems: loadCartFromLocalStorage(),
};
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      addToCart: (state, action: PayloadAction<Product>) => {
        const existingItem = state.cartItems.find(
          (item) => item.product._id === action.payload._id
        );
  
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.cartItems.push({ product: action.payload, quantity: 1 });
        }
        saveCartToLocalStorage(state.cartItems);
      },
  
      removeFromCart: (state, action: PayloadAction<string>) => {
        state.cartItems = state.cartItems.filter(
          (item) => item.product._id !== action.payload
        );
        saveCartToLocalStorage(state.cartItems);
      },
      clearCart: (state) => {
        state.cartItems = [];
        saveCartToLocalStorage(state.cartItems);
      },
      increaseQuantity: (state, action) => {
        const item = state.cartItems.find(item => item.product._id === action.payload);
        if (item) {
          item.quantity += 1;
        }
        saveCartToLocalStorage(state.cartItems);
      },
      decreaseQuantity: (state, action) => {
        const item = state.cartItems.find(item => item.product._id === action.payload);
        if (item && item.quantity > 1) {
          item.quantity -= 1;
        }
        saveCartToLocalStorage(state.cartItems);
      },
    },
});
  
export const { addToCart, removeFromCart, clearCart,decreaseQuantity,increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;