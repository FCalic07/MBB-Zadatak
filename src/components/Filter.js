import React, { useState, useRef, useEffect } from "react";
import ReactSlider from "react-slider";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function Filter({ filterPrice }) {
  const [isOpen, setIsOpen] = useState(false);
  const [icon, setIcon] = useState(<FaChevronDown />)
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
      setIcon(<FaChevronUp />)
      document.addEventListener("click", handleOutsideClick);
    } else {
      setIcon(<FaChevronDown />)
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
        Price {icon}
      </button>

      {/* Slider box */}
      {isOpen && (
        <div className="absolute mt-2 px-4 py-6 bg-white border border-gray-300 shadow-lg">
          <ReactSlider
            className="relative w-60 h-1 bg-gray-500"
            thumbClassName="w-6 h-6 p-4 rounded-xl bg-white border border-black rounded-xl cursor-pointer flex items-center justify-center text-xs font-bold text-black translate-y-[-50%]"
            defaultValue={[10, 600]}
            min={10}
            max={600}
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            renderThumb={(props, state) => (
              <div {...props} className="w-6 h-6 p-3 rounded-xl bg-white border border-black flex items-center justify-center text-xs font-bold text-black translate-y-[-50%]">
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
