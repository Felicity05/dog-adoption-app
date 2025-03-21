import React from 'react';
import { favoritesStore } from '../store/favoritesStore';
import { HeartIcon } from "lucide-react";
import { Dog } from '../api/types';

interface CardProps {
   dog: Dog;
}

const Card: React.FC<CardProps> = ({ dog }) => {
   const { toggleFavorite, isFavorited } = favoritesStore();
   const favorited = isFavorited(dog.id);

   return (
      <div className="w-full max-w-[300px] rounded overflow-hidden shadow-lg bg-white relative">
         
         {/* Heart Icon in Top Right */}
         <button
            onClick={() => toggleFavorite(dog.id)}
            className="absolute top-2 right-2 p-1 rounded-full bg-white/70 hover:bg-white shadow-md z-10">
            <HeartIcon size={24}
               className={favorited ? "text-red-500 fill-red-500" : "text-gray-500"}
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
               <strong>Location:</strong> {dog.zip_code}
            </p>
         </div>
      </div>
   );
};

export default Card;
