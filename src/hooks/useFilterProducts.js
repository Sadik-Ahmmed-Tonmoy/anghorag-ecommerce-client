import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFilterProducts = (queryParams) => {
 const {
        data: data = {},
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["filterProducts" , queryParams ],
        queryFn: async () => {
           
            try {
                const res = await   axios
                .get(`product-filter`, {
                    params: {
                        ...queryParams,
                    },
                })
                return res.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || "Failed to fetch data");
            }
        },
   
    });

    return { data, isLoading, isError, error };
};

export default useFilterProducts;
