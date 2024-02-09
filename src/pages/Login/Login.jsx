import { Link, useNavigate } from "react-router-dom";
import login from "../../assets/login/login.png";
import logo from "../../assets/login/logo.png";
import { useForm } from "react-hook-form";
import { FaStarOfLife } from "react-icons/fa";
import axios from "axios";
import { addToLocalStorage } from "../../utilities/addToLocalStorage";
import Swal from "sweetalert2";
import { useState } from "react";

const Login = () => {
  const [errorFromAPI, setErrorFromAPI] = useState(null);
  //

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios
      .post("login", data)
      .then((res) => {
        if (res.data.success === true) {
          addToLocalStorage(res.data.data.token);

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login successful",
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
    <div className="flex bg-white text-black h-screen relative px-2 md:px-0">
      <div className="h-screen w-4/12 hidden md:block">
        <div
          className="flex justify-center h-full bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('${login}')` }}
        >
          <div className="pt-[10%] w-9/12 flex flex-col">
            <div className="md:mb-[16%] lg:mb-[18%]">
              <img className="md:w-11/12 lg:w-8/12 " src={logo} alt="" />
            </div>
            <h5 className="text-black text-2xl lg:text-4xl 2xl:text-5xl font-semibold">
              We Offer the Best Products
            </h5>
          </div>
        </div>
      </div>
      <div className=" h-full w-full md:w-7/12">
        <div className="flex justify-end items-center gap-6  mt-[10%] md:mt-[5%] absolute right-8 md:right-24">
          <p className="font-medium text-sm">Not a member?</p>
          <Link to={"/signup"}>
            <button className="bg-[#F40F6F] w-[110px] h-[42px] rounded-md text-white text-sm">
              Sign Up
            </button>
          </Link>
        </div>

        <div className="flex justify-center items-center  h-full">
          <div className="flex flex-col w-full md:w-10/12 lg:w-7/12">
            <h4 className="text-2xl font-semibold mb-8 text-black">
              Sign in to Anghorag
            </h4>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3 md:mb-6 w-full">
                <label>
                  <span className="label-text flex font-medium mb-1 text-black">
                    Email
                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                  </span>
                </label>
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for basic email format validation
                  })}
                  type="email"
                  onChange={() => setErrorFromAPI(null)}
                  placeholder="Enter your email"
                  className="p-2 w-full border rounded-sm bg-white text-black"
                />
                {errors.email && errors.email.type === "pattern" && (
                  <p className="text-red-500">
                    Please enter a valid email address
                  </p>
                )}
                {errorFromAPI?.error && (
                  <p className="text-red-500">{errorFromAPI.error}</p>
                )}
              </div>
              <div className="mb-3 md:mb-6 w-full">
                <label className="mb-3">
                  <span className="label-text flex font-medium mb-1 text-black">
                    Password
                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                  </span>
                </label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 8, // Minimum password length requirement (example: 8 characters)
                  })}
                  onChange={() => setErrorFromAPI(null)}
                  type="password"
                  placeholder="Enter password"
                  className="p-2 w-full  border rounded-sm bg-white text-black"
                />
                {errors.password && errors.password.type === "minLength" && (
                  <p className="text-red-500">
                    Password must be at least 8 characters long
                  </p>
                )}
              </div>
              <div className="form-control md:mb-9">
                <button
                  type="submit"
                  className=" bg-[#F40F6F] text-white border rounded px-2 py-3 font-semibold hover:text-[#F40F6F] hover:bg-[#FFBFCD] hover:cursor-pointer"
                >
                  Sign In
                </button>
              </div>
              <Link to={"/forgotPassword"}>
                <p className="text-[#F40F6F] text-center hover:cursor-pointer">
                  Forgot Password?
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
