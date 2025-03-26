import { HeartIcon, LogOut, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logOut } from '../api/api';
import { favoritesStore } from '../store/favoritesStore';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { favoritesCount } = favoritesStore();
    const [isAtTop, setIsAtTop] = useState(true);

    // Handle logout: clear user session and redirect to login page
    const handleLogout = async () => {
        const response = await logOut();
        console.log(response);
        localStorage.removeItem("user"); // Example: Adjust this to match your app's auth system
        navigate("/");
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY === 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <nav className={`w-full sticky top-0 z-75 transition-all duration-300
                     ${isAtTop ? '' : 'bg-[#F9F7F2] shadow-md'
            }`}>
            <div className="px-3 lg:px-5 max-w-7xl mx-auto max-w-7xl">

                <div className="flex justify-between h-16 items-center">

                    {/* App Logo/Name */}
                    <div className="flex items-center">
                        <p onClick={() => navigate("/search")}
                            className="text-4xl pt-1 pl-3 md:text-5xl font-bold font-['Laurens'] text-[#890A74]
                                    cursor-pointer hover:text-[#FFA900]">
                            Dinger
                        </p>
                    </div>

                    {/* User Icons */}
                    {location.pathname !== "/" && (
                        <div className="flex items-center space-x-2">
                            {/* User Favorites Icon */}
                            <button
                                onClick={() => navigate("/account")}
                                className="text-[#890A74] hover:text-[#FFA900] transition-colors relative"
                            >
                                <HeartIcon size={26} className="hover:fill-[#FFA900]" />
                                {favoritesCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#FFA900] text-[#890A74] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {favoritesCount}
                                    </span>
                                )}
                            </button>
                            {/* User Account Icon */}
                            <button
                                onClick={() => navigate("/account")}
                                className="text-[#890A74] hover:text-[#FFA900] transition-colors"
                            >
                                <User size={26} />
                            </button>

                            {/* Logout Icon */}
                            <button
                                onClick={handleLogout}
                                className="text-[#890A74] hover:text-[#FFA900] transition-colors"
                            >
                                <LogOut size={26} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

