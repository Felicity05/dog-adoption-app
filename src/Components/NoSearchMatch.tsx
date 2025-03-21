import noMatch from '../assets/noMatch.png';

const NoSearchMatch = () => {
   return (
      <div className="flex flex-col gap-2 justify-center items-center text-center p-2">
         <div className='w-full p-4 m-4 max-w-2xl'>
            <img className="w-full h-full object-contain" src={noMatch} alt={"no match"} />
         </div>
         <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-[Laurens]">Sorry, No dogs match your search criteria</h1>
         <p className="text-base md:text-xl lg:text-2xl ">Try again with new options!</p>
      </div>
   )
}

export default NoSearchMatch;
