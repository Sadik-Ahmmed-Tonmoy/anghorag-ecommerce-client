import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BottomNav from "../../components/BottomNav/BottomNav";
import useNavItems from "../../hooks/useNavItems";
import { ProviderContext } from "../../provider/Provider";
import SellerPicksShowProducts from "./SellerPicksShowProducts/SellerPicksShowProducts";

const SellerPicksPageForAllProducts = () => {
    // const [condition, setCondition] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadMoreURL, setLoadMoreURL] = useState("");
    const [productsData, setProductsData] = useState([]);
    // const [searchParams] = useSearchParams();
    // const searchQuery = searchParams.get("search");
    // const param = useParams();
    const {  sortedValue, paginationValue,  } = useContext(ProviderContext);
    

    // const [filteredCategories, setFilteredCategories] = useState([]);
    // const [filteredBrands, setFilteredBrands] = useState([]);
    // const [filteredColors, setFilteredColors] = useState([]);
    // const [filteredSizes, setFilteredSizes] = useState([]);
    // const [priceRange, setPriceRange] = useState([]);
    // const [categoryId, setCategoryId] = useState(undefined);
    // const [subCategoryId, setSubCategoryId] = useState(undefined);
    // const [subSubCategoryId, setSubSubCategoryId] = useState(undefined);
    // const { navItems, isMenuDataLoading } = useNavItems();
    // const menuData = isMenuDataLoading === false ? navItems?.menuData : [];

    // //
    // //
    // //

    // // Fetch data from session storage on component mount
    // useEffect(() => {
    //     const storedCategories = JSON.parse(sessionStorage.getItem("filteredCategories")) || [];
    //     const storedBrands = JSON.parse(sessionStorage.getItem("filteredBrands")) || [];
    //     const storedColors = JSON.parse(sessionStorage.getItem("filteredColors")) || [];
    //     const storedSizes = JSON.parse(sessionStorage.getItem("filteredSizes")) || [];
    //     const storedPriceRange = JSON.parse(sessionStorage.getItem("priceRange")) || [];
    //     setFilteredCategories(storedCategories);
    //     setFilteredBrands(storedBrands);
    //     setFilteredColors(storedColors);
    //     setFilteredSizes(storedSizes);
    //     setPriceRange(storedPriceRange);
    // }, [condition, searchQuery, param, isRefetchCategory, isReset]);

    // Execute effect when necessary data changes

    // useEffect(() => {
    //     if (searchQuery) {
    //         setCondition("search");
    //     } else if (param && param.subSubItem) {
    //         setCondition("subSubItem");
    //     } else if (param && param.subItem) {
    //         setCondition("subItem");
    //     } else if (param && param.category) {
    //         setCondition("category");
    //     }
    // }, [searchQuery, param, param?.category, param?.subItem, param?.subSubItem,]);

    // const handleConditionChange = (newCondition) => {
    //     setCondition((prevCondition) => {
    //         // If the new condition is different from the previous one, update the state
    //         if (prevCondition !== newCondition) {
    //             return newCondition;
    //         }
    //         // If the new condition is the same as the previous one, no need to update
    //         return prevCondition;
    //     });
    // };

    // // Example usage:
    // handleConditionChange("newCondition");

    // useEffect(() => {
    //     if (condition === "category") {
    //         const categoryWithId = menuData.filter((item) => item.slug === param.category);
    //         const newCategoryId = categoryWithId.length > 0 ? categoryWithId[0].id : null;
    //         setCategoryId(newCategoryId);
    //     } else {
    //         setCategoryId();
    //     }
    // }, [condition, param, menuData]);

    // useEffect(() => {
    //     if (condition === "subItem") {
    //         const subCategoryWithId = menuData
    //             .map((category) => category.sub_items)
    //             .flat() // Flatten the array of sub_items
    //             .filter((subItem) => subItem.slug === param.subItem);

    //         const newSubCategoryId = subCategoryWithId.length > 0 ? subCategoryWithId[0].id : null;

    //         setSubCategoryId(newSubCategoryId);
    //     } else {
    //         setSubCategoryId();
    //     }
    // }, [condition, param, menuData]);

    // useEffect(() => {
    //     if (condition === "subSubItem" && param.subSubItem) {
    //         const subSubCategoryWithId = menuData
    //             .flatMap((category) => category.sub_items)
    //             .flatMap((subItem) => subItem.sub_sub_items)
    //             .filter((subSubItem) => subSubItem.slug === param.subSubItem);

    //         if (subSubCategoryWithId.length > 0) {
    //             const newSubSubItemId = subSubCategoryWithId[0].id;
    //             setSubSubCategoryId((prev) => newSubSubItemId);
    //             //
    //         } else {
    //             console.error("Sub-sub-item not found for the given slug:", param.subSubItem);
    //             setSubSubCategoryId(); // or provide a default value if needed
    //         }
    //     } else {
    //         setSubSubCategoryId(); // or provide a default value if needed
    //     }
    // }, [condition, param.subSubItem, menuData]);

    // useEffect(() => {
    //     // Construct params based on the updated state
    //     const params = {
    //         search: searchQuery,
    //         sort_by: sortedValue,
    //         category: JSON.stringify(condition === "category" ? [categoryId, ...filteredCategories] : filteredCategories),

    //         subcategory: condition === "subItem" ? JSON.stringify([subCategoryId]) : "",
    //         child_category: condition === "subSubItem" ? JSON.stringify([subSubCategoryId]) : "",
    //         brand: JSON.stringify(filteredBrands),
    //         color: JSON.stringify(filteredColors),
    //         size: JSON.stringify(filteredSizes),
    //         max_min: JSON.stringify(priceRange),
    //     };

    //     setLoading(true);
    //     axios
    //         .get(`product-filter`, {
    //             params: {
    //                 pagination: paginationValue,
    //                 ...params,
    //             },
    //         })
    //         .then((res) => {
    //             if (res.data.success === true) {
    //                 setData(res?.data?.data);

    //                 setLoadMoreURL(res.data.data.next_page_url);
    //             }
    //             setLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching data from 'new' endpoint:", error);
    //             setLoading(false);
    //         });
    // }, [
    //     condition,
    //     searchQuery,
    //     param,
    //     filteredCategories,
    //     // isRefetchCategory,
    //     filteredBrands,
    //     filteredColors,
    //     filteredSizes,
    //     priceRange,
    // ]);

    // useEffect(() => {
    //   const storedCategories =
    //     JSON.parse(sessionStorage.getItem("filteredCategories")) || [];
    //   const storedBrands =
    //     JSON.parse(sessionStorage.getItem("filteredBrands")) || [];
    //   const storedColors =
    //     JSON.parse(sessionStorage.getItem("filteredColors")) || [];
    //   const storedSizes =
    //     JSON.parse(sessionStorage.getItem("filteredSizes")) || [];
    //   const storedPriceRange =
    //     JSON.parse(sessionStorage.getItem("priceRange")) || [];
    //   setFilteredCategories(storedCategories);
    //   setFilteredBrands(storedBrands);
    //   setFilteredColors(storedColors);
    //   setFilteredSizes(storedSizes);
    //   setPriceRange(storedPriceRange);

    //   const params = {
    //     search: searchQuery,
    //     sort_by: sortedValue,
    //     category: condition === "category" ? [param.category, ...filteredCategories] : filteredCategories,
    //     subcategory: "",
    //     childcategory: "",
    //     brand: filteredBrands,
    //     color: filteredColors,
    //     size: filteredSizes,
    //     min: priceRange[0],
    //     max: priceRange[1],
    //   };

    //   if (condition === "subItem") {
    //     params.subcategory = param?.subItem;
    //   }

    //   if (condition === "subSubItem") {
    //     params.childcategory = param?.subSubItem;
    //   }

    //
    //   setLoading(true);
    //   axios
    //     .get(`get_all_search_products`, {
    //       params: {
    //         pagination: paginationValue,
    //         ...params,
    //       },
    //     })
    //     .then((res) => {
    //       if (res.data.success === true) {
    //         setData(res?.data.data);
    //         setLoadMoreURL(res.data.data.next_page_url);

    //         setLoading(false);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching data from 'new' endpoint:", error);
    //     });
    // }, [condition, filteredCategories, param, isRefetchCategory]);

    // if (condition === "category") {
    //   // Check if filteredCategories exists in session storage
    //   const sessionFilteredCategories = sessionStorage.getItem("filteredCategories");

    //   // Parse session data if it exists, or initialize an empty array
    //   const filteredCategories = sessionFilteredCategories ? JSON.parse(sessionFilteredCategories) : [];
    //

    //   // Perform some operation (push, modify) on the filteredCategories array
    //   filteredCategories.push(param?.category); // Replace somethingToAdd with the value you want to push
    //
    //   // Update the session storage with the modified filteredCategories array
    //   sessionStorage.setItem("filteredCategories", JSON.stringify(filteredCategories));
    // }

    //   const handleLoadMore = () => {
    //     setLoading(true);
    //
    //     axios
    //       .get(loadMoreURL + `&pagination=${paginationValue}`)
    //       .then((res) => {
    //         if (res.data.success === true) {
    //           data.push(...res.data.data.data);
    //           setLoadMoreURL(res.data.data.next_page_url);
    //           setLoading(false);
    //           data.length === 0 && setLoading(false);
    //         }
    //       })
    //       .catch((error) => {
    //         setLoading(false);
    //         console.error("Error fetching categories:", error);
    //       });
    //   };

// 
// 
    
  useEffect(() => {
    axios
      .get(
        `sellers_picks_data`, {
            params: {
                pagination: paginationValue,
                sort_by: sortedValue,
            },
        }
      )
     
      .then((res) => {
        if (res.data.success === true) {
            
            setProductsData(res?.data?.data);

          setLoadMoreURL(res.data.data.next_page_url);
          
          
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [sortedValue]);



   
   
    const handleLoadMore = (currentPage) => {
      const nextPage = currentPage + 1;
      
        // setLoadingData(true);
        axios
          .get(
            loadMoreURL + 
            `&pagination=${paginationValue }`
          )
          .then((res) => {
            if (res.data.success === true) {
                
                
            //   setLoadingData(false);
              const newData = res?.data?.data?.data;
              
              if (newData && Array.isArray(newData)) {
                productsData.data.push(...newData);
                setLoadMoreURL(res.data.data.next_page_url);
              } else {
                console.error("Products data is missing or not an array.");
              }
            }
          })
          .catch((error) => {
            // setLoadingData(false);
            console.error("Error fetching categories:", error);
          });
      };

    return (
        <div>
            <BottomNav title={"Seller Picks"} />
            <div className="md:flex container mx-auto">
                {/* <div className="hidden md:block md:w-4/12">
                    <SliderMenu />
                </div> */}
                <div className="w-full">
                    <SellerPicksShowProducts data={productsData} handleLoadMore={handleLoadMore} loading={loading} loadMoreURL={loadMoreURL} />
                </div>
            </div>
        </div>
    );
};

export default SellerPicksPageForAllProducts;
