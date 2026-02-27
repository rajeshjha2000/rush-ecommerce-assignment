import { createSlice } from '@reduxjs/toolkit';

// Retrieve initial state from localStorage if available
const loadWishlist = () => {
  try {
    const serialized = localStorage.getItem('wishlist-storage');
    if (serialized) {
      const parsed = JSON.parse(serialized);
      // Handle legacy Zustand state structure safely
      if (parsed && parsed.state && Array.isArray(parsed.state.wishlist)) {
        return parsed.state.wishlist;
      }
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch (e) {
    console.warn("Could not load wishlist", e);
  }
  return [];
};

const initialState = {
  wishlist: loadWishlist(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.wishlist.findIndex(item => item.id === product.id);
      if (index > -1) {
        state.wishlist.splice(index, 1);
      } else {
        state.wishlist.push(product);
      }
      // Persist to localStorage outside of reducers typically, but for simplicity here we save it
      localStorage.setItem('wishlist-storage', JSON.stringify(state.wishlist));
    }
  }
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
