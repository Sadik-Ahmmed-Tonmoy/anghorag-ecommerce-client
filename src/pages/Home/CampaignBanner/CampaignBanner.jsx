import ImageURL from "../../../components/ImageURL/ImageURL";
import useHomeCampaignBanner from "../../../hooks/useHomeCampaignBanner";


const CampaignBanner = ({data}) => {
 
    return (
        <div className='container mx-auto px-2 my-3 md:mt-8 mb-4 md:mb-16 lg:my-8 rounded-xl'>
            {/* <img className='w-full rounded-xl' src={CampaignBannerImg} alt="" /> */}

            <ImageURL className='w-full rounded-xl' image={data?.image && data?.image} />
        </div>
    );
};

export default CampaignBanner;