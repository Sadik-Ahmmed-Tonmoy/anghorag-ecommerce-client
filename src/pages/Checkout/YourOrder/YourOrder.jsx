import { useState } from "react";
import { BsCheck, BsCheckLg } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";

const YourOrder = ({ register }) => {
  const [isInside, setIsInside] = useState(false);
  const [isOutside, setIsOutside] = useState(false);

  const [isCash, setCash] = useState(false);
  const [isTermsAndConditions, setTermsAndConditions] = useState(false);

  const onInside = () => {
    setIsInside(!isInside);
    setIsOutside(false);
  };
  const onOutsideChange = () => {
    setIsOutside(!isOutside);
    setIsInside(false);
  };

  return (
    <div className="bg-[#FFF1F4] rounded-lg mb-10 md:mb-24 text-black p-2 md:p-0 ">
      <div className="md:py-4 lg:py-6 py-3 px-3 md:px-5 lg:px-8">
        <h5 className="font-semibold text-base mb-3 md:mb-3 lg:mb-6">
          Your Order
        </h5>

        <div className="bg-white rounded-lg text-black p-3 md:p-6 lg:p-8">
          <div className="flex justify-between">
            <p className="font-semibold text-base">Product</p>
            <p className="font-semibold text-base">Subtotal</p>
          </div>
          <div className="w-full border h-0 my-4"></div>
          <div className="flex justify-between gap-2">
            <p className="font-medium text-sm tracking-[-0.14px]">
              Nivea Soft Jar Moisturising Cream x1
            </p>
            <p className="flex items-center font-semibold text-sm tracking-[-0.56px]">
              <TbCurrencyTaka />
              1250.00
            </p>
          </div>
          <div className="w-full border h-0 my-4"></div>
          <div className="flex justify-between gap-2">
            <p className="font-medium text-sm tracking-[-0.14px]">
              Nivea Soft Jar Moisturising Cream x2
            </p>
            <p className="flex items-center font-semibold text-sm tracking-[-0.56px]">
              <TbCurrencyTaka />
              1250.00
            </p>
          </div>
          <div className="w-full border h-0 my-4"></div>
          <div className="flex justify-between">
            <p className="font-medium text-sm">Total</p>
            <p className="flex items-center font-semibold text-sm tracking-[-0.56px]">
              <TbCurrencyTaka />
              3750.00
            </p>
          </div>
          <div className="w-full border h-0 my-4"></div>
          <div className="flex justify-between">
            <p className="font-medium text-sm tracking-[-0.14px]">
              Choose Shipping Method
            </p>
            <p className="flex items-center font-semibold text-sm tracking-[-0.56px]">
              <TbCurrencyTaka />
              50.00
            </p>
          </div>

          <label className=" flex items-center gap-2 my-4 text-sm font-medium text-[#00000099] w-fit h-min">
            <div className="relative flex items-center">
              <input
                {...register("inSidee")}
                type="checkbox"
                checked={isInside}
                onChange={onInside}
                className={` rounded-full h-5 w-5 ${
                  isInside ? "bg-[#F40F6F] text-white" : "bg-white"
                } border border-[#00000040] appearance-none`}
              />
              <BsCheck size={20} className="absolute top-0 text-white" />
            </div>
            Inside Dhaka & Chottogram (min. 60tk)
          </label>

          <label className="flex items-center gap-2 my-4 text-sm font-medium text-[#00000099] w-fit h-min">
            <div className="relative flex items-center">
              <input
                {...register("outSidee")}
                type="checkbox"
                checked={isOutside}
                onChange={onOutsideChange}
                className={` rounded-full h-5 w-5 ${
                  isOutside ? "bg-[#F40F6F] text-white" : "bg-white"
                } border border-[#00000040] appearance-none`}
              />
              <BsCheck size={20} className="absolute top-0 text-white" />
            </div>
            Outside Dhaka & Chottogram (min. 80tk)
          </label>
          <div className="w-full border h-0 my-4"></div>
          <div className="flex justify-between">
            <h3 className="font-semibold text-lg tracking-[-0.18px]">
              Grand Total
            </h3>
            <p className="flex items-center font-semibold text-lg tracking-[-0.72px]">
              <TbCurrencyTaka />
              1205.00
            </p>
          </div>
        </div>

        <h3 className="font-semibold text-base mt-10">Choose Payment Method</h3>
        <label className=" flex items-center gap-2 mt-4 text-sm font-normal text-[#000000CC] w-fit h-min">
          <div className="relative flex items-center">
            <input
              {...register("cash")}
              type="checkbox"
              checked={isCash}
              onChange={() => setCash(!isCash)}
              className={` rounded-full h-6 w-6 ${
                isCash ? "bg-[#F40F6F] text-white" : "bg-white"
              } border border-[#00000040] appearance-none`}
            />
            <BsCheck size={24} className="absolute top-0 text-white" />
          </div>
          Cash on delivery
        </label>
        <p className="text-sm font-medium text-[#00000099] ps-8">
          Pay with cash upon delivery
        </p>

        <label className=" flex items-center gap-2 my-4 text-sm font-normal text-black w-fit h-min mb-10">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={isTermsAndConditions}
              onChange={() => setTermsAndConditions(!isTermsAndConditions)}
              className={` rounded-md h-6 w-6 ${
                isTermsAndConditions ? "bg-[#F40F6F] text-white" : "bg-white"
              } border border-[#00000040] appearance-none`}
            />
            <BsCheckLg
              size={22}
              className="absolute top-0 left-0 text-white inline-block"
            />
          </div>
          <p>
            I’ve read and accept
            <span className="text-[#F40F6F]"> the terms & conditions</span>*
          </p>
        </label>
        {/* <Link to={'/order-confirmed'}>     */}
        <button
          type="submit"
          disabled={!isTermsAndConditions}
          className={`w-full rounded h-12 font-semibold ${
            isTermsAndConditions
              ? " bg-[#F40F6F]  text-white"
              : "text-[#F40F6F] bg-[#FFBFCD] disabled:cursor-not-allowed"
          }`}
        >
          Place Order
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default YourOrder;
