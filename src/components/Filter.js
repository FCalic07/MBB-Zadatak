import React, { useState, useRef, useEffect } from "react";
import ReactSlider from "react-slider";
import { FaChevronDown } from "react-icons/fa";

function Filter({ filterPrice, minMaxPrice }) {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);
  const [range, setRange] = useState([minMaxPrice[0], minMaxPrice[1]]);

  function handleSliderChange(value) {
    setRange(value);
  }

  function handleAfterChange(value) {
    filterPrice(value); // Apply filter only after user stops dragging
  }

  function handleOutsideClick(event) {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block pl-32 pt-4" ref={filterRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-4 py-2 border border-black text-black transition duration-200 hover:bg-black hover:text-white"
      >
        Price <FaChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute mt-2 px-4 py-6 bg-white border border-gray-300 shadow-lg w-64">
          <ReactSlider
            className="relative w-full h-1 bg-gray-500"
            thumbClassName="w-5 h-5 rounded-full bg-white border border-black rounded-xl cursor-pointer translate-y-[-40%]"
            trackClassName="bg-gray-400"
            value={range}
            min={minMaxPrice[0]}
            max={minMaxPrice[1]}
            onChange={handleSliderChange}
            onAfterChange={handleAfterChange}
            pearling={false}
            minDistance={1}
          />

          <div className="flex justify-between mt-3">
            <input
              type="number"
              className="w-20 border border-gray-400 p-1 text-center rounded-md"
              value={range[0] / 100}
              min={minMaxPrice[0]}
              max={range[1]}
              onChange={(e) => {
                const newMin = Math.max(minMaxPrice[0], Math.min(Number(e.target.value), range[1]));
                setRange([newMin, range[1]]);
              }}
              onBlur={() => filterPrice(range)}
            />
            <span className="text-gray-700">-</span>
            <input
              type="number"
              className="w-20 border border-gray-400 p-1 text-center rounded-md"
              value={range[1] / 100}
              min={range[0]}
              max={minMaxPrice[1]}
              onChange={(e) => {
                const newMax = Math.min(minMaxPrice[1], Math.max(Number(e.target.value), range[0]));
                setRange([range[0], newMax]);
              }}
              onBlur={() => filterPrice(range)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Filter;
