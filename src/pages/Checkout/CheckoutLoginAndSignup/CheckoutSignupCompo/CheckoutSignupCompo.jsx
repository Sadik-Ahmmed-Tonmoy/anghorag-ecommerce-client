import React, { useState } from "react";
import useAuthUser from "../../../../hooks/useAuthUser";
import { useForm } from "react-hook-form";
import axios from "axios";
import { addToLocalStorage } from "../../../../utilities/addToLocalStorage";
import Swal from "sweetalert2";
import { FaStarOfLife } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CheckoutSignupCompo = ({ setIsLogIn }) => {
  const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);
    const [errorFromAPI, setErrorFromAPI] = useState(null);
    const { userData, userRefetch } = useAuthUser();
    const [signupLoading, setSignupLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const password = watch("password", "");

    const onSubmit = (data) => {
        setSignupLoading(true);
        axios
            .post("register", data)
            .then((res) => {
                setSignupLoading(false);
                if (res.data.success === true) {
                    addToLocalStorage(res.data.data.token);
                    userRefetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Registration successful",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/checkout")
                } else {
                    // Handle other cases if needed
                    setSignupLoading(false);
                }
            })
            .catch((error) => {
                let errorMessageList = error.response.data.data;
                setErrorFromAPI(errorMessageList);
                // Handle errors from the API call
                setSignupLoading(false);
            });
    };

    return (
        <div className="rounded-lg border p-2 md:p-4 mb-2">
            <h2 className="font-semibold text-2xl mb-3">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid lg:grid-cols-2 gap-x-5 gap-y-5 md:gap-y-0">
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
                        {errors.first_name && errors.first_name.type === "required" && <span className="text-red-600">This field is required</span>}
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
                        {errors.last_name && errors.last_name.type === "required" && <span className="text-red-600">This field is required</span>}
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
                        {errors.phone && errors.phone.type === "pattern" && <p className="text-red-500">Phone number must be 11 characters</p>}
                        {errors.phone && errors.phone.type === "required" && <span className="text-red-600">This field is required</span>}
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
                        {errors.email && errors.email.type === "pattern" && <p className="text-red-500">Please enter a valid email address</p>}
                        {errors.email && errors.email.type === "required" && <span className="text-red-600">This field is required</span>}
                        {errorFromAPI?.email && <p className="text-red-500">{errorFromAPI?.email} || The email has already been taken</p>}
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
                            <p className="text-red-500">Password must be at least 8 characters long</p>
                        )}
                        {errors.password && errors.password.type === "required" && <span className="text-red-600">This field is required</span>}
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
                                validate: (value) => value === password || "Passwords do not match", // Validation to compare with the 'password' field
                            })}
                            type="password"
                            placeholder="Re-type your password"
                            className="p-2 w-full rounded-sm bg-white border-[0.5px] border-[#bfbfbf]"
                        />
                        {errors.c_password && <p className="text-red-500">{errors.c_password.message}</p>}
                    </div>
                </div>
                <div className=" md:mb-9 flex items-center gap-3 w-full my-2 text-xs">
                    {signupLoading ? (
                        <div className="w-[125px] flex justify-center">
                            <span className="loading loading-bars loading-lg text-[#F40F6F]"></span>
                        </div>
                    ) : (
                        <button type="submit" className="w-[125px] h-10 rounded bg-[#F40F6F] text-white">
                            Sign Up
                        </button>
                    )}

                    <div>
                        Already have an account?
                        <button onClick={() => setIsLogIn(true)} className="text-blue-500 underline ms-1">
                            Click here to login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutSignupCompo;
