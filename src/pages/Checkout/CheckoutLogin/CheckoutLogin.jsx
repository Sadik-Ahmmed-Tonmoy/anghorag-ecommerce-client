import { BsPerson } from "react-icons/bs";
import { AiOutlineDown } from "react-icons/ai";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaStarOfLife } from "react-icons/fa";
import axios from "axios";
import { addToLocalStorage } from "../../../utilities/addToLocalStorage";
import Swal from "sweetalert2";
import useAuthUser from "../../../hooks/useAuthUser";
import CheckoutLoginCompo from "../CheckoutLoginAndSignup/CheckoutLoginCompo/CheckoutLoginCompo";
import CheckoutSignupCompo from "../CheckoutLoginAndSignup/CheckoutSignupCompo/CheckoutSignupCompo";

const CheckoutLogin = () => {
  // const [showLogin, setShowLogin] = useState(true);
  const [isLogIn, setIsLogIn] = useState(true);
  // const [errorFromAPI, setErrorFromAPI] = useState(null);
  // const { userData, userRefetch } = useAuthUser();
  //

  // const {
  //     register,
  //     handleSubmit,
  //     formState: { errors },
  //     watch,
  // } = useForm();
  // const password = watch("password", "");

  // const onSubmit = (data) => {
  //     if (isLogIn) {
  //         handleLogin(data);
  //     } else {
  //         handleRegistration(data);
  //     }
  // };

  // const handleLogin = (data) => {
  //     axios
  //         .post("login", data)
  //         .then((res) => {
  //             if (res.data.success === true) {
  //                 userRefetch();
  //                 addToLocalStorage(res.data.data.token);
  //
  //                 Swal.fire({
  //                     position: "center",
  //                     icon: "success",
  //                     title: "Login successful",
  //                     showConfirmButton: false,
  //                     timer: 1500,
  //                 });
  //             } else {
  //
  //                 // Handle other cases if needed
  //             }
  //         })
  //         .catch((error) => {
  //             let errorMessageList = error.response.data.data;
  //
  //             setErrorFromAPI(errorMessageList);
  //             // Handle errors from the API call
  //         });
  // };

  // const handleRegistration = (data) => {
  //
  //     axios
  //         .post("register", data)
  //         .then((res) => {
  //             if (res.data.success === true) {
  //                 addToLocalStorage(res.data.data.token);
  //                 userRefetch();
  //                 Swal.fire({
  //                     position: "center",
  //                     icon: "success",
  //                     title: "Registration successful",
  //                     showConfirmButton: false,
  //                     timer: 1500,
  //                 });
  //             } else {
  //
  //                 // Handle other cases if needed
  //             }
  //         })
  //         .catch((error) => {
  //             let errorMessageList = error.response.data.data;
  //             setErrorFromAPI(errorMessageList);
  //             // Handle errors from the API call
  //         });
  // };

  return (
    <div className="mb-3 md:mb-7 ">
      <CheckoutSignupCompo setIsLogIn={setIsLogIn} />
    </div>
    // <div className="mb-3 md:mb-7 ">
    //     {isLogIn ? (
    //       <CheckoutLoginCompo setIsLogIn={setIsLogIn}/>
    //     ) : (
    //        <CheckoutSignupCompo setIsLogIn={setIsLogIn}/>
    //     )}
    // </div>
  );
};

export default CheckoutLogin;
