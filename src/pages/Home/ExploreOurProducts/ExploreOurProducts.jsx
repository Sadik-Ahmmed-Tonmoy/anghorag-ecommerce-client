import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Card from "../../../components/Card/Card";
import { ProviderContext } from "../../../provider/Provider";

const ExploreOurProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loadMoreURL, setLoadMoreURL] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const {  paginationValue  } = useContext(ProviderContext);

  

  useEffect(() => {
    axios
      .get(
        `get_products?pagination=${paginationValue }`
      )
      .then((res) => {
        if (res.data.success === true) {
          setAllProducts(res?.data?.data?.data);
          setLoadMoreURL(res.data.data.next_page_url);
          //
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleLoadMore = () => {
    setLoadingData(true);
    axios
      .get(
        loadMoreURL +
          `&pagination=${paginationValue }`
      )
      .then((res) => {
        if (res.data.success === true) {
          setLoadingData(false);
          const newData = res?.data?.data?.data;
          if (newData && Array.isArray(newData)) {
            allProducts.push(...newData);
            setLoadMoreURL(res.data.data.next_page_url);
          } else {
            console.error("Products data is missing or not an array.");
          }
        }
      })
      .catch((error) => {
        setLoadingData(false);
        console.error("Error fetching categories:", error);
      });
  };

  return (
    <div className="container mx-auto mb-8 sm:mb-10 md:mb-24">
      <div className="mb-4 md:mb-9">
        <h3 className="text-xl md:text-2xl font-semibold text-black">
          Explore our Products
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 mb-4 md:mb-[6px] lg:mb-7">
        {allProducts.map((item, i) => (
          <Card key={i} item={item} />
        ))}
      </div>
      {/* <CardCollection products={allProducts} /> */}
      {loadingData && (
        <div className=" flex justify-center">
          <span className="loading loading-bars loading-lg text-[#F40F6F] mx-auto"></span>
        </div>
      )}
      <div className="flex justify-center">
        {loadMoreURL === null ? (
          ""
        ) : (
          <button
            onClick={handleLoadMore}
            className={`text-[#913BDB] border border-[#913BDB] hover:text-white hover:bg-[#9747FF] py-3 px-[72px] rounded-[4px] text-sm font-medium ${
              loadingData ? "hover:cursor-not-allowed" : "hover:cursor-pointer"
            } `}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default ExploreOurProducts;
