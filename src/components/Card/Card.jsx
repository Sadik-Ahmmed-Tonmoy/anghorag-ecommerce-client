/* eslint-disable react/prop-types */
import { MdOutlineShoppingBag } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";
import minusButton from "../../assets/card/minusButton.svg";
import plusButton from "../../assets/card/plusButton.svg";
import saleBG from "../../assets/card/saleBG.png";
import StarRating from "../StarRating/StarRating";
import { useContext, useState } from "react";
import ImageURL from "../ImageURL/ImageURL";
import { ProviderContext } from "../../provider/Provider";

const Card = ({ item, itemNumber }) => {
    // 
    
    //

    const { increaseOrDecrease, setIncreaseOrDecrease } = useContext(ProviderContext);
    //
    const [counter, setCounter] = useState(1);

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

    const errorIsNaNNotify = () => toast.error("Please enter a valid quantity for the item.");
    const successNotify = () => toast.success("Item successfully added to the cart.");

    const handleAddToCart = (count, id, image, name, price, discounted_price, totalAmount, discounted_amount, weight, updated_weight, discount, campaign_id) => {
        if (isNaN(count)) {
            return errorIsNaNNotify();
        } else if (count === 0) {
            return errorIsNaNNotify();
        } else {
            successNotify();
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
                discount: discount,
                campaign_id: campaign_id,
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

    // const item?.slug = "nobis-maxime-quidem-non-praesentium-ratione"

    return (
        <>
            <div className="relative bg-white">
                {item?.seller_flags === 1 && (
                    <span className="absolute z-10">
                        <img className="h-20" src={saleBG} alt="" />
                        <p className="text-white text-sm font-normal -rotate-45 -mt-[73px] ms-[10px] tracking-[-0.14px]">sale</p>
                    </span>
                )}
                <div className=" card min-w-min card-compact p-3 border-[0.5px] border-[#ff87a680] rounded-lg  hover:shadow-xl mb-3 sm:mb-6 md:mb-9">
                    <Link to={`/product/${item?.slug}`}>
                        <div className="mb-[14px] w-full mx-auto rounded-lg hover:cursor-pointer">
                            <ImageURL className="w-full xs:h-[210px] object-fill rounded-lg shrink-0" image={item?.main_images && item?.main_images} />
                        </div>

                        {/* <div className="mb-[14px] w-full min-h-[210px]  mx-auto rounded-lg hover:cursor-pointer">
                         
                            <ImageURL className="w-full h-[210px] object-fill rounded-lg shrink-0" image={item?.main_images && item?.main_images} />
                        </div> */}
                    </Link>

                    <div className="">
                        <Link to={`/product/${item?.slug}`}>
                            <h2 className="font-semibold h-10 text-black text-base mb-[9px] leading-[22px] tracking-[-0.16px] hover:cursor-pointer">
                                {item?.name && (item.name.length > 40 ? `${item.name.slice(0, 40)}...` : item.name)}
                            </h2>
                        </Link>
                        <div className="flex items-center gap-3 mb-[14px]">
                            <StarRating rating={item?.review_avg_star} totalStars={5} size={16} />
                            <span className="text-black text-sm font-medium tracking-[-0.14px]">({item?.review_count})</span>
                        </div>
                        <div className="flex items-center flex-wrap gap-2">
                            <p className="text-black text-lg font-semibold flex items-center tracking-[-0.72px]">
                                <TbCurrencyTaka size={21} />
                                {item?.discounted_price ? item.discounted_price : item?.price}
                            </p>
                            {item?.discounted_price === 0 ? (
                                ""
                            ) : item?.discounted_price ? (
                                <p className="text-[#999999] text-sm font-medium tracking-[-0.56px] flex items-center line-through">
                                    <TbCurrencyTaka />
                                    {/* {(price * 1.45).toFixed(2)} */}
                                    {item.price}
                                </p>
                            ) : (
                                ""
                            )}
                            {item?.discount > 0 && <p className="text-black text-xs font-medium tracking-[-0.48px]">(-{item?.discount}%)</p>}
                        </div>
                        <div className="flex flex-wrap gap-2 items-center justify-between mt-[18px] z-20">
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
                            <button
                                onClick={() =>
                                    handleAddToCart(
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
                                        null
                                    )
                                }
                                className="w-[88px] h-[36px] text-[#F40F6F] hover:text-white bg-[#FFBFCD] hover:bg-[#F40F6F] rounded-md flex justify-center items-center"
                            >
                                <MdOutlineShoppingBag size={20} className="me-[0.5px] pb-[3px]" />
                                <span className=" text-xs font-semibold ">Add</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default Card;
