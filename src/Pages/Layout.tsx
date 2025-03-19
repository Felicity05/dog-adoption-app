import { ReactNode } from "react";
import Navbar from "../Components/Navbar";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <div className="w-full flex justify-center p-4">
                <div className="container">
                    <Navbar />
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 flex justify-center items-center p-4">
                <div className="container">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;