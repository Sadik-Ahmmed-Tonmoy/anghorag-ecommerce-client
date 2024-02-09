import { useQuery } from "@tanstack/react-query";
import { getFromLocalStorage } from "../utilities/getFromLocalStorage";
import useAxiosSecure from "./useAxiosSecure";

const useUserAddress = () => {
    const token = getFromLocalStorage();
    const axiosSecure = useAxiosSecure();

    const {
        data: userAddress = {},
        refetch,
        isLoading: isUserAddressLoading,
        isError: userError,
        error: userErrorDetail,
    } = useQuery({
        queryKey: ["userAddress", token || "placeholder"], // Use a placeholder if token is not available
        queryFn: async () => {
            if (!token) {
                return; // Return nothing if the token is not available
            }

            try {
                const res = await axiosSecure.get(`get_user_address`);
                return res.data;
            } catch (error) {
                throw new Error(error.response?.data?.message || "Failed to fetch user data");
            }
        },
        enabled: !!token, // Enable the query only if token exists
    });

    return {
        userAddress,
        refetch,
        isUserAddressLoading,
        userError,
        userErrorDetail,
    };
};

export default useUserAddress;
