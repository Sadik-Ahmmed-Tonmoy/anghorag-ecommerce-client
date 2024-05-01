import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useNavItems from "../../../hooks/useNavItems";
import FilterByPrice from "./FilterByPrice/FilterByPrice";
import FilterBySize from "./FilterBySize/FilterBySize";
import FilterItemsForCategories from "./FilterItemsForCategories/FilterItemsForCategories";

const SliderMenu = () => {
    const navigate = useNavigate();
    const { navItems, isMenuDataLoading, refetch } = useNavItems();
    const menuData = isMenuDataLoading === false ? navItems?.menuData : [];
    const [isReset, setIsReset] = useState(false);
  
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

 
const handleReset = () => {
    navigate(`${location?.pathname}`);
    setIsReset(!isReset);
}
 

    return (
        <div className="w-10/12 mx-auto bg-white">
            <FilterItemsForCategories title={"category"} items={menuData}  />
            <FilterItemsForCategories title={"brand"} items={Brands}  />
            <FilterItemsForCategories title={"colors"} items={colors}  />
            <FilterBySize title={"size"} items={sizes}  />
            <FilterByPrice isReset={isReset} />
            <div className=" mt-11">
                <button onClick={handleReset} className="text-white bg-[#F40F6F] w-full h-[42px]  mb-[100px] rounded hover:cursor-pointer">
                    All Reset
                </button>
            </div>
        </div>
    );
};

export default SliderMenu;
