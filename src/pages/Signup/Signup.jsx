import signupBG from "../../assets/signUp/signUp.png";
import logo from "../../assets/login/logo.png";
import { useForm } from "react-hook-form";
import { FaStarOfLife } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { addToLocalStorage } from "../../utilities/addToLocalStorage";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch("password", "");
  const [errorFromAPI, setErrorFromAPI] = useState(null);
  // const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post("register", data)
      .then((res) => {
        if (res.data.success === true) {
          addToLocalStorage(res.data.data.token);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registration successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        } else {
          // Handle other cases if needed
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
    <div className="flex bg-white text-black md:h-screen relative px-2 md:px-0">
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
        <div className="flex justify-end items-center gap-6  my-[6%] md:mt-[5%] md:absolute right-8 md:right-24">
          <p className="font-medium text-sm">Already A member?</p>
          <Link to={"/login"}>
            <button className="bg-[#F40F6F] w-[110px] h-[42px] rounded-md text-white text-sm">
              Sign In
            </button>
          </Link>
        </div>

        <div className="flex justify-center items-center  h-full">
          <div className="flex flex-col w-full md:w-10/12 lg:w-7/12">
            <h4 className="text-2xl font-semibold mb-8 text-black">
              Create your account
            </h4>

            <form
              className="grid md:grid-cols-2 gap-x-5 gap-y-5 md:gap-y-0"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className=" md:mb-6">
                <label>
                  <span className="flex text-sm font-medium mb-1">
                    First Name
                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                  </span>
                </label>
                <input
                  {...register("first_name", {
                    required: true,
                  })}
                  type="text"
                  placeholder="First name"
                  className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf]"
                  
                />
                { errors.first_name && errors.first_name.type === "required" && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
              </div>
              <div className=" md:mb-6">
                <label>
                  <span className="flex text-sm font-medium mb-1">
                    Last Name
                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                  </span>
                </label>
                <input
                  {...register("last_name", {
                    required: true,
                  })}
                  type="text"
                  placeholder="Last name"
                  className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf]"
               
                />
                 { errors.last_name && errors.last_name.type === "required" && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
              </div>

              <div className="md:mb-6">
                <label>
                  <span className="flex text-sm font-medium mb-1">
                    Phone
                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                  </span>
                </label>
                <input
                  {...register("phone", {
                    required: true,
                    pattern: /^\d{11}$/, // Regular expression for exactly 11 digits
                  })}
                  type="number"
                  placeholder="Phone number"
                  className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf]"
                />
                {errors.phone && errors.phone.type === "pattern" && (
                  <p className="text-red-500">
                    Phone number must be 11 characters
                  </p>
                )}
                 { errors.phone && errors.phone.type === "required" && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
              </div>
              <div className="md:mb-6">
                <label>
                  <span className="flex text-sm font-medium mb-1">
                    Email
                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                  </span>
                </label>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for basic email format validation
                  })}
                  onChange={() => setErrorFromAPI(null)}
                  type="email"
                  placeholder="Enter your email"
                  className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf]"
                />
                {errors.email && errors.email.type === "pattern" && (
                  <p className="text-red-500">
                    Please enter a valid email address
                  </p>
                )}
                 { errors.email && errors.email.type === "required" && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
                {errorFromAPI?.email && (
                  <p className="text-red-500">
                   {errorFromAPI?.email} || The email has already been taken
                  </p>
                )}
              </div>
              <div className="md:mb-6">
                <label>
                  <span className="flex text-sm font-medium mb-1">
                    Password
                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                  </span>
                </label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 8, // Minimum password length of 8 characters
                  })}
                  type="password"
                  placeholder="Enter password"
                  className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf]"
                />
                {errors.password && errors.password.type === "minLength" && (
                  <p className="text-red-500">
                    Password must be at least 8 characters long
                  </p>
                )}
                 { errors.password && errors.password.type === "required" && (
                      <span className="text-red-600">
                        This field is required
                      </span>
                    )}
              </div>
              <div className="md:mb-6">
                <label>
                  <span className="flex text-sm font-medium mb-1">
                    Confirm Password
                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                  </span>
                </label>
                <input
                  {...register("c_password", {
                    required: true,
                    validate: (value) =>
                      value === password || "Passwords do not match", // Validation to compare with the 'password' field
                  })}
                  type="password"
                  placeholder="Re-type your password"
                  className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf]"
                />
                {errors.c_password && (
                  <p className="text-red-500">{errors.c_password.message}</p>
                )}
              </div>
              <div className="form-control mt-6 md:mb-3">
                <button
                  type="submit"
                  className=" bg-[#F40F6F] text-white md:w-10/12 rounded px-2 h-12 font-semibold hover:text-[#F40F6F] hover:bg-[#FFBFCD] hover:cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            </form>
            <p className="text-xs font-normal mt-5 mb-5 md:mb-0">
              By clicking “Sign Up”, I agree to{" "}
              <span className="text-[#F40F6F] hover:cursor-pointer">
                Terms of Use
              </span>{" "}
              and{" "}
              <span className="text-[#F40F6F] hover:cursor-pointer">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
