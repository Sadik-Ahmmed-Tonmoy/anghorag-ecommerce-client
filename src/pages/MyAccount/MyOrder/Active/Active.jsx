import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";
import useMyOrder from "../../../../hooks/useMyOrder";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import React, { useEffect, useState } from "react";
import moment from "moment";

const Active = () => {
    const axiosSecure = useAxiosSecure();

    const [myOrder, setMyOrder] = useState([]);
    
    // 
    const [loadingState, setLoadingState] = useState("");
    

    
    const pendingData = myOrder.filter((order) => order.order_status === "Pending" || order.order_status === "Accepted" || order.order_status === "Canceled");
    
    
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
                <h2 className="font-semibold text-2xl  tracking-[0.48px] leading-[33.5px] ">My Orders</h2>
            </div>
            <div className="rounded-lg border-[0.5px] border-[#00000040] mb-10 md:mb-24">
                <div className="flex gap-9 md:gap-16 mt-6 ms-5 md:ms-14">
                    <p className="border-b-2 border-[#F40F6F] text-sm text-[#F40F6F] font-semibold px-1 hover:cursor-pointer">Active</p>
                    <Link to={"/my-account/order/completed"}>
                        <p className="border-b-2 border-white text-sm font-medium px-1 text-[#000000CC] hover:cursor-pointer">Completed</p>
                    </Link>
                </div>
                {/* per item */}
                {pendingData.map((order, index) => (
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
                                        <Link to={`/my-account/active/order-details/${order.id}`}>
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

                {/* per item */}
            </div>
            <span>
                {loadingState === "loading" && (
                    <div className="flex justify-center items-center">
                        <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto"></span>
                    </div>
                )}
                {loadingState === "loaded" && pendingData.length < 1 && <p className="text-center text-2xl font-semibold">No active orders found.</p>}
               
            </span>
        </>
    );
};

export default Active;
