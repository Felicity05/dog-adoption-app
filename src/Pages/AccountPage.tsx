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
    const user = JSON.parse(localStorage.getItem("user") || "{}"); // Example: Replace with real user data
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
        <div className="max-w-4xl mx-auto p-6">
            {/* User Info */}
            <div className="p-6 rounded-lg">
                <h2 className="text-xl font-bold text-[#890A74]">User Account</h2>
                <p className="my-5 text-2xl text-gray-600">Hello, <strong>{user?.name || "Guest"}</strong>!</p>
                <MagentaButton label={"Continue searching"} onClick={() => navigate("/dinger")} />
            </div>

            

            {/* Favorite Dogs */}
            <div className="mt-6 bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-[#890A74]">Your Favorite Dogs</h2>
                {favoritesDogs.length === 0 ? (
                    <p className="mt-2 text-gray-600">No favorites yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {favoritesDogs.map((dog: Dog) => (
                            <div key={dog.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <img src={dog.img} alt={dog.name} className="w-full h-32 object-cover rounded-md" />
                                <h3 className="mt-2 text-lg font-semibold text-[#890A74]">{dog.name}</h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Match Me Button */}
            <Match />
        </div>
    );
};

export default AccountPage;
