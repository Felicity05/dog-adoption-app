import { useState } from "react";
import { authenticate } from "../api/api.tsx";
import { User } from "../api/types.tsx";
import { useAuthRedirect } from "../hooks/useAuthRedirect.tsx";
import adoptMeImg from '../assets/adopt-me.png';
import MagentaButton from "../Components/MagentaButton.tsx";


const initialUser: User = {
    name: "",
    email: ""
}

export const LoginPage = () => {
    const [user, setUser] = useState(initialUser);
    const { redirectAfterLogin } = useAuthRedirect();

    const handleLogIn = async () => {
        const isSuccessful = await authenticate(user);
        redirectAfterLogin(!!isSuccessful);
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
            {/* Left Column: Text and Login Form */}
            <div className='flex flex-col gap-5 justify-center items-start'>
                <h1 className='text-[#FBA919] font-[Laurens] [text-shadow:_0_1px_0_rgb(54_65_83_/_40%)]
                                 text-4xl md:text-5xl lg:text-7xl'>
                    Find a friend who’ll share life’s adventures with you!
                </h1>
                <p className='text-gray-700 font-medium text-base md:text-lg'>
                    Dinger makes finding your perfect dog simple and fun.
                    Just sign in, browse through adoptable pups, and save your favorites.
                    Once you have your favorites we’ll help you find your perfect match and
                    connect you with the shelter or foster home for the next steps.
                </p>
                <div className="flex flex-col gap-5 pt-10 w-full">
                    <input
                        type="name"
                        name="name"
                        placeholder='Name'
                        autoComplete={"name"}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className='border-2 rounded-md border-[#FBA919] w-full md:w-70 h-10
                        focus:border-[#890A74] focus:outline-none focus:ring-0 px-3'
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder='Email'
                        autoComplete={"email"}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className='border-2 rounded-md border-[#FBA919] w-full md:w-70 h-10
                        focus:border-[#890A74] focus:outline-none focus:ring-0 px-3'
                    />
                    <MagentaButton label={"Get Started!"} onClick={handleLogIn} />
                </div>
            </div>

            {/* Right Column: Image */}
            <div className='flex justify-center items-center'>
                <img
                    src={adoptMeImg}
                    alt='adopt me'
                    className='w-full max-w-md md:max-w-lg lg:max-w-xl'
                />
            </div>
        </div>
    );
};
