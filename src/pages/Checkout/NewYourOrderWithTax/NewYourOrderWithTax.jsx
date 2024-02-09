import { useContext, useEffect, useState } from "react";
import { BsCheck, BsCheckLg } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";
import { ProviderContext } from "../../../provider/Provider";
import { getCartItemsFromSession } from "../../../utilities/getCartItemsFromSession";
import { getFromSessionStorage } from "../../../utilities/getFromSessionStorage";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const NewYourOrderWithTax = ({ register, totalAmount, totalDiscount, deliveryCharge, taxAmount, setGrandTotal, grandTotalFromSession }) => {
    const axiosSecure = useAxiosSecure();
    const { increaseOrDecrease, isCouponReload, orderCalculation, orderLoading } = useContext(ProviderContext);
    const [isInside, setIsInside] = useState(false);
    const [isOutside, setIsOutside] = useState(false);
    const [isCalculationReload, setIsCalculationReload] = useState(false);
    const [isCash, setCash] = useState(false);
    const [isTermsAndConditions, setTermsAndConditions] = useState(false);
    // 

    const onInside = () => {
        setIsInside(!isInside);
        setIsOutside(false);
    };
    const onOutsideChange = () => {
        setIsOutside(!isOutside);
        setIsInside(false);
    };

    const [cartItemsAfterRemove, setCartItemsAfterRemove] = useState([]);
    // const [orderCalculation, setOrderCalculation] = useState({});

    useEffect(() => {
        setCartItemsAfterRemove(getCartItemsFromSession());
    }, [increaseOrDecrease]);

    // const getCoupon = getFromSessionStorage("applied_coupon");

    // useEffect(() => {
    //     const updatedProducts = cartItemsAfterRemove.map((product) => ({
    //         product_id: product.id,
    //         quantity: product.count,
    //         campaign_id: product.campaign_id,
    //     }));

    //     const order = {
    //         order_details: JSON.stringify(updatedProducts),
    //         coupon_code: getCoupon?.coupon_code ? getCoupon?.coupon_code : "",
    //         // coupon:  getCoupon?.coupon_code,
    //         // ...(getCoupon?.coupon_code && { coupon: getCoupon.coupon_code }),
    //     };
    //     setIsCalculationReload(true);
    //     axiosSecure
    //         .post("order-calculation", order)
    //         .then((res) => {
    //             setIsCalculationReload(false);
    //             if (res.data.success === true) {
    //                 setOrderCalculation(res.data.data.order);
    //             } else {
    //                 // Handle other cases if needed
    //             }
    //         })
    //         .catch((error) => {
    //             setIsCalculationReload(false);
    //         });
    // }, [cartItemsAfterRemove, isCouponReload]);

    return (
        <div className="bg-[#FFF1F4] rounded-lg mb-10 md:mb-24 text-black p-2 md:p-0 ">
            <div className="md:py-4 lg:py-6 py-3 px-3 md:px-5 lg:px-8">
                <h5 className="font-semibold text-base mb-3 md:mb-3 lg:mb-6">Your Order</h5>

                <div className="bg-white rounded-lg text-black p-3 md:p-6 lg:p-8">
                    <div className="flex justify-between">
                        <p className="font-semibold text-base">Product</p>
                        <p className="font-semibold text-base">Subtotal</p>
                    </div>
                    <div className="w-full border h-0 my-4"></div>
                    {isCalculationReload ? (
                        <progress className="progress w-56"></progress>
                    ) : (
                        <div className="flex justify-between">
                            <p className="font-medium text-sm">Subtotal :</p>
                            <p className="flex items-center font-semibold text-sm tracking-[-0.56px]">
                                <TbCurrencyTaka />
                                {orderCalculation?.subtotal && orderCalculation?.subtotal}
                            </p>
                        </div>
                    )}

                    <div className="w-full border h-0 my-4"></div>
                    {isCalculationReload ? (
                        <progress className="progress w-56"></progress>
                    ) : (
                        <div className="flex justify-between">
                            <p className="font-medium text-sm">Discount :</p>
                            <p className="flex items-center font-semibold text-sm tracking-[-0.56px]">
                                <TbCurrencyTaka />
                                {orderCalculation?.discount_amount && orderCalculation?.discount_amount}
                            </p>
                        </div>
                    )}

                    {orderCalculation?.coupon_code_discount > 0 && (
                        <>
                            <div className="w-full border h-0 my-4"></div>
                            <div className="flex justify-between">
                                <p className="font-medium text-sm">Coupon Discount :</p>
                                <p className="flex items-center font-semibold text-sm tracking-[-0.56px]">
                                    <TbCurrencyTaka />
                                    {orderCalculation?.coupon_code_discount && orderCalculation?.coupon_code_discount.toFixed(2)}
                                </p>
                            </div>
                        </>
                    )}
                    <div className="w-full border h-0 my-4"></div>
                    {isCalculationReload ? (
                        <progress className="progress w-56"></progress>
                    ) : (
                        <div className="flex justify-between">
                            <p className="font-medium text-sm">Shipping :</p>
                            <p className="flex items-center font-semibold text-sm tracking-[-0.56px]">
                                <TbCurrencyTaka />
                                {orderCalculation?.delivery_charge && orderCalculation?.delivery_charge}
                            </p>
                        </div>
                    )}

                    <div className="w-full border h-0 my-4"></div>
                    {orderCalculation?.tax_amount > 0 && (
                        <>
                            <div className="flex justify-between">
                                <p className="font-medium text-sm">Estimated Tax :</p>
                                <p className="flex items-center font-semibold text-sm tracking-[-0.56px]">
                                    <TbCurrencyTaka />
                                    {orderCalculation?.tax_amount && orderCalculation?.tax_amount}
                                </p>
                            </div>
                            <div className="w-full border h-0 my-4"></div>
                        </>
                    )}
                    {/* <div className="flex justify-between">
            <p className="font-medium text-sm">Total :</p>
            <p
              className={`flex items-center font-semibold text-lg tracking-[-0.72px] ${
                grandTotalFromSession &&
                grandTotalFromSession?.success === true &&
                "line-through"
              }`}
            >
              <TbCurrencyTaka />
              {taxAmount[0] && taxAmount[0].status === 1
                ? totalAmount -
                  totalDiscount +
                  deliveryCharge +
                  (totalAmount * taxAmount[0].tax_rate) / 100
                : totalAmount - totalDiscount + deliveryCharge}
            </p>
          </div> */}
                    {/* {grandTotalFromSession && grandTotalFromSession.success === true && (
            <>
              <div className="w-full border h-0 my-4"></div>
              <div className="flex justify-between">
                <p className="font-medium text-sm">Coupon Discount :</p>
                <p className="flex items-center font-semibold text-sm tracking-[-0.56px]">
                  <TbCurrencyTaka />
                  {orderCalculation?.grand_total && orderCalculation?.grand_total}
                </p>
              </div>
            </>
          )} */}

                    <>
                        {/* <div className="w-full border h-0 my-4"></div> */}
                        {isCalculationReload ? (
                            <progress className="progress w-56"></progress>
                        ) : (
                            <div className="flex justify-between">
                                <p className="font-semibold text-lg tracking-[-0.18px]">Grand Total :</p>
                                <p className="flex items-center font-semibold text-lg tracking-[-0.72px]">
                                    <TbCurrencyTaka />
                                    {orderCalculation?.grand_total && orderCalculation?.grand_total.toFixed(2)}
                                </p>
                            </div>
                        )}
                    </>

                    {/* <div className="w-full border h-0 my-4"></div> */}

                    {/* <label className=" flex items-center gap-2 my-4 text-sm font-medium text-[#00000099] w-fit h-min">
                        <div className="relative flex items-center">
                            <input
                                {...register("inSidee")}
                                type="checkbox"
                                checked={isInside}
                                onChange={onInside}
                                className={` rounded-full h-5 w-5 ${
                                    isInside ? "bg-[#F40F6F] text-white" : "bg-white"
                                } border border-[#00000040] appearance-none`}
                            />
                            <BsCheck size={20} className="absolute top-0 text-white" />
                        </div>
                        Inside Dhaka & Chottogram (min. 60tk)
                    </label> */}
                    {/* 
                    <label className="flex items-center gap-2 my-4 text-sm font-medium text-[#00000099] w-fit h-min">
                        <div className="relative flex items-center">
                            <input
                                {...register("outSidee")}
                                type="checkbox"
                                checked={isOutside}
                                onChange={onOutsideChange}
                                className={` rounded-full h-5 w-5 ${
                                    isOutside ? "bg-[#F40F6F] text-white" : "bg-white"
                                } border border-[#00000040] appearance-none`}
                            />
                            <BsCheck size={20} className="absolute top-0 text-white" />
                        </div>
                        Outside Dhaka & Chottogram (min. 80tk)
                    </label> */}
                    {/* <div className="w-full border h-0 my-4"></div>
                    <div className="flex justify-between">
                        <h3 className="font-semibold text-lg tracking-[-0.18px]">Grand Total</h3>
                        <p className="flex items-center font-semibold text-lg tracking-[-0.72px]">
                            <TbCurrencyTaka />
                            1205.00
                        </p>
                    </div> */}
                </div>

                <h3 className="font-semibold text-base mt-10">Choose Payment Method</h3>
                <label className=" flex items-center gap-2 mt-4 text-sm font-normal text-[#000000CC] w-fit h-min">
                    <div className="relative flex items-center">
                        <input
                            {...register("cash")}
                            type="checkbox"
                            checked={isCash}
                            onChange={() => setCash(!isCash)}
                            className={` rounded-full h-6 w-6 ${
                                isCash ? "bg-[#F40F6F] text-white" : "bg-white"
                            } border border-[#00000040] appearance-none`}
                        />
                        <BsCheck size={24} className="absolute top-0 text-white" />
                    </div>
                    Cash on delivery
                </label>
                <p className="text-sm font-medium text-[#00000099] ps-8">Pay with cash upon delivery</p>

                <label className=" flex items-center gap-2 my-4 text-sm font-normal text-black w-fit h-min mb-10">
                    <div className="relative flex items-center">
                        <input
                            type="checkbox"
                            checked={isTermsAndConditions}
                            onChange={() => setTermsAndConditions(!isTermsAndConditions)}
                            className={` rounded-md h-6 w-6 ${
                                isTermsAndConditions ? "bg-[#F40F6F] text-white" : "bg-white"
                            } border border-[#00000040] appearance-none`}
                        />
                        <BsCheckLg size={22} className="absolute top-0 left-0 text-white inline-block" />
                    </div>
                    <p>
                        I’ve read and accept
                        <span className="text-[#F40F6F]"> the terms & conditions</span>*
                    </p>
                </label>
                {/* <Link to={'/order-confirmed'}>     */}
                {orderLoading ? (
                    <div className=" flex justify-center">
                        <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto"></span>
                    </div>
                ) : (
                    <button
                        type="submit"
                        disabled={!isCash || !isTermsAndConditions}
                        className={`w-full rounded h-12 font-semibold ${
                            isCash && isTermsAndConditions ? " bg-[#F40F6F]  text-white" : "text-[#F40F6F] bg-[#FFBFCD] disabled:cursor-not-allowed"
                        }`}
                    >
                        Place Order
                    </button>
                )}

                {/* </Link> */}
            </div>
        </div>
    );
};

export default NewYourOrderWithTax;
