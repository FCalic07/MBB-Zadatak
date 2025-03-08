import React, { useState, useRef, useEffect } from "react";
import ReactSlider from "react-slider";

function Filter({ filterPrice }) {
  const [isOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);

  function handleSliderChange(value) {
    filterPrice(value);
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
    <div className="relative inline-block" ref={filterRef}>
      {/* Button to toggle filter */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 focus:outline-none"
      >
        Price
      </button>

      {/* Slider box */}
      {isOpen && (
        <div className="absolute mt-2 p-4 bg-white border border-gray-300 shadow-lg rounded-lg">
          <ReactSlider
            className="relative w-60 h-1 bg-gray-300 rounded-full"
            thumbClassName="w-5 h-5 bg-white border border-gray-500 shadow-md rounded-full cursor-pointer focus:outline-none"
            trackClassName="h-1 bg-gray-500 rounded-full"
            defaultValue={[10, 200]}
            min={10}
            max={200}
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            renderThumb={(props, state) => (
              <div
                {...props}
                className="w-5 h-5 bg-white border border-gray-500 shadow-md rounded-full flex items-center justify-center text-xs font-bold text-black"
              >
                {state.valueNow}
              </div>
            )}
            pearling={false}
            minDistance={0}
            onAfterChange={(value) => handleSliderChange(value)}
          />
        </div>
      )}
    </div>
  );
}

export default Filter;
