"use client";

import { useState } from "react";
import { useSearch } from "../context/SearchContext";

export default function Navbar() {
  const { setSearchTerm } = useSearch();
  const [localValue, setLocalValue] = useState("");

  const handleSearch = () => {
    setSearchTerm(localValue);
  };

  return (
    <div className="shadow-md bg-white">
      <div className="flex justify-between items-center py-4 px-4 sm:px-8 md:px-12 lg:px-20 xl:px-28">
        <div>
          <img
            src="/HDlogo.jpg"
            alt="HD Logo"
            className="w-[80px] sm:w-[90px] h-auto"
          />
        </div>

        <div className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8 w-full max-w-[500px]">
          <input
            type="text"
            placeholder="Search experiences"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            className="flex-1 text-[#727272] bg-[#EDEDED] font-inter font-normal rounded-md py-2.5 px-4 shadow-sm text-sm sm:text-[15px] focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="cursor-pointer bg-[#FFD643] text-[#161616] font-inter font-medium rounded-md px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-[15px] shadow-sm"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
