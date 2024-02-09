import React, { useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import moment from "moment";

const Completed = () => {
    const axiosSecure = useAxiosSecure();
    const [loadingState, setLoadingState] = useState("");

    const [myOrder, setMyOrder] = useState([]);
    
    // const myOrder = [
    //   {
    //     order_no: 139039,
    //     order_date: "14 December",
    //     order_status: "Pending",
    //     grand_total: 1034,
    //     order_quantity: 3,
    //   },
    //   {
    //     order_no: 755005,
    //     order_date: "14 December",
    //     order_status: "Pending",
    //     grand_total: 1034,
    //     order_quantity: 3,
    //   },
    // ];
    
    const completedData = myOrder.filter((order) => order.order_status === "Delivered");
    
    useEffect(() => {
        setLoadingState("loading");
        axiosSecure
            .get(`my_order_list`)
            .then((res) => {
                if (res.data.success === true) {
                    setMyOrder(res.data.data);
                    setLoadingState("loaded");
                }
            })
            .catch((error) => {
                console.error("Error fetching zones:", error);
                setLoadingState("loaded");
            });
    }, []);
    return (
        <>
            <div className="mb-4 md:mb-8">
                <h2 className="font-semibold text-2xl  tracking-[0.48px] leading-[33.5px]">My Orders</h2>
            </div>
            <div className="rounded-lg border-[0.5px] border-[#00000040] mb-10 md:mb-24">
                <div className="flex gap-9 md:gap-16 mt-6 ms-5 md:ms-14">
                    <Link to={"/my-account/order/active"}>
                        <p className="border-b-2 text-sm border-white font-medium px-1 text-[#000000CC] hover:cursor-pointer">Active</p>
                    </Link>
                    <p className="border-b-2 border-[#F40F6F] text-[#F40F6F] font-semibold text-sm px-1 hover:cursor-pointer">Completed</p>
                </div>
                {completedData.map((order, index) => (
                    <React.Fragment key={index}>
                    <div className="overflow-x-auto border-t-[0.5px] border-[#BFBFBF] px-2 sm:px-4 md:px-6 pt-2 sm:pt-4 md:pt-6 pb-2 sm:pb-4">
                        <div className="flex flex-col xs:flex-row">
                            <div className="xs:w-6/12 flex flex-col gap-1 mb-2 md:mb-0">
                                <h4 className="text-base font-semibold pb-2">
                                    Order no: <span> {order?.order_no && order?.order_no}</span>
                                </h4>
                                <div className="">
                                    <p className="text-xs font-medium ">
                                        Order Date:
                                        <span className="text-[#00000099]"> {moment(order.created_at).format("DD MMMM YYYY")}</span>
                                    </p>
                                </div>
                                <p className="text-xs font-medium">
                                    Order Status:
                                    <span className="text-[#00000099]"> {order?.order_status && order?.order_status}</span>
                                </p>

                                <p className="text-xs font-medium flex flex-wrap gap-1">
                                    <span className="whitespace-nowrap">Payment Method:</span>
                                    <span className="text-[#00000099] whitespace-nowrap"> Cash on delivery</span>
                                </p>
                            </div>
                            <div className="xs:w-6/12 flex flex-col gap-2 justify-between">
                                <div className="flex flex-col gap-1 md:gap-0 items-start xs:items-end">
                                    <p className="flex items-center font-semibold text-base">
                                        Total:
                                        <span className="flex items-center tracking-[-0.64px]">
                                            <TbCurrencyTaka />
                                            {order?.grand_total && order?.grand_total}
                                        </span>
                                    </p>
                                    {/* <p className="text-xs font-normal">
                                        Total <span> {order?.order_quantity && order?.order_quantity} </span>
                                        items
                                    </p> */}
                                </div>

                                <div className="flex justify-start xs:justify-end">
                                    <Link to={`/my-account/completed/order-details/${order.id}`}>
                                 
                                        <button
                                            className={`mt-2 whitespace-nowrap text-xs font-medium text-[#F40F6F] hover:text-white bg-[#FFF1F4] hover:bg-[#F40F6F] rounded-sm px-4 py-[10px] hover:cursor-pointer`}
                                        >
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
                ))}
            </div>
            <span>
                {loadingState === "loading" && (
                    <div className="flex justify-center items-center">
                        <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto"></span>
                    </div>
                )}
                {loadingState === "loaded" && completedData.length < 1 && <p className="text-center text-2xl font-semibold">No completed orders found.</p>}
                {/* {
                 completedData.length < 1 && <p className="text-center text-2xl font-semibold">No data found</p> 
                } */}
            </span>
        </>
    );
};

export default Completed;
