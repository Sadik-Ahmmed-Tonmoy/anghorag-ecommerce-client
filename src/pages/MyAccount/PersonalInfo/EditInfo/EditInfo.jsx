import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { FaStarOfLife } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuthUser from "../../../../hooks/useAuthUser";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const EditInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const { userData } = useAuthUser();
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setValue("first_name", userData.first_name && userData.first_name);
    setValue("last_name", userData.last_name && userData.last_name);
    setValue("phone", userData.phone && userData.phone);
    setValue("email", userData.email && userData.email);
  }, [setValue, userData]);

  useEffect(() => {
    if (userData && userData.first_name) {
      setFirstName(userData.first_name);
    }
    if (userData && userData.last_name) {
      setLastName(userData.last_name);
    }
    if (userData && userData.phone) {
      setPhone(userData.phone);
    }
    if (userData && userData.email) {
      setEmail(userData.email);
    }
  }, [userData]);

  const new_password = watch("new_password", "");
  const [errorFromAPI, setErrorFromAPI] = useState(null);
  //
  //
  // const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const onSubmit = (formData) => {
    setLoading(true);
    let newData = {
      ...formData,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
    };

    axiosSecure
      .post("update_users_profile", newData)
      .then((res) => {
        if (res.data.success === true) {
          // addToLocalStorage(res.data.data.token);
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${res.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/my-account/personal-info/view");
          setLoading(false);
        } else {
          // Handle other cases if needed
        }
      })
      .catch((error) => {
        let errorMessageList = error.response.data.message;
        //
        setErrorFromAPI(errorMessageList);
        setLoading(false);
        //console.error('Error during registration:', error);
        // Handle errors from the API call
      });
  };

  return (
    <div className="md:w-10/12 lg:w-9/12">
      <div className="mb-8">
        <h2 className="font-semibold text-2xl tracking-[0.48px] leading-[33.5px]">
          Personal Info
        </h2>
      </div>

      {/* form data start */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex justify-between gap-5">
            <div className="mb-3 md:mb-6 w-full">
              <label>
                <span className="text-sm flex font-medium mb-3 text-black">
                  First Name
                  <FaStarOfLife size={6} className="text-[#F40F6F]" />
                </span>
              </label>
              <input
                {...register("first_name", { required: true })}
                defaultValue={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                type="text"
                placeholder="First name"
                className="px-3 py-[12px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
              />
              {errors.first_name && (
                <p className="text-red-500  font-normal mt-1">
                  First Name is required.
                </p>
              )}
            </div>
            <div className="mb-3 md:mb-6 w-full">
              <label>
                <span className="text-sm flex font-medium mb-3 text-black">
                  Last Name
                  <FaStarOfLife size={6} className="text-[#F40F6F]" />
                </span>
              </label>
              <input
                {...register("last_name", { required: true })}
                defaultValue={lastName}
                onChange={(event) => setLastName(event.target.value)}
                type="text"
                placeholder="Last Name"
                className="px-3 py-[12px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
              />
              {errors.last_name && (
                <p className="text-red-500  font-normal mt-1">
                  Last Name is required.
                </p>
              )}
            </div>
          </div>
          <div className=" mb-3 md:mb-6">
            <label>
              <span className="text-sm flex font-medium mb-3 text-black">
                Phone Number
                <FaStarOfLife size={6} className="text-[#F40F6F]" />
              </span>
            </label>
            <input
              {...register("phone", {
                required: true,
                pattern: /^\d{11}$/, // Regular expression for exactly 11 digits
              })}
              defaultValue={phone}
              onChange={(event) => setPhone(event.target.value)}
              type="number"
              placeholder="Phone Number"
              className="px-3 py-[12px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
            />
            {errors.phone && errors.phone.type === "required" && (
              <p className="text-red-500  font-normal mt-1">
                Phone number is required.
              </p>
            )}
            {errors.phone && errors.phone.type === "pattern" && (
              <p className="text-red-500  font-normal mt-1">
                Phone number must be 11 characters
              </p>
            )}
          </div>
          <div className=" mb-3">
            <label>
              <span className="text-sm flex font-medium mb-3 text-black">
                Email Address
              </span>
            </label>
            <input
              {...register("email", {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for basic email format validation
              })}
              defaultValue={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Your Email"
              className="px-3 py-[12px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
            />
            {errors.email && errors.email.type === "pattern" && (
              <p className="text-red-500  font-normal mt-1">
                Please enter a valid email address
              </p>
            )}
            {/* {errorFromAPI?.email && (
                            <p className="text-red-500  font-normal mt-1">
                                The email has already been taken
                            </p>
                        )} */}
          </div>
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>{" "}
            <p className="font-normal text-[10px] text-[#000000CC]">
              This email will be displayed in the account section and in reviews
            </p>
          </div>
          <h4 className="font-semibold text-base my-8">Password Change</h4>
          <div className=" mb-3 md:mb-6">
            <label>
              <span className="text-sm flex font-medium mb-3 text-black">
                Password
              </span>
            </label>
            <input
              {...register("current_password", {
                // required: true,
                minLength: 8,
              })}
              type="password"
              placeholder="Your Password"
              className="px-3 py-[12px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
            />
          </div>
          <div className=" mb-3 md:mb-6">
            <label>
              <span className="text-sm flex font-medium mb-3 text-black">
                New Password
              </span>
            </label>
            <input
              {...register("new_password", {
                // required: true,
                minLength: 8, // Minimum password length of 8 characters
              })}
              type="password"
              placeholder="Enter new password"
              className="px-3 py-[12px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
            />
            {errors.new_password &&
              errors.new_password.type === "minLength" && (
                <p className="text-red-500  font-normal mt-1">
                  Password must be at least 8 characters long
                </p>
              )}
          </div>
          <div className=" mb-3 md:mb-9">
            <label>
              <span className="text-sm flex font-medium mb-3 text-black">
                Confirm New Password
              </span>
            </label>
            <input
              {...register("c_password", {
                // required: true,
                validate: (value) =>
                  value === new_password || "Passwords do not match", // Validation to compare with the 'password' field
              })}
              type="password"
              placeholder="Re-type new password"
              className="px-3 py-[12px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
            />
            {errors.c_password && (
              <p className="text-red-500  font-normal mt-1">
                {errors.c_password.message}
              </p>
            )}
          </div>
          {errorFromAPI && (
            <p className="text-red-500  font-normal mb-2">{errorFromAPI}</p>
          )}
          {loading ? (
            <div className=" py-3 px-9 rounded-[4px] font-semibold text-white mb-10 md:mb-24">
              <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto"></span>
            </div>
          ) : (
            <button
              type="submit"
              className={
                "py-3 px-9 rounded-[4px] font-semibold bg-[#F40F6F] text-white mb-10 md:mb-24 hover:cursor-pointer"
              }
            >
              Save Changes
            </button>
          )}{" "}
        </form>
      </div>
      {/* form data end */}
    </div>
  );
};

export default EditInfo;
