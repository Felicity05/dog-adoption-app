import { ReactNode } from "react";
import Navbar from "../Components/Navbar";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="w-full min-h-screen flex flex-col">
            {/* Navbar */}
            <div className="w-full flex justify-center my-10 sticky top-0 z-50">
                <div className="w-full">
                    <Navbar />
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex justify-center items-center px-4">
                <div className="container">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;