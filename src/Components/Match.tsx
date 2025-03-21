import React, { useState } from "react";
import { favoritesStore } from "../store/favoritesStore";
import { getDogs, matchMe } from "../api/api";
import MagentaButton from "./MagentaButton";
import { Dog } from "../api/types";
import { XIcon } from "lucide-react";


const Match: React.FC = () => {
    const { favorites } = favoritesStore();
    const [match, setMatch] = useState<Dog | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [showMatch, setShowMatch] = useState<boolean>(false);

    const generateMatch = async () => {
        if (favorites.length === 0) return;

        setLoading(true);
        try {
            console.log("favorites= ", favorites)
            const matchedId = await matchMe(favorites);
            // setMatch(matchedId);
            console.log("matchedId= ", matchedId)

            const matchedDog = await getDogs([matchedId.match])
            console.log("matchedDog", matchedDog)
            setMatch(matchedDog[0])
            setShowMatch(true);
        } catch (error) {
            console.error("Error generating match:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full md:max-w-[350px] p-4 mt-6 text-center flex flex-col items-center mx-auto">
            <MagentaButton label='Match Me!' buttonType='primary'
                disabled={favorites.length === 0}
                key='1'
                onClick={generateMatch}
            />

            {loading && <p className="mt-4">Finding your match...</p>}

            {match && showMatch && (
                <div className="mt-5 bg-gray-100 p-4 rounded-lg shadow-lg relative w-full">
                    <button
                        onClick={() => setShowMatch(false)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-[#890A74] text-[#FFA900]
                                    hover:bg-[#FFA900] hover:text-[#890A74] 
                                     shadow-md"
                    >
                        <XIcon size={20} className="hover:animate-[spin_1s_ease-in-out]" />
                    </button>
                    <h3 className="text-xl font-semibold text-[#890A74] pt-4 sm:p-0">{match.name}</h3>

                    <div className="w-full overflow-hidden">
                        <img src={match.img} alt={match.name} className="w-full h-32 object-cover rounded-md mt-2" />
                    </div>
                </div>
            )}

        </div>
    );
};

export default Match;
