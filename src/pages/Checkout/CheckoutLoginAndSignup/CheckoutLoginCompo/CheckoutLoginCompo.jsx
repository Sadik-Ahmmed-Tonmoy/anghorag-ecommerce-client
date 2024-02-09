/* eslint-disable react/prop-types */
import React, { useState } from "react";
import useAuthUser from "../../../../hooks/useAuthUser";
import { useForm } from "react-hook-form";
import axios from "axios";
import { addToLocalStorage } from "../../../../utilities/addToLocalStorage";
import Swal from "sweetalert2";
import { BsPerson } from "react-icons/bs";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const CheckoutLoginCompo = ({ setIsLogIn }) => {
  const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);
    const [errorFromAPI, setErrorFromAPI] = useState(null);
    const { userData, userRefetch } = useAuthUser();
    const [loginLoading, setLoginLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setLoginLoading(true);
        axios
            .post("login", data)
            .then((res) => {
                setLoginLoading(false);
                
                if (res.data.success === true) {
                    userRefetch();
                    addToLocalStorage(res.data.data.token);

                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Login successful",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/checkout")
                } else {
                    // Handle other cases if needed
                    setLoginLoading(false);
                }
            })
            .catch((error) => {
                let errorMessageList = error.response.data.data;
                setLoginLoading(false);
                setErrorFromAPI(errorMessageList);
                // Handle errors from the API call
            });
    };

    return (
        <div className="mb-2">
            <div className="bg-[#FFF1F4] text-black">
                <p className="flex flex-wrap gap-2 items-center ps-2 md:ps-3 py-5 w-full">
                    <BsPerson size={22} />
                    <span className="whitespace-nowrap font-normal text-base opacity-80 text-center">Not logged in?</span>{" "}
                    <span
                        className="whitespace-nowrap font-semibold text-base flex gap-x-2 hover:cursor-pointer"
                        onClick={() => setShowLogin(!showLogin)}
                    >
                        Click here to Login {showLogin ? <MdKeyboardArrowUp size={25} /> : <MdKeyboardArrowDown size={25} />}
                    </span>
                </p>
            </div>
            {showLogin && (
                <div className="w-full rounded-lg border p-2 md:p-4 mt-2 text-black">
                    <p className="font-normal text-sm mb-6">If you didn’t Logged in, Please Log in first</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className=" md:mb-6 w-full">
                            <label>
                                <span className="label-text flex font-medium mb-1 text-black">Email</span>
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
                            {errors.email && errors.email.type === "pattern" && <p className="text-red-500">Please enter a valid email address</p>}
                            {errorFromAPI?.error && <p className="text-red-500">{errorFromAPI.error}</p>}
                        </div>
                        <div className=" md:mb-6">
                            <label className="mb-3">
                                <span className="label-text flex font-medium mb-1  text-black">Password</span>
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
                                <p className="text-red-500">Password must be at least 8 characters long</p>
                            )}
                        </div>
                        <div className=" mt-6 md:mb-9 flex items-center gap-3 text-xs">
                            {loginLoading ? (
                                <div className="w-[125px] flex justify-center">
                                    <span className="loading loading-bars loading-lg text-[#F40F6F]"></span>
                                </div>
                            ) : (
                                <button type="submit" className="w-[125px] h-10 rounded bg-[#F40F6F] text-white">
                                    Log in
                                </button>
                            )}

                            <div>
                                Don't have an account? {/* <Link to="/checkout/register"> */}
                                <button onClick={() => setIsLogIn(false)} className="text-blue-500 underline">
                                    Click here to register
                                </button>
                                {/* </Link> */}
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default CheckoutLoginCompo;
