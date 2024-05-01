// CheckBox.js
import React from "react";
import { BsCheckLg } from "react-icons/bs";

const CheckBox = ({ title, isChecked, id, handleCategorySelection }) => {
    const handleCheckboxChange = () => {
        handleCategorySelection(id, title);
        
    };

    return (
        <label className="flex items-center gap-2 my-4 text-sm font-normal hover:cursor-pointer text-black w-fit h-min">
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className={`rounded-full h-4 w-4 ${isChecked ? "bg-[#F40F6F] text-white" : "bg-white border border-[#00000040]"} appearance-none`}
                />
                <BsCheckLg size={15} className="absolute top-0 left-0 text-white" />
            </div>
            <span className="text-[#00000099] text-sm font-medium">{title}</span>
        </label>
    );
};

export default CheckBox;
