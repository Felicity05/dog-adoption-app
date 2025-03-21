import { LogOut, User } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { logOut } from '../api/api';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.pathname)


    // Handle logout: clear user session and redirect to login page
    const handleLogout = async () => {
        const response = await logOut();
        console.log(response);
        localStorage.removeItem("user"); // Example: Adjust this to match your app's auth system
        navigate("/");
    };


    return (
        <nav className="text-[#090325] mt-5 w-full mx-auto">
            <div className="px-3">

                <div className="flex justify-between h-16 items-center">

                    {/* App Logo/Name */}
                    <div className="flex items-center">
                        <a href="/" className="text-4xl md:text-5xl font-bold font-['Laurens'] text-[#890A74]
                        hover:text-[#FFA900]">
                            Dinger
                        </a>
                    </div>

                    {/* User Icons */}
                    { location.pathname !== "/" && (
                        <div className="flex items-center space-x-2">
                            {/* User Account Icon */}
                            <button
                                onClick={() => navigate("/account")}
                                className="text-[#890A74] hover:text-[#FFA900] transition-colors"
                            >
                                <User size={28} />
                            </button>

                            {/* Logout Icon */}
                            <button
                                onClick={handleLogout}
                                className="text-[#890A74] hover:text-[#FFA900] transition-colors"
                            >
                                <LogOut size={28} />
                            </button>
                        </div>
                    )}

                    {/* <div className="hidden md:flex space-x-4">
                        <a
                            href=""
                            className="px-3 py-2 text-md font-medium
                            hover:underline hover:decoration-2 hover:underline-offset-4
                            hover:decoration-[#890A74]"
                        >
                            About Us
                        </a>
                        <a
                           href="/contact"
                        className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-700"
                        >
                        Contact
                        </a>
                    </div> */}

                    {/* <div className="md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div> */}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
