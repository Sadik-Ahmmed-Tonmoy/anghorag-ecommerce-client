import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BottomNav from "../../components/BottomNav/BottomNav";
import ShowProducts from "./ShowProducts/ShowProducts";
import SliderMenu from "./SliderMenu/SliderMenu";
import { ProviderContext } from "../../provider/Provider";
import useNavItems from "../../hooks/useNavItems";
import useFilterProducts from "../../hooks/useFilterProducts";


function parseFilterString(filterString) {
  const filterList = {};
  const pairs = filterString.split('&');

  pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      if (filterList[key]) {
          if (!Array.isArray(filterList[key])) {
              filterList[key] = [filterList[key]];
          }
          filterList[key].push(value);
      } else {
          filterList[key] = value;
      }
  });

  for (const key in filterList) {
      if (Array.isArray(filterList[key])) {
          filterList[key] = [...new Set(filterList[key])];
      } else {
          filterList[key] = [filterList[key]];
      }
  }

  return filterList;
}

const Category = () => {
    const [searchParams, setSearchParam] = useSearchParams();
    const filterList = parseFilterString(searchParams.toString());
    console.log(filterList?.category);
    
    const [loading, setLoading] = useState(false);
    const [loadMoreURL, setLoadMoreURL] = useState("");

    const searchQuery = searchParams.get("search");
    const [category, setCategory] = useState([]);
    const {  paginationValue } = useContext(ProviderContext);


    const queryParams = {
        search: searchQuery,
        // sort_by: sortedValue,
        category: JSON.stringify(filterList.category),
        // subcategory: condition === "subItem" ? JSON.stringify([subCategoryId]) : [],
        // child_category: condition === "subSubItem" ? JSON.stringify([subSubCategoryId]) : [],
        // brand: JSON.stringify(filteredBrands),
        // color: JSON.stringify(filteredColors),
        // size: JSON.stringify(filteredSizes),
        // max_min: JSON.stringify(priceRange),
    };


const {data} = useFilterProducts(queryParams)

    const handleLoadMore = (currentPage) => {
        const nextPage = currentPage + 1;
        setLoading(true);
        axios
            .get(loadMoreURL + `&pagination=${paginationValue}&page=${nextPage}`)
            .then((res) => {
                if (res.data.success === true) {
                    setLoading(false);
                    const oldData = data.data;
                    const newData = res?.data?.data?.data;

                    const count = (data.current_page = nextPage);

                    oldData.push(...newData);

                    //   setLoadingMoreData(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching additional data:", error);
                setLoading(false);
            });
    };
    return (
        <div>
            <BottomNav title={"Category"} />
            <div className="md:flex container mx-auto">
                <div className="hidden md:block md:w-4/12">
                    <SliderMenu />
                </div>
                <div className="w-full">
                    <ShowProducts data={data?.data} handleLoadMore={handleLoadMore} loading={loading} loadMoreURL={loadMoreURL} />
                </div>
            </div>
        </div>
    );
};

export default Category;
