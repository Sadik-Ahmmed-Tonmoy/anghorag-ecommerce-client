import campaignBanner from "../../assets/CampaignBanner/campaignBannerCampaignPage.png";
import Card from "../../components/Card/Card";
import useHomeCampaignBanner from "../../hooks/useHomeCampaignBanner";
import CampaignBanner from "../Home/CampaignBanner/CampaignBanner";

const Offers = () => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
  const { campaignBannerData, isLoading } = useHomeCampaignBanner();
  const data = isLoading === false && campaignBannerData?.data;
  return (
    <>
      <img src={campaignBanner} alt="" />
      <CampaignBanner data={data} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 mb-2 lg:mb-7">
        {numbers.map((item, i) => (
          <Card key={i} />
        ))}
      </div>
    </>
  );
};

export default Offers;
