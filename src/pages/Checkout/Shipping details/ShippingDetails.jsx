import { useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";

const ShippingDetails = () => {
    const [isChecked, setIsChecked] = useState(false);

    const onCheck = () => {
        setIsChecked(!isChecked);
    };
    return (
        <div>
            <h3 className="text-2xl font-medium text-black leading-[40px] text-[#000000CC] mb-3 md:mb-6">
                Shipping details
            </h3>

            {/*create account checkbox */}
            <label className=" flex items-center gap-2 my-4 text-sm font-normal text-[#000000CC] w-fit h-min">
                <div className="relative flex items-center">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={onCheck}
                        className={` rounded-md h-6 w-6 ${
                            isChecked ? "bg-[#F40F6F] text-white" : "bg-white"
                        } border border-[#00000040] appearance-none`}
                    />
                    <BsCheckLg
                        size={22}
                        className="absolute top-0 text-white"
                    />
                </div>
                Ship to a different address?
            </label>
            {/*create account checkbox */}

            <>
                {isChecked && (
                    <div>
                        <form>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                                <div className="mb-3 md:mb-6">
                                    <label>
                                        <span className="text-sm flex font-medium mb-3 text-black">
                                            First Name
                                            <FaStarOfLife
                                                size={6}
                                                className="text-[#F40F6F]"
                                            />
                                        </span>
                                    </label>
                                    <input
                                        //   {...register("firstName", { required: true })}
                                        type="text"
                                        placeholder="First name"
                                        className="p-3 text-sm w-full rounded-sm bg-white text-black border border-[#00000040]"
                                        required
                                    />
                                </div>
                                <div className=" mb-3 md:mb-6">
                                    <label>
                                        <span className="text-sm flex font-medium mb-3 text-black">
                                            Last Name
                                            <FaStarOfLife
                                                size={6}
                                                className="text-[#F40F6F]"
                                            />
                                        </span>
                                    </label>
                                    <input
                                        //   {...register("lastName", { required: true })}
                                        type="text"
                                        placeholder="Last name"
                                        className="p-3 text-sm w-full rounded-sm bg-white text-black border border-[#00000040]"
                                        required
                                    />
                                </div>
                                <div className=" mb-3 md:mb-6">
                                    <label>
                                        <span className="text-sm flex font-medium mb-3 text-black">
                                            Phone
                                            <FaStarOfLife
                                                size={6}
                                                className="text-[#F40F6F]"
                                            />
                                        </span>
                                    </label>
                                    <input
                                        //   {...register("phoneNumber", { required: true })}
                                        type="number"
                                        placeholder="Phone number"
                                        className="p-3 text-sm w-full rounded-sm bg-white text-black border border-[#00000040]"
                                        required
                                    />
                                </div>
                                <div className=" mb-3 md:mb-6">
                                    <label>
                                        <span className="text-sm flex font-medium mb-3 text-black">
                                            Email (Optional)
                                        </span>
                                    </label>
                                    <input
                                        //   {...register("email")}
                                        type="email"
                                        placeholder="Email"
                                        className="p-3 text-sm w-full rounded-sm bg-white text-black border border-[#00000040]"
                                        required
                                    />
                                </div>
                                <div className="mb-3 md:mb-6">
                                    <label>
                                        <span className="text-sm flex font-medium mb-3 text-black">
                                            District
                                            <FaStarOfLife
                                                size={6}
                                                className="text-[#F40F6F]"
                                            />
                                        </span>
                                    </label>
                                    <input
                                        //   {...register("district", { required: true })}
                                        type="text"
                                        placeholder="Choose district"
                                        className="p-3 text-sm w-full rounded-sm bg-white text-black border border-[#00000040]"
                                        required
                                    />
                                </div>
                                <div className="mb-3 md:mb-6">
                                    <label>
                                        <span className="text-sm flex font-medium mb-3 text-black">
                                            Area (Optional)
                                        </span>
                                    </label>
                                    <input
                                        //   {...register("area", { required: true })}
                                        type="text"
                                        placeholder="Enter your area"
                                        className="p-3 text-sm w-full rounded-sm bg-white text-black border border-[#00000040]"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3 md:mb-6">
                                <label>
                                    <span className="text-sm flex font-medium mb-3 text-black">
                                        Address
                                        <FaStarOfLife
                                            size={6}
                                            className="text-[#F40F6F]"
                                        />
                                    </span>
                                </label>
                                <input
                                    // {...register("address", { required: true })}
                                    type="text"
                                    placeholder="Enter your detailed address"
                                    className="p-3 text-sm w-full rounded-sm bg-white text-black border border-[#00000040]"
                                    required
                                />
                            </div>
                        </form>
                    </div>
                )}
            </>
        </div>
    );
};

export default ShippingDetails;
