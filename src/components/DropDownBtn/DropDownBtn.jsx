import React, { useState, useEffect, useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { ProviderContext } from "../../provider/Provider";

const DropDownBtn = ({ title, menuData }) => {
    const { condition, setCondition } = useContext(ProviderContext);
    const [isDropdown, setDropdown] = useState(false);
    // const [menuData, setMenuData] = useState([]);
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    useEffect(() => {
        // fetch('your-api-endpoint')
        //   .then((response) => response.json())
        //   .then((data) => setMenuData(data));
    }, []);

    const handleMenuEnter = (menuIndex) => {
        setActiveMenu(menuIndex);
    };

    const handleSubMenuEnter = (menuIndex, subMenuIndex) => {
        setActiveMenu(menuIndex);
        setActiveSubMenu(subMenuIndex);
    };

    const handleMenuLeave = () => {
        setActiveMenu(null);
        setActiveSubMenu(null);
        setDropdown(false);
    };

    const handleSubMenuLeave = () => {
        setActiveSubMenu(null);
    };

    return (
        <div className="relative">
            <div
                onMouseEnter={() => setDropdown(true)}
                className="flex items-center justify-between font-semibold h-11 w-[242px] ps-5 pe-3 bg-[#F5CCDC]  text-[#471D6B] hover:cursor-pointer"
            >
                <div className="flex items-center gap-2">
                    <AiOutlineMenu />
                    <span className="font-semibold text-xs">{title}</span>
                </div>
                <MdKeyboardArrowDown size={22} />
            </div>

            {isDropdown && (
                <div className={`absolute top-0 border w-full z-50 hover:cursor-pointer ${isDropdown ? "block" : "hidden"}`} onMouseLeave={handleMenuLeave}>
                    <div className="mt-11 border bg-white text-black">
                        <ul>
                            {menuData?.map((menuItem, menuIndex) => (
                                <li key={menuIndex} className="relative ps-5 pe-2 py-3" onMouseEnter={() => handleMenuEnter(menuIndex)}>
                                    <span>
                                        {activeMenu === menuIndex ? (
                                            <Link to={`/product-filter?category=${menuItem?.id}`}>
                                                <span onClick={()=> setCondition("category")} className="text-[#F40F6F] w-full flex items-center justify-between font-normal hover:font-medium text-sm">
                                                    {menuItem.name} <MdOutlineKeyboardArrowDown size={22} />
                                                </span>
                                            </Link>
                                        ) : (
                                            <span className="w-full flex items-center justify-between font-normal hover:font-medium text-sm">
                                                {menuItem.name}
                                                <MdOutlineKeyboardArrowRight size={22} />
                                            </span>
                                        )}
                                    </span>
                                    {menuItem.sub_items && menuItem.sub_items.length > 0 && (
                                        <>
                                            {activeMenu === menuIndex && (
                                                <div className="absolute left-[97%] top-0 w-full">
                                                    <ul className="border mx-2 bg-white">
                                                        {menuItem.sub_items?.map((subMenuItem, subMenuIndex) => (
                                                            <li
                                                                key={subMenuIndex}
                                                                className="relative px-4 py-3"
                                                                onMouseEnter={() => handleSubMenuEnter(menuIndex, subMenuIndex)}
                                                                onMouseLeave={handleSubMenuLeave}
                                                            >
                                                                <span>
                                                                    {activeSubMenu === subMenuIndex ? (
                                                                        <Link to={`/product-filter?subcategory=${subMenuItem?.id}`}>
                                                                            <span onClick={()=> setCondition("subItem")} className="text-[#F40F6F] w-full flex items-center justify-between font-normal hover:font-medium text-sm">
                                                                                {subMenuItem.name}
                                                                                <MdOutlineKeyboardArrowDown size={22} />
                                                                            </span>
                                                                        </Link>
                                                                    ) : (
                                                                        <span className="w-full flex items-center justify-between font-normal hover:font-medium text-sm">
                                                                            {subMenuItem.name}
                                                                            <MdOutlineKeyboardArrowRight size={22} />
                                                                        </span>
                                                                    )}
                                                                </span>
                                                                {subMenuItem.sub_sub_items && subMenuItem.sub_sub_items.length > 0 &&(
                                                                    <>
                                                                        {activeSubMenu === subMenuIndex && (
                                                                            <div className="absolute left-[96%] top-0 w-full">
                                                                                <ul className="border mx-2 bg-white">
                                                                                    {subMenuItem.sub_sub_items?.map(
                                                                                        (subSubMenuItem, subSubMenuIndex) => (
                                                                                            <Link
                                                                                                key={subSubMenuIndex}
                                                                                                to={`/product-filter?child_category=${subSubMenuItem?.id}`}
                                                                                            >
                                                                                                <li className="relative px-4 py-3">
                                                                                                    <span onClick={()=> setCondition("subSubItem")} className="hover:text-[#F40F6F] w-full font-normal hover:font-medium text-sm">
                                                                                                        {subSubMenuItem.name}
                                                                                                    </span>
                                                                                                </li>
                                                                                            </Link>
                                                                                        )
                                                                                    )}
                                                                                </ul>
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropDownBtn;
