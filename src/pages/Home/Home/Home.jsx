import { useEffect, useState } from "react";
import BrowseByCategory from "../BrowseByCategory/BrowseByCategory";
import CampaignBanner from "../CampaignBanner/CampaignBanner";
import Carousel from "../Carousel/Carousel";
import ExploreOurProducts from "../ExploreOurProducts/ExploreOurProducts";
import Offers from "../Offers/Offers";
import SellerPicks from "../SellerPicks/SellerPicks";
import useHomeCampaignBanner from "../../../hooks/useHomeCampaignBanner";
import { ScrollRestoration } from "react-router-dom";

const Home = () => {
  const { campaignBannerData, isLoading } = useHomeCampaignBanner();
  const data = isLoading === false && campaignBannerData?.data;
  
  return (
    <> 
      <Carousel />
      <CampaignBanner data={data} />
      <div className="px-2">
        <BrowseByCategory />
        <SellerPicks />
        <Offers />
        <ExploreOurProducts />
      </div>
      <ScrollRestoration />
    </>
  );
};

export default Home;
