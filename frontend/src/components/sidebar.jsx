import { useState } from "react";
import { X, Menu, User, Clapperboard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <aside className={`${isOpen ? "w-64" : "w-20"} bg-gradient-to-b from-blue-50 to-white shadow-lg transition-all duration-300 flex flex-col border-r border-blue-100`}>
      <div className="p-4 border-b border-blue-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          {isOpen && (
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Dashboard
            </h2>
          )}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-blue-100 rounded-lg transition-colors duration-200 text-blue-600"
            aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav className="flex flex-col gap-2 p-4 flex-1">
        {/* USER */}
        <Link 
          to="/dashboard/user" 
          className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
            isActive('/dashboard/user')
              ? 'bg-blue-200 text-blue-700 shadow-sm'
              : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
          }`}
        >
          <User size={20} className="flex-shrink-0" />
          {isOpen && <span className="font-medium">User</span>}
        </Link>

        {/* MOVIE */}
        <Link 
          to="/dashboard/movies" 
          className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
            isActive('/dashboard/movies')
              ? 'bg-blue-200 text-blue-700 shadow-sm'
              : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
          }`}
        >
          <Clapperboard size={20} className="flex-shrink-0" />
          {isOpen && <span className="font-medium">Movie</span>}
        </Link>
      </nav>
    </aside>
  );
}
