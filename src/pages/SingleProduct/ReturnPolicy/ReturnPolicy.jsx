/* eslint-disable react/prop-types */
import React from "react";

const ReturnPolicy = ({singleProduct, isLoading}) => {
  const return_policy = isLoading || singleProduct?.data?.products?.return_policy;
  return (
    <div className="text-sm font-normal text-justify">
      <p className="leading-[20px] text-sm font-normal text-black">
  {return_policy}
      </p>
      {/* <br />
      <p className="leading-[20px] text-sm font-normal text-black">
        Simply soak a cotton pad in Micellar Water and gently swipe over your
        skin in circular motions to remove makeup and impurities. Micellar Water
        is for use on the face, eyes and lips, and its clever formula means
        there’s no need to rub or rinse. Use as part of a morning skin cleansing
        routine to start your day with a fresh face, or to remove makeup before
        bed.
      </p>
      <br />
      <p className="leading-[20px] text-sm font-normal text-black">
        Again repeat the process after 3 days: Simply soak a cotton pad in
        Micellar Water and gently swipe over your skin in circular motions to
        remove makeup and impurities. Micellar Water is for use on the face,
        eyes and lips, and its clever formula means there’s no need to rub or
        rinse. Use as part of a morning skin cleansing routine to start your day
        with a fresh face, or to remove makeup before bed.
      </p>
      <br />
      <p className="leading-[20px] text-sm font-normal text-black">
        Neem is nature's personal answer for skin care, washing away the factors
        that lead to acne and pimples. Rose petal extract and neem strike the
        perfect balance in aroma magic face wash neem and tea tree. All-natural
        organic skin care ingredients create the properties of this facewash,
        while essential oils lend themselves to a therapeutic treatment. This
        facewash not only acts as a treatment for acne, but as a relaxing and
        healing indulgence for the skin. The neem in aroma magic face wash neem
        and tea tree is what makes this more than just a great facewash, but
        also an excellent acne treatment. It cleanses the skin while removing
        excess sebum and impurities from oily skin. Skin will feelsofter and
        look clearer after one use, but it is with continual use that the magic
        of the product shines through. This gentle cleanser is not harsh on the
        skin, but overtime it will gradually remove the stubborn blackheads that
        have been building up over time, leaving you with nothing but bright,
        porcelain skin. Acne, pimples and less than perfect skin will be a thing
        of the past asyou wash away your skin’s imperfections.
      </p> */}
    </div>
  );
};

export default ReturnPolicy;
