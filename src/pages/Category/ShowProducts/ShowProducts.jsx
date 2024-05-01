/* eslint-disable react/prop-types */
import { Select } from "antd";
import React, { useContext, useEffect, useState } from "react";

import Card from "../../../components/Card/Card";
import { AiOutlineFilter } from "react-icons/ai";
import { Drawer, Space } from "antd";
import SliderMenu from "../SliderMenu/SliderMenu";
import "./ShowProducts.css";
import { ProviderContext } from "../../../provider/Provider";
import { useLocation, useNavigate } from "react-router-dom";

const ShowProducts = ({ data = [],totalProductCount, handleLoadMore, loading, loadMoreURL }) => {
    const [showLess, setShowLess] = useState(true);
    const { setSortedValue, isRefetchCategory, setIsRefetchCategory } = useContext(ProviderContext);
    const navigate = useNavigate();
    const location = useLocation();
 

    
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const selectedCheckboxValues = searchParams.getAll("sort_by");
        setSelectedCheckboxes(selectedCheckboxValues.map((value) => parseInt(value, 10)));
      }, [location.search]);
    const handleSort = (key) => {
        setSortedValue(key);

     

    const isSelected = selectedCheckboxes.includes(key);
    let updatedCheckboxes;

    if (!isSelected) {
      updatedCheckboxes = [ key];
    } 

    // Get the existing search parameters
    const searchParams = new URLSearchParams(location.search);

    // Remove existing parameters for the given title
    searchParams.delete("sort_by");

    // Add updated parameters
    updatedCheckboxes.forEach((checkbox) => {
      searchParams.append("sort_by", checkbox);
    });

    // Update the URL
    navigate(`${location?.pathname}?${searchParams.toString()}`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", 
    });
 
  
    };

    // drawer
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className="container mx-auto px-2 ">
            <div className="flex items-center md:justify-end justify-between mb-8">
                <>
                    <Space>
                        <div
                            value="left"
                            onClick={showDrawer}
                            className="md:hidden flex items-center px-5 py-2 rounded-md bg-[#FFBFCD] text-[#F40F6F]"
                        >
                            <AiOutlineFilter /> Filter
                        </div>
                    </Space>
                    <Drawer title="Filter" placement={"right"} width="80%" onClose={onClose} open={open}>
                        <SliderMenu />
                    </Drawer>
                </>
                <Select
                    defaultValue="Sort by Latest"
                    className="h-10 w-[150px] "
                    onChange={handleSort}
                    options={[
                        {
                            value: "desc",
                            label: "Sort by Latest",
                        },
                        {
                            value: "asc",
                            label: "Sort by Oldest",
                        },
                    ]}
                />
            </div>
            {loading === false && data?.length < 1 && (
        <div className="flex justify-center items-center">
        <h3 className="text-[#F40F6F] text-2xl">No product found</h3>
    </div>
      )}
            {Array.isArray(data) && data?.length > 0 && (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-2 md:gap-5">
                    {data?.map((item, i) => (
                        <Card key={i} item={item} />
                    ))}
                </div>
            )}

            {loading ? (
                <div className="w-full flex justify-center mt-3 mb-5 md:mt-9 md:mb-[100px]">
                    <span className="loading loading-bars loading-lg text-[#F40F6F]"></span>
                </div>
            ) : (
                <div className="flex justify-center mt-3 mb-5 md:mt-9 md:mb-[100px]">
                    {
                        totalProductCount > data?.length && (
                            <button
                            onClick={() => {
                                handleLoadMore(data.current_page);
                            }}
                            className="text-[#913BDB] hover:text-white hover:bg-[#9747FF] border border-[#913BDB] py-3 px-[72px] rounded-[4px] text-sm font-medium hover:cursor-pointer"
                        >
                            Load More
                        </button>
                        )
                    }
                
                </div>
            )}
        </div>
    );
};

export default ShowProducts;
