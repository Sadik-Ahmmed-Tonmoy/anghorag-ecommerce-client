import signupBG from "../../assets/signUp/signUp.png";
import logo from "../../assets/login/logo.png";
import { useForm } from "react-hook-form";
import { FaStarOfLife } from "react-icons/fa";
import { BiChevronLeft } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ForgotPassword = () => {
  const [errorFromAPI, setErrorFromAPI] = useState(null);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // 
    sessionStorage.setItem("phone", data.phone);

    axiosSecure
      .post("send-reset-password-sms", data)
      .then((res) => {
        if (res.data.success === true) {
          //
          navigate("/otpVerification");
        } else {
          
        }
      })
      .catch((error) => {
        let errorMessageList = error.response.data.data;
        //
        setErrorFromAPI(errorMessageList);
        //console.error('Error during registration:', error);
        // Handle errors from the API call
      });
  };

  return (
    <div className="flex bg-white text-black h-screen relative px-2 md:px-0">
      <div className="h-screen w-4/12 hidden md:block">
        <div
          className="flex justify-center h-full bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('${signupBG}')` }}
        >
          <div className="pt-[10%] w-9/12 flex flex-col">
            <div className="md:mb-[14%] lg:mb-[8%]">
              <img className="md:w-11/12 lg:w-8/12" src={logo} alt="" />
            </div>
            <h5 className="text-black text-2xl lg:text-4xl 2xl:text-5xl font-semibold">
              We Offer the Best Products
            </h5>
          </div>
        </div>
      </div>
      <div className=" h-full w-full md:w-7/12">
        <div className=" px-2 md:ps-7 w-full md:w-6/12 flex justify-end items-center   mt-[8%] md:mt-[5%] absolute right-0 md:right-24">
          <span className="flex justify-between items-center  w-full">
            <Link to={"/login"}>
              <BiChevronLeft size={40} className="border rounded-lg" />
            </Link>
            <div className="flex items-center gap-2 md:gap-6">
              <p className="font-medium text-sm">Already A member?</p>
              <Link to={"/login"}>
                <button className="bg-[#F40F6F] w-[110px] h-[42px] rounded-md text-white text-sm">
                  Sign In
                </button>
              </Link>
            </div>
          </span>
        </div>

        <div className="flex justify-center items-center  h-full">
          <div className="flex flex-col w-full md:w-10/12 lg:w-7/12">
            <h4 className="text-2xl font-semibold mb-8 text-black">
              Forgot Password?
            </h4>

            <form onSubmit={handleSubmit(onSubmit)}>
              <h4 className="mb-3 text-sm font-medium text-[#666666]">
                Enter the phone number you used when you joined and we’ll send
                you instructions to reset your password.
              </h4>
              <div className="md:w-8/12 md:mb-6">
                <label>
                  <span className="label-text flex font-medium mb-1 text-black">
                    Phone
                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                  </span>
                </label>
                <input
                  {...register("phone", {
                    required: true,
                    pattern: /^[0-9\b]+$/, // Validation for numeric input (phone number)
                    minLength: 11, // Example: Minimum length for a phone number
                    maxLength: 11, // Example: Maximum length for a phone number
                  })}
                  onChange={() => setErrorFromAPI(null)}
                  type="tel" // Use type="tel" for phone number input
                  placeholder="Enter your mobile number"
                  className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf]"
                />
                {errors.phone && errors.phone.type === "required" && (
                  <p className="text-red-500">Phone number is required</p>
                )}
                {errors.phone && errors.phone.type === "pattern" && (
                  <p className="text-red-500">
                    Please enter a valid phone number
                  </p>
                )}
                {errors.phone && errors.phone.type === "minLength" && (
                  <p className="text-red-500">
                    Phone number should have at least 11 digits
                  </p>
                )}
                {errors.phone && errors.phone.type === "maxLength" && (
                  <p className="text-red-500">
                    Phone number should have at most 11 digits
                  </p>
                )}
                {errorFromAPI?.error && (
                  <p className="text-red-500">{errorFromAPI.error}</p>
                )}
              </div>
              <div className="form-control mt-6 md:mb-9">
                {/* <Link to={'/otpVerification'}> */}
                <button
                  type="submit"
                  className="py-3 rounded bg-[#F40F6F] text-white md:w-8/12"
                >
                  Send reset instructions
                </button>
                {/* </Link> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
