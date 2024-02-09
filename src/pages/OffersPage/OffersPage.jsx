import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardForOfferPage from "../../components/CardForOfferPage/CardForOfferPage";
import ImageURL from "../../components/ImageURL/ImageURL";
import CampaignBanner from "../Home/CampaignBanner/CampaignBanner";
import { ProviderContext } from "../../provider/Provider";

const OffersPage = () => {
  const [campaign, setCampaign] = useState({});
  const [loadMoreURL, setLoadMoreURL] = useState("");
  const [loadingMainData, setLoadingMainData] = useState(false);
  const [loadingMoreData, setLoadingMoreData] = useState(false);
  const { paginationValue } = useContext(ProviderContext);
  const [currentPage, setCurrentPage] = useState(2);

  const { id } = useParams();
  

  useEffect(() => {
    setLoadingMainData(true);
    axios
      .get(`campaign/${id}?pagination=${paginationValue}`)
      .then((res) => {
        if (res.data.success === true) {
          setCampaign(res.data.data);
          setLoadingMainData(false);
          //  setLoadMoreURL(item.product_list.next_page_url);
          // setLoadMoreURL(res.data.data.category_list[0].product_list.next_page_url);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoadingMainData(false);
      });
  }, [id, paginationValue]);

  const handleLoadMore = (currentPage, categoryIndex) => {
    // 
    const nextPage = currentPage + 1;
    setLoadingMoreData(true);
    axios
      .get(`campaign/${id}?pagination=${paginationValue}&page=${nextPage}`)
      .then((res) => {
        if (res.data.success === true) {
          const newData =
            res.data.data.category_list[categoryIndex].product_list.data;
          const oldData =
            campaign.category_list[categoryIndex].product_list.data;

          campaign.category_list[categoryIndex].product_list.current_page =
            nextPage;

          

          oldData.push(...newData);

          setLoadingMoreData(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching additional data:", error);
        setLoadingMoreData(false);
      });
  };

  return (
    <>
      {loadingMainData ? (
        <div className=" flex justify-center min-h-[calc(100vh-50vh)] ">
          <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto"></span>
        </div>
      ) : (
        <>
          {/* <img src={campaignBannerImg} alt="" /> */}
    <div className="flex justify-center">      <ImageURL className="" image={campaign?.image} /></div>
          {/* start */}
          {campaign?.category_list &&
            campaign?.category_list.map((item, index) => (
              //
              <div key={index}>
                <CampaignBanner data={item} />
                <div className="container mx-auto px-2 mb-16">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 mb-2 lg:mb-7">
                    {item.product_list?.data.map((item, i) => (
                      <CardForOfferPage key={i} item={item} itemNumber={i} />
                    ))}
                  </div>
                  {
                    <div className="flex justify-center">
                      {/*{loadMoreURL === null ? (*/}
                      {/*    ""*/}
                      {/*) : (*/}
                      {/*    <button*/}
                      {/*        onClick={() => {*/}
                      {/*            handleLoadMore();*/}
                      {/*            // setLoadMoreURL(item.product_list.next_page_url);*/}
                      {/*        }}*/}
                      {/*        className="text-[#913BDB] hover:text-white hover:bg-[#9747FF] border border-[#913BDB] py-3 px-[72px] rounded-[4px] text-sm font-medium"*/}
                      {/*    >*/}
                      {/*        Load More*/}
                      {/*    </button>*/}
                      {/*)}*/}

                      {loadingMoreData ? (
                        <div className=" flex justify-center">
                          <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto"></span>
                        </div>
                      ) : (
                        <span>
                          {item?.product_list?.total >
                            campaign?.category_list[index]?.product_list?.data
                              ?.length && (
                            <button
                              onClick={() => {
                                handleLoadMore(
                                  item.product_list.current_page,
                                  index
                                );
                                // setLoadMoreURL(item.product_list.next_page_url);
                              }}
                              className="text-[#913BDB] hover:text-white hover:bg-[#9747FF] border border-[#913BDB] py-3 px-[72px] rounded-[4px] text-sm font-medium"
                            >
                              Load More
                            </button>
                          )}
                          {/* <button
                            onClick={() => {
                              handleLoadMore(index);
                              // setLoadMoreURL(item.product_list.next_page_url);
                            }}
                            className="text-[#913BDB] hover:text-white hover:bg-[#9747FF] border border-[#913BDB] py-3 px-[72px] rounded-[4px] text-sm font-medium"
                          >
                            Load More
                          </button> */}
                        </span>
                      )}
                    </div>
                  }
                </div>
              </div>
            ))}
          {/* end */}
          {/* start */}
          {/* <CampaignBanner data={data} />
            <div className="container mx-auto px-2 mb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 mb-2 lg:mb-7">
                    {numbers.map((item, i) => (
                        <Card key={i} />
                    ))}
                </div>
                <div className="flex justify-center">
                    <button className="text-[#913BDB] hover:text-white hover:bg-[#9747FF] border border-[#913BDB] py-3 px-[72px] rounded-[4px] text-sm font-medium">
                        Load More
                    </button>
                </div>
            </div> */}
          {/* end */}
          {/* start */}
          {/* <CampaignBanner data={data} />
            <div className="container mx-auto px-2 mb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 mb-2 lg:mb-7">
                    {numbers.map((item, i) => (
                        <Card key={i} />
                    ))}
                </div>
                <div className="flex justify-center">
                    <button className="text-[#913BDB] hover:text-white hover:bg-[#9747FF] border border-[#913BDB] py-3 px-[72px] rounded-[4px] text-sm font-medium">
                        Load More
                    </button>
                </div>
            </div> */}
          {/* end */}
        </>
      )}
    </>
  );
};

export default OffersPage;
