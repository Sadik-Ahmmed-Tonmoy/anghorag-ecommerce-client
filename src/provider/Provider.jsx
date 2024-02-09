import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { getCartItemsFromSession } from "../utilities/getCartItemsFromSession";

export const ProviderContext = createContext(null);

const Provider = ({ children }) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [afterAppliedCoupon, setAfterAppliedCoupon] = useState([]);
  const [isCouponReload, setIsCouponReload] = useState(false);
  const [isWrongCoupon, setIsWrongCoupon] = useState(null);
  const [isRefetchCategory, setIsRefetchCategory] = useState(false);
  const [increaseOrDecrease, setIncreaseOrDecrease] = useState(false);
  const [sortedValue, setSortedValue] = useState("desc");
  const [isReset, setIsReset] = useState(false);
  const [condition, setCondition] = useState("");
  const [orderSubmit, setOrderSubmit] = useState(false);
  const [cartItemsAfterRemove, setCartItemsAfterRemove] = useState([]);
  const [orderCalculation, setOrderCalculation] = useState({});
  const [orderLoading, setOrderLoading] = useState(false);
  



  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  let paginationValue;
  if (windowWidth <= 640) {
    paginationValue = 4;
  } else if (windowWidth <= 768) {
    paginationValue = 4;
  } else if (windowWidth <= 1024) {
    paginationValue = 6;
  } else if (windowWidth <= 1280) {
    paginationValue = 8;
  } else if (windowWidth <= 1535) {
    paginationValue = 10;
  } else if (windowWidth >= 1536) {
    paginationValue = 12;
  }

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    // Assuming getCartItemsFromSession() returns the updated cart items after removal
    const updatedCartItems = getCartItemsFromSession();
    setCartItemsAfterRemove(updatedCartItems);
}, [increaseOrDecrease ]);

const [cartItems, setCartItems] = useState([]);

useEffect(() => {
  setCartItems(getCartItemsFromSession());
}, [increaseOrDecrease, orderSubmit]);

  const infoProvider = {
    userData,
    loading,
    afterAppliedCoupon,
    setAfterAppliedCoupon,
    isCouponReload,
    setIsCouponReload,
    isWrongCoupon,
    setIsWrongCoupon,
    isRefetchCategory,
    setIsRefetchCategory,
    increaseOrDecrease,
    setIncreaseOrDecrease,
    sortedValue,
    setSortedValue,
    windowWidth,
    paginationValue,
    isReset,
    setIsReset,
    condition,
    setCondition,
    orderSubmit,
    setOrderSubmit,
    cartItemsAfterRemove, 
    cartItems,
    orderCalculation,
    setOrderCalculation,
    setOrderLoading,
    orderLoading
  };

  return (
    <ProviderContext.Provider value={infoProvider}>
      {children}
    </ProviderContext.Provider>
  );
};

export default Provider;
