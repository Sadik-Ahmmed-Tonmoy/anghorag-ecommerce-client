import { Drawer, Space } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import DropDownBtn from "../../components/DropDownBtn/DropDownBtn";
import ImageURL from "../../components/ImageURL/ImageURL";
import MultiLayerMenu from "../../components/MultiLayerMenu/MultiLayerMenu";
import useAuthUser from "../../hooks/useAuthUser";
import useCampaignTypeButtons from "../../hooks/useCampaignTypeButtons";
import useCompanyInfo from "../../hooks/useCompanyInfo";
import "./NavBar.css";
import useNavItems from "../../hooks/useNavItems";
import { ProviderContext } from "../../provider/Provider";
import { getCartItemsFromSession } from "../../utilities/getCartItemsFromSession";
import { IoCall } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

// import CartFromLS from "../CartFromLS/CartFromLS";

const Navbar = () => {
    const navigate = useNavigate();
    const { userData } = useAuthUser();
    const [isMobile, setIsMobile] = useState(false);

    const { increaseOrDecrease, windowWidth, orderSubmit, cartItems, setCondition } = useContext(ProviderContext);

    useEffect(() => {
        if (windowWidth <= 767) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [windowWidth]);

    const { companyInfo, isLoading } = useCompanyInfo();
    const data = isLoading === false && companyInfo?.data;

    // const [searchParams, setSearchParams] = useSearchParams();
    const categories = ["Phone", "Accessories", "Laptop", "Desktop"];
    // const menuData = [
    //   {
    //     name: "Health & Beauty",
    //     subItems: [
    //       {
    //         name: "Skin Care",
    //         subSubItems: [
    //           { name: "Facewash", link: "/" },
    //           { name: "Face Mask", link: "/" },
    //           { name: "Serum", link: "/" },
    //           { name: "Skin Toner", link: "/" },
    //           { name: "Sunscreen", link: "/" },
    //           { name: "Lip Bum", link: "/" },
    //         ],
    //       },
    //       {
    //         name: "Hair Care",
    //         subSubItems: [
    //           { name: "Shampoo", link: "/" },
    //           { name: "Conditioner", link: "/" },
    //           { name: "Hair Serum", link: "/" },
    //           { name: "Hair Mask", link: "/" },
    //           { name: "Hair Oil", link: "/" },
    //         ],
    //       },
    //       {
    //         name: "Bath & Body",
    //         subSubItems: [
    //           { name: "Body Wash", link: "/" },
    //           { name: "Bath Bombs", link: "/" },
    //         ],
    //       },
    //       {
    //         name: "Fragrances",
    //         subSubItems: [
    //           { name: "Perfumes", link: "/" },
    //           { name: "Colognes", link: "/" },
    //           { name: "Body Sprays", link: "/" },
    //           { name: "Essential Oils", link: "/" },
    //           { name: "Scented Candles", link: "/" },
    //         ],
    //       },
    //       {
    //         name: "Personal Care",
    //         subSubItems: [
    //           {
    //             name: "Hygiene Products",
    //             link: "/",
    //           },
    //           { name: "Dental Care", link: "/" },
    //         ],
    //       },
    //       {
    //         name: "Hair Care",
    //         subSubItems: [
    //           { name: "Shampoo", link: "/" },
    //           { name: "Conditioner", link: "/" },
    //           { name: "Hair Serum", link: "/" },
    //           { name: "Hair Mask", link: "/" },
    //           { name: "Hair Oil", link: "/" },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     name: "Electronics",
    //     subItems: [
    //       {
    //         name: "Home Appliances",
    //         subSubItems: [
    //           {
    //             name: "Kitchen Appliances",
    //             link: "/",
    //           },
    //           { name: "Electronics", link: "/" },
    //         ],
    //       },
    //       {
    //         name: "Computer Accessories",
    //         subSubItems: [
    //           { name: "Laptops", link: "/" },
    //           {
    //             name: "Computer Accessories",
    //             link: "/",
    //           },
    //         ],
    //       },
    //       {
    //         name: "Gadgets and Wearables",
    //         subSubItems: [
    //           {
    //             name: "Electronics Gadgets",
    //             link: "/",
    //           },
    //           {
    //             name: "Wearable Technology",
    //             link: "/",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     name: "Beauty",
    //     subItems: [
    //       {
    //         name: "Personal Care",
    //         subSubItems: [
    //           {
    //             name: "Grooming Appliances",
    //             link: "/",
    //           },
    //           {
    //             name: "Skincare Electronics",
    //             link: "/",
    //           },
    //         ],
    //       },
    //       {
    //         name: "Cosmetics and Tools",
    //         subSubItems: [
    //           {
    //             name: "Makeup",
    //             link: "/",
    //           },
    //           {
    //             name: "Beauty Tools",
    //             link: "/",
    //           },
    //         ],
    //       },
    //       {
    //         name: "Health Devices",
    //         subSubItems: [
    //           {
    //             name: "Medical Devices",
    //             link: "/",
    //           },
    //           {
    //             name: "Health Wearables",
    //             link: "/",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ];

    // const [categories, setCategories] = useState([]);
    // useEffect(() => {
    //     axios
    //         .get("https://fakestoreapi.com/products/categories")
    //         .then((response) => {
    //             setCategories(response.data);
    //         });
    // }, []);
    // const [navItems, setNavItems] = useState([]);

    // useEffect(() => {
    //   axios
    //     .get("category_level")
    //     .then((res) => {
    //       if (res.data.success === true) {
    //         setNavItems(res.data);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching categories:", error);
    //     });
    // }, []);

    const { navItems, isMenuDataLoading } = useNavItems();
    //

    const menuData = isMenuDataLoading === false ? navItems?.menuData : [];

    const { register, handleSubmit } = useForm();
    // const [searchParams, setSearchParams] = useState({});
    // const { searchedData, isLoading, isError } = useSearchProducts(searchParams);
    //
    const [buttonsData] = useCampaignTypeButtons();
    //
    //
    //
    const onSubmit = (data) => {
        // setSearchParams(data);

        // const search = searchParams.get('search')
        //const pageSize = searchParams.get('pageSize')

        // setSearchParams(data);
        setCondition("search");
        // navigate(`/category/${data.search}`);
        navigate(`/category?search=${data.searchQuery}`);

        // if (data.searchQuery.length > 0) {
        //   // setSearchParams(data);
        //   setCondition("search")
        //   // navigate(`/category/${data.search}`);
        //   navigate(`/category?search=${data.searchQuery}`);
        // }
        //
    };

    // drawer open
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    // drawer close

    return (
        <div className=" bg-white">
            {/* top contact area start */}
            {data?.logo && (
                <div className="pt-2 flex justify-center -mb-2">
                    <div className="flex gap-3">
                        <a href="tel:+8801736498519" className="flex items-center hover:text-[#F40F6F]">
                            <span className=" ">
                                <IoCall size={16} />
                            </span>
                            +8801736498519
                        </a>
                        <a href="https://wa.me/+8801736498519?text=Hello%20from%20your%20website!" className="flex items-center hover:text-[#25d366]">
                            {" "}
                            <span className=" ">
                                <FaWhatsapp size={18} />
                            </span>
                            WhatsApp{" "}
                        </a>
                    </div>
                </div>
            )}

            {/* top contact area end*/}
            {/* mobile screen start   */}
            <div className="navbar block md:hidden text-black ">
                {/* 1st row start */}
                <div className="flex gap-1 justify-between items-center pb-2 ">
                    <div className="flex items-center gap-1">
                        <>
                            {/* menu button start */}
                            <Space>
                                <div value="left" onClick={showDrawer}>
                                    <HiOutlineMenuAlt1 size={27} />
                                </div>
                            </Space>
                            {/* menu button end */}
                            {/* drawer menu start */}
                            <Drawer
                                title="Menu"
                                placement={"left"}
                                width="80%"
                                onClose={onClose}
                                open={open}
                                closable={false}
                                extra={
                                    <Space>
                                        <button onClick={onClose}>
                                            <AiOutlineClose size={20} className="text-black -me-[7px] pt-[6px]" />
                                        </button>
                                    </Space>
                                }
                            >
                                {/* account start */}
                                {userData?.email ? (
                                    <div className="mx-auto my-2">
                                        <Link to={"/my-account/order/active"}>
                                            <div onClick={onClose} className="mx-auto rounded-full border border-black p-1 w-min h-min">
                                                <BsPerson className="font-semibold text-black " size={18} />
                                            </div>
                                            <p className="text-center text-black -mt- text-xs">Profile</p>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="mx-auto my-2">
                                        <div className="mx-auto rounded-full border border-black p-1 w-min h-min">
                                            <Link to={"/login"}>
                                                <BsPerson className="font-semibold text-black " size={18} />
                                            </Link>
                                        </div>
                                        <p className="text-center text-black -mt- text-xs">Login</p>
                                    </div>
                                )}
                                {/* account end */}
                                {/* menu start */}
                                <MultiLayerMenu menuData={menuData} onClose={onClose} />
                                {/* menu end */}

                                {/* offer button start */}
                                <div className="w-full flex flex-col gap-y- mt-3">
                                    {buttonsData?.success === true &&
                                        buttonsData?.data.map((item, index) => (
                                            <span key={index}>
                                                <Link to={`/campaign/${item.id}`}>
                                                    {/* <button
                        className={`rounded-full py-[6px] px-5 text-center text-xs font-semibold text-white hover:cursor-pointer`}
                        style={{
                          backgroundColor: item.color_code,
                        }}
                      >
                        {item.cp_name}
                      </button> */}

                                                    <button
                                                        onClick={onClose}
                                                        style={{
                                                            backgroundColor: item.color_code,
                                                        }}
                                                        className="ps-7 py-[10px] w-full text-start text-xs font-semibold text-white bg-[#471D6B] hover:cursor-pointer"
                                                    >
                                                        {item?.name}
                                                    </button>
                                                </Link>
                                            </span>
                                        ))}

                                    {/* <Link to={"/offers"}>
                    <button
                      onClick={onClose}
                      className="ps-7 py-[10px] w-full text-start text-xs font-semibold text-white bg-[#471D6B] hover:cursor-pointer"
                    >
                      Offers
                    </button>
                  </Link>
                  <Link to={"/sellerPicks"}>
                    <button
                      onClick={onClose}
                      className="ps-7 py-[10px] w-full text-start text-xs font-medium tracking-[-0.12px] text-white bg-[#EB5A9A] hover:cursor-pointer"
                    >
                      Seller Picks
                    </button>
                  </Link>
                  <Link to={"/campaign"}>
                    <button
                      onClick={onClose}
                      className="ps-7 py-[10px] w-full text-start text-xs font-medium tracking-[-0.12px] text-white bg-[#913BDB] hover:cursor-pointer"
                    >
                      Campaign
                    </button>
                  </Link> */}
                                </div>
                                {/* offer button end */}
                            </Drawer>
                            {/* drawer menu end */}
                        </>
                    </div>
                    <div className="pt-1 h-16 w-[202px]">
                        <Link to={"/"}>
                            {/* <img className="h-12 sm:h-14" src={logo} alt="" /> */}
                            <ImageURL className={"w-full h-max"}  image={data?.logo && data?.logo} />
                        </Link>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* cart */}
                        <Link to={"/cart"}>
                            <div className="p-[6px] rounded-full bg-[#F40F6F] text-white">
                                <MdOutlineShoppingBag size={22} />
                            </div>
                        </Link>
                        {/* cart */}
                    </div>
                </div>
                {/* 1st row end */}

                {/* 2nd row search start */}
                <div className="mx-auto w-full">
                    {/* <form className="relative w-full " onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              {...register("searchQuery")}
              placeholder="Search..."
              className=" input border-[#EF3C8B] bg-white rounded-full h-8 w-full text-[#00000099] ps-8 text-sm"
            />
            <button className="absolute left-2 top-[6.8px]" type="submit">
              <BiSearchAlt2 className="text-[#F40F6F]" size={20} />
            </button>
          </form> */}
                    <form className="relative w-full" onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            {...register("searchQuery")}
                            placeholder="Search for products..."
                            className="placeholder input border-[#EF3C8B] bg-white rounded-full h-10 w-full text-[#00000099] ps-11"
                        />
                        <button className="absolute left-4 top-3" type="submit">
                            <BiSearchAlt2 className="text-[#F40F6F]" size={20} />
                        </button>
                    </form>
                </div>
                {/* 2nd row search end */}
            </div>
            {/* mobile screen end */}

            {/* pc start*/}
            <div className="hidden md:block">
                <div className="container mx-auto">
                    <div className="mx-2 flex justify-between items-center ">
                        <div className="h-16 w-[202px]" >
                            <Link to={"/"}>
                                <ImageURL className={"mb-4 w-full h-max"} image={data?.logo && data?.logo} />
                            </Link>
                        </div>
                        <div className="flex items-center gap-5 w-7/12">
                            {isMobile || (
                                <form className="relative w-full" onSubmit={handleSubmit(onSubmit)}>
                                    <input
                                        type="text"
                                        {...register("searchQuery")}
                                        placeholder="Search for products..."
                                        className="placeholder input border-[#EF3C8B] bg-white rounded-full h-10 w-full text-[#00000099] ps-11"
                                    />
                                    <button className="absolute left-4 top-3" type="submit">
                                        <BiSearchAlt2 className="text-[#F40F6F]" size={20} />
                                    </button>
                                </form>
                            )}

                            {userData?.email ? (
                                <Link to={"/my-account/order/active"}>
                                    <p className="flex items-center gap-1 text-black font-medium text-sm hover:cursor-pointer">
                                        <BsPerson className="font-semibold" size={22} />
                                        Account
                                    </p>
                                </Link>
                            ) : (
                                <Link to={"/login"}>
                                    <p className="flex items-center gap-1 text-black font-medium text-sm hover:cursor-pointer">
                                        <BsPerson className="font-semibold" size={22} />
                                        Login
                                    </p>
                                </Link>
                            )}
                            <div className="border h-5 border-[#00000099] opacity-50"></div>
                            {/* cart */}
                            <Link to={"/cart"}>
                                <button className="badge border-[#F40F6F] bg-[#F40F6F] py-5 px-6 gap-1 text-white text-sm font-medium hover:cursor-pointer">
                                    <MdOutlineShoppingBag size={20} />
                                    Cart <span>({cartItems?.length || 0})</span>
                                </button>
                            </Link>
                            {/* cart */}
                        </div>
                    </div>
                </div>

                {/* 2nd col */}
                <div className="border">
                    <div className="flex justify-between items-center container mx-auto px-2">
                        {/* category button start */}
                        <div>
                            <DropDownBtn title={"CATEGORIES"} menuData={menuData} />
                        </div>
                        {/* category button end */}

                        <div className="flex gap-4">
                            {buttonsData?.success === true &&
                                buttonsData?.data.slice(0,2).map((item, index) => (
                                    <span key={index}>
                                        <Link to={`/campaign/${item.id}`}>
                                            <button
                                                className={`rounded-full py-[6px] px-5 text-center text-xs font-semibold text-white hover:cursor-pointer`}
                                                style={{
                                                    backgroundColor: item.color_code,
                                                }}
                                            >
                                                {item.name}
                                            </button>
                                        </Link>
                                    </span>
                                ))}
                            {/* <Link to={"/offers"}>
                                <button className="rounded-full py-[6px] px-5 text-center text-xs font-semibold text-white bg-[#471D6B] hover:cursor-pointer">
                                    Offers
                                </button>
                            </Link>
                            <Link to={"/sellerPicks"}>
                                <button className="rounded-full py-[6px] px-5 text-center text-xs font-medium tracking-[-0.12px] text-white bg-[#EB5A9A] hover:cursor-pointer">
                                    Seller Picks
                                </button>
                            </Link>
                            <Link to={"/campaign"}>
                                <button className="rounded-full py-[6px] px-5 text-center text-xs font-medium tracking-[-0.12px] text-white bg-[#913BDB] hover:cursor-pointer">
                                    Campaign
                                </button>
                            </Link> */}
                        </div>
                    </div>
                </div>
                {/* pc end*/}
            </div>
        </div>
    );
};

export default Navbar;
