/* eslint-disable react/prop-types */
import { Select } from "antd";
import React, { useContext, useState } from "react";

import { AiOutlineFilter } from "react-icons/ai";
import { Drawer, Space } from "antd";
// import "./ShowProducts.css";
import { ProviderContext } from "../../../provider/Provider";
import Card from "../../../components/Card/Card";
import SliderMenu from "../../Category/SliderMenu/SliderMenu";

const SellerPicksShowProducts = ({ data = [], handleLoadMore, loading, loadMoreURL }) => {
    const [showLess, setShowLess] = useState(true);
    const { setSortedValue, isRefetchCategory, setIsRefetchCategory } = useContext(ProviderContext);
    // 

    
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
            {/* <div className="flex items-center md:justify-end justify-between mb-8">
               
                <Select
                    defaultValue="Sort by Latest"
                    className="h-10 w-[150px] "
                    onChange={handleSort}
                    options={[
                        {
                            value: "asc",
                            label: "Sort by Latest",
                        },
                        {
                            value: "desc",
                            label: "Sort by Oldest",
                        },
                    ]}
                />
            </div> */}
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
            {data?.data?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 mb-4 md:mb-[6px] lg:mb-7">
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

export default SellerPicksShowProducts;
