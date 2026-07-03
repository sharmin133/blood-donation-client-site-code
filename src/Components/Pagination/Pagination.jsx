import React from 'react';
import { FaChevronDown } from 'react-icons/fa';


const Pagination = ({ total, visible, onSeeMore, batchSize = 7 }) => {
  // Hide entirely if there's nothing more to progressively load
  if (total <= batchSize) return null;
  if (visible >= total) return null;

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onSeeMore}
        className="inline-flex items-center gap-2 bg-white border-2 border-red-200 text-red-700
                   font-semibold px-6 py-1 rounded-full hover:bg-red-50 hover:border-red-300
                   transition-colors cursor-pointer shadow-sm"
      >
        See More <FaChevronDown className="text-xs" />
      </button>
    </div>
  );
};

export default Pagination;