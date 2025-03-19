import noMatch from '../assets/noMatch.png';

const NoSearchMatch = () => {
   return (
      <div className="flex flex-col gap-2 justify-center items-center text-center h-screen">
         <img className="w-full h-[500px] object-contain" src={noMatch} alt={"no match"} />
         <h1 className="font-bold font-[Laurens]">Sorry, No dogs match your search criteria</h1>
         <p className="text-2xl">Try again with new options!</p>
      </div>
   )
}

export default NoSearchMatch;
