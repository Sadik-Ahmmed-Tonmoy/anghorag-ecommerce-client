import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import BottomNav from "../../components/BottomNav/BottomNav";
import ShowProducts from "./ShowProducts/ShowProducts";
import SliderMenu from "./SliderMenu/SliderMenu";
import { ProviderContext } from "../../provider/Provider";
import useNavItems from "../../hooks/useNavItems";
import useFilterProducts from "../../hooks/useFilterProducts";
import { parse } from "postcss";

function parseFilterString(filterString) {
  const filterList = {};
  const pairs = filterString.split("&");

  pairs.forEach((pair) => {
    const [key, value] = pair.split("=");
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
  const searchQuery = searchParams.get("search");
  const max_min = searchParams.get("max_min");
  const { paginationValue } = useContext(ProviderContext);
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  console.log(pageCount);
  useEffect(() => {
    setPageCount(prev => 1);
    setProducts([]);
  },[searchParams])
  const queryParams = {
    search: searchQuery,
    pagination: paginationValue,
    sort_by: filterList.sort_by?.[0],
    category: JSON.stringify(filterList.category),
    // subcategory: JSON.stringify(filterList.subcategory),
    // child_category: JSON.stringify(filterList.child_category),
    brand: JSON.stringify(filterList.brand),
    color: JSON.stringify(filterList.colors),
    size: JSON.stringify(filterList.size),
    ...(max_min && { max_min: JSON.stringify([parseInt(max_min?.split(",")[0]), parseInt(max_min?.split(",")[1])]) }),
    page: pageCount,
  };
  const queryParamsOnlyWithSubAndChild = {
    pagination: paginationValue,
    sort_by: filterList.sort_by?.[0],
    subcategory: JSON.stringify(filterList.subcategory),
    child_category: JSON.stringify(filterList.child_category),
    ...(max_min && { max_min: JSON.stringify([parseInt(max_min?.split(",")[0]), parseInt(max_min?.split(",")[1])]) }),
    page: pageCount,
  };


    
console.log(products);
  
  const { data, isLoading } = useFilterProducts(
    filterList?.category || filterList.brand || filterList.colors || filterList.size ? queryParams : queryParamsOnlyWithSubAndChild
  );
  useEffect(() => {
    if (data?.data?.data?.length > 0) {
      if (pageCount > 1) {
        setProducts((prev) => [...prev, ...data.data.data]);
      } else {
        setProducts(data.data.data);
      }

      // setProducts(prev => [...prev, ...data.data.data]);
    }
  }, [data]);

  const handleLoadMore = () => {
    setPageCount(pageCount + 1);
  };
  return (
    <div>
      <BottomNav title={"Category"} />
      <div className="md:flex container mx-auto">
        <div className="hidden md:block md:w-4/12">
          <SliderMenu />
        </div>
        <div className="w-full">
          <ShowProducts totalProductCount={data?.data?.total} data={products} handleLoadMore={handleLoadMore} loading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Category;
