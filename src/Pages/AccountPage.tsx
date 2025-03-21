import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { favoritesStore } from "../store/favoritesStore";
import MagentaButton from "../Components/MagentaButton";
import { Dog } from "../api/types";
import { getDogs } from "../api/api";
import Match from "../Components/Match";

const AccountPage: React.FC = () => {
    const navigate = useNavigate();
    const { favorites } = favoritesStore(); // Fetch favorited dogs
    const user = localStorage.getItem("user"); // Example: Replace with real user data
    const [favoritesDogs, setFavoritesDogs] = useState<Dog[]>([]);

    useEffect(() => {
        const getFavorites = async () => {
            const dogsData = await getDogs(favorites);
            setFavoritesDogs(dogsData);
            console.log(dogsData)
        }

        getFavorites();
    }, [])

    return (
        <div className="w-full max-w-6xl mx-auto">
            {/* User Info */}
            <div className="w-full p-6 rounded-lg">
                <h2 className="text-xl font-bold text-[#890A74]">User Account</h2>
                <p className="my-5 text-2xl text-gray-600">Hello, <strong>{user || "Guest"}</strong>!</p>
                <MagentaButton label={"Continue searching"} onClick={() => navigate("/dinger")} />
            </div>

           

            {/* Favorite Dogs */}
            <div className="w-full mt-6 p-6 rounded-lg
                            isolate aspect-video bg-white/20 shadow-lg ring-1 ring-gray-700/20 backdrop-blur-lg">
                
                <h2 className="text-2xl font-bold text-[#890A74]">Your Favorite Dogs</h2>
                {/* Match Me Button */}
                <Match />

                {favoritesDogs.length === 0 ? (
                    <p className="mt-5 text-gray-600 md:tex-2xl">No favorites yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {favoritesDogs.map((dog: Dog) => (
                            <div key={dog.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <div className="w-full h-48 overflow-hidden">
                                    <img src={dog.img} alt={dog.name} className="w-full h-full object-cover rounded-md" />
                                </div>
                                <h3 className="mt-2 text-lg font-semibold text-[#890A74]">{dog.name}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default AccountPage;
