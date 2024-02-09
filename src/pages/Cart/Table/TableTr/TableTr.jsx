/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { getCartItemsFromSession } from "../../../../utilities/getCartItemsFromSession";
import { removeCartItemFromSession } from "../../../../utilities/removeCartItemFromSession";
import toast, { Toaster } from "react-hot-toast";
import minusButton from "../../../../assets/card/minusButton.svg";
import plusButton from "../../../../assets/card/plusButton.svg";
import { getTotalAmount } from "../../../../utilities/getTotalAmount";
import { addGrandTotalToSession } from "../../../../utilities/addGrandTotalToSession";
import { ProviderContext } from "../../../../provider/Provider";
import ImageURL from "../../../../components/ImageURL/ImageURL";

const TableTr = ({
  item,
  handleRemoveItem,
  increaseOrDecrease,
  setIncreaseOrDecrease,
  setAfterAppliedCoupon,
}) => {
  const { setIsWrongCoupon } = useContext(ProviderContext);
  const cartItems = getCartItemsFromSession();
  //

  //     const totalAmount = getTotalAmount();
  //
  // removeCartItemFromSession("yourItemIdToRemove");
  // const cartItemsAfterRemove = getCartItemsFromSession();

  const [counter, setCounter] = useState(item?.count);
  const [totalWeight, setTotalWeight] = useState(
    item?.count * parseInt(item?.weight)
  );

  //

  const errorIsNaNNotify = () =>
    toast.error("Please enter a valid quantity for the item.");
  const addQuantityNotifySuccess = () =>
    toast.success("Quantity updated successfully.");
  const decreaseQuantityNotifySuccess = () =>
    toast.success("Quantity decreased successfully.");

  const handleIncrement = (
    count,
    id,
    image,
    name,
    price,
    discounted_price,
    totalAmount,
    discounted_amount,
    weight,
    updated_weight,
    discount
  ) => {
    //

    if (isNaN(count)) {
      return errorIsNaNNotify();
    } else {
      setTotalWeight((item?.count + 1) * parseInt(item?.weight));
      setCounter((prevCounter) => prevCounter + 1);
      setIncreaseOrDecrease(!increaseOrDecrease);
      addQuantityNotifySuccess();
      setAfterAppliedCoupon(null);
      setIsWrongCoupon(null);
      addGrandTotalToSession({});
      const cartItem = {
        id: id,
        image: image,
        name: name,
        count: count,
        price: price,
        discounted_amount: discounted_amount,
        totalAmount: totalAmount,
        weight: weight,
        updated_weight: updated_weight,
        discount: discount,
      };

      // Retrieve existing cart items from session storage
      const existingCartItems = sessionStorage.getItem("cartItems");

      let updatedCartItems = [];
      if (existingCartItems) {
        updatedCartItems = JSON.parse(existingCartItems);

        // Check if the item ID already exists in cart
        const existingItemIndex = updatedCartItems.findIndex(
          (item) => item.id === id
        );

        if (existingItemIndex !== -1) {
          // If the item exists, update its count
          updatedCartItems[existingItemIndex].count = count;
          updatedCartItems[existingItemIndex].totalAmount = totalAmount;
          updatedCartItems[existingItemIndex].discounted_amount =
            discounted_amount;
          updatedCartItems[existingItemIndex].weight = weight;
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

  const handleDecrement = (
    count,
    id,
    image,
    name,
    price,
    discounted_price,
    totalAmount,
    discounted_amount,
    weight,
    updated_weight
  ) => {
    //

    if (isNaN(count)) {
      return errorIsNaNNotify();
    } else {
      if (counter > 1) {
        setCounter((prevCounter) => prevCounter - 1);
        setTotalWeight((item?.count - 1) * parseInt(item?.weight));
        setIncreaseOrDecrease(!increaseOrDecrease);
        decreaseQuantityNotifySuccess();
        addGrandTotalToSession({});
        setAfterAppliedCoupon(null);
        setIsWrongCoupon(null);
        const cartItem = {
          id: id,
          image: image,
          name: name,
          count: count - 1,
          price: price,
          discounted_amount: discounted_amount,
          totalAmount: totalAmount,
          weight: weight,
          updated_weight: updated_weight,
        };

        // Retrieve existing cart items from session storage
        const existingCartItems = sessionStorage.getItem("cartItems");

        let updatedCartItems = [];
        if (existingCartItems) {
          updatedCartItems = JSON.parse(existingCartItems);

          // Check if the item ID already exists in cart
          const existingItemIndex = updatedCartItems.findIndex(
            (item) => item.id === id
          );

          if (existingItemIndex !== -1) {
            // If the item exists, update its count
            updatedCartItems[existingItemIndex].count = count - 1;
            updatedCartItems[existingItemIndex].totalAmount = totalAmount;
            updatedCartItems[existingItemIndex].discounted_amount =
              discounted_amount;
            updatedCartItems[existingItemIndex].weight = weight;
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
    }
  };
  // const handleRemoveItem = (id) => {
  //      removeCartItemFromSession(id);
  // };

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value);
    setCounter(inputValue);
  };
  return (
    <tr className="border-opacity-20">
      <th>
        <button
          onClick={() => handleRemoveItem(item?.id)}
          className="btn btn-circle h-3 btn-xs bg-[#FFF1F4] text-[#F40F6F] hover:bg-[#F5CCDC] border-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 font-bold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </th>
      <td>
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="rounded-md w-14 h-14">
              {/* <img src={item?.image} alt="Product Image" /> */}
              <ImageURL image={item?.image} />
            </div>
          </div>
          <div className=" w-10/12 h-full">
            <p className="whitespace-nowrap font-semibold text-base leading-[22px] tracking-[-0.16px]">
              {item?.name}
            </p>
          </div>
        </div>
      </td>
      <td>
        <div className="font-semibold text-lg flex items-center h-full tracking-[-0.72px]">
          <TbCurrencyTaka size={22} />
          {item?.price}
        </div>
      </td>
      <td>
        <div className="w-[104px] h-9 border rounded-md border-[#f40f6f] flex items-center">
          <button
            onClick={() =>
              handleDecrement(
                counter,
                item?.id,
                item?.image,
                item?.name,
                item?.price,
                item?.discounted_price,
                item?.price * (counter - 1),
                (item?.price - item?.discounted_price) * (counter - 1),
                item?.weight,
                item?.weight * (counter - 1),
                item?.discount
              )
            }
            className="py-[7px] px-[10px]  text-[#F40F6F] border-e-[1.2px] border-[#f40f6f7d]"
          >
            <img src={minusButton} alt="" />
          </button>
          <input
            type="number"
            value={counter}
            required
            readOnly
            onChange={handleInputChange}
            className="text-center bg-white text-[#F40F6F] h-7 w-8 border-[#F40F6F] outline-none"
          />
          <button
            onClick={() =>
              handleIncrement(
                counter + 1,
                item?.id,
                item?.image1,
                item?.name,
                item?.price,
                item?.discounted_price,
                item?.price * (counter + 1),
                (item?.price - item?.discounted_price) * (counter + 1),
                item?.weight,
                item?.weight * (counter + 1),
                item?.discount
              )
            }
            className="py-[0.8px] px-2 text-[#F40F6F] border-s-[1.2px] border-[#f40f6f7d]"
          >
            <img src={plusButton} alt="" />
          </button>
          <Toaster />
        </div>
      </td>
      <td>
        <div className="font-semibold text-lg flex items-center h-full tracking-[-0.72px]">
          <TbCurrencyTaka size={22} />
          {item?.price * counter}
        </div>
      </td>
    </tr>
  );
};

export default TableTr;
