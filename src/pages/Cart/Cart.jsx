import axios from "axios";
import { useContext, useEffect, useState } from "react";
import BottomNav from "../../components/BottomNav/BottomNav";
import { ProviderContext } from "../../provider/Provider";
import { getCartItemsFromSession } from "../../utilities/getCartItemsFromSession";
import { getDeliveryCharge } from "../../utilities/getDeliveryCharge";
import { getGrandTotalFromSession } from "../../utilities/getGrandTotalFromSession";
import { getTotalAmount } from "../../utilities/getTotalAmount";
import { getTotalDiscount } from "../../utilities/getTotalDiscount";
import { getTotalWeight } from "../../utilities/getTotalWeight";
import Coupon from "./Coupon/Coupon";
import OrderSummary from "./OrderSummary/OrderSummary";
import Table from "./Table/Table";
import useUserAddress from "../../hooks/useUserAddress";

const Cart = () => {
    const {
        afterAppliedCoupon,
        setAfterAppliedCoupon,
        cartItemsAfterRemove,
        isCouponReload,
        setIsCouponReload,
        increaseOrDecrease,
        setIncreaseOrDecrease,
        cartItems,
    } = useContext(ProviderContext);
    const { userAddress } = useUserAddress();
    const [loadCoupon, setLoadCoupon] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    // const { cityList } = useBillingDetailsCity();

    //

    //   setTotalAmount (getTotalAmount())
    //

    useEffect(() => {
        setTotalAmount(getTotalAmount());
        setTotalDiscount(getTotalDiscount());
        setTotalWeight(getTotalWeight());
    }, [increaseOrDecrease]);

    const [deliveryCharge, setDeliveryCharge] = useState([]);
    const [grandTotalFromSession, setGrandTotalFromSession] = useState([]);
    //

    useEffect(() => {
        setDeliveryCharge(getDeliveryCharge(totalWeight));
        setGrandTotalFromSession(getGrandTotalFromSession());
    }, [increaseOrDecrease, totalWeight, isCouponReload]);

    const [taxAmount, setTaxAmount] = useState([]);
    //
    useEffect(() => {
        axios
            .get("tax_amounts")
            .then((res) => {
                if (res.data.success === true) {
                    setTaxAmount(res.data.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    // const [afterAppliedCoupon, setAfterAppliedCoupon] = useState([])

    return (
        <>
            <BottomNav title={"Your Cart"} />
            <div className="container mx-auto px-2 min-h-[calc(100vh-60vh)] md:min-h-[calc(100vh-400px)] ">
                <Table
                    increaseOrDecrease={increaseOrDecrease}
                    setIncreaseOrDecrease={setIncreaseOrDecrease}
                    setAfterAppliedCoupon={setAfterAppliedCoupon}
                />
                <div className="md:flex gap-3 justify-between">
                    <Coupon
                        grandTotal={grandTotal}
                        setAfterAppliedCoupon={setAfterAppliedCoupon}
                        loadCoupon={loadCoupon}
                        setLoadCoupon={setLoadCoupon}
                    />
                    {cartItemsAfterRemove.length > 0 && cartItems.length > 0 && (
                        <OrderSummary
                            totalAmount={totalAmount}
                            totalDiscount={totalDiscount}
                            deliveryCharge={deliveryCharge}
                            taxAmount={taxAmount}
                            setGrandTotal={setGrandTotal}
                            afterAppliedCoupon={afterAppliedCoupon}
                            grandTotalFromSession={grandTotalFromSession}
                        />
                    )}
                </div>
            </div>
            {/* <div className="container mx-auto px-2 min-h-[calc(100vh-60vh)] md:min-h-[calc(100vh-400px)] bg-red-500 ">
                <div className="flex justify-center items-center h-full">
                    <div>
                        <h1 className="text-black font-inter text-base md:text-2xl font-semibold leading-normal text-center">Your cart is empty and sad :(</h1>
                        <p className="text-gray-600 font-inter text-base font-normal leading-normal text-center">Add something to make it happy!</p>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default Cart;
