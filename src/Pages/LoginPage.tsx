import { useState } from "react";
import {authenticate} from "../api/api.tsx";
import {User} from "../api/types.tsx";
import Navbar from "../Components/Navbar.tsx";
import {useAuthRedirect} from "../hooks/useAuthRedirect.tsx";
import adoptMeImg from '../assets/adopt-me.png';


const initialUser: User ={
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
        <>
            <Navbar />
            <div className='columns-2 m-auto mt-15'>
                <div className='flex flex-col gap-3 justify-center items-start'>
                    <div className='flex flex-col gap-5'>
                        <h1 className='display-font'>Find a friend who’ll share life’s adventures with you!</h1>
                        <p className='text-base'>Dinger makes finding your perfect dog simple and fun.
                            Just sign in, browse through adoptable pups, and save your favorites.
                            Once you have your favorites we’ll help you find your perfect match and
                            connect you with the shelter or foster home for the next steps.</p>
                    </div>
                    <div className="flex flex-col gap-5 pt-10">
                        <input type="name" name="name" placeholder='Name' autoComplete={"name"}
                               onChange={(e) => setUser({...user, name: e.target.value})}
                            className='border-2 rounded-md border-[#FBA919] w-70 h-10
                            focus:border-[#890A74] focus:outline-none focus:ring-0' />
                        <input type="email" name="email" placeholder='Email' autoComplete={"email"}
                               onChange={(e) => setUser({...user, email: e.target.value})}
                            className='border-2 rounded-md border-[#FBA919] w-70 h-10
                            focus:border-[#890A74] focus:outline-none focus:ring-0' />
                        <button onClick={handleLogIn}
                            className="text-[#090325] rounded-md px-15 py-2 w-60
                            my-10 bg-[#FBA919] hover:bg-[#890A74]">
                            Get Started!
                        </button>
                    </div>
                </div>
                <div className='flex align-center justify-center'>
                    <div className='m-auto'>
                        <img src={adoptMeImg} alt='adopt me'
                             className='w-full'
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
