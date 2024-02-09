import { ScrollRestoration } from "react-router-dom";
import useUserAddress from "../../../../hooks/useUserAddress";

const ViewAddresses = () => {
  const { userAddress, isUserAddressLoading } = useUserAddress();
  const data = isUserAddressLoading === false && userAddress?.data;
  return (
    <div className="bg-[#FFF1F4] p-3 md:p-6 rounded-lg mb-10 md:mb-24">
      <h4 className="font-semibold text-base mb-2 md:mb-4">Billing Address</h4>
      <div className="bg-white p-2 md:p-5 rounded-lg mb-3 md:mb-9">
        <div className="flex flex-col xs:flex-row justify-between mb-[10px]">
          <h5 className="font-medium text-sm text-[#00000099]">Name:</h5>
          <p className="font-medium text-sm">
            {data?.b_first_name} {data?.b_last_name}
          </p>
        </div>
        <div className="flex flex-col xs:flex-row justify-between mb-[10px]">
          <h5 className="font-medium text-sm text-[#00000099] whitespace-nowrap">
            Phone Number:
          </h5>
          <p className="font-medium text-sm">{data?.b_phone}</p>
        </div>
        <div className="flex flex-col xs:flex-row justify-between mb-[10px]">
          <h5 className="font-medium text-sm text-[#00000099] whitespace-nowrap">
            Email Address:
          </h5>
          <p className="font-medium text-sm">{data?.b_email}</p>
        </div>
        <div className="flex flex-col xs:flex-row justify-between mb-[10px]">
          <h5 className="font-medium text-sm text-[#00000099] me-1">
            Address:
          </h5>
          <p className="font-medium text-sm">{data?.b_address}</p>
        </div>
      </div>
      <h4 className="font-semibold text-base mb-2 md:mb-4">Shipping Address</h4>
      <div className="bg-white p-2 md:p-5 rounded-lg">
        <div className="flex flex-col xs:flex-row justify-between mb-[10px]">
          <h5 className="font-medium text-sm text-[#00000099]">Name:</h5>
          <p className="font-medium text-sm">
            {data?.s_first_name} {data?.s_last_name}
          </p>
        </div>
        <div className="flex flex-col xs:flex-row justify-between mb-[10px]">
          <h5 className="font-medium text-sm text-[#00000099]">
            Phone Number:
          </h5>
          <p className="font-medium text-sm">{data?.s_phone}</p>
        </div>
        <div className="flex flex-col xs:flex-row justify-between mb-[10px]">
          <h5 className="font-medium text-sm text-[#00000099]">
            Email Address:
          </h5>
          <p className="font-medium text-sm">{data?.s_email}</p>
        </div>
        <div className="flex flex-col xs:flex-row justify-between mb-[10px]">
          <h5 className="font-medium text-sm text-[#00000099] me-1">
            Address:
          </h5>
          <p className="font-medium text-sm">{data?.s_address}</p>
        </div>
      </div>
      <ScrollRestoration/>
    </div>
  );
};

export default ViewAddresses;
