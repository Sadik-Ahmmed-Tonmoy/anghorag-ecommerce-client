import { Slider } from "antd";
import { useState, useEffect, useContext } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TbCurrencyTaka } from "react-icons/tb";
import { ProviderContext } from "../../../../provider/Provider";

const FilterByPrice = ({ isReset }) => {
  const { isRefetchCategory, setIsRefetchCategory } =
  useContext(ProviderContext);
  const [isShow, setShow] = useState(true);
  const [sliderValue, setSliderValue] = useState([0, 10000]); // Initial values

  useEffect(() => {
    // Load from session storage when component mounts
    const storedPriceRange = sessionStorage.getItem('priceRange');
    if (storedPriceRange) {
      setIsRefetchCategory(!isRefetchCategory);
      setSliderValue(JSON.parse(storedPriceRange));
    }
  }, []);

  useEffect(() => {
    if (isReset) {
      setSliderValue([0, 10000]); // Reset filtered categories
    }
  }, [isReset]);


  const handleSliderChange = (value) => {
    // setIsRefetchCategory(!isRefetchCategory);

    setSliderValue(value);
    // Store in session storage
    // sessionStorage.setItem('priceRange', JSON.stringify(value));
  };

  const handleSliderAfterChange = (value) => {
    if( value[0] > -1 && value[1] < 10000000){
      setIsRefetchCategory(!isRefetchCategory);
    }
    // setIsRefetchCategory(!isRefetchCategory);
    // setSliderValue(value);
    // Store in session storage after slider movement is finished
    sessionStorage.setItem('priceRange', JSON.stringify(value));
  };

  return (
    <div className="mt-4 md:mt-11">
      <div
        onClick={() => setShow(!isShow)}
        className="flex justify-between items-center text-black text-sm md:text-lg font-medium hover:cursor-pointer"
      >
        <p>Price</p>{" "}
        <span>
          <AiOutlinePlus />
        </span>
      </div>
      <div className="border border-[#F40F6F] my-1 md:my-3"></div>
      {isShow && (
        <>
          <Slider
            range={{
              draggableTrack: true,
            }}
            // defaultValue={[100, 600]}
            max={10000}
            value={sliderValue} // Set the value prop to display the current values
            onChange={handleSliderChange}
            onAfterChange={handleSliderAfterChange} 
          />
          <p className="flex items-center text-black">
            Price:
            <TbCurrencyTaka />
            {sliderValue[0]}{" "}
            <span className="flex items-center ms-6">
              <TbCurrencyTaka />
              {sliderValue[1]}
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default FilterByPrice;
