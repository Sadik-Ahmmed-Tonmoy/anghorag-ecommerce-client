/* eslint-disable react/prop-types */
import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import "./Breadcrumbs.css";

const Breadcrumbs = ({ first, second, third, className, isShadow}) => {
  
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

    return (
        <div className={twMerge("text-sm w-full overflow-x-auto  font-inter font-normal leading-normal tracking-tighter", className)}>
            <ul className={`${isShadow && "shadow"} flex items-center gap-x-2 whitespace-nowrap min-h-min`}>
                {first && (
                    <li className="text-xs font-normal tracking-[-0.12px]">
                        <span className="text-black">{capitalizeFirstLetter(first)}</span>
                    </li>
                )}
                {second && (
                    <>
                        {" "}
                        <li className=" text-xs font-normal tracking-[-0.12px]">
                            <AiOutlineRight size={8} />
                        </li>
                        <li className="opacity-80 text-[#00000099] text-xs font-normal tracking-[-0.12px]">{capitalizeFirstLetter(second)}</li>
                    </>
                )}
                {third && (
                    <>
                        {" "}
                        <li className=" text-xs font-normal tracking-[-0.12px]">
                            <AiOutlineRight size={8} />
                        </li>
                        <li className="opacity-80 text-[#00000099] text-xs font-normal tracking-[-0.12px]">{capitalizeFirstLetter(third)}</li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Breadcrumbs;
