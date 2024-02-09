/* eslint-disable react/prop-types */
import { BsFacebook, BsFillCheckCircleFill, BsFillShareFill, BsLink45Deg, BsLinkedin } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";
import currency from "../../../assets/singleProduct/currency.svg";
import exclamatorySign from "../../../assets/singleProduct/exclamatorySign.svg";
import StarRating from "../../../components/StarRating/StarRating";
import plusButton from "../../../assets/card/plusButton.svg";
import minusButton from "../../../assets/card/minusButton.svg";
import { MdOutlineShoppingBag } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { getCartItemsFromSession } from "../../../utilities/getCartItemsFromSession";
import { useNavigate, useParams } from "react-router-dom";
import { ProviderContext } from "../../../provider/Provider";

const SingleProductTitle = ({ singleProductData }) => {
    const [isShare, setIsShare] = useState(false);
    const { increaseOrDecrease, setIncreaseOrDecrease } = useContext(ProviderContext);
    const item = singleProductData?.products;
    
    const navigate = useNavigate();

    // const [counter, setCounter] = useState(1);
    const [counter, setCounter] = useState(item?.count || 1);

    const handleIncrement = () => {
        setCounter((prevCounter) => prevCounter + 1);
    };

    const handleDecrement = () => {
        if (counter > 1) {
            setCounter((prevCounter) => prevCounter - 1);
        }
    };

    const handleInputChange = (e) => {
        const inputValue = parseInt(e.target.value);
        setCounter(inputValue);
    };

    const [totalWeight, setTotalWeight] = useState(item?.count * parseInt(item?.weight));
    // const [increaseOrDecrease, setIncreaseOrDecrease] = useState(false);

    const successNotify = () => toast.success("Item successfully added to the cart.");
    const errorIsNaNNotify = () => toast.error("Please enter a valid quantity for the item.");
    const addQuantityNotifySuccess = () => toast.success("Quantity updated successfully.");
    const decreaseQuantityNotifySuccess = () => toast.success("Quantity decreased successfully.");
    const [cartItemsAfterRemove, setCartItemsAfterRemove] = useState([]);

    //   const existingCartItems = cartItemsAfterRemove;

    //    let updatedCartItems = [];
    //           if (existingCartItems) {
    //               updatedCartItems = [...existingCartItems]

    //               // Check if the item ID already exists in cart
    //               const existingItemIndex = updatedCartItems.findIndex((item) => item.id === item?.id);

    //
    //             }

    //   useEffect(() => {
    //     setCartItemsAfterRemove(getCartItemsFromSession());
    // }, [increaseOrDecrease]);
    const [productSize, setProductSize] = useState("");
    const [productColor, setProductColor] = useState("");

    //   const updatedProducts = singleProductData?.products?.sizes.map(product => ());
    //
    useEffect(() => {
        setProductSize(singleProductData?.products?.sizes[0]?.name);
        setProductColor(singleProductData?.products?.colors[0]?.name);
    }, []);
const {campaign_id} = useParams()
// 
    const handleAddToCart = (count, id, image, name, price, discounted_price, totalAmount, discounted_amount, weight, updated_weight, discount, campaign_id, selectedSize, selectedColor) => { 
        if (isNaN(count)) {
            return errorIsNaNNotify();
        } else if (count === 0) {
            return errorIsNaNNotify();
        } else {
            successNotify();
                // 
                // 
                // 
                // 
                const sSize = selectedSize.filter(size => size.name === productSize)
                const sColor = selectedColor.filter(color => color.name === productColor)
            const cartItem = {
                id: id,
                image: image,
                name: name,
                count: count,
                price: price,
                discounted_price: discounted_price,
                discounted_amount: discounted_amount,
                totalAmount: totalAmount,
                weight: weight,
                updated_weight: updated_weight,
                size: sSize[0]?.id,
                color: sColor[0]?.id,
                // selectedColor: selectedColor,
                discount: discount,
                campaign_id: campaign_id === undefined ? null : campaign_id,
                
            };

            setIncreaseOrDecrease(!increaseOrDecrease);
            // Retrieve existing cart items from session storage
            const existingCartItems = sessionStorage.getItem("cartItems");

            let updatedCartItems = [];
            if (existingCartItems) {
                updatedCartItems = JSON.parse(existingCartItems);

                // Check if the item ID already exists in cart
                const existingItemIndex = updatedCartItems.findIndex((item) => item.id === id);

                if (existingItemIndex !== -1) {
                    // If the item exists, update its count
                    updatedCartItems[existingItemIndex].count = count;
                    updatedCartItems[existingItemIndex].updated_weight = updated_weight;
                    updatedCartItems[existingItemIndex].size = sSize[0]?.id;
                    updatedCartItems[existingItemIndex].color = sColor[0]?.id;
                } else {
                    // If the item doesn't exist, add it to the cart
                    updatedCartItems.push(cartItem);
                }
            } else {
                // If cart is empty, add the item directly
                updatedCartItems.push(cartItem);
            }

            // Update session storage with the updated cart items
            sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

            //
        }
    };

    const handleBuyNow = (count, id, image, name, price, discounted_price, totalAmount, discounted_amount, weight, updated_weight, discount, campaign_id, selectedSize, selectedColor,) => {
        
        const sSize = selectedSize.filter(size => size.name === productSize)
        const sColor = selectedColor.filter(color => color.name === productColor)
        if (isNaN(count)) {
            return errorIsNaNNotify();
        } else {
            setTotalWeight((item?.count + 1) * parseInt(item?.weight));
            // setCounter((prevCounter) => prevCounter + 1);
            setIncreaseOrDecrease(!increaseOrDecrease);
            successNotify();
            // setAfterAppliedCoupon(null);
            // setIsWrongCoupon(null);
            // addGrandTotalToSession({});
            const cartItem = {
                id: id,
                image: image,
                name: name,
                count: count,
                price: price,
                discounted_price: discounted_price,
                discounted_amount: discounted_amount,
                totalAmount: totalAmount,
                weight: weight,
                updated_weight: updated_weight,
                size: sSize[0]?.id,
                color: sColor[0]?.id,
                productSize: productSize,
                productColor: productColor,
                discount: discount,
                campaign_id: campaign_id === undefined ? null : campaign_id,
            };
            console.log(cartItem);
            // Retrieve existing cart items from session storage
            const existingCartItems = sessionStorage.getItem("cartItems");

            let updatedCartItems = [];
            if (existingCartItems) {
                updatedCartItems = JSON.parse(existingCartItems);

                // Check if the item ID already exists in cart
                const existingItemIndex = updatedCartItems.findIndex((item) => item.id === id);

                if (existingItemIndex !== -1) {
                    // If the item exists, update its count
                    updatedCartItems[existingItemIndex].count = count;
                    updatedCartItems[existingItemIndex].totalAmount = totalAmount;
                    updatedCartItems[existingItemIndex].discounted_amount = discounted_amount;
                    updatedCartItems[existingItemIndex].weight = weight;
                    updatedCartItems[existingItemIndex].updated_weight = updated_weight;
                    // updatedCartItems[existingItemIndex].productSize = productSize;
                    // updatedCartItems[existingItemIndex].productColor = productColor;
                    updatedCartItems[existingItemIndex].size = sSize[0]?.id;
                    updatedCartItems[existingItemIndex].color = sColor[0]?.id;
                } else {
                    // If the item doesn't exist, add it to the cart
                    updatedCartItems.push(cartItem);
                }
            } else {
                // If cart is empty, add the item directly
                updatedCartItems.push(cartItem);
            }

            // Update session storage with the updated cart items
            sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
            navigate("/cart");

            //
        }
    };

    return (
        <>
            <h1 className="text-lg sm:text-xl md:text-3xl font-semibold mb-[10px] md:leading-[40px]">
                {singleProductData?.products?.name && singleProductData?.products?.name}
            </h1>
            <p className="mb-2 md:mb-[13px]">
                <span className="text-sm font-semibold">Brand:</span>{" "}
                <span className="text-sm font-medium tracking-[-0.14px]">
                    {singleProductData?.products?.brand && singleProductData?.products?.brand}
                </span>
            </p>
            <div className="flex items-center gap-1 mb-3">
                <StarRating rating={singleProductData?.products?.average_review && singleProductData?.products?.average_review} totalStars={5} />
                <span className="text-sm font-medium tracking-[-0.14px]">
                    ({singleProductData?.products?.count_review && singleProductData?.products?.count_review} Customer Reviews)
                </span>
            </div>
            <p className="text-[#20BF06] font-medium text-xs flex items-center gap-1 mb-4">
                <span>
                    <BsFillCheckCircleFill />
                </span>
                <span className="text-xs font-medium tracking-[0.12px]">Available in stock</span>
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-3">
                <h2 className="flex items-center text-[28px] font-semibold tracking-[-1.12px] leading-[42px]">
                    <TbCurrencyTaka />
                    {singleProductData?.products?.discounted_price
                        ? singleProductData?.products?.discounted_price
                        : singleProductData?.products?.price}
                </h2>
                <span className="flex flex-wrap items-center gap-2 font-medium">
                    <h4 className="flex items-center text-base font-semibold text-[#999] line-through">
                        {/* <TbCurrencyTaka /> */}
                        {/* {singleProductData?.products?.price && singleProductData?.products?.price} */}
                        {singleProductData?.products?.discounted_price === 0 ? (
                            ""
                        ) : singleProductData?.products?.discounted_price ? (
                            <p className="text-[#999999] text-sm font-medium tracking-[-0.56px] flex items-center line-through">
                                <TbCurrencyTaka />
                                {/* {(price * 1.45).toFixed(2)} */}
                                {singleProductData?.products?.price}
                            </p>
                        ) : (
                            ""
                        )}
                    </h4>
                    {singleProductData?.products?.discount && (
                        <p className="text-base font-medium tracking-[-0.64px]">(-{singleProductData?.products?.discount}%)</p>
                    )}
                </span>
            </div>

            <div className="border-t-[0.3px] border-b-[0.3px] w-full border-[#bfbfbf] py-4 mb-3 z-10">
                <>
                    {singleProductData?.products?.sizes && Array.isArray(singleProductData?.products?.sizes) && (
                        <>
                            <p className="text-sm font-semibold mb-3">Select Size</p>
                            <div className="flex flex-wrap gap-3 mb-5">
                                {singleProductData?.products?.sizes.map((size, i) => (
                                    <p
                                        key={i}
                                        onClick={() => setProductSize(size?.name)}
                                        className={`hover:cursor-pointer ${
                                            productSize === size?.name
                                                ? "px-3 py-[7px] border border-[#F40F6F] rounded-md text-[#F40F6F] text-sm font-medium tracking-[-0.14px]"
                                                : "px-3 py-[7px] border-[0.3px] border-[#bfbfbf] rounded-md text-sm font-medium tracking-[-0.14px]"
                                        } `}
                                    >
                                        {size?.name}
                                    </p>
                                ))}
                            </div>
                        </>
                    )}
                </>
                <>
                    {singleProductData?.products?.colors && Array.isArray(singleProductData?.products?.colors) && (
                        <>
                            <p className="text-sm font-medium tracking-[-0.14px] mb-3">Select Color</p>
                            <div className="flex flex-wrap gap-3 mb-5">
                                {singleProductData?.products?.colors.map((color, i) => (
                                    <p
                                        key={i}
                                        onClick={() => setProductColor(color?.name)}
                                        className={`hover:cursor-pointer ${
                                            productColor === color?.name
                                                ? "px-3 py-[7px] border border-[#F40F6F] rounded-md text-[#F40F6F] text-sm font-medium tracking-[-0.14px]"
                                                : "px-3 py-[7px] border-[0.3px] border-[#bfbfbf] rounded-md text-sm font-medium tracking-[-0.14px]"
                                        } `}
                                    >
                                        {color?.name}
                                    </p>
                                ))}
                            </div>
                        </>
                    )}
                </>

                <div className="flex flex-wrap items-center gap-4">
                    <p className="text-sm font-semibold">Quantity</p>

                    <div className="w-[104px] h-9 border rounded-md border-[#f40f6f] flex items-center">
                        <button onClick={handleDecrement} className="py-[7px] px-[10px]  text-[#F40F6F] border-e-[1.2px] border-[#f40f6f7d]">
                            <img src={minusButton} alt="" />
                        </button>
                        <input
                            type="number"
                            value={counter}
                            onChange={handleInputChange}
                            className={`text-center bg-white text-[#F40F6F] h-7 w-8 ${
                                isNaN(counter) ? "border-[#F40F6F] outline-none" : "border-[#F40F6F] outline-none"
                            }`}
                        />
                        <button onClick={handleIncrement} className="py-[0.8px] px-2 text-[#F40F6F] border-s-[1.2px] border-[#f40f6f7d]">
                            <img src={plusButton} alt="" />
                        </button>
                    </div>
                    {/* <p className="flex items-center gap-1 text-[10px] font-normal">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Maximum quantity for single product is <span className="font-medium">7</span>
                    </p> */}
                </div>
            </div>
            <div className="flex justify-between items-center mb-6 w-full">
                <div className="flex gap-x-3 sm:gap-x-8 md:gap-x-4 lg:gap-x-8" style={{ width: "calc(100v - 20px)" }}>
                    <button
                        onClick={() =>
                            handleBuyNow(
                                counter,
                                item?.id,
                                item?.main_images,
                                item?.name,
                                item?.price,
                                item?.discounted_price,
                                item?.price * counter,
                                item?.discounted_price ? (item?.price - item?.discounted_price) * counter : 0,
                                item?.weight,
                                item?.weight * counter,
                                item?.discount,
                                campaign_id,
                                item.sizes,
                                item.colors
                            )
                        }
                        className="text-white text-[10px] md:text-xs lg:text-sm font-medium bg-[#913BDB] h-9 w-32 md:h-10 md:w-36 lg:h-12 lg:w-44 xl:w-[204px] xl:h-[48px] rounded-[42px] whitespace-nowrap"
                    >
                        BUY NOW
                    </button>
                    <button
                        onClick={() =>
                            handleAddToCart(
                                counter,
                                item?.id,
                                item?.main_images,
                                item?.name,
                                item?.price,
                                item?.discount,
                                item?.price * counter,
                                item?.discount ? (item?.price - item?.discount) * counter : 0,
                                item?.weight,
                                item?.weight * counter,
                                item?.discount,
                                campaign_id,
                                item.sizes,
                                item.colors
                            )
                        }
                        className="flex items-center justify-center gap-[3px] text-white text-[10px] md:text-xs lg:text-sm font-medium bg-[#F40F6F] h-9 w-32 md:h-10 md:w-36 lg:h-12 lg:w-44 xl:w-[204px] xl:h-[48px] rounded-[42px] whitespace-nowrap"
                    >
                        <MdOutlineShoppingBag size={26} className="pb-1" /> <span>ADD TO CART</span>
                    </button>
                </div>
                <button onClick={() => setIsShare(!isShare)} className="relative">
                    <BsFillShareFill className="text-[#999999] text-end mx-auto md:mx-0 ms-[2px] md:me-2 lg:me-10 hover:cursor-pointer w-5 h-5 sm:w-7 sm:h-7" />
                    {isShare && (
                        <div className="bg-white absolute top-10 md:top-12 right-0  filter drop-shadow-md ">
                            <div className="relative">
                                <div className=" w-7 h-7 rotate-45 bg-white absolute right-2 sm:right-3 md:right-3 lg:right-10 -mt-3"></div>
                                <div className="flex items-center px-4 py-5 gap-6">
                                    <span className="whitespace-nowrap me-1 text-[10px] font-medium">Share via:</span>
                                    <span className="whitespace-nowrap hover:cursor-pointer h-min flex flex-col justify-center">
                                        <BsLink45Deg className="mx-auto" />
                                        <span className="text-[8px] font-medium">Copy Link</span>
                                    </span>
                                    <span>
                                        <BsFacebook className="text-[#1255D9] h-5 w-5 sm:h-7 sm:w-7 hover:cursor-pointer" />
                                    </span>
                                    <span>
                                        <BsLinkedin className="text-[#3051C4] h-5 w-5 sm:h-7 sm:w-7 hover:cursor-pointer" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </button>
            </div>

            <div>
                <p className="flex items-center gap-2 text-xs font-medium mb-3">
                    <img src={currency} alt="" />
                    Cash On Delivery Available
                </p>
                {/* <span className="flex items-center gap-2 text-xs font-medium mb-12">
                    <img src={exclamatorySign} alt="" />
                    <p>
                        Minimum service charge 60tk <span>(=1kg.)</span> only for Dhaka and Chottogram, outside this area service charge will be 80tk
                        <span>(=1kg.)</span> 20tk will be added after per kg.
                    </p>
                </span> */}
            </div>
            <Toaster />
        </>
    );
};

export default SingleProductTitle;
