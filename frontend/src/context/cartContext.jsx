import { create } from "zustand";

export const useCart = create((set) => ({
  cart: [],

  addToCart: (movie) =>
    set((state) => {
      // Cegah duplikasi item
      const exists = state.cart.some((item) => item.id === movie.id);
      if (exists) return state;

      return {
        cart: [...state.cart, movie],
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cart: [] }),
}));
