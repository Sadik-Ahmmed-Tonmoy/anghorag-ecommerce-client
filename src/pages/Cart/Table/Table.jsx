/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { getCartItemsFromSession } from "../../../utilities/getCartItemsFromSession";
import { removeCartItemFromSession } from "../../../utilities/removeCartItemFromSession";
import TableTr from "./TableTr/TableTr";
import { addGrandTotalToSession } from "../../../utilities/addGrandTotalToSession";
import { ProviderContext } from "../../../provider/Provider";

const Table = ({
  increaseOrDecrease,
  setIncreaseOrDecrease,
  setAfterAppliedCoupon,
}) => {
  const [cartItemsAfterRemove, setCartItemsAfterRemove] = useState([]);
  const { setIsWrongCoupon } = useContext(ProviderContext);
  

  // const calculateTotal = (cartItems) => {
  //   return cartItems.reduce((total, item) => {
  //     return total + item.totalAmount;
  //   }, 0);
  // };

  // const totalAmount = calculateTotal(cartItemsAfterRemove);
  //

  //     const totalAmount = getTotalAmount();
  //

  useEffect(() => {
    setCartItemsAfterRemove(getCartItemsFromSession());
  }, [increaseOrDecrease]);
  //
  // removeCartItemFromSession("yourItemIdToRemove");
  const handleRemoveItem = (id) => {
    removeCartItemFromSession(id);
    setCartItemsAfterRemove(getCartItemsFromSession());
    setIncreaseOrDecrease(!increaseOrDecrease);
    setAfterAppliedCoupon(null);
    setIsWrongCoupon(null);
    addGrandTotalToSession({});
  };

  //  const [Total, setTotal] = useState(0);
  return (
    <div className="mb-11 text-black">
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-[#FFF1F4] text-black border-none rounded-lg">
              <th className="w-1"></th>
              <th className="font-medium text-base text-black w-7/12">
                Product
              </th>
              <th className="font-medium text-base text-black">Price</th>
              <th className="font-medium text-base text-black">Quantity</th>
              <th className="font-medium text-base text-black w-[12%]">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cartItemsAfterRemove?.map((item, i) => (
              <TableTr
                key={i}
                item={item}
                handleRemoveItem={handleRemoveItem}
                increaseOrDecrease={increaseOrDecrease}
                setIncreaseOrDecrease={setIncreaseOrDecrease}
                setAfterAppliedCoupon={setAfterAppliedCoupon}
              />
            ))}
          </tbody>
         
        </table>
        {cartItemsAfterRemove && cartItemsAfterRemove.length < 1 &&
              <p className="text-center text-2xl font-semibold mt-4 text-[#F40F6F]">Please add a product first to checkout</p>
            }
      </div>
    </div>
  );
};

export default Table;
