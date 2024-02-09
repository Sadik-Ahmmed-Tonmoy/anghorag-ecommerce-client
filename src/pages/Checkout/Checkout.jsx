import { useForm } from "react-hook-form";
import BottomNav from "../../components/BottomNav/BottomNav";
import BillingDetails from "./BillingDetails/BillingDetails";
import Login from "./Login/Login";
import YourOrder from "./YourOrder/YourOrder";
import ShippingDetails from "./Shipping details/ShippingDetails";
import useAuthUser from "../../hooks/useAuthUser";
import CheckoutLogin from "./CheckoutLogin/CheckoutLogin";
import CheckoutLoginCompo from "./CheckoutLoginAndSignup/CheckoutLoginCompo/CheckoutLoginCompo";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserAddress from "../../hooks/useUserAddress";
import Swal from "sweetalert2";
import { getTotalAmount } from "../../utilities/getTotalAmount";
import { getTotalDiscount } from "../../utilities/getTotalDiscount";
import { getTotalWeight } from "../../utilities/getTotalWeight";
import { getCartItemsFromSession } from "../../utilities/getCartItemsFromSession";
import { getDeliveryCharge } from "../../utilities/getDeliveryCharge";
import axios from "axios";
import OrderSummary from "../Cart/OrderSummary/OrderSummary";
import NewYourOrderWithTax from "./NewYourOrderWithTax/NewYourOrderWithTax";
import { ProviderContext } from "../../provider/Provider";
import { getGrandTotalFromSession } from "../../utilities/getGrandTotalFromSession";
import CheckoutLoginAndSignup from "./CheckoutLoginAndSignup/CheckoutLoginAndSignup";
import { getFromSessionStorage } from "../../utilities/getFromSessionStorage";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { userData } = useAuthUser();
    const [cartItemsAfterRemove, setCartItemsAfterRemove] = useState([]);
    const navigate = useNavigate();
    const { afterAppliedCoupon, setAfterAppliedCoupon, setOrderSubmit, isCouponReload, setIsCouponReload, setOrderLoading } =
        useContext(ProviderContext);
    const { userAddress, isUserAddressLoading } = useUserAddress();
    // const {
    //     register,
    //     handleSubmit,
    //     watch,
    //     formState: { errors },
    // } = useForm();
    // const onSubmit = (data) =>

    //

    const [isChecked, setIsChecked] = useState(false);

    // const onCheck = () => {
    //     setIsChecked(!isChecked);
    // };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const axiosSecure = useAxiosSecure();
    // const [userAddress, setUserAddress] = useState([]);
    const [bFirstName, setBFirstName] = useState("");
    const [bLastName, setBLastName] = useState("");
    const [bPhone, setBPhone] = useState("");
    const [bEmail, setBEmail] = useState("");
    const [BDistrict, setBDistrict] = useState("");
    const [BArea, setBArea] = useState("");
    const [BAddress, setBAddress] = useState("");

    const [SFirstName, setSFirstName] = useState("");
    const [SLastName, setSLastName] = useState("");
    const [SPhone, setSPhone] = useState("");
    const [SEmail, setSEmail] = useState("");
    const [SDistrict, setSDistrict] = useState("");
    const [SArea, setSArea] = useState("");
    const [SAddress, setSAddress] = useState("");
    //
    //

    useEffect(() => {
        // Set default values after fetching data
        setValue("b_first_name", (userAddress.success === true && userAddress.data.b_first_name) || "");
        setValue("b_last_name", (userAddress.success === true && userAddress.data.b_last_name) || "");
        setValue("b_phone", (userAddress.success === true && userAddress.data.b_phone) || "");
        setValue("b_email", (userAddress.success === true && userAddress.data.b_email) || "");
        setValue("b_district", (userAddress.success === true && userAddress.data.b_district) || "");
        setValue("b_area", (userAddress.success === true && userAddress.data.b_area) || "");
        setValue("b_address", (userAddress.success === true && userAddress.data.b_address) || "");
        setValue("s_first_name", (userAddress.success === true && userAddress.data.s_first_name) || "");
        setValue("s_last_name", (userAddress.success === true && userAddress.data.s_last_name) || "");
        setValue("s_phone", (userAddress.success === true && userAddress.data.s_phone) || "");
        setValue("s_email", (userAddress.success === true && userAddress.data.s_email) || "");
        setValue("s_district", (userAddress.success === true && userAddress.data.s_district) || "");
        setValue("s_area", (userAddress.success === true && userAddress.data.s_area) || "");
        setValue("s_address", (userAddress.success === true && userAddress.data.s_address) || "");
        // Set other values similarly for other fields...
    }, [setValue, userAddress]);

    // useEffect(() => {
    //     axiosSecure
    //         .get("get_user_address")
    //         .then((res) => {
    //             if (res.data.success === true) {
    //                 setUserAddress(res.data.data);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching categories:", error);
    //         });
    // }, []);

    useEffect(() => {
        if (userAddress.success === true && userAddress.data.b_first_name) {
            setBFirstName(userAddress.data.b_first_name);
        }
        if (userAddress.success === true && userAddress.data.b_last_name) {
            setBLastName(userAddress.data.b_last_name);
        }
        if (userAddress.success === true && userAddress.data.b_phone) {
            setBPhone(userAddress.data.b_phone);
        }
        if (userAddress.success === true && userAddress.data.b_email) {
            setBEmail(userAddress.data.b_email);
        }
        if (userAddress.success === true && userAddress.data.b_district) {
            setBDistrict(userAddress.data.b_district);
        }
        if (userAddress.success === true && userAddress.data.b_area) {
            setBArea(userAddress.data.b_area);
        }
        if (userAddress.success === true && userAddress.data.b_address) {
            setBAddress(userAddress.data.b_address);
        }

        if (userAddress.success === true && userAddress.data.s_first_name) {
            setSFirstName(userAddress.data.s_first_name);
        }
        if (userAddress.success === true && userAddress.data.s_last_name) {
            setSLastName(userAddress.data.s_last_name);
        }
        if (userAddress.success === true && userAddress.data.s_phone) {
            setSPhone(userAddress.data.s_phone);
        }
        if (userAddress.success === true && userAddress.data.s_email) {
            setSEmail(userAddress.data.s_email);
        }
        if (userAddress.success === true && userAddress.data.s_district) {
            setSDistrict(userAddress.data.s_district);
        }
        if (userAddress.success === true && userAddress.data.s_area) {
            setSArea(userAddress.data.s_area);
        }
        if (userAddress.success === true && userAddress.data.s_address) {
            setSAddress(userAddress.data.s_address);
        }
    }, [userAddress]);

    // const [bFirstName, setBFirstName] = useState('')
    //
    // const [requiredFirstName, setRequiredFirstName] = useState(false)
    //

    // const handleBFirstName = (event) => {
    //     const BFirstName = event.target.value;
    //     setBFirstName(BFirstName);
    // };

    // const CartItemsFromSession = getCartItemsFromSession();
    //
    const updatedProducts = cartItemsAfterRemove.map((product) => ({
        product_id: product.id,
        quantity: product.count,
        campaign_id: product.campaign_id,
        size_id: product.size === undefined ? null : product.size,
        color_id: product.color === undefined ? null : product.color,
        // discount: product.discounted_amount,
        // discounted_price: product.discounted_price,
        // image: product.image,
        // name: product.name,
        // price: product.price,
        // totalAmount: product.totalAmount,
        // total_weight: product.updated_weight,
        // weight: product.weight,
    }));

    //
    //

    const [selectedBillingCity, setSelectedBillingCity] = useState({});
    const [selectedBillingZone, setSelectedBillingZone] = useState({});
    const [selectedBillingArea, setSelectedBillingArea] = useState({});
    const [selectedShippingCity, setSelectedShippingCity] = useState({});
    const [selectedShippingZone, setSelectedShippingZone] = useState({});
    const [selectedShippingArea, setSelectedShippingArea] = useState({});
    const updatedProductsJSON = JSON.stringify(updatedProducts, null, 2);
    //
    // Display the updated array
    const getCoupon = getFromSessionStorage("applied_coupon");

    const onSubmit = (formData) => {
        const userAddressDetails = {
            b_first_name: formData?.b_first_name,
            b_last_name: formData?.b_last_name,
            b_email: formData?.b_email,
            b_phone: formData?.b_phone,
            b_address: formData?.b_address,
            s_address: formData?.s_address ? formData?.s_address : formData?.b_address,
            s_first_name: formData?.s_first_name ? formData?.s_first_name : formData?.b_first_name,
            s_last_name: formData?.s_last_name ? formData?.s_last_name : formData?.b_last_name,
            s_email: formData?.s_email ? formData?.s_email : formData?.b_email,
            s_phone: formData?.s_phone ? formData?.s_phone : formData?.b_phone,
        };

        console.log(userAddressDetails);

        setOrderLoading(true);
        const orderDataWithPathaoDetails = {
            ...userAddressDetails,

            b_city_name: selectedBillingCity.b_city_name ? selectedBillingCity.b_city_name : userAddress?.data?.b_city_name,
            b_city_id: selectedBillingCity.b_city_id ? selectedBillingCity.b_city_id : userAddress?.data?.b_city_id,
            b_zone_name: selectedBillingZone.b_zone_name ? selectedBillingZone.b_zone_name : userAddress?.data?.b_zone_name,
            b_zone_id: selectedBillingZone.b_zone_id ? selectedBillingZone.b_zone_id : userAddress?.data?.b_zone_id,
            b_area_name: selectedBillingArea.b_area_name ? selectedBillingArea.b_area_name : userAddress?.data?.b_area_name,
            b_area_id: selectedBillingArea.b_area_id ? selectedBillingArea.b_area_id : userAddress?.data?.b_area_id,

            s_city_name: selectedShippingCity.s_city_name
                ? selectedShippingCity.s_city_name
                : selectedBillingCity.b_city_name
                ? selectedBillingCity.b_city_name
                : userAddress?.data?.s_city_name
                ? userAddress?.data?.s_city_name
                : userAddress?.data?.b_city_name,
            s_city_id: selectedShippingCity.s_city_id
                ? selectedShippingCity.s_city_id
                : selectedBillingCity.b_city_id
                ? selectedBillingCity.b_city_id
                : userAddress?.data?.s_city_id
                ? userAddress?.data?.s_city_id
                : userAddress?.data?.b_city_id,
            s_zone_name: selectedShippingZone.s_zone_name
                ? selectedShippingZone.s_zone_name
                : selectedBillingZone.b_zone_name
                ? selectedBillingZone.b_zone_name
                : userAddress?.data?.s_zone_name
                ? userAddress.data?.s_zone_name
                : userAddress?.data?.b_zone_name,
            s_zone_id: selectedShippingZone.s_zone_id
                ? selectedShippingZone.s_zone_id
                : selectedBillingZone.b_zone_id
                ? selectedBillingZone.b_zone_id
                : userAddress?.data?.s_zone_id
                ? userAddress?.data?.s_zone_id
                : userAddress?.data?.b_zone_id,
            s_area_name: selectedShippingArea.s_area_name
                ? selectedShippingArea.s_area_name
                : selectedBillingArea.b_area_name
                ? selectedBillingArea.b_area_name
                : userAddress?.data?.s_area_name
                ? userAddress.data?.s_area_name
                : userAddress?.data?.b_area_name,
            s_area_id: selectedShippingArea.s_area_id
                ? selectedShippingArea.s_area_id
                : selectedBillingArea.b_area_id
                ? selectedBillingArea.b_area_id
                : userAddress?.data?.s_area_id
                ? userAddress?.data?.s_area_id
                : userAddress?.data?.b_area_id,

            // ...selectedBillingCity,
            // ...selectedBillingZone,
            // ...selectedBillingArea,
            // ...selectedShippingCity,
            // ...selectedShippingZone,
            // ...selectedShippingArea,
        };

        const order = {
            order_details: updatedProductsJSON,
            billing_shipping_details: JSON.stringify(orderDataWithPathaoDetails),
            order_notes: formData.note,

            coupon_code: getCoupon?.coupon_code,
        };

        //
        // let newData = {
        //     ...formData,
        //     b_first_name: bFirstName,
        //     b_last_name: bLastName,
        //     b_phone: bPhone,
        //     b_email: bEmail,
        //     b_district: BDistrict,
        //     b_area: BArea,
        //     b_address: BAddress,

        //     s_first_name: SFirstName,
        //     s_last_name: SLastName,
        //     s_phone: SPhone,
        //     s_email: SEmail,
        //     s_district: SDistrict,
        //     s_area: SArea,
        //     s_address: SAddress,
        // };
        //

        axiosSecure
            .post(
                "order_data", order )
            .then((res) => {
                setOrderLoading(false);
                if (res.data.success === true) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Order Confirmed",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    sessionStorage.removeItem("cartItems");
                    setOrderSubmit((prev) => !prev);
                    navigate(`/order-confirmed/${res.data.data.order_no}`);
                } else {
                    setOrderLoading(false);
                    // Handle other cases if needed
                }
            })
            .catch((error) => {
                setOrderLoading(false);
                //
                // setErrorFromAPI(errorMessageList);
                //console.error('Error during registration:', error);
                // Handle errors from the API call
            });
    };

    // ---------------------------------------------------------------------------------------------------------------

    const [increaseOrDecrease, setIncreaseOrDecrease] = useState(false);
    const [loadCoupon, setLoadCoupon] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);

    //   setTotalAmount (getTotalAmount())
    //

    useEffect(() => {
        setTotalAmount(getTotalAmount());
        setTotalDiscount(getTotalDiscount());
        setTotalWeight(getTotalWeight());
    }, [increaseOrDecrease]);

    //

    useEffect(() => {
        setCartItemsAfterRemove(getCartItemsFromSession());
    }, [increaseOrDecrease]);

    const [deliveryCharge, setDeliveryCharge] = useState([]);
    //

    useEffect(() => {
        setDeliveryCharge(getDeliveryCharge(totalWeight));
    }, [increaseOrDecrease, totalWeight]);

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

    //

    //

    //   setTotalAmount (getTotalAmount())
    //

    //

    useEffect(() => {
        setCartItemsAfterRemove(getCartItemsFromSession());
    }, [increaseOrDecrease]);

    const [grandTotalFromSession, setGrandTotalFromSession] = useState([]);

    useEffect(() => {
        setDeliveryCharge(getDeliveryCharge(totalWeight));
        setGrandTotalFromSession(getGrandTotalFromSession());
    }, [increaseOrDecrease, totalWeight, isCouponReload]);

    return (
        <>
            <BottomNav title={"Checkout"} />
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container mx-auto px-2 w-full md:flex justify-between md:gap-5 lg:gap-20">
                    <div className="w-full">{userData.id ? <BillingDetails register={register} /> :   <CheckoutLoginCompo/>}</div>
                    <div className="w-full">
                        <YourOrder register={register} />
                    </div>
                </div>
            </form> */}
            {userData.id ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="container mx-auto px-2 w-full md:flex justify-between md:gap-5 lg:gap-20">
                        <div className="w-full">
                            <BillingDetails
                                setValue={setValue}
                                register={register}
                                errors={errors}
                                selectedBillingCity={selectedBillingCity}
                                setSelectedBillingCity={setSelectedBillingCity}
                                selectedBillingZone={selectedBillingZone}
                                setSelectedBillingZone={setSelectedBillingZone}
                                selectedBillingArea={selectedBillingArea}
                                setSelectedBillingArea={setSelectedBillingArea}
                                selectedShippingCity={selectedShippingCity}
                                setSelectedShippingCity={setSelectedShippingCity}
                                selectedShippingZone={selectedShippingZone}
                                setSelectedShippingZone={setSelectedShippingZone}
                                selectedShippingArea={selectedShippingArea}
                                setSelectedShippingArea={setSelectedShippingArea}
                                setIsChecked={setIsChecked}
                                isChecked={isChecked}
                            />
                        </div>
                        <div className="w-full">
                            {/* <YourOrder register={register} /> */}
                            <NewYourOrderWithTax
                                register={register}
                                totalAmount={totalAmount}
                                totalDiscount={totalDiscount}
                                deliveryCharge={deliveryCharge}
                                taxAmount={taxAmount}
                                setGrandTotal={setGrandTotal}
                                grandTotalFromSession={grandTotalFromSession}
                            />
                            {/* <OrderSummary
                totalAmount={totalAmount}
                totalDiscount={totalDiscount}
                deliveryCharge={deliveryCharge}
                taxAmount={taxAmount}
                setGrandTotal={setGrandTotal}
                afterAppliedCoupon={afterAppliedCoupon}
              /> */}
                        </div>
                    </div>
                </form>
            ) : (
                <div className="container mx-auto px-2 w-full md:flex justify-between md:gap-5 lg:gap-20">
                    <div className="w-full">
                        {/* <CheckoutLoginCompo /> */}
                        <CheckoutLoginAndSignup />
                    </div>
                    <div className="w-full">
                        {/* <YourOrder register={register} /> */}
                        <OrderSummary
                            totalAmount={totalAmount}
                            totalDiscount={totalDiscount}
                            deliveryCharge={deliveryCharge}
                            taxAmount={taxAmount}
                            setGrandTotal={setGrandTotal}
                            afterAppliedCoupon={afterAppliedCoupon}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Checkout;
