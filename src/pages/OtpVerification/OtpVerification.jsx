import signupBG from "../../assets/signUp/signUp.png";
import logo from "../../assets/login/logo.png";
import { useForm } from "react-hook-form";
import { FaStarOfLife } from "react-icons/fa";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import axios from "axios";
import useAuthUser from "../../hooks/useAuthUser";
import toast, { Toaster } from "react-hot-toast";

const OtpVerification = () => {
  // const [otp, setOTP] = useState(["", "", "", "", ""]); // Array to store OTP digits
  // const [error, setError] = useState(false); // State to handle error
  const navigate = useNavigate();

  const { userData, refetch } = useAuthUser();

  const [otp, setOTP] = useState(["", "", "", "", ""]);
  const [error, setError] = useState(false);

  const handleInputChange = (index, value) => {
      if (value === "" || value.match(/^[0-9]+$/)) {
          setError(false); // Reset error if the input is a number or empty

          const newOTP = [...otp];
          newOTP[index] = value;

          // Allow changing the input number when backspace is pressed
          if (value === "" && index > 0) {
              // If the current input is empty and not the first digit, move focus to the previous input field
              document.getElementById(`otp-input-${index - 1}`).focus();
          } else if (value !== "" && index < 4) {
              // If the input is not empty and not the last digit, move focus to the next input field
              document.getElementById(`otp-input-${index + 1}`).focus();
          }

          setOTP(newOTP);
      }
  };

  // Handle input change for OTP digits
  // const handleInputChange = (index, value) => {
  //     if (value.match(/^[0-9]+$/)) {
  //         setError(false); // Reset error if the input is a number
  //         const newOTP = [...otp];
  //         newOTP[index] = value;
  //         setOTP(newOTP);

  //         // Auto-focus on the next input field if available
  //         if (value !== '' && index < 4) {
  //             document.getElementById(`otp-input-${index + 1}`).focus();
  //         }
  //     }
  // };

  // const handleInputChange = (index, value) => {
  //   if (value === "" || value.match(/^[0-9]+$/)) {
  //     setError(false); // Reset error if the input is a number or empty

  //     const newOTP = [...otp];
  //     newOTP[index] = value;

  //     // Allow changing the input number when backspace is pressed
  //     if (value === "" && index > 0) {
  //       // If the current input is empty and not the first digit, move focus to the previous input field
  //       document.getElementById(`otp-input-${index - 1}`).focus();
  //     } else if (value !== "" && index < 4) {
  //       // If the input is not empty and not the last digit, move focus to the next input field
  //       document.getElementById(`otp-input-${index + 1}`).focus();
  //     }

  //     setOTP(newOTP);
  //   }
  // };
  const phone = sessionStorage.getItem("phone");
  const successNotify = () => toast.success("Password updated successfully, please login");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all OTP digits are entered
    const isFilled = otp.every((digit) => digit !== "");
    if (isFilled) {
      // Here, you can send the OTP to the server for verification or handle it as needed
      const enteredOTP = otp.join("");
      // 
      

      axios
        .post("verified", { otp: enteredOTP, phone: phone })
        .then((res) => {
          
          if(res.data.success === true){
            
            successNotify();
            // refetch();
            navigate("/login");
           
            // navigate("/");
          } else {
            // Handle other cases if needed
          }
        })
        .catch((error) => {
          // let errorMessageList = error.response.data.data;
          //
          // setErrorFromAPI(errorMessageList);
          //console.error('Error during registration:', error);
          // Handle errors from the API call
        });
    } else {
      setError(true); // Display error if OTP is incomplete
    }
  };

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm();
  // const onSubmit = (data) =>

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
        <div className="px-2 md:ps-7 w-full md:w-6/12 flex justify-end items-center   mt-[8%] md:mt-[5%] absolute right-0 md:right-24">
          <span className="flex justify-between items-center  w-full">
            <Link to={"/forgotPassword"}>
              <BiChevronLeft size={40} className="border rounded-lg" />
            </Link>
          </span>
        </div>

        <div className="flex justify-center items-center  h-full">
          <div className="flex flex-col w-full md:w-10/12 lg:w-7/12">
            <h4 className="text-2xl font-semibold mb-8 text-black">
              OTP Verification
            </h4>

            <form onSubmit={handleSubmit}>
              <h4 className="mb-3 text-sm font-medium text-[#666666]">
                Enter the 5-digit verification code which we sent to your given
                phone number (01xxxxxxxxx).
              </h4>
              <div className="w-7/12 md:mb-6">
                <label>
                  <span className=" flex font-medium text-sm mb-1">
                    Verification Code
                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                  </span>
                </label>
                <div className="flex">
                  {/* <OTPInput
                    className="bg-white"
                    value={OTP}
                    onChange={setOTP}
                    autoFocus
                    OTPLength={5}
                    otpType="number"
                    disabled={false}
                    secure
                  />
                  <ResendOTP
                    onResendClick={() => 
                  /> */}

                  {otp.map((digit, index) => (
                    <input
                      className="bg-white me-4 rounded-sm w-9 h-8 border text-center"
                      key={index}
                      id={`otp-input-${index}`}
                      type="number"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                  ))}
                </div>
              </div>
              <div className="form-control mt-6 md:mb-9">
                <button
                  type="submit"
                  className="py-3 bg-[#F40F6F] text-white border w-7/12 rounded font-medium text-sm"
                >
                  Verify Code
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default OtpVerification;
