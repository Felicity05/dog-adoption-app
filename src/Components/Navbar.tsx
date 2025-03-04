import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="text-[#090325]">
            <div className="max-w-7xl mx-auto px-3">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <a href="/" className="text-5xl font-bold font-['Laurens']
                        hover:text-[#890A74]">
                            Dinger
                        </a>
                    </div>
                    <div className="hidden md:flex space-x-4">
                        <a
                            href=""
                            className="px-3 py-2 text-md font-medium
                            hover:underline hover:decoration-2 hover:underline-offset-4
                            hover:decoration-[#890A74]"
                        >
                            About Us
                        </a>
                        {/*<a*/}
                        {/*    href="/contact"*/}
                        {/*    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-700"*/}
                        {/*>*/}
                        {/*    Contact*/}
                        {/*</a>*/}
                    </div>
                    <div className="md:hidden">
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
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
