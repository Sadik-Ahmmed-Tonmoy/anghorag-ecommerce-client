// FilterItemsForColors.js
import React, { useState, useEffect, useContext } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import { ProviderContext } from "../../../../provider/Provider";

const FilterItemsForColors = ({ title, colors, isReset }) => {
  const [isShow, setShow] = useState(true);
  const [filteredColors, setFilteredColors] = useState([]);
  const { isRefetchCategory, setIsRefetchCategory } =
  useContext(ProviderContext);

  useEffect(() => {
    // Load from session storage when component mounts
    const storedColors = sessionStorage.getItem('filteredColors');
    if (storedColors) {
      setFilteredColors(JSON.parse(storedColors));
    }
  }, []);
  useEffect(() => {
    if (isReset) {
      setFilteredColors([]); // Reset filtered categories
    }
  }, [isReset]);


  const handleColorSelection = (color) => {
    setIsRefetchCategory(!isRefetchCategory);
    const updatedColors = [...filteredColors];
    const index = updatedColors.indexOf(color);

    if (index === -1) {
      updatedColors.push(color);
    } else {
      updatedColors.splice(index, 1);
    }

    setFilteredColors(updatedColors);
    // Store in session storage
    sessionStorage.setItem('filteredColors', JSON.stringify(updatedColors));
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
        <div>
          {colors.map((color, i) => (
            <CheckBox
              key={i}
              title={color.name}
              id={color.id}
              isChecked={filteredColors.includes(color.id)}
              handleCategorySelection={handleColorSelection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterItemsForColors;
