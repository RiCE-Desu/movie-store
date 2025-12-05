import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const [selected, setSelected] = useState([]);

  const toggleSelect = (item) => {
    setSelected((prev) =>
      prev.some((s) => s.id === item.id)
        ? prev.filter((s) => s.id !== item.id)
        : [...prev, item]
    );
  };

  const total = selected.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <button
          onClick={() => window.history.back()}
          className="text-gray-700 hover:text-gray-900 text-xl"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        <div className="text-gray-600 text-3xl">🛒</div>
      </div>

      <div className="grid grid-cols-3 gap-10">
        {/* LEFT — Cart Items */}
        <div className="col-span-2 space-y-5">
          {cart.length === 0 ? (
            <p className="text-gray-600 text-lg mt-20 text-center">
              Keranjang masih kosong...
            </p>
          ) : (
            cart.map((item) => {
              const isSelected = selected.some((s) => s.id === item.id);

              return (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center gap-6"
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(item)}
                    className="w-5 h-5 accent-blue-600"
                  />

                  {/* Poster */}
                  <img
                    src={item.poster_url}
                    className="w-24 h-32 object-cover rounded-lg"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">Harga:</p>
                    <p className="text-blue-600 text-xl font-bold">
                      Rp {Number(item.price).toLocaleString()}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-600 text-xl"
                  >
                    ✕
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* RIGHT — Checkout Panel */}
        {cart.length > 0 && (
          <div className="bg-white h-fit border border-gray-200 shadow-lg rounded-2xl p-6 sticky top-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              Checkout Summary
            </h2>

            <div className="flex justify-between text-lg mb-3">
              <span className="text-gray-700">
                Selected Items ({selected.length})
              </span>
              <span className="font-bold text-blue-600">
                Rp {total.toLocaleString()}
              </span>
            </div>

            <Button
              className="w-full text-lg py-6 mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                if (selected.length === 0) {
                  alert("Pilih item dulu untuk checkout.");
                  return;
                }

                alert("Checkout berhasil!");

                // Hapus hanya item yang dipilih
                selected.forEach((item) => removeFromCart(item.id));

                // Reset selection
                setSelected([]);
              }}
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
