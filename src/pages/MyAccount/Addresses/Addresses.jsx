import ViewAddresses from "./ViewAddresses/ViewAddresses";
import { Link } from "react-router-dom";

const Addresses = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-semibold text-2xl  tracking-[0.48px] leading-[33.5px]">Addresses</h2>
        <Link to={'/my-account/addresses/edit'}>
          <button
            className={`text-xs font-medium text-[#F40F6F] hover:text-white bg-[#FFF1F4] hover:bg-[#F40F6F] rounded-sm flex items-center gap-1 px-4 py-[10px] hover:cursor-pointer`}
          >
            Edit Address
          </button>
        </Link>
      </div>
      <div>
        <ViewAddresses />
      </div>
    </div>
  );
};

export default Addresses;
