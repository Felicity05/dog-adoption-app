import { HeartIcon, LogOut } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { favoritesStore } from '../store/favoritesStore';
import { useAuthRedirect } from '../hooks/useAuthRedirect';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { favoritesCount } = favoritesStore();
    const [isAtTop, setIsAtTop] = useState(true);
    const { handleLogout } = useAuthRedirect();

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
                        <div className="flex items-center space-x-3">
                            {/* User Favorites Icon */}
                            <button
                                onClick={() => navigate("/favorites")}
                                className="text-[#890A74] hover:text-[#FFA900] transition-colors relative"
                            >
                                <HeartIcon size={26} className={favoritesCount > 0 ? "fill-[#890A74] hover:fill-[#FFA900]" : "hover:fill-[#FFA900]"} />
                                {favoritesCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#FFA900] text-[#890A74] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                        {favoritesCount}
                                    </span>
                                )}
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

