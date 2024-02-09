/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { addGrandTotalToSession } from "../../../utilities/addGrandTotalToSession";
import { ProviderContext } from "../../../provider/Provider";
import { saveToSessionStorage } from "../../../utilities/saveToSessionStorage";

const Coupon = ({
  grandTotal,
  setAfterAppliedCoupon,
  loadCoupon,
  setLoadCoupon,
}) => {
  const successNotify = () => toast.success("Coupon applied successfully");
  const errorNotify = () => toast.error("Wrong Coupon");
  // const [isWrongCoupon, setIsWrongCoupon] = useState(null);
  const { isCouponReload, setIsCouponReload, isWrongCoupon, setIsWrongCoupon } =
    useContext(ProviderContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    const requestData = {
      coupon_code: formData.coupon_code,
      subtotal: grandTotal,
    };
    setLoadCoupon(true);
    axios
      .post("apply_coupon", requestData)
      .then((res) => {
        if (res.data.success === true) {
          saveToSessionStorage("applied_coupon", requestData);
          setAfterAppliedCoupon(res.data.data);
          addGrandTotalToSession(res.data.data);
          setIsCouponReload(!isCouponReload);
          setLoadCoupon(false);
          successNotify();
          setIsWrongCoupon(false);
        } else if (res.data.success === false) {
          errorNotify();
          setLoadCoupon(false);
          setIsWrongCoupon(true);
          setAfterAppliedCoupon(null);
        } else {
          // Handle other cases if needed
        }
      })
      .catch((error) => {});
  };

  return (
    <div className=" md:w-5/12 h-min mb-6">
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 w-full">
        <input
          {...register("coupon_code")}
          type="text"
          placeholder="Enter coupon code"
          className="w-full bg-white border-b-2 text-black outline-none"
        />
        <button
          type="submit"
          className="border rounded border-[#913BDB] text-[#913BDB] py-2 px-4 lg:py-3 lg:px-6 font-medium text-sm"
        >
          Apply
        </button>
      </form>
      {loadCoupon && (
        <div className=" flex justify-center">
          <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto"></span>
        </div>
      )}
      {isWrongCoupon && (
        <div className=" flex justify-center">
          <span className=" text-[#F40F6F] mx-auto">Wrong coupon code</span>
        </div>
      )}
      {isWrongCoupon === false && (
        <div className=" flex justify-center">
          <span className=" text-[#913BDB] mx-auto">Coupon applied</span>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default Coupon;
