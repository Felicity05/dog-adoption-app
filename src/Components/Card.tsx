import React from 'react';
import { favoritesStore } from '../store/favoritesStore';
import { HeartIcon } from "lucide-react";
import { Dog, LocationObject } from '../api/types';

interface CardProps {
   dog: Dog;
   location: LocationObject | undefined;
}

const Card: React.FC<CardProps> = ({ dog, location }) => {
   const { toggleFavorite, isFavorited } = favoritesStore();
   const favorited = isFavorited(dog.id);

   // Add to your component
   const [isAnimating, setIsAnimating] = React.useState(false);

   const handleClick = () => {
      toggleFavorite(dog.id);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
   };

   return (
      <div className="w-full max-w-[300px] rounded-xl overflow-hidden bg-white relative
                     shadow-[0_0_20px_rgba(0,0,0,0.15)]">
         
         {/* Heart Icon in Top Right -- change color to purple */}
         <button
            onClick={handleClick}
            className="absolute top-2 right-2 p-1 rounded-full bg-white/70 hover:bg-white shadow-md z-10" 
            >
            <HeartIcon size={24} 
               className={favorited ? "text-[#890A74] fill-[#890A74]" : "text-[#300d38]" }
            />
         </button>

        
         {/* Dog Image */}
         <div className="flex w-full h-48 overflow-hidden">
            <img
               className="w-full h-full object-cover"
               src={dog.img}
               alt={`${dog.name}'s picture`}
            />
         </div>


         {/* Dog Details */}
         <div className="px-6 py-4">
            <h2 className="font-bold text-xl mb-2">{dog.name}</h2>
            <p className="text-gray-700 text-base">
               <strong>Age:</strong> {dog.age} years
            </p>
            <p className="text-gray-700 text-base">
               <strong>Breed:</strong> {dog.breed}
            </p>
            <p className="text-gray-700 text-base">
               <strong>Location:</strong> {location ? `${location.city}, ${location.state} ${location.zip_code}` 
                           : `${dog.zip_code}`}
            </p>
         </div>
      </div>
   );
};

export default Card;