import React from "react";

interface PaginationProps {
   currentPage: number;
   totalItems: number;
   onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalItems, onPageChange}) => {
   const totalPages = Math.ceil(totalItems / 25) - 1; // Calculate total pages from total items

   const handlePrevious = () => {
      if (currentPage > 0) {
         onPageChange(currentPage - 1);
      }
   };

   const handleNext = () => {
      if (currentPage < totalPages) {
         onPageChange(currentPage + 1);
      }
   };

   const handlePageClick = (page: number) => {
      onPageChange(page);
   };

   const renderPageNumbers = () => {
      const pages = [];

      let startPage = 0;
      let endPage = 5;

      // Adjust which pages to display dynamically
      if (currentPage >= 3 && totalPages > 5) {
         startPage = currentPage - 2;
         endPage = currentPage + 2;
      }

      // Ensure the endPage doesn't exceed the total number of pages
      if (endPage > totalPages) {
         endPage = totalPages;
         startPage = Math.max(0, totalPages - 5);
      }

      console.log(currentPage," - ", totalPages)
      if(currentPage >= 3 && totalPages > 5) {
         pages.push(
            <button className={`px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-[rgba(137,10,116,0.45)]
                     hover:text-[rgba(255,169,25)] hover:cursor-pointer
                     ${currentPage === 0 && 'opacity-50 cursor-not-allowed'
            }`}
                    disabled={currentPage === 0}
                    onClick={() => handlePageClick(0)} >
               1
            </button>
         )
         pages.push(<button key="ellipsis1" className="px-3"> ... </button>); // Ellipsis
      }

      // Show the first 5 pages
      for (let i = startPage; i <= endPage; i++) {
         pages.push(
            <button
               key={i}
               className={`px-3 py-1 rounded ${
                  currentPage === i ? 'bg-[#890A74] text-[#FFA900] font-medium' : 'bg-gray-200 text-gray-700'
               } hover:bg-[rgba(137,10,116,0.45)] hover:text-[rgba(255,169,25)] hover:cursor-pointer`}
               onClick={() => handlePageClick(i)}
            >
               {i + 1}
            </button>
         );
      }

      // Add ellipsis if necessary and then the last page
      if (totalPages > 5 && endPage < totalPages) {
         pages.push(<button key="ellipsis" className="px-3"> ... </button>); // Ellipsis
         pages.push(
            <button
               key={totalPages}
               className={`px-3 py-1 rounded ${
                  currentPage === totalPages ? 'bg-[#890A74] text[#FFA900] font-medium' : 'bg-gray-200 text-gray-700'} 
                     hover:bg-[rgba(137,10,116,0.45)] hover:text-[rgba(255,169,25)] hover:cursor-pointer`}
               onClick={() => handlePageClick(totalPages)}
            >
               {totalPages + 1}
            </button>
         );
      }

      return pages;
   };

   return (
      <div className="flex items-center justify-center space-x-2 my-4">
         <button
            className={`px-3 py-1 rounded bg-gray-200 text-gray-600 enabled:hover:bg-[rgba(137,10,116,0.45)] 
                     enabled:hover:cursor-pointer enabled:hover:text-[rgba(255,169,25)]
                     ${currentPage === 0 && 'opacity-50 cursor-not-allowed hover:none'
            }`}
            onClick={handlePrevious}
            disabled={currentPage === 0}
         >
            Prev
         </button>
         {renderPageNumbers()}
         <button
            className={`px-3 py-1 rounded bg-gray-200 text-gray-700 enabled:hover:bg-[rgba(137,10,116,0.45)] 
                     enable:hover:cursor-pointer enabled:hover:text-[rgba(255,169,25)]
                     ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'
            }`}
            onClick={handleNext}
            disabled={currentPage === totalPages}
         >
            Next
         </button>
      </div>
   );
};

export default Pagination;
