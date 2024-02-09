import { Slider } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbCurrencyTaka } from "react-icons/tb";
import FilterItems from "./FilterItems/FilterItems";
import FilterBySize from "./FilterBySize/FilterBySize";
import FilterByPrice from "./FilterByPrice/FilterByPrice";
import useNavItems from "../../../hooks/useNavItems";
import axios from "axios";
import FilterItemsForCategories from "./FilterItemsForCategories/FilterItemsForCategories";
import FilterItemsForBrands from "./FilterItemsForBrands/FilterItemsForBrands";
import FilterItemsForColors from "./FilterItemsForColors/FilterItemsForColors";
import { ProviderContext } from "../../../provider/Provider";
import { useParams } from "react-router-dom";

const SliderMenu = () => {
    const { isRefetchCategory, setIsRefetchCategory, isReset, setIsReset} = useContext(ProviderContext);
    const { navItems, isMenuDataLoading, refetch } = useNavItems();
    const menuData = isMenuDataLoading === false ? navItems?.menuData : [];
    const { category } = useParams();
    useEffect(() => {
        refetch();
    }, [category]);
    const [Brands, setBrands] = useState([]);

    useEffect(() => {
        axios
            .get("product/brand")
            .then((res) => {
                if (res.data.success === true) {
                    setBrands(res.data.data.brand);
                }
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const [colors, setColors] = useState([]);
    useEffect(() => {
        axios
            .get("product/color")
            .then((res) => {
                if (res.data.success === true) {
                    setColors(res.data.data.colors);
                }
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const [sizes, setSizes] = useState([]);

    useEffect(() => {
        axios
            .get("product/size")
            .then((res) => {
                if (res.data.success === true) {
                    setSizes(res.data.data.sizes);
                }
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

 
    // const handleReset = () => {
    //     setIsRefetchCategory(!isRefetchCategory);
    //     setIsReset(!isReset);
    //     sessionStorage.removeItem("filteredCategories");
    //     sessionStorage.removeItem("filteredBrands");
    //     sessionStorage.removeItem("filteredColors");
    //     sessionStorage.removeItem("filteredSizes");
    //     sessionStorage.removeItem("priceRange");
    // };
    useEffect(() => {
      if (isReset) {
          sessionStorage.removeItem("filteredCategories");
          sessionStorage.removeItem("filteredBrands");
          sessionStorage.removeItem("filteredColors");
          sessionStorage.removeItem("filteredSizes");
          sessionStorage.removeItem("priceRange");
          setIsReset(false); // Reset is done, set isReset back to false
      }
  }, [isReset]);

    return (
        <div className="w-10/12 mx-auto bg-white">
            <FilterItemsForCategories title={"category"} items={menuData} isReset={isReset} />
            <FilterItemsForBrands title={"brand"} brands={Brands} isReset={isReset} />
            <FilterItemsForColors title={"colors"} colors={colors} isReset={isReset} />
            <FilterBySize title={"size"} items={sizes} isReset={isReset} />
            <FilterByPrice isReset={isReset} />
            <div className=" mt-11">
                <button onClick={() => setIsReset(true)} className="text-white bg-[#F40F6F] w-full h-[42px]  mb-[100px] rounded hover:cursor-pointer">
                    All Reset
                </button>
            </div>
        </div>
    );
};

export default SliderMenu;
