/* eslint-disable react/prop-types */
import React from "react";
import useSingleProduct from "../../../hooks/useSingleProduct";
import { useParams } from "react-router-dom";

const HowToUse = ({ singleProduct, isLoading }) => {
  // const { singleProduct, isLoading, isError } = useSingleProduct(slug);

  const how_to_use = isLoading || singleProduct?.data?.products?.how_to_use;
  //
  return (
    <div>
      <p className="text-sm font-normal leading-[20px] text-justify">
        {/* {how_to_use} */}
        {how_to_use && (
        <div dangerouslySetInnerHTML={{ __html: how_to_use }} />
      )}
      </p>
      <br />
      {/* <p className="text-sm font-normal leading-[20px] text-justify">
        Again repeat the process after 3 days: Simply soak a cotton pad in
        Micellar Water and gently swipe over your skin in circular motions to
        remove makeup and impurities. Micellar Water is for use on the face,
        eyes and lips, and its clever formula means there’s no need to rub or
        rinse. Use as part of a morning skin cleansing routine to start your day
        with a fresh face, or to remove makeup before bed.
      </p>{" "} */}
    </div>
  );
};

export default HowToUse;
HowToUse;
