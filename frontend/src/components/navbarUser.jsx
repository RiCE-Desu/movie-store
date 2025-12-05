import { ShoppingCart, Film } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

export default function NavbarUser() {
  const { cart } = useCart();

  return (
    <nav className="w-full bg-white shadow-md px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-2">
        <Film className="text-blue-600" size={28} />
        <h1 className="text-2xl font-bold text-blue-700">MovieStore</h1>
      </Link>

      {/* CART ICON */}
      <Link to="/cart" className="relative">
        <ShoppingCart
          size={28}
          className="text-blue-700 hover:text-blue-900 transition"
        />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
            {cart.length}
          </span>
        )}
      </Link>
    </nav>
  );
}
