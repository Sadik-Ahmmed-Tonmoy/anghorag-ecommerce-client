import React, { useState, useEffect, useContext } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ProviderContext } from "../../../../provider/Provider";

const FilterBySize = ({ title, items, isReset }) => {
  const [isShow, setShow] = useState(true);
  const [filteredSizes, setFilteredSizes] = useState([]);

  const { isRefetchCategory, setIsRefetchCategory } =
    useContext(ProviderContext);

  useEffect(() => {
    const storedSizes = sessionStorage.getItem("filteredSizes");
    if (storedSizes) {
      setFilteredSizes(JSON.parse(storedSizes));
    }
  }, []);

  useEffect(() => {
    if (isReset) {
      setFilteredSizes([]); // Reset filtered categories
    }
  }, [isReset]);

  const handleSizeSelection = (size) => {
    setIsRefetchCategory(!isRefetchCategory);
    const updatedSizes = [...filteredSizes];
    const index = updatedSizes.indexOf(size);

    if (index === -1) {
      updatedSizes.push(size);
    } else {
      updatedSizes.splice(index, 1);
    }

    setFilteredSizes(updatedSizes);
    // Store in session storage
    sessionStorage.setItem("filteredSizes", JSON.stringify(updatedSizes));
  };

  return (
    <div className="mt-4 md:mt-11">
      <div
        onClick={() => setShow(!isShow)}
        className="flex justify-between items-center text-black text-sm md:text-lg font-medium hover:cursor-pointer"
      >
        <p className="uppercase">{title}</p>{" "}
        <span>{isShow ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
      </div>
      <div className="border border-[#F40F6F] my-1 md:my-3"></div>
      {isShow && (
        <div className="flex flex-wrap gap-2 w-10/12">
          {items.map((item, i) => (
            <p
              key={i}
              onClick={() => handleSizeSelection(item.id)}
              className={`text-sm font-medium border px-3 py-2 w-min rounded-md text-black hover:cursor-pointer ${
                filteredSizes.includes(item.id)
                  ? "border-[#F40F6F]"
                  : "border-black"
              }`}
            >
              <span
                className={`opacity-90 whitespace-nowrap ${
                  filteredSizes.includes(item.id)
                    ? "border-[#F40F6F] text-[#F40F6F]"
                    : ""
                }`}
              >
               
                {item.name}
              </span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBySize;
