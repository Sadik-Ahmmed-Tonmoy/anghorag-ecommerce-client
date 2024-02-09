/* eslint-disable react/prop-types */
import React from "react";
import productImage1 from "../../../assets/ProductViewCarousel/productImage1.png";
import productImage2 from "../../../assets/ProductViewCarousel/productImage2.png";
import productImage3 from "../../../assets/ProductViewCarousel/productImage3.png";
import { useState } from "react";
import ImageURL from "../../../components/ImageURL/ImageURL";
import './ProductDescription.css'

const ProductDescription = ({ singleProduct, isLoading }) => {
  const [showDetails, setShowDetails] = useState(false);
  const short_details =
    isLoading || singleProduct?.data?.products?.short_details;
  const name = isLoading || singleProduct?.data?.products?.name;
  const long_details = isLoading || singleProduct?.data?.products?.long_details;
  const product_images = isLoading || singleProduct?.data?.product_images;
  return (
    <div className="container mx-auto">
      <div className="border-b-[0.3px] border-[#bfbfbf] pb-3 md:pb-6 mb-3 md:mb-6">
        {/* <ul className="list-inside list-disc text-sm font-medium">
          <li className="tracking-[-0.14px] leading-[26px] text-sm font-medium text-black">Key ingredients: Rose, </li>
          <li className="tracking-[-0.14px] leading-[26px] text-sm font-medium text-black">Prevents acne and soothes irritation</li>
          <li className="tracking-[-0.14px] leading-[26px] text-sm font-medium text-black">Prevents blackheads</li>
          <li className="tracking-[-0.14px] leading-[26px] text-sm font-medium text-black">Lightens scars, improves skin tone</li>
        </ul> */}
        {short_details && (
        <div className="w-full single_product_long_details" dangerouslySetInnerHTML={{ __html: short_details }} />
      )}
      </div>
      <h5 className="text-lg font-semibold mb-2 md:mb-4">{name}</h5>
      <p className="mb-5 md:mb-10 text-sm font-normal text-justify leading-[20px] ">
      {long_details && (
        <div className="w-full single_product_long_details" dangerouslySetInnerHTML={{ __html: long_details }} />
      )}
        {/* {long_details} */}
      </p>
      {/* <p className="font-semibold text-sm mb-2 md:mb-4">About the product:</p>
      <ol className="list-inside list-decimal mb-5 md:mb-10 text-sm font-normal">
        <li className="tracking-[-0.14px] leading-[24px] text-sm font-normal text-black">Key ingredients:</li>
        <li className="tracking-[-0.14px] leading-[24px] text-sm font-normal text-black">Prevents acne and soothes irritation</li>
        <li className="tracking-[-0.14px] leading-[24px] text-sm font-normal text-black">Prevents blackheads</li>
        <li className="tracking-[-0.14px] leading-[24px] text-sm font-normal text-black">Lightens scars, improves skin tone</li>
      </ol> */}

      {/* <div>
        {showDetails ? (
          <>
          

            <div className=" ">
              {product_images.map((item, i) => (
                <ImageURL
                  key={i}
                  image={item.image}
                  className="mb-5 md:mb-10 rounded-lg"
                />
              ))}
            </div>
          
            <div className="flex justify-center">
              <button
                onClick={() => setShowDetails(false)}
                className="text-[#913BDB] py-3 px-[42px] rounded-[42px] border border-[#913BDB] text-sm font-medium"
              >
                View Less
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => setShowDetails(true)}
              className="text-[#913BDB] py-3 px-[42px] rounded-[42px] border border-[#913BDB] text-sm font-medium"
            >
              View More
            </button>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default ProductDescription;
