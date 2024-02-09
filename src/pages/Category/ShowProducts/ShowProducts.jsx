/* eslint-disable react/prop-types */
import { Select } from "antd";
import React, { useContext, useState } from "react";

import Card from "../../../components/Card/Card";
import { AiOutlineFilter } from "react-icons/ai";
import { Drawer, Space } from "antd";
import SliderMenu from "../SliderMenu/SliderMenu";
import "./ShowProducts.css";
import { ProviderContext } from "../../../provider/Provider";

const ShowProducts = ({ data = [], handleLoadMore, loading, loadMoreURL }) => {
    const [showLess, setShowLess] = useState(true);
    const { setSortedValue, isRefetchCategory, setIsRefetchCategory } = useContext(ProviderContext);

    
    // const handleLoadMore = () => {
    //     setShowLess(false);
    // };
    const handleShowLess = () => {
        setShowLess(true);
    };

    // const [data, setData] = useState([]);

    // useEffect(() => {
    //   // Define a function to fetch data based on selectedValue
    //   const fetchData = async () => {
    //     if (selectedValue === "Oldest") {
    //       const response = await axios.get(
    //         "https://fakestoreapi.com/products?sort=desc"
    //       );
    //       setData(response.data);
    //     } else if (selectedValue === "Latest") {
    //       const response = await axios.get(
    //         "https://fakestoreapi.com/products?sort=asc"
    //       );
    //       setData(response.data);
    //     }
    //   };

    //   fetchData();
    // }, [selectedValue]);

    const handleSort = (event) => {
        setIsRefetchCategory(!isRefetchCategory);
        setSortedValue(event);
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
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {showLess
          ? data
              .slice(0, 9)
              .map((product, i) => <Card key={i} product={product} />)
          : data.map((product, i) => <Card key={i} product={product} />)}
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </div> */}
            {loading === false && data?.data?.length < 1 && (
        <div className="flex justify-center items-center">
        <h3 className="text-[#F40F6F] text-2xl">No product found</h3>
    </div>
      )}
            {Array.isArray(data?.data) && data?.data?.length > 0 && (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-2 md:gap-5">
                    {data?.data?.map((item, i) => (
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
                    {data.total >
                          data?.data?.length && (
                        <button
                            onClick={() => {
                                handleLoadMore(data.current_page);
                            }}
                            className="text-[#913BDB] hover:text-white hover:bg-[#9747FF] border border-[#913BDB] py-3 px-[72px] rounded-[4px] text-sm font-medium hover:cursor-pointer"
                        >
                            Load More
                        </button>
                        // <span>
                        //   {showLess ? (
                        //     <button
                        //       onClick={handleLoadMore}
                        //       className="text-[#913BDB] hover:text-white hover:bg-[#9747FF] border border-[#913BDB] py-3 px-[72px] rounded-[4px] text-sm font-medium hover:cursor-pointer"
                        //     >
                        //       Load More
                        //     </button>
                        //   ) : (
                        //     <button className="text-[#913BDB] border border-[#913BDB] py-3 px-[72px] rounded-[4px] text-sm font-medium hover:cursor-pointer">
                        //       Show Less
                        //     </button>
                        //   )}
                        // </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default ShowProducts;
