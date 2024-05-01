// FilterItemsForCategories.js
import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import { useLocation, useNavigate } from "react-router-dom";

const FilterItemsForCategories = ({ title, items, isReset }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isShow, setShow] = useState(true);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const selectedCheckboxValues = searchParams.getAll(title?.toLowerCase());
    setSelectedCheckboxes(selectedCheckboxValues.map((value) => parseInt(value, 10)));
  }, [location.search, title]);

  const handleCategorySelection = (key) => {

    const isSelected = selectedCheckboxes.includes(key);
    let updatedCheckboxes;

    if (!isSelected) {
      updatedCheckboxes = [...selectedCheckboxes, key];
    } else {
      updatedCheckboxes = selectedCheckboxes.filter((item) => item !== key);
    }

    // Get the existing search parameters
    const searchParams = new URLSearchParams(location.search);

    // Remove existing parameters for the given title
    searchParams.delete(title?.toLowerCase());

    // Add updated parameters
    updatedCheckboxes.forEach((checkbox) => {
      searchParams.append(title?.toLowerCase(), checkbox);
    });

    // Update the URL
    navigate(`${location?.pathname}?${searchParams.toString()}`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", 
    });
 
  };

  return (
    <div className="mt-4 md:mt-11">
      <div
        onClick={() => setShow(!isShow)}
        className="flex justify-between items-center text-black text-sm md:text-lg font-medium hover:cursor-pointer"
      >
        <p className="uppercase">{title}</p> <span>{isShow ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
      </div>
      <div className="border border-[#F40F6F] my-1 md:my-3"></div>
      {isShow && (
        <div>
          {items?.map((item, i) => (
            <CheckBox
              key={i}
              title={item.name}
              id={item.id}
                isChecked={selectedCheckboxes.includes(item.id)}
              handleCategorySelection={handleCategorySelection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterItemsForCategories;
