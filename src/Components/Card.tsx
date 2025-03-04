import React from 'react';
import {IconHeart, IconHeartFilled, IconPaw, IconPawFilled} from '@tabler/icons-react';

interface CardProps {
   picture: string;
   name: string;
   age: number;
   breed: string;
   location: string;
}

const Card: React.FC<CardProps> = ({picture, name, age, breed, location}) => {
   return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg w-[250px] relative
         bg-white ">
         <div className="flex items-center justify-end absolute right-1 top-1">
            <a className="text-gray-400" href="#">
               <IconPaw
                  size={28} // set custom `width` and `height`
                  color="#820A0B" // set `stroke` color
                  stroke={2}  // set `stroke-width`
                  strokeLinejoin="miter" // override other SVG props
               />
               <IconPawFilled
                  size={28} // set custom `width` and `height`
                  color="#820A0B" // set `stroke` color
               />
               <IconHeart
                  size={28} // set custom `width` and `height`
                  color="red" // set `stroke` color
                  stroke={2}  // set `stroke-width`
                  strokeLinejoin="miter" // override other SVG props
               />
               <IconHeartFilled
                  size={28} // set custom `width` and `height`
                  color="red" // set `stroke` color
               />
            </a>
         </div>
         <img className="w-full h-48 object-cover" src={picture} alt={`${name}'s picture`}/>
         <div className="px-6 py-4">
            <h2 className="font-bold text-xl mb-2">{name}</h2>
            <p className="text-gray-700 text-base">
               <strong>Age:</strong> {age} years
            </p>
            <p className="text-gray-700 text-base">
               <strong>Breed:</strong> {breed}
            </p>
            <p className="text-gray-700 text-base">
               <strong>Location:</strong> {location}
            </p>
         </div>
      </div>
   );
};

export default Card;
