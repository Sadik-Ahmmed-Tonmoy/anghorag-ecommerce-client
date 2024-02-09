import { Link } from "react-router-dom";
import topLeft from "../../../assets/offers/topLeft.png";
import topRight from "../../../assets/offers/topRight.png";
import bottomLeft from "../../../assets/offers/bottomLeft.png";
import bottomRight from "../../../assets/offers/bottomRight.png";
import useHomeCampaignMultipleBanner from "../../../hooks/useHomeCampaignMultipleBanner";
import ImageURL from "../../../components/ImageURL/ImageURL";

const Offers = () => {
  const { HomeCampaignMultipleBanner, isLoading, isError } =
    useHomeCampaignMultipleBanner();
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 mb-6 md:mb-16">
      {HomeCampaignMultipleBanner.map((item, index) => (
        <span key={index} className=" w-full md:h-[335px] rounded-xl">
          <Link to={`/campaign/${item.id}`}>
            {/* <img className="w-full h-full" src={topLeft} alt="" /> */}
            <ImageURL
              className="w-full h-full rounded-xl"
              image={item?.image && item?.image}
            />
          </Link>
        </span>
      ))}
      {/* <span className=" w-full md:h-[335px] rounded-xl">
                <Link>
                    <img className="w-full h-full" src={topLeft} alt="" />
                </Link>
            </span>
             <span className=" w-full md:h-[335px] rounded-xl">
                <Link>
                    <img className="w-full h-full" src={topRight} alt="" />
                </Link>
            </span>
             <span className=" w-full md:h-[335px] rounded-xl">
                <Link>
                    <img className="w-full h-full" src={bottomLeft} alt="" />
                </Link>
            </span>
             <span className=" w-full md:h-[335px] rounded-xl">
                <Link>
                    <img className="w-full h-full" src={bottomRight} alt="" />
                </Link>
            </span> */}
    </div>
  );
};

export default Offers;
