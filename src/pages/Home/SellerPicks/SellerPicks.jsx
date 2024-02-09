import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Card from "../../../components/Card/Card";
import useCampaignTypeButtons from "../../../hooks/useCampaignTypeButtons";
import { Link } from "react-router-dom";
import { ProviderContext } from "../../../provider/Provider";

const SellerPicks = () => {
    const { paginationValue } = useContext(ProviderContext);
    
    // const [data, setData] = useState([]);
    // useEffect(() => {
    //   axios.get("https://fakestoreapi.com/products?limit=8").then((response) => {
    //     setData(response.data);
    //   });
    // }, []);


    // const SellerPicksButton = campaignType?.filter((item) => item.name === "Seller");

    const [data, setData] = useState([]);
   

    useEffect(() => {
        axios
            .get(`sellers_picks_data?pagination=${paginationValue}`)
            .then((res) => {
                if (res.data.success === true) {
                    setData(res.data.data);
                }
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    return (
        <div className="container mx-auto">
            <div className="flex justify-between mb-3 md:mb-7">
                <h3 className="text-xl md:text-2xl font-semibold text-black">Seller Picks</h3>
             
                    <Link to={`/seller-picks-products`}>
                        <button className="text-xs font-medium bg-[#FFF1F4] text-[#F40F6F] hover:text-white hover:bg-[#F40F6F] py-2 px-[26px] rounded">
                            View All
                        </button>
                    </Link>
             
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-5 mb-2 lg:mb-7">
                {data?.data?.map((item, i) => (
                    <Card key={i} item={item} />
                ))}
            </div>
        </div>
    );
};

export default SellerPicks;
