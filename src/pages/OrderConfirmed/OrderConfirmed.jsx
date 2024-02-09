import { Link, useParams } from "react-router-dom";
import confirmedLogo from "../../assets/orderConfirmed/confirmedLogo.png";

const OrderConfirmed = () => {
  const {order} = useParams()
  return (
    <div className="flex justify-center items-center my-3 md:my-6 text-black mx-2 md:mx-0">
      <div className="sm:w-8/12 md:w-6/12 lg:w-5/12 bg-[#FFF1F4] p-4 sm:p-6 md:p-8 rounded-lg">
        <div className="bg-white rounded-lg py-12">
          <div className="flex justify-center items-center">
            <div className="flex flex-col items-center justify-center md:px-2">
              <img className="mb-10 w-6/12" src={confirmedLogo} alt="" />
              <h3 className="text-3xl font-semibold mb-4 text-center">
                Thanks for your order!
              </h3>
              <p className="font-semibold text-lg mb-3 text-center">
                Your order ID is: #{order}
              </p>
              <p className="text-sm font-semibold text-center mb-8 text-[#00000099]">
                You will receive an order confirmation email <br /> with details
                of your order.
              </p>
           <Link className="w-full flex justify-center" to={'/'}>   <button
          className={`md:w-7/12 rounded px-2 h-12 font-semibold bg-[#F40F6F] text-white hover:text-[#F40F6F] hover:bg-[#FFBFCD] hover:cursor-pointer`}
        >
        Continue Shopping
        </button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmed;
