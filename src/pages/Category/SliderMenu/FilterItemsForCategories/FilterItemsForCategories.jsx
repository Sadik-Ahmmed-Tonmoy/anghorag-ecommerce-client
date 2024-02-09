// FilterItemsForCategories.js
import React, { useState, useEffect, useContext } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import CheckBox from "../../../../components/CheckBox/CheckBox";
import { ProviderContext } from "../../../../provider/Provider";
import { useParams, useSearchParams } from "react-router-dom";
import useNavItems from "../../../../hooks/useNavItems";

const FilterItemsForCategories = ({ title, items, isReset }) => {
    const  param  = useParams();
    const [isShow, setShow] = useState(true);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const { isRefetchCategory, setIsRefetchCategory } = useContext(ProviderContext);
    const [condition, setCondition] = useState("");
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get("search");
    const { navItems, isMenuDataLoading } = useNavItems();
    const menuData = isMenuDataLoading === false ? navItems?.menuData : [];
const [categoryId, setCategoryId] = useState(null)


useEffect(() => {
  if (searchQuery) {
      setCondition("search");
  } else if (param && param.subSubItem) {
      setCondition("subSubItem");
  } else if (param && param.subItem) {
      setCondition("subItem");
  } else if (param && param.category) {
      setCondition("category");
  }
}, [searchQuery, param]);

useEffect(() => {
  if (condition === "category") {
    const categoryWithId = menuData.filter((item) => item.slug === param.category);
    const newCategoryId = categoryWithId && categoryWithId[0] && categoryWithId[0].id;
    setCategoryId(newCategoryId);
  }
  else {
    setCategoryId(null);
  }
}, [condition, menuData]);

   


    useEffect(() => {
        // Load from session storage when component mounts
        const storedCategories = sessionStorage.getItem("filteredCategories");
        if (storedCategories) {
            setFilteredCategories(JSON.parse(storedCategories));
        }
    }, [isReset]);

    useEffect(() => {
        if (isReset) {
            setFilteredCategories([]); // Reset filtered categories
        }
    }, [isReset]);

    // const handleCategorySelection = (category) => {
    //   setIsRefetchCategory(!isRefetchCategory);
    //   const updatedCategories = [...filteredCategories];

    //   if (!updatedCategories.includes(category)) {
    //     updatedCategories.push(category);
    //   } else {
    //     const index = updatedCategories.indexOf(category);
    //     updatedCategories.splice(index, 1);
    //   }

    //   setFilteredCategories(updatedCategories);
    //   // Store in session storage
    //   sessionStorage.setItem(
    //     "filteredCategories",
    //     JSON.stringify(updatedCategories)
    //   );
    // };
   
   
    const handleCategorySelection = (category) => {
        setIsRefetchCategory(!isRefetchCategory);
        const updatedCategories = [...filteredCategories];

        if (!updatedCategories.includes(category)) {
            updatedCategories.push(category);
        } else {
            const filtered = updatedCategories.filter((cat) => cat !== category);
            updatedCategories.splice(0, updatedCategories.length, ...filtered);
        }

        setFilteredCategories(updatedCategories);

        // Update param.category or fetch it from wherever it comes
        const updatedParam = {...categoryId, category }; // Assuming param is a state variable
        // Store in session storage
        sessionStorage.setItem("filteredCategories", JSON.stringify(updatedCategories));
        sessionStorage.setItem("param", JSON.stringify(updatedParam));
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
                    {items.map((item, i) => (
                        <CheckBox
                            key={i}
                            title={item.name}
                            id={item.id}
                            isChecked={filteredCategories.includes(item.id)}
                            handleCategorySelection={handleCategorySelection}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FilterItemsForCategories;
