import { BiChevronLeft } from "react-icons/bi";
import { TbCurrencyTaka } from "react-icons/tb";
import img from "../../../../assets/orderDetails/product.png";
import ViewAddresses from "../../Addresses/ViewAddresses/ViewAddresses";
import { Link, useLocation, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import moment from "moment";
import ImageURL from "../../../../components/ImageURL/ImageURL";

const OrderDetails = () => {
    const location = useLocation();
    const isActive = location.pathname.includes("active");
    const isCompleted = location.pathname.includes("completed");
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    

    const [data, setData] = useState({});
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        setTotalQuantity(data?.order_details?.reduce((total, item) => total + item.quantity, 0));
    }, [data]);

    useEffect(() => {
        axiosSecure
            .get(`track_order_details/${id}`)
            .then((res) => {
                if (res.data.success === true) {
                    setData(res.data.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching zones:", error);
            });
    }, []);

    // const data = {
    //   order_no: 139039,
    //   total: "1,034.00",
    //   order_date: "14 December 2023 5:26 PM",
    //   total_items: 3,
    //   order_items: [
    //     {
    //       product_name: "Ullam neque molestiae corporis ipsum sapiente.",
    //       price: "300.00",
    //     },
    //     {
    //       product_name: "Perspiciatis voluptatem tempora voluptas vero eius.",
    //       price: "500.00",
    //     },
    //   ],
    //   billing_details: {
    //     name: "pabel Ahmed",
    //     phone_number: "01363034478",
    //     address: "Maniknagar",
    //   },
    //   shipping_details: {
    //     name: "Roji Ahmed",
    //     phone_number: "01983034442",
    //     address: "Sydabad Road",
    //   },
    // };

    return (
        <>
            {/* title */}
            {isActive && (
                <Link to={"/my-account/order/active"}>
                    <div className="mb-4 md:mb-8 hover:cursor-pointer">
                        <h2 className="font-semibold text-2xl tracking-[0.48px] leading-[33.5px] flex items-center">
                            <BiChevronLeft size={30} /> Order Details (In Progress)
                        </h2>
                    </div>
                </Link>
            )}
            {isCompleted && (
                <Link to={"/my-account/order/completed"}>
                    <div className="mb-8 hover:cursor-pointer">
                        <h2 className="font-semibold text-2xl  tracking-[0.48px] leading-[33.5px] flex items-center ">
                            <BiChevronLeft size={30} /> Order Details (In Progress)
                        </h2>
                    </div>
                </Link>
            )}
            {/* title */}
            {/* body */}
            <>
                {/* header */}
                <div className="bg-[#FFF1F4] px-6 py-5 rounded ">
                    <div className="flex justify-between mb-[6px] gap-2">
                        <h4 className="text-base font-semibold">
                            Order no: <span> {data?.order_no && data?.order_no} </span>
                        </h4>
                        <div className="flex flex-col items-end">
                            <p className="whitespace-nowrap flex items-center text-base font-semibold">
                                Total:
                                <span className="flex items-center tracking-[-0.64px]">
                                    <TbCurrencyTaka />
                                    {data?.grand_total && data?.grand_total}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                        <div className="">
                            <p className="text-xs font-medium flex items-center flex-wrap gap-x-1">
                                <span>Order Date:</span>
                                <p className="text-[#00000099] text-sm font-medium">{moment(data.created_at).format("DD MMMM YYYY")}</p>
                            </p>
                        </div>
                        <p className="whitespace-nowrap text-xs font-normal">
                            Total <span> {totalQuantity} </span>items
                        </p>
                    </div>
                </div>
                {/* header end*/}
                <div className="mb-10">
                    {/* per item */}
                    {data?.order_details?.map((item, index) => (
                        <div key={index} className="flex items-center flex-wrap gap-x-2 gap-y-2 justify-between px-6 py-3 border-b-[0.3px]">
                            <div className="flex items-center gap-3 w-full">
                                <div className="avatar">
                                    <div className=" w-14 h-14">
                                        {/* <img src={img} alt="Product Image" /> */}
                                        <ImageURL className="w-full h-full rounded-md object-fill shrink-0 " image={item?.image && item?.image} />
                                    </div>
                                </div>
                                <span className="flex gap-1 flex-wrap justify-between w-full items-center">
                                    <p className="text-sm font-medium tracking-[-0.14px] leading-[22px]">
                                        {item?.name && item?.name} X{item?.quantity && item?.quantity}
                                    </p>
                                    <h4 className="flex items-center  text-sm font-semibold tracking-[-0.56px]">
                                        <TbCurrencyTaka />
                                        {item?.price && item?.price}
                                    </h4>
                                </span>
                            </div>
                        </div>
                    ))}

                    {/* per item */}
                </div>

                {/* view address */}
                <div className="bg-[#FFF1F4] p-3 md:p-6 rounded-lg mb-10 md:mb-24">
                    <h4 className="font-semibold text-base mb-2 md:mb-4">Billing Address</h4>
                    <div className="bg-white p-2 md:p-5 rounded-lg mb-3 md:mb-9">
                        <div className="flex flex-col xs:flex-row justify-between mb-[10px]">
                            <h5 className="font-medium text-sm text-[#00000099]">Name:</h5>
                            <p className="font-medium text-sm">
                                {data?.billing?.b_first_name && `${data?.billing?.b_first_name} ${data?.billing?.b_last_name}`}
                            </p>
                        </div>
                        <div className="flex flex-col xs:flex-row justify-between mb-[10px]">
                            <h5 className="font-medium text-sm text-[#00000099] whitespace-nowrap">Phone Number:</h5>
                            <p className="font-medium text-sm"> {data?.billing?.b_phone && data?.billing?.b_phone} </p>
                        </div>
                        <div className="flex flex-col xs:flex-row justify-between mb-[10px]">
                            <h5 className="font-medium text-sm text-[#00000099] whitespace-nowrap">Email Address:</h5>
                            <p className="font-medium text-sm"> {data?.billing?.b_email && data?.billing?.b_email} </p>
                        </div>
                        <div className="flex flex-col xs:flex-row justify-between mb-[10px]">
                            <h5 className="font-medium text-sm text-[#00000099] me-1">Address:</h5>
                            <p className="font-medium text-sm"> {data?.billing?.b_address && data?.billing?.b_address}</p>
                        </div>
                    </div>
                    <h4 className="font-semibold text-base mb-2 md:mb-4">Shipping Address</h4>
                    <div className="bg-white p-2 md:p-5 rounded-lg">
                        <div className="flex flex-col xs:flex-row justify-between mb-[10px]">
                            <h5 className="font-medium text-sm text-[#00000099]">Name:</h5>
                            <p className="font-medium text-sm">
                                {data?.shipping?.s_first_name && `${data?.shipping?.s_first_name} ${data?.shipping?.s_last_name}`}
                            </p>
                        </div>
                        <div className="flex flex-col xs:flex-row justify-between mb-[10px]">
                            <h5 className="font-medium text-sm text-[#00000099]">Phone Number:</h5>
                            <p className="font-medium text-sm"> {data?.shipping?.s_phone && data?.shipping?.s_phone} </p>
                        </div>
                        <div className="flex flex-col xs:flex-row justify-between mb-[10px]">
                            <h5 className="font-medium text-sm text-[#00000099]">Email Address:</h5>
                            <p className="font-medium text-sm">{data?.shipping?.s_email && data?.shipping?.s_email} </p>
                        </div>
                        <div className="flex flex-col xs:flex-row justify-between mb-[10px]">
                            <h5 className="font-medium text-sm text-[#00000099] me-1">Address:</h5>
                            <p className="font-medium text-sm">{data?.shipping?.s_address && data?.shipping?.s_address} </p>
                        </div>
                    </div>
                </div>
                {/* view address */}
            </>
            {/* body */}
        </>
    );
};

export default OrderDetails;
