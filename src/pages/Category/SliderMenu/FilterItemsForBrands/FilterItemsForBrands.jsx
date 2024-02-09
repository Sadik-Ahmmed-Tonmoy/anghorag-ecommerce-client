// FilterItemsForBrands.js
import React, { useState, useEffect, useContext } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import { ProviderContext } from "../../../../provider/Provider";

const FilterItemsForBrands = ({ title, brands, isReset}) => {
  const [isShow, setShow] = useState(true);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const { isRefetchCategory, setIsRefetchCategory } =
  useContext(ProviderContext);

  useEffect(() => {
    // Load from session storage when component mounts
    const storedBrands = sessionStorage.getItem('filteredBrands');
    if (storedBrands) {
      setFilteredBrands(JSON.parse(storedBrands));
    }
  }, []);

  useEffect(() => {
    if (isReset) {
      setFilteredBrands([]); // Reset filtered categories
    }
  }, [isReset]);


  const handleBrandSelection = (brand) => {
    setIsRefetchCategory(!isRefetchCategory);
    const updatedBrands = [...filteredBrands];
    const index = updatedBrands.indexOf(brand);

    if (index === -1) {
      updatedBrands.push(brand);
    } else {
      updatedBrands.splice(index, 1);
    }

    setFilteredBrands(updatedBrands);
    // Store in session storage
    sessionStorage.setItem('filteredBrands', JSON.stringify(updatedBrands));
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
          {brands.map((brand, i) => (
            <CheckBox
              key={i}
              title={brand.name}
              id={brand.id}
              isChecked={filteredBrands.includes(brand.id)}
              handleCategorySelection={handleBrandSelection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterItemsForBrands;
