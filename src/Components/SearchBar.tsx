import React, {useState, ChangeEvent} from 'react';

interface SearchBarProps {
    placeholder1?: string;
    placeholder2?: string;
    onSearch: (query1: string, query2: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
                                                 placeholder1 = "Search Terrier...",
                                                 placeholder2 = "Jersey City...",
                                                 onSearch,
                                             }) => {
    const [input1, setInput1] = useState("");
    const [location, setLocation] = useState("");

    const handleInput1Change = (e: ChangeEvent<HTMLInputElement>) => {
        setInput1(e.target.value);
    };

    const handleInput2Change = (e: ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(input1, location);
    };

    return (
        <div className="flex gap-2 bg-[#890A74] rounded-lg text-[#FFA900]
                        my-10 w-200 mx-auto">
        <form onSubmit={handleSubmit} className="flex space-x-4 py-5 w-full justify-evenly">
            <input
                type="text"
                value={input1}
                onChange={handleInput1Change}
                placeholder={placeholder1}
                className="p-2 rounded w-80 focus:outline-none"
            />
            <div className="border-2 rounded h-8"></div>
            <input
                type="text"
                value={location}
                onChange={handleInput2Change}
                placeholder={placeholder2}
                className="p-2 rounded w-50 focus:outline-none"
            />
            <a href="#" className="flex items-center justify-center">
                <i className="fas fa-search text-xl hover:text-[rgba(255,169,0,0.5)]" />
            </a>
        </form>
        </div>
    );
};

export default SearchBar;
