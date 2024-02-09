import React from "react";
import campaignBanner from "../../assets/CampaignBanner/campaignBannerCampaignPage.png";
import CampaignBanner from "../Home/CampaignBanner/CampaignBanner";
import CampaignSlider from "./CampaignSlider/CampaignSlider";
import useHomeCampaignBanner from "../../hooks/useHomeCampaignBanner";

const Campaign = () => {
  const { campaignBannerData, isLoading } = useHomeCampaignBanner();
  const data = isLoading === false && campaignBannerData?.data;
  return (
    <>
      <img src={campaignBanner} alt="" />
      <CampaignBanner data={data} />
      <CampaignSlider />
      <CampaignBanner data={data} />
      <CampaignSlider />
      <CampaignBanner data={data} />
      <CampaignSlider />
      <CampaignBanner data={data} />
      <CampaignSlider />
    </>
  );
};

export default Campaign;
