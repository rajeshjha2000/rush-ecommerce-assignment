import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, variant } = action.payload;
      const existingIndex = state.cart.findIndex(
        item => item.id === product.id && item.variant.weight === variant.weight
      );
      if (existingIndex > -1) {
        state.cart[existingIndex].quantity += 1;
      } else {
        state.cart.push({ ...product, variant, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const { productId, weight } = action.payload;
      state.cart = state.cart.filter(
        item => !(item.id === productId && item.variant.weight === weight)
      );
    },
    updateQuantity: (state, action) => {
      const { productId, weight, quantity } = action.payload;
      const item = state.cart.find(
        i => i.id === productId && i.variant.weight === weight
      );
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
