import React from "react";

const Ingredients = ({singleProduct, isLoading}) => {
  const ingredient = isLoading || singleProduct?.data?.products?.ingredient;

  return (
    <div>
      <p className="text-sm font-normal leading-[20px] text-justify">
     {/* {ingredient} */}
     {ingredient && (
        <div dangerouslySetInnerHTML={{ __html: ingredient }} />
      )}
      </p>
    </div>
  );
};

export default Ingredients;
