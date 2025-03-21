import PawPrint from "./PawPrints";


const Loading = () => {
    return (
        <div className="flex flex-col gap-2 justify-center items-center text-center h-screen w-full relative">
            <PawPrint />
            <h1 className="text-3xl lg:text-5xl text-center font-bold font-[Laurens]">Searching for dogs...</h1>
        </div>
    )
}

export default Loading;