// FilterItems.js
import React, { useState, useEffect } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import CheckBox from "../../../../components/CheckBox/CheckBox";

const FilterItems = ({ title, items }) => {
  const [isShow, setShow] = useState(true);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    // Load from session storage when component mounts
    const storedCategories = sessionStorage.getItem("filteredCategories");
    if (storedCategories) {
      setFilteredCategories(JSON.parse(storedCategories));
    }
  }, []);

  const handleCategorySelection = (category) => {
    const updatedCategories = [...filteredCategories];
    const index = updatedCategories.indexOf(category);

    if (index === -1) {
      updatedCategories.push(category);
    } else {
      updatedCategories.splice(index, 1);
    }

    setFilteredCategories(updatedCategories);
    // Store in session storage
    sessionStorage.setItem(
      "filteredCategories",
      JSON.stringify(updatedCategories)
    );
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
          {items.map((item, i) => (
            <CheckBox
              key={i}
              title={item.name}
              isChecked={filteredCategories.includes(item.name)}
              handleCategorySelection={handleCategorySelection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterItems;
