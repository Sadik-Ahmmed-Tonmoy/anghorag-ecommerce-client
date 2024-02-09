/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";
import { getGrandTotalFromSession } from "../../../utilities/getGrandTotalFromSession";
import { ProviderContext } from "../../../provider/Provider";
import { getCartItemsFromSession } from "../../../utilities/getCartItemsFromSession";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { getFromSessionStorage } from "../../../utilities/getFromSessionStorage";

const OrderSummary = ({ totalAmount, totalDiscount, deliveryCharge, taxAmount, setGrandTotal, afterAppliedCoupon, grandTotalFromSession }) => {
    const axiosSecure = useAxiosSecure();
    const { isCouponReload, cartItemsAfterRemove, orderCalculation, setOrderCalculation } = useContext(ProviderContext);

  
    const [isCalculationReload, setIsCalculationReload] = useState(false);
    // 
    useEffect(() => {
        // Calculate grand total based on conditions
        let calculatedTotal = totalAmount - totalDiscount + deliveryCharge;

        if (taxAmount[0] && taxAmount[0].status === 1) {
            calculatedTotal += (totalAmount * taxAmount[0].tax_rate) / 100;
        }

        setGrandTotal(calculatedTotal);
    }, [totalAmount, totalDiscount, deliveryCharge, taxAmount, setGrandTotal]);
    // const CartItemsFromSession = getCartItemsFromSession();

    const getCoupon = getFromSessionStorage("applied_coupon");

    useEffect(() => {
        const updatedProducts = cartItemsAfterRemove.map((product) => ({
            product_id: product.id,
            quantity: product.count,
            campaign_id: product.campaign_id,
        }));
        

        const order = {
            order_details: JSON.stringify(updatedProducts),
            coupon_code: getCoupon?.coupon_code ? getCoupon?.coupon_code : "",
            // coupon:  getCoupon?.coupon_code,
            // ...(getCoupon?.coupon_code && { coupon: getCoupon.coupon_code }),
        };
        setIsCalculationReload(true);
        axiosSecure
            .post("order-calculation", order)
            .then((res) => {
                setIsCalculationReload(false);
                if (res.data.success === true) {
                    setOrderCalculation(res.data.data.order);
                } else {
                    // Handle other cases if needed
                }
            })
            .catch((error) => {
                setIsCalculationReload(false);
            });
    }, [cartItemsAfterRemove, isCouponReload]);

    return (
        <div className="bg-[#FFF1F4] rounded-lg w-full md:w-[440px] mb-10 md:mb-24 text-black p-4 sm:p-6 md:p-8">
            <h5 className="font-semibold text-base mb-6 md:mb-9">Order Summary</h5>
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
                        {/* {orderCalculation?.discount_amount && orderCalculation?.discount_amount} */}
                     {   (orderCalculation?.discount_amount && orderCalculation?.discount_amount.toFixed(2))}

                    </p>
                </div>
            )}

            {/* {isCalculationReload ? <progress className="progress w-56"></progress> : ""} */}
            {orderCalculation?.coupon_code_discount > 0 && (
                <>
                    <div className="w-full border h-0 my-4"></div>
                    <div className="flex justify-between">
                        <p className="font-medium text-sm">Coupon Discount :</p>
                        <p className="flex items-center font-semibold text-sm tracking-[-0.56px]">
                            <TbCurrencyTaka />
                            {orderCalculation?.coupon_code_discount && orderCalculation?.coupon_code_discount}
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
            {/* {isCalculationReload ? <progress className="progress w-56"></progress> : ""} */}
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
                        grandTotalFromSession && grandTotalFromSession.success === true && "line-through"
                    }`}
                >
                    <TbCurrencyTaka />
                    {taxAmount[0] && taxAmount[0].status === 1
                        ? totalAmount - totalDiscount + deliveryCharge + (totalAmount * taxAmount[0].tax_rate) / 100
                        : totalAmount - totalDiscount + deliveryCharge}
                </p>
            </div> */}
            {/* {orderCalculation.coupon_code_discount > 0 && (
                <>
                    <div className="w-full border h-0 my-4"></div>
                    <div className="flex justify-between">
                        <p className="font-medium text-sm">Coupon Discount :</p>
                        <p className="flex items-center font-semibold text-sm tracking-[-0.56px]">
                            <TbCurrencyTaka />
                            {orderCalculation.coupon_code_discount}
                        </p>
                    </div>
                </>
            )} */}

            <>
                {/* <div className="w-full border h-0 my-4"></div> */}
                {isCalculationReload ? <progress className="progress w-56"></progress> : <div className="flex justify-between">
                    <p className="font-medium text-sm">Grand Total :</p>
                    <p className="flex items-center font-semibold text-lg tracking-[-0.72px]">
                        <TbCurrencyTaka />
                        {/* {parseInt(grandTotalFromSession.total).toFixed(2)} */}
                        {orderCalculation?.grand_total && orderCalculation?.grand_total.toFixed(2)}
                    </p>
                </div>}
                
            </>

            {cartItemsAfterRemove && cartItemsAfterRemove.length > 0 ? (
                <>
                    <div className="w-full border h-0 my-4"></div>
                    <Link to={"/checkout"}>
                        <button className={`w-full bg-[#F40F6F] rounded h-12 text-white font-semibold hover:cursor-pointer`}>
                            Process to Checkout
                        </button>
                    </Link>
                </>
            ) : (
                <>
                    <div className="w-full border h-0 my-4"></div>

                    <button className={`w-full bg-[#e079a1] rounded h-12 text-white font-semibold hover:cursor-not-allowed`}>
                        Add Items to Cart
                    </button>
                </>
            )}
            {/* <div className="w-full border h-0 my-4"></div>
            <Link to={"/checkout"}>
                {" "}
                <button className={`w-full bg-[#F40F6F] rounded h-12 text-white font-semibold hover:cursor-pointer`}>Process to Checkout</button>
            </Link> */}
        </div>
    );
};

export default OrderSummary;
