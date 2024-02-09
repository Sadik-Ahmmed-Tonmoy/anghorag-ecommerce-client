import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const useSingleProduct = (slug) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const {
    data: singleProduct = {},
    isLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["singleProduct", slug],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `get_single_products/${slug}?pagination=${
            (windowWidth <= 640 && 4) ||
            (windowWidth <= 768 && 4) ||
            (windowWidth <= 1024 && 6) ||
            (windowWidth <= 1280 && 8) ||
            (windowWidth <= 1535 && 10) ||
            (windowWidth >= 1536 && 12)
          }`
        );
        return res?.data;
      } catch (error) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch data"
        );
      }
    },
  });

  return { singleProduct, isLoading,refetch, isError };
};

export default useSingleProduct;
