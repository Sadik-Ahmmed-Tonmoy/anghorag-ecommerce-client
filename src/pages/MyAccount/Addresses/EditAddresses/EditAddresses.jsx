import axios from "axios";
import { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useUserAddress from "../../../../hooks/useUserAddress";
import { SearchSelectLabelLess } from "../../../../components/SearchSelectLabelLess/SearchSelectLabelLess";
import useBillingDetailsCity from "../../../../hooks/useBillingDetailsCity";

const EditAddresses = () => {
    const [loading, setLoading] = useState(false);
    const [selectedBillingCity, setSelectedBillingCity] = useState({});
    const [selectedBillingZone, setSelectedBillingZone] = useState({});
    const [selectedBillingArea, setSelectedBillingArea] = useState({});
    const [selectedShippingCity, setSelectedShippingCity] = useState({});
    const [selectedShippingZone, setSelectedShippingZone] = useState({});
    const [selectedShippingArea, setSelectedShippingArea] = useState({});
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const axiosSecure = useAxiosSecure();
    // const [userAddress, setUserAddress] = useState([]);
    const [bFirstName, setBFirstName] = useState("");
    const [bLastName, setBLastName] = useState("");
    const [bPhone, setBPhone] = useState("");
    const [bEmail, setBEmail] = useState("");
    const [BDistrict, setBDistrict] = useState("");
    const [BArea, setBArea] = useState("");
    const [BAddress, setBAddress] = useState("");

    const [SFirstName, setSFirstName] = useState("");
    const [SLastName, setSLastName] = useState("");
    const [SPhone, setSPhone] = useState("");
    const [SEmail, setSEmail] = useState("");
    const [SDistrict, setSDistrict] = useState("");
    const [SArea, setSArea] = useState("");
    const [SAddress, setSAddress] = useState("");
    const { userAddress, isUserAddressLoading } = useUserAddress();

    useEffect(() => {
        // Set default values after fetching data
        setValue("b_first_name", (userAddress.success === true && userAddress.data.b_first_name) || "");
        setValue("b_last_name", (userAddress.success === true && userAddress.data.b_last_name) || "");
        setValue("b_phone", (userAddress.success === true && userAddress.data.b_phone) || "");
        setValue("b_email", (userAddress.success === true && userAddress.data.b_email) || "");
        setValue("b_district", (userAddress.success === true && userAddress.data.b_district) || "");
        setValue("b_area", (userAddress.success === true && userAddress.data.b_area) || "");
        setValue("b_address", (userAddress.success === true && userAddress.data.b_address) || "");
        setValue("s_first_name", (userAddress.success === true && userAddress.data.s_first_name) || "");
        setValue("s_last_name", (userAddress.success === true && userAddress.data.s_last_name) || "");
        setValue("s_phone", (userAddress.success === true && userAddress.data.s_phone) || "");
        setValue("s_email", (userAddress.success === true && userAddress.data.s_email) || "");
        setValue("s_district", (userAddress.success === true && userAddress.data.s_district) || "");
        setValue("s_area", (userAddress.success === true && userAddress.data.s_area) || "");
        setValue("s_address", (userAddress.success === true && userAddress.data.s_address) || "");
        // Set other values similarly for other fields...
    }, [setValue, userAddress]);

    useEffect(() => {
        if (userAddress.success === true && userAddress.data.b_first_name) {
            setBFirstName(userAddress.data.b_first_name);
        }
        if (userAddress.success === true && userAddress.data.b_last_name) {
            setBLastName(userAddress.data.b_last_name);
        }
        if (userAddress.success === true && userAddress.data.b_phone) {
            setBPhone(userAddress.data.b_phone);
        }
        if (userAddress.success === true && userAddress.data.b_email) {
            setBEmail(userAddress.data.b_email);
        }
        if (userAddress.success === true && userAddress.data.b_district) {
            setBDistrict(userAddress.data.b_district);
        }
        if (userAddress.success === true && userAddress.data.b_area) {
            setBArea(userAddress.data.b_area);
        }
        if (userAddress.success === true && userAddress.data.b_address) {
            setBAddress(userAddress.data.b_address);
        }

        if (userAddress.success === true && userAddress.data.s_first_name) {
            setSFirstName(userAddress.data.s_first_name);
        }
        if (userAddress.success === true && userAddress.data.s_last_name) {
            setSLastName(userAddress.data.s_last_name);
        }
        if (userAddress.success === true && userAddress.data.s_phone) {
            setSPhone(userAddress.data.s_phone);
        }
        if (userAddress.success === true && userAddress.data.s_email) {
            setSEmail(userAddress.data.s_email);
        }
        if (userAddress.success === true && userAddress.data.s_district) {
            setSDistrict(userAddress.data.s_district);
        }
        if (userAddress.success === true && userAddress.data.s_area) {
            setSArea(userAddress.data.s_area);
        }
        if (userAddress.success === true && userAddress.data.s_address) {
            setSAddress(userAddress.data.s_address);
        }
    }, [userAddress]);

    // const [bFirstName, setBFirstName] = useState('')
    //
    // const [requiredFirstName, setRequiredFirstName] = useState(false)
    //

    // const handleBFirstName = (event) => {
    //     const BFirstName = event.target.value;
    //     setBFirstName(BFirstName);
    // };

    const onSubmit = (formData) => {
        setLoading(true);
        const updatedAddressWithPathaoData = {
            ...formData,
            ...selectedBillingCity,
            ...selectedBillingZone,
            ...selectedBillingArea,
            ...selectedShippingCity,
            ...selectedShippingZone,
            ...selectedShippingArea,
        };
        
        axiosSecure
            .post("update_user_address", updatedAddressWithPathaoData)
            .then((res) => {
                if (res.data.success === true) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Address updated successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/my-account/addresses/view");
                    setLoading(false);
                } else {
                    // Handle other cases if needed
                }
            })
            .catch((error) => {
                setLoading(false);
                //
                // setErrorFromAPI(errorMessageList);
                //console.error('Error during registration:', error);
                // Handle errors from the API call
            });
    };

    const [BillingZoneList, setBillingZoneList] = useState([]);
    const [BillingAreaList, setBillingAreaList] = useState([]);
    const [ShippingZoneList, setShippingZoneList] = useState([]);
    const [ShippingAreaList, setShippingAreaList] = useState([]);

    // useEffect(() => {
    //     axiosSecure
    //         .get("get-city-list")
    //         .then((res) => {
    //             if (res.data.success === true) {
    //                 const result = res.data.data.map((item) => ({
    //                     value: item.city_id,
    //                     label: item.city_name,
    //                 }));
    //                 setCityList(result);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching categories:", error);
    //         });
    // }, []);
    const { cityList, cityListLoading } = useBillingDetailsCity();

    const [isBillingZoneLoading, setIsBillingZoneLoading] = useState(false);
    const [isBillingAreaLoading, setIsBillingAreaLoading] = useState(false);

    useEffect(() => {
        setBillingZoneList([]);
        setBillingAreaList([]);
    }, [selectedBillingCity]);
    useEffect(() => {
        if (selectedBillingCity?.b_city_id) {
            setIsBillingZoneLoading(true);
            axiosSecure
                .get(`get-zone-list/${selectedBillingCity.b_city_id}`)
                .then((res) => {
                    if (res.data.success === true) {
                        const result = res.data.data.map((item) => ({
                            value: item.zone_id,
                            label: item.zone_name,
                        }));
                        setBillingZoneList(result);
                        setIsBillingZoneLoading(false);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching zones:", error);
                });
        }
    }, [selectedBillingCity]);

    useEffect(() => {
        if (selectedBillingZone?.b_zone_id) {
            setIsBillingAreaLoading(true);
            axiosSecure
                .get(`get-area-list/${selectedBillingZone?.b_zone_id}`)
                .then((res) => {
                    if (res.data.success === true) {
                        const result = res.data.data.map((item) => ({
                            value: item.area_id,
                            label: item.area_name,
                        }));
                        setBillingAreaList(result);
                        setIsBillingAreaLoading(false);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching zones:", error);
                });
        }
    }, [selectedBillingZone]);

    const [isShippingZoneLoading, setIsShippingZoneLoading] = useState(false);
    const [isShippingAreaLoading, setIsShippingAreaLoading] = useState(false);

    useEffect(() => {
        setShippingZoneList([]);
        setShippingAreaList([]);
    }, [selectedShippingCity]);
    useEffect(() => {
        if (selectedShippingCity?.s_city_id) {
            setIsShippingZoneLoading(true);
            axiosSecure
                .get(`get-zone-list/${selectedShippingCity.s_city_id}`)
                .then((res) => {
                    if (res.data.success === true) {
                        const result = res.data.data.map((item) => ({
                            value: item.zone_id,
                            label: item.zone_name,
                        }));
                        setShippingZoneList(result);
                        setIsShippingZoneLoading(false);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching zones:", error);
                });
        }
    }, [selectedShippingCity]);

    useEffect(() => {
        if (selectedShippingZone?.s_zone_id) {
            setIsShippingAreaLoading(true);
            axiosSecure
                .get(`get-area-list/${selectedShippingZone?.s_zone_id}`)
                .then((res) => {
                    if (res.data.success === true) {
                        const result = res.data.data.map((item) => ({
                            value: item.area_id,
                            label: item.area_name,
                        }));
                        setShippingAreaList(result);
                        setIsShippingAreaLoading(false);
                    }
                })
                .catch((error) => {
                    console.error("Error fetching zones:", error);
                });
        }
    }, [selectedShippingZone]);

    return (
        <div className=" md:p-0 md:w-10/12 lg:w-9/12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="font-semibold text-2xl  tracking-[0.48px] leading-[33.5px]">Addresses</h2>
            </div>
            <h3 className="text-base font-semibold mb-3 md:mb-6">Billing details</h3>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                        <div className="mb-2 md:mb-4">
                            <label>
                                <span className="text-sm flex font-medium mb-1 text-black">
                                    First Name
                                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                </span>
                            </label>
                            <input
                                {...register("b_first_name", {
                                    required: true,
                                })}
                                name="b_first_name"
                                type="text"
                                defaultValue={bFirstName}
                                // onChange={handleBFirstName}
                                onChange={(e) => setValue("b_first_name", e.target.value)}
                                placeholder="First name"
                                className="px-3 py-[9px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
                            />

                            {errors.b_first_name && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="mb-2 md:mb-4">
                            <label>
                                <span className="text-sm flex font-medium mb-1 text-black">
                                    Last Name
                                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                </span>
                            </label>
                            <input
                                type="text"
                                defaultValue={bLastName}
                                {...register("b_last_name", {
                                    required: true,
                                })}
                                onChange={(e) => setValue("b_last_name", e.target.value)}
                                placeholder="Last name"
                                className="px-3 py-[9px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
                            />

                            {errors.b_last_name && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="mb-2 md:mb-4">
                            <label>
                                <span className="text-sm flex font-medium mb-1 text-black">
                                    Phone
                                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                </span>
                            </label>
                            <input
                                type="number"
                                defaultValue={bPhone}
                                {...register("b_phone", {
                                    required: true,
                                })}
                                onChange={(e) => setValue("b_phone", e.target.value)}
                                placeholder="Phone number"
                                className="px-3 py-[9px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
                            />
                            {errors.b_phone && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="mb-2 md:mb-4">
                            <label>
                                <span className="text-sm flex font-medium mb-1 text-black">Email (Optional)</span>
                            </label>
                            <input
                                type="email"
                                defaultValue={bEmail}
                                {...register("b_email")}
                                onChange={(e) => setValue("b_email", e.target.value)}
                                placeholder="Email"
                                className="px-3 py-[9px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
                            />
                        </div>
                        {/*<div className="mb-2 md:mb-4">
              <label>
                <span className="text-sm flex font-medium mb-1 text-black">
                  District
                  <FaStarOfLife size={6} className="text-[#F40F6F]" />
                </span>
              </label>
              <input
                type="text"
                defaultValue={BDistrict}
                {...register("b_district", {
                  required: true,
                })}
                onChange={(e) => setValue("b_district", e.target.value)}
                placeholder="Choose district"
                className="px-3 py-[9px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
              />
              {errors.b_district && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
           <div className="mb-2 md:mb-4">
              <label>
                <span className="text-sm flex font-medium mb-1 text-black">
                  Area (Optional)
                </span>
              </label>
              <input
                type="text"
                defaultValue={BArea}
                {...register("b_area")}
                onChange={(e) => setValue("b_area", e.target.value)}
                placeholder="Enter your area"
                className="px-3 py-[9px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
              />
              {errors.b_area && (
                <span className="text-red-600">This field is required</span>
              )}
            </div> */}
                    </div>
                    <div>
                        <div className="mb-2 md:mb-4">
                            <label>
                                <span className="text-sm flex font-medium mb-1 text-black">
                                    City
                                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                </span>
                            </label>
                            <SearchSelectLabelLess
                                placeholder={"Select city"}
                                data={cityList}
                                defaultValue={{ value: userAddress?.data?.b_city_id, label: userAddress?.data?.b_city_name }}
                                required={true}
                                isClearable={false}
                                handleChange={(e) => {
                                    if (e) {
                                        setSelectedBillingCity({
                                            b_city_id: e.value,
                                            b_city_name: e.label,
                                        });
                                    }
                                }}
                                name="selectedBillingCity"
                            />
                        </div>
                        <div className="mb-2 md:mb-4">
                            <label>
                                <span className="text-sm flex font-medium mb-1 text-black">
                                    Zone
                                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                </span>
                            </label>
                            <SearchSelectLabelLess
                                placeholder={"Select zone"}
                                data={BillingZoneList}
                                defaultValue={{ value: userAddress?.data?.b_zone_id, label: userAddress?.data?.b_zone_name }}
                                required={true}
                                isClearable={false}
                                handleChange={(e) => {
                                    if (e) {
                                        setSelectedBillingZone({
                                            b_zone_id: e.value,
                                            b_zone_name: e.label,
                                        });
                                    }
                                }}
                                name="selectedBillingZone"
                            />
                        </div>
                        <div className="mb-2 md:mb-4">
                            <label>
                                <span className="text-sm flex font-medium mb-1 text-black">
                                    Area
                                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                </span>
                            </label>

                            <SearchSelectLabelLess
                                placeholder={"Select area"}
                                data={BillingAreaList}
                                defaultValue={{ value: userAddress?.data?.b_area_id, label: userAddress?.data?.b_area_name }}
                                required={true}
                                isClearable={false}
                                handleChange={(e) => {
                                    if (e) {
                                        setSelectedBillingArea({
                                            b_area_id: e.value,
                                            b_area_name: e.label,
                                        });
                                    }
                                }}
                                name="selectedBillingArea"
                            />
                        </div>

                        {cityListLoading && (
                            <div className="mb-3 md:mb-6 flex items-end">
                                <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto mb-1"></span>
                            </div>
                        )}
                        {isBillingZoneLoading && (
                            <div className="mb-3 md:mb-6 flex items-end">
                                <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto mb-1"></span>
                            </div>
                        )}
                        {isBillingAreaLoading && (
                            <div className="mb-3 md:mb-6 flex items-end">
                                <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto mb-1"></span>
                            </div>
                        )}
                    </div>
                    <div className="mb-5 md:mb-9">
                        <label>
                            <span className="text-sm flex font-medium mb-1 text-black">
                                Address
                                <FaStarOfLife size={6} className="text-[#F40F6F]" />
                            </span>
                        </label>
                        <input
                            type="text"
                            defaultValue={BAddress}
                            {...register("b_address", {
                                required: true,
                                minLength: 10,
                            })}
                            onChange={(e) => setValue("b_address", e.target.value)}
                            placeholder="Enter your detailed address"
                            className="px-3 py-[9px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
                        />

                        {errors.b_address && errors.b_address.type === "required" && <span className="text-red-600">This field is required</span>}
                        {errors.b_address && errors.b_address.type === "minLength" && (
                            <span className="text-red-600">Address must be at least 10 characters</span>
                        )}
                    </div>

                    <h3 className="text-base font-semibold mb-3 md:mb-6">Shipping Address</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                        <div className="mb-2 md:mb-4">
                            <label>
                                <span className="text-sm flex font-medium mb-1 text-black">
                                    First Name
                                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                </span>
                            </label>
                            <input
                                type="text"
                                {...register("s_first_name", {
                                    required: true,
                                })}
                                defaultValue={SFirstName}
                                onChange={(e) => setValue("s_first_name", e.target.value)}
                                placeholder="First name"
                                className="px-3 py-[9px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
                            />
                            {errors.s_first_name && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="mb-2 md:mb-4">
                            <label>
                                <span className="text-sm flex font-medium mb-1 text-black">
                                    Last Name
                                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                </span>
                            </label>
                            <input
                                type="text"
                                defaultValue={SLastName}
                                onChange={(e) => setValue("s_last_name", e.target.value)}
                                {...register("s_last_name", {
                                    required: true,
                                })}
                                placeholder="Last name"
                                className="px-3 py-[9px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
                            />
                            {errors.s_last_name && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="mb-2 md:mb-4">
                            <label>
                                <span className="text-sm flex font-medium mb-1 text-black">
                                    Phone
                                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                </span>
                            </label>
                            <input
                                type="number"
                                defaultValue={SPhone}
                                onChange={(e) => setValue("s_phone", e.target.value)}
                                {...register("s_phone", {
                                    required: true,
                                })}
                                placeholder="Phone number"
                                className="px-3 py-[9px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
                            />
                            {errors.s_phone && <span className="text-red-600">This field is required</span>}
                        </div>
                        <div className="mb-2 md:mb-4">
                            <label>
                                <span className="text-sm flex font-medium mb-1 text-black">Email (Optional)</span>
                            </label>
                            <input
                                type="email"
                                defaultValue={SEmail}
                                onChange={(e) => setValue("s_email", e.target.value)}
                                {...register("s_email")}
                                placeholder="Email"
                                className="px-3 py-[9px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
                            />
                        </div>
                        {/*<div className="mb-2 md:mb-4">
              <label>
                <span className="text-sm flex font-medium mb-1 text-black">
                  District
                  <FaStarOfLife size={6} className="text-[#F40F6F]" />
                </span>
              </label>
              <input
                type="text"
                defaultValue={SDistrict}
                onChange={(e) => setValue("s_district", e.target.value)}
                {...register("s_district", {
                  required: true,
                })}
                placeholder="Choose district"
                className="px-3 py-[9px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
              />
              {errors.s_district && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
           <div className="mb-2 md:mb-4">
              <label>
                <span className="text-sm flex font-medium mb-1 text-black">
                  Area (Optional)
                </span>
              </label>
              <input
                type="text"
                defaultValue={SArea}
                onChange={(e) => setValue("s_area", e.target.value)}
                {...register("s_area")}
                placeholder="Enter your area"
                className="px-3 py-[9px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
              />
            </div> */}
                    </div>
                    <div>
                        <div className="mb-2 md:mb-4">
                            <label>
                                <span className="text-sm flex font-medium mb-1 text-black">
                                    City
                                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                </span>
                            </label>
                            <SearchSelectLabelLess
                                placeholder={"Select city"}
                                data={cityList}
                                defaultValue={{ value: userAddress?.data?.s_city_id, label: userAddress?.data?.s_city_name }}
                                required={true}
                                isClearable={false}
                                handleChange={(e) => {
                                    if (e) {
                                        setSelectedShippingCity({
                                            s_city_id: e.value,
                                            s_city_name: e.label,
                                        });
                                    }
                                }}
                                name="selectedShippingCity"
                            />
                        </div>
                        <div className="mb-2 md:mb-4">
                            <label>
                                <span className="text-sm flex font-medium mb-1 text-black">
                                    Zone
                                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                </span>
                            </label>
                            <SearchSelectLabelLess
                                placeholder={"Select zone"}
                                data={ShippingZoneList}
                                defaultValue={{ value: userAddress?.data?.s_zone_id, label: userAddress?.data?.s_zone_name }}
                                required={true}
                                isClearable={false}
                                handleChange={(e) => {
                                    if (e) {
                                        setSelectedShippingZone({
                                            s_zone_id: e.value,
                                            s_zone_name: e.label,
                                        });
                                    }
                                }}
                                name="selectedShippingZone"
                            />
                        </div>
                        <div className="mb-2 md:mb-4">
                            <label>
                                <span className="text-sm flex font-medium mb-1 text-black">
                                    Area
                                    <FaStarOfLife size={6} className="text-[#F40F6F]" />
                                </span>
                            </label>

                            <SearchSelectLabelLess
                                placeholder={"Select area"}
                                data={ShippingAreaList}
                                defaultValue={{ value: userAddress?.data?.s_area_id, label: userAddress?.data?.s_area_name }}
                                required={true}
                                isClearable={false}
                                handleChange={(e) => {
                                    if (e) {
                                        setSelectedShippingArea({
                                            s_area_id: e.value,
                                            s_area_name: e.label,
                                        });
                                    }
                                }}
                                name="selectedShippingArea"
                            />
                        </div>

                        {cityListLoading && (
                            <div className="mb-3 md:mb-6 flex items-end">
                                <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto mb-1"></span>
                            </div>
                        )}
                        {isShippingZoneLoading && (
                            <div className="mb-3 md:mb-6 flex items-end">
                                <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto mb-1"></span>
                            </div>
                        )}
                        {isShippingAreaLoading && (
                            <div className="mb-3 md:mb-6 flex items-end">
                                <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto mb-1"></span>
                            </div>
                        )}
                    </div>
                    <div className="mb-2 md:mb-4">
                        <label>
                            <span className="text-sm flex font-medium mb-1 text-black">
                                Address
                                <FaStarOfLife size={6} className="text-[#F40F6F]" />
                            </span>
                        </label>
                        <input
                            type="text"
                            defaultValue={SAddress}
                            onChange={(e) => setValue("s_address", e.target.value)}
                            {...register("s_address", {
                                required: true,
                                minLength: 10,
                            })}
                            placeholder="Enter your detailed address"
                            className="px-3 py-[9px] text-sm font-medium tracking-[-0.14px] w-full rounded-sm  bg-white text-black border border-[#00000040]"
                        />
                        {errors.s_address && errors.s_address.type === "required" && <span className="text-red-600">This field is required</span>}
                        {errors.s_address && errors.s_address.type === "minLength" && (
                            <span className="text-red-600">Address must be at least 10 characters</span>
                        )}
                    </div>
                    <div className="flex items-center gap-1 mb-9">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <p className="font-normal text-[10px] text-[#000000CC]">
                            The following addresses will be used on the checkout page by default.
                        </p>
                    </div>
                    {/* <Link to={'/my-account/addresses/view'}> */}
                    {loading ? (
                        <div className="px-9 rounded-[4px] font-semibold text-white mb-10 md:mb-24 ">
                            <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto"></span>
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className={"py-3 px-9 rounded-[4px] font-semibold bg-[#F40F6F] text-white mb-10 md:mb-24 hover:cursor-pointer"}
                        >
                            Save Changes
                        </button>
                    )}
                    {/* </Link> */}
                </form>
            </div>
        </div>
    );
};

export default EditAddresses;
