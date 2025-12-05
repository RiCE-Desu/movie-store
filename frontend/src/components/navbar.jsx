import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn, UserPlus, LayoutDashboard } from 'lucide-react';

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-md border-b border-blue-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ul className="flex items-center justify-center gap-4 py-4">
                    <li>
                        <button 
                            onClick={() => navigate('/')}
                            className={`
                                flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium
                                transition-all duration-200 shadow-sm
                                ${isActive('/') 
                                    ? 'bg-blue-200 text-blue-700 shadow-md' 
                                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
                                }
                            `}
                        >
                            <LogIn size={18} />
                            <span>Login</span>
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => navigate('/register')}
                            className={`
                                flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium
                                transition-all duration-200 shadow-sm
                                ${isActive('/register') 
                                    ? 'bg-blue-200 text-blue-700 shadow-md' 
                                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
                                }
                            `}
                        >
                            <UserPlus size={18} />
                            <span>Register</span>
                        </button>
                    </li>
                    <li>
                        <button 
                            onClick={() => navigate('/dashboard')}
                            className={`
                                flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium
                                transition-all duration-200 shadow-sm
                                ${isActive('/dashboard') 
                                    ? 'bg-blue-200 text-blue-700 shadow-md' 
                                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md'
                                }
                            `}
                        >
                            <LayoutDashboard size={18} />
                            <span>Dashboard</span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;