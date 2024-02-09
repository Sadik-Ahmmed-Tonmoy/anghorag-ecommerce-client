/* eslint-disable react/prop-types */
import { Rate, Select } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import StarRating from "../../../components/StarRating/StarRating";
import StarRatingWithInput from "../../../components/StarRatingWithInput/StarRatingWithInput";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import moment from "moment";
import useAuthUser from "../../../hooks/useAuthUser";

const Reviews = ({ singleProduct, isLoading, refetch }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const { userData } = useAuthUser();
    const [loading, setLoading] = useState(false);

    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [phone, setPhone] = useState("");
    // const [email, setEmail] = useState("");

    // useEffect(() => {
    //   setValue("first_name", userData.first_name && userData.first_name);
    //   setValue("last_name", userData.last_name && userData.last_name);
    //   setValue("phone", userData.phone && userData.phone);
    //   setValue("email", userData.email && userData.email);
    // }, [setValue, userData]);

    // useEffect(() => {
    //   if (userData && userData.first_name) {
    //     setFirstName(userData.first_name);
    //   }
    //   if (userData && userData.last_name) {
    //     setLastName(userData.last_name);
    //   }
    //   if (userData && userData.phone) {
    //     setPhone(userData.phone);
    //   }
    //   if (userData && userData.email) {
    //     setEmail(userData.email);
    //   }
    // }, [userData]);

    const latest_reviews = isLoading === false ? singleProduct?.data?.products?.latest_reviews.reviews : [];

    const oldest_reviews = isLoading === false ? singleProduct?.data?.products?.oldest_reviews.reviews : [];
    
    const product_id = isLoading === false ? singleProduct?.data?.products?.id : [];
    //
    const [selectedValue, setSelectedValue] = useState("newest");
    //
    const [showMore, setShowMore] = useState(false);
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //   // Define a function to fetch data based on selectedValue
    //   const fetchData = async () => {
    //     if (selectedValue === "Oldest") {
    //       const response = await axios.get(
    //         "https://fakestoreapi.com/products?sort=desc"
    //       );
    //       setData(response.data);
    //     } else if (selectedValue === "Latest") {
    //       const response = await axios.get(
    //         "https://fakestoreapi.com/products?sort=asc"
    //       );
    //       setData(response.data);
    //     }
    //   };

    //   fetchData();
    // }, [selectedValue]);

    const handleChange = (value) => {
        setSelectedValue(`${value}`);
    };
    const [selectedStarCount, setSelectedStarCount] = useState(0);
    const [ReviewLoading, setReviewLoading] = useState(false);

    const axiosSecure = useAxiosSecure();
    const onSubmit = (data) => {
        setReviewLoading(true);
        const product_reviews = {
            product_id: product_id,
            star: selectedStarCount,
            ...data,
        };
        axiosSecure
            .post("user_review", product_reviews)
            .then((res) => {
                if (res.data.success === true) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Product Reviewed Successfully",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    // navigate("/");
                    setReviewLoading(false);
                    refetch();
                } else {
                    // Handle other cases if needed
                }
            })
            .catch((error) => {
                setReviewLoading(false);
                //
                // setErrorFromAPI(errorMessageList);
                //console.error('Error during registration:', error);
                // Handle errors from the API call
            });
    };

    return (
        <div>
            <div className="flex flex-wrap justify-between mb-2">
                <h3 className="text-base md:text-lg font-semibold whitespace-nowrap">Customer Reviews ({latest_reviews.length})</h3>
                <Select
                    defaultValue="Sort by: Newest"
                    className="h-10 w-[150px] "
                    // style={{
                    //   width: 180,
                    // }}
                    // bordered={false}
                    onChange={handleChange}
                    options={[
                        {
                            value: "newest",
                            label: "Sort by: Newest",
                        },
                        {
                            value: "oldest",
                            label: "Sort by: Oldest",
                        },
                    ]}
                />

                {/* <Select
          defaultValue="Sort by Latest"
          className="h-10 w-[150px] "
          onChange={handleSort}
          options={[
            {
              value: "asc",
              label: "Sort by Latest",
            },
            {
              value: "desc",
              label: "Sort by Oldest",
            },
          ]}
        /> */}
            </div>
            {/* comment */}
            {selectedValue === "newest" ? (
                <span>
                    {showMore ? (
                        <span>
                            {isLoading || (
                                <span>
                                    {latest_reviews.map((item, i) => (
                                        <div key={i}>
                                            <div className="flex items-start gap-2 border-b-[0.3px] border-[#bfbfbf] py-6">
                                                <div>
                                                    <RxAvatar size={40} className="text-[#d9d9d9]" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-[6px]">
                                                        <p className="text-sm font-bold tracking-[-0.14px]">{item?.name}</p>
                                                        {/* <p className="flex items-center gap-1 text-[#20BF06] text-xs font-medium">
                                                            <span>
                                                                <AiFillCheckCircle />
                                                            </span>
                                                            <span className="text-xs font-medium tracking-[0.12px]">Verified Purchase</span>
                                                        </p> */}
                                                    </div>
                                                    <p className="text-[10px] font-normal text-[#333333] mb-3 tracking-[-0.1px]">
                                                        {moment(item.created_at).format("DD MMMM YYYY")}
                                                    </p>
                                                    <div className="mb-2">
                                                        <StarRating rating={item?.star} totalStars={5} size={15} />
                                                    </div>
                                                    <p className="text-sm font-normal leading-[20px]">{item?.comments}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </span>
                            )}
                        </span>
                    ) : (
                        <span>
                            {isLoading || (
                                <span>
                                    {latest_reviews.slice(0, 2).map((item, i) => (
                                        <div key={i}>
                                            <div className="flex items-start gap-2 border-b-[0.3px] border-[#bfbfbf] py-6">
                                                <div>
                                                    <RxAvatar size={40} className="text-[#d9d9d9]" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-[6px]">
                                                        <p className="text-sm font-bold tracking-[-0.14px]">{item?.name}</p>
                                                        {/* <p className="flex items-center gap-1 text-[#20BF06] text-xs font-medium">
                                                            <span>
                                                                <AiFillCheckCircle />
                                                            </span>
                                                            <span className="text-xs font-medium tracking-[0.12px]">Verified Purchase</span>
                                                        </p> */}
                                                    </div>
                                                    <p className="text-[10px] font-normal text-[#333333] mb-3 tracking-[-0.1px]">
                                                        {moment(item.createdAt).format("DD MMMM YYYY")}{" "}
                                                    </p>
                                                    <div className="mb-2">
                                                        <StarRating rating={item?.star} totalStars={5} size={15} />
                                                    </div>
                                                    <p className="text-sm font-normal leading-[20px]">{item?.comments}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </span>
                            )}
                        </span>
                    )}
                </span>
            ) : (
                <span>
                    {showMore ? (
                        <span>
                            {isLoading || (
                                <span>
                                    {oldest_reviews.map((item, i) => (
                                        <div key={i}>
                                            <div className="flex items-start gap-2 border-b-[0.3px] border-[#bfbfbf] py-6">
                                                <div>
                                                    <RxAvatar size={40} className="text-[#d9d9d9]" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-[6px]">
                                                        <p className="text-sm font-bold tracking-[-0.14px]">{item?.name}</p>
                                                        {/* <p className="flex items-center gap-1 text-[#20BF06] text-xs font-medium">
                                                            <span>
                                                                <AiFillCheckCircle />
                                                            </span>
                                                            <span className="text-xs font-medium tracking-[0.12px]">Verified Purchase</span>
                                                        </p> */}
                                                    </div>
                                                    <p className="text-[10px] font-normal text-[#333333] mb-3 tracking-[-0.1px]">
                                                        {moment(item.created_at).format("DD MMMM YYYY")}
                                                    </p>
                                                    <div className="mb-2">
                                                        <StarRating rating={item?.star} totalStars={5} size={15} />
                                                    </div>
                                                    <p className="text-sm font-normal leading-[20px]">{item?.comments}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </span>
                            )}
                        </span>
                    ) : (
                        <span>
                            {isLoading || (
                                <span>
                                    {oldest_reviews.slice(0, 2).map((item, i) => (
                                        <div key={i}>
                                            <div className="flex items-start gap-2 border-b-[0.3px] border-[#bfbfbf] py-6">
                                                <div>
                                                    <RxAvatar size={40} className="text-[#d9d9d9]" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-[6px]">
                                                        <p className="text-sm font-bold tracking-[-0.14px]">{item?.name}</p>
                                                        {/* <p className="flex items-center gap-1 text-[#20BF06] text-xs font-medium">
                                                            <span>
                                                                <AiFillCheckCircle />
                                                            </span>
                                                            <span className="text-xs font-medium tracking-[0.12px]">Verified Purchase</span>
                                                        </p> */}
                                                    </div>
                                                    <p className="text-[10px] font-normal text-[#333333] mb-3 tracking-[-0.1px]">
                                                        {moment(item.created_at).format("DD MMMM YYYY")}
                                                    </p>
                                                    <div className="mb-2">
                                                        <StarRating rating={item?.star} totalStars={5} size={15} />
                                                    </div>
                                                    <p className="text-sm font-normal leading-[20px]">{item?.comments}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </span>
                            )}
                        </span>
                    )}
                </span>
            )}
            {/* <span>
                {showMore ? (
                    <span>
                        {isLoading || (
                            <span>
                                {product_reviews.map((item, i) => (
                                    <div key={i}>
                                        <div className="flex items-start gap-2 border-b-[0.3px] border-[#bfbfbf] py-6">
                                            <div>
                                                <RxAvatar size={40} className="text-[#d9d9d9]" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-[6px]">
                                                    <p className="text-sm font-bold tracking-[-0.14px]">{item?.name}</p>
                                                    <p className="flex items-center gap-1 text-[#20BF06] text-xs font-medium">
                                                        <span>
                                                            <AiFillCheckCircle />
                                                        </span>
                                                        <span className="text-xs font-medium tracking-[0.12px]">Verified Purchase</span>
                                                    </p>
                                                </div>
                                                <p className="text-[10px] font-normal text-[#333333] mb-3 tracking-[-0.1px]">20 July 2023</p>
                                                <div className="mb-2">
                                                    <StarRating rating={item?.star} totalStars={5} size={15} />
                                                </div>
                                                <p className="text-sm font-normal leading-[20px]">{item?.comments}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </span>
                        )}
                    </span>
                ) : (
                    <span>
                        {isLoading || (
                            <span>
                                {product_reviews.slice(0, 2).map((item, i) => (
                                    <div key={i}>
                                        <div className="flex items-start gap-2 border-b-[0.3px] border-[#bfbfbf] py-6">
                                            <div>
                                                <RxAvatar size={40} className="text-[#d9d9d9]" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-[6px]">
                                                    <p className="text-sm font-bold tracking-[-0.14px]">{item?.name}</p>
                                                    <p className="flex items-center gap-1 text-[#20BF06] text-xs font-medium">
                                                        <span>
                                                            <AiFillCheckCircle />
                                                        </span>
                                                        <span className="text-xs font-medium tracking-[0.12px]">Verified Purchase</span>
                                                    </p>
                                                </div>
                                                <p className="text-[10px] font-normal text-[#333333] mb-3 tracking-[-0.1px]">20 July 2023</p>
                                                <div className="mb-2">
                                                    <StarRating rating={item?.star} totalStars={5} size={15} />
                                                </div>
                                                <p className="text-sm font-normal leading-[20px]">{item?.comments}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </span>
                        )}
                    </span>
                )}
            </span> */}

            <div>
                {/* {showMore && (
                    <>
                        {loop.map((item, i) => (
                            <>
                                <div className="flex items-start gap-2 border-b-[0.3px] border-[#bfbfbf] py-6">
                                    <div>
                                        <RxAvatar size={40} className="text-[#d9d9d9]" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-[6px]">
                                            <p className="text-sm font-bold tracking-[-0.14px]">Vinod Kumar</p>
                                            <p className="flex items-center gap-1 text-[#20BF06] text-xs font-medium">
                                                <span>
                                                    <AiFillCheckCircle />
                                                </span>
                                                <span className="text-xs font-medium tracking-[0.12px]">Verified Purchase</span>
                                            </p>
                                        </div>
                                        <p className="text-[10px] font-normal text-[#333333] mb-3 tracking-[-0.1px]">20 July 2023</p>
                                        <div className="mb-2">
                                            <StarRating rating={5} totalStars={5} size={15} />
                                        </div>
                                        <p className="text-sm font-normal leading-[20px]">
                                            Not so good. doesn’t remove make up properly. Burns on my dry to combination skin. I wouldn’t buy this one
                                            second time.
                                        </p>
                                    </div>
                                </div>
                            </>
                        ))}
                    </>
                )} */}
                {latest_reviews.length > 2 && (
                    <>
                        {showMore ? (
                            <div className="flex justify-center my-8">
                                <button
                                    onClick={() => setShowMore(false)}
                                    className="text-[#913BDB] py-3 px-8 rounded-[42px] border border-[#913BDB]"
                                >
                                    Show Less
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center my-8">
                                <button onClick={() => setShowMore(true)} className="text-[#913BDB] py-3 px-8 rounded-[42px] border border-[#913BDB]">
                                    Load More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
            {/* Add a review start */}
            {userData.first_name && (
                <div className="border-t-[0.3px] border-[#bfbfbf] py-5">
                    <h5 className="text-lg font-semibold mb-2">Add a review</h5>
                    <p className="text-xs font-normal mb-4 tracking-[-0.12px] text-[#00000099]">Your email address will not be published</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-8">
                            <StarRatingWithInput
                                rating={5}
                                totalStars={5}
                                size={25}
                                register={register}
                                setSelectedStarCount={setSelectedStarCount}
                            />
                        </div>
                        <textarea
                            placeholder="Write your comment"
                            {...register("comments")}
                            type="text"
                            className="rounded-lg w-full h-32 bg-white border-[0.3px] border-[#bfbfbf] p-4 mb-8"
                        ></textarea>
                        <div className="flex flex-col md:flex-row gap-4 mb-8">
                            <span className="md:w-full">
                                <input
                                    {...register("name")}
                                    value={`${userData.first_name && userData.first_name} ${userData.last_name && userData.last_name}`}
                                    readOnly
                                    // onChange={(event) => setFirstName(event.target.value)}
                                    type="text"
                                    placeholder="Your name"
                                    className="w-full rounded-lg bg-white  border-[0.3px] border-[#bfbfbf] ps-4 py-3"
                                />
                                {errors.name && <p className="text-red-500 text-xs font-normal mt-1">Name is required.</p>}
                            </span>
                            {/* <input
                          className="w-full rounded-lg bg-white  border-[0.3px] border-[#bfbfbf] ps-4 py-3"
                          placeholder="Your email"
                          type="text"
                          {...register("email")}
                          name=""
                          id=""
                      /> */}

                            <span className="md:w-full">
                                <input
                                    {...register("email", {
                                        required: true,
                                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Regular expression for basic email format validation
                                    })}
                                    // value={userData.email && userData.email}
                                    defaultValue={userData.email && userData.email}
                                    readOnly
                                    // onChange={(event) => setEmail(event.target.value)}
                                    type="text"
                                    placeholder="Your Email"
                                    className="w-full rounded-lg bg-white  border-[0.3px] border-[#bfbfbf] ps-4 py-3 "
                                />
                                {errors.email && errors.email.type === "pattern" && (
                                    <p className="text-red-500 text-xs font-normal mt-1">Please enter a valid email address</p>
                                )}
                                {errors.email && errors.email.type === "required" && (
                                    <p className="text-red-500 text-xs font-normal mt-1">Email is required.</p>
                                )}
                            </span>
                        </div>
                        <div className="flex justify-center">
                            {ReviewLoading ? (
                                <div className=" flex justify-center">
                                    <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto"></span>
                                </div>
                            ) : (
                                <button
                                    type="submit"
                                    className="text-white text-sm font-medium bg-[#913BDB] py-[15px] px-16 rounded-[42px] whitespace-nowrap"
                                >
                                    Submit Review
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}

            {/* Add a review end */}
        </div>
    );
};

export default Reviews;
