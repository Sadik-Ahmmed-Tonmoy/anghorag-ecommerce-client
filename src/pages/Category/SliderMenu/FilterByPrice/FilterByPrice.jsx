import { Slider } from "antd";
import { useState, useEffect, useContext } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { TbCurrencyTaka } from "react-icons/tb";
import { ProviderContext } from "../../../../provider/Provider";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const FilterByPrice = ({ isReset }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParam] = useSearchParams();
  const max_min = searchParams.get("max_min");

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const selectedCheckboxValues = searchParams.getAll("max_min");
    setSelectedCheckboxes(selectedCheckboxValues.map((value) => parseInt(value, 10)));
  }, [location.search]);

  const [isShow, setShow] = useState(true);
  const [sliderValue, setSliderValue] = useState([0, 10000]); // Initial values

  const handleSliderChange = (value) => {
    setSliderValue(value);
  };
  useEffect(() => {
    if (max_min) {
      setSliderValue([parseInt(max_min?.split(",")[0]), parseInt(max_min?.split(",")[1])]);
    } else {
      setSliderValue([0, 10000]);
    }
  }, [isReset, location?.search]);

  const handleSliderAfterChange = (value) => {
    const isSelected = selectedCheckboxes.includes(value);
    let updatedCheckboxes;

    if (!isSelected) {
      updatedCheckboxes = [value];
    }

    // Get the existing search parameters
    const searchParams = new URLSearchParams(location.search);

    // Remove existing parameters for the given title
    searchParams.delete("max_min");

    // Add updated parameters
    updatedCheckboxes.forEach((checkbox) => {
      searchParams.append("max_min", checkbox);
    });

    // Update the URL
    navigate(`${location?.pathname}?${searchParams.toString()}`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-4 md:mt-11">
      <div
        onClick={() => setShow(!isShow)}
        className="flex justify-between items-center text-black text-sm md:text-lg font-medium hover:cursor-pointer"
      >
        <p>Price</p> <span>{isShow ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
      </div>
      <div className="border border-[#F40F6F] my-1 md:my-3"></div>
      {isShow && (
        <>
          <Slider
            range={{
              draggableTrack: true,
            }}
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
