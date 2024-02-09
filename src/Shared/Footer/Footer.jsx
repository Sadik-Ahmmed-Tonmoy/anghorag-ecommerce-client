import React, { useContext } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsFacebook, BsLinkedin, BsPhone } from "react-icons/bs";
import { Link } from "react-router-dom";
import ImageURL from "../../components/ImageURL/ImageURL";
import useCategoryWithSubItems from "../../hooks/useCategoryWithSubItems";
import useCompanyInfo from "../../hooks/useCompanyInfo";
import useCampaignTypeButtons from "../../hooks/useCampaignTypeButtons";
import useFooterSupportPages from "../../hooks/useFooterSupportPages";
import { ProviderContext } from "../../provider/Provider";

const Footer = () => {
  const { companyInfo, isLoading } = useCompanyInfo();
  const data = isLoading === false && companyInfo?.data;
  const { setCondition } = useContext(ProviderContext);

  const { categoryData } = useCategoryWithSubItems();
  const [buttonsData] = useCampaignTypeButtons();
  const { FooterSupportData } = useFooterSupportPages();
  //
  //
  return (
    <div className="bg-[#361354]">
      <footer className="footer pb-12 pt-16 text-white text-opacity-80 container mx-auto px-2">
        <div className="h-16 w-[202px]">
          <Link to={"/"}>
            {/* <img className="h-16 mb-4 hover:cursor-pointer" src={logo} alt="" /> */}
            <ImageURL
              image={data?.logo && data?.logo}
              className={"mb-4 hover:cursor-pointer w-full h-max"}
            />
          </Link>
          <p className="link link-hover flex items-center gap-1">
            <BsPhone />
            {data?.phone_one || data?.phone_two || data?.phone_three}
          </p>
          <p className="link link-hover text-sm font-medium flex items-center gap-1 md:mb-4">
            <AiOutlineMail />
            {data?.email}
          </p>
          <h5 className="text-lg font-medium">Join our social links</h5>
          <div className="border h-0 w-full border-[#FFFFFFCC] mb-2"></div>
          <div className="flex gap-4">
            <Link to={data?.facebook}>
              <BsFacebook className="h-10 w-10 p-2 bg-[#FFF1F4] text-[#F40F6F] rounded-md" />
            </Link>
            <Link to={data?.linkedin}>
              <BsLinkedin className="h-10 w-10 p-2 bg-[#FFF1F4] text-[#F40F6F] rounded-md" />
            </Link>
          </div>
        </div>
        <nav>
          <header className="text-[#F40F6F] text[16px] font-medium mt-7 mb-8">
            Categories
          </header>
          {categoryData?.menuData &&
            categoryData?.menuData.map((item, index) => (
              <Link key={index} to={`/category/${item?.slug}`}>
                <p onClick={()=> setCondition("category")} className="link link-hover text-sm">{item.name}</p>
              </Link>
            ))}

          {/* <p className="link link-hover text-sm">Makeup</p>
          <p className="link link-hover text-sm">Skin Care</p>
          <p className="link link-hover text-sm">Bath and Body</p>
          <p className="link link-hover text-sm">Hair Care</p>
          <p className="link link-hover text-sm">Personal Care</p>
          <p className="link link-hover text-sm">Weakness</p> */}
        </nav>
        <nav>
          <header className="text-[#F40F6F] text[16px] font-medium mt-7 mb-8">
            Quick Links
          </header>
          {buttonsData?.success === true &&
            buttonsData?.data?.map((item, index) => (
              <Link key={index} to={`/campaign/${item.id}`}>
                <p className="link link-hover text-sm">{item.name}</p>
              </Link>
            ))}
          {/* <p className="link link-hover text-sm">Offers</p>
          <p className="link link-hover text-sm">Seller Picks</p>
          <p className="link link-hover text-sm">Campaigns</p>
          <p className="link link-hover text-sm">Hair Care</p> */}
        </nav>
        <nav>
          <header className="text-[#F40F6F] text[16px] font-medium mt-7 mb-8">
            Support
          </header>
          {FooterSupportData?.success === true &&
            FooterSupportData.data.data.map((item, index) => (
              <Link key={index} to={`/support/${item.id}`}>
                <p className="link link-hover text-sm">{item.name}</p>
              </Link>
            ))}
          {/* <p className="link link-hover text-sm">Return Policy</p>
          <p className="link link-hover text-sm">Terms of Use</p>
          <p className="link link-hover text-sm">Privacy Policy</p>
          <p className="link link-hover text-sm">FAQS</p>
          <p className="link link-hover text-sm">Shipping & Delivery</p>
          <p className="link link-hover text-sm">Contact Us</p> */}
        </nav>
      </footer>
      <div className="w-full h-0 border border-[#FFFFFFCC]"></div>
      <p className="text-center text-sm py-6 text-white">
        Copyright @ 2023 {data?.company_name}. All Right Reserved
      </p>
    </div>
  );
};

export default Footer;
