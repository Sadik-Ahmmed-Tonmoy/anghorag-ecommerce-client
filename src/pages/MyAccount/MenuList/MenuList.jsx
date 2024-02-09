import { NavLink, useLocation, useNavigate } from "react-router-dom";
import orderIcon from "../../../assets/myAccount/myOrder.svg";
import orderIconActive from "../../../assets/myAccount/myOrderActive.svg";
import { IoHomeOutline } from "react-icons/io5";
import { GoPerson, GoSignOut } from "react-icons/go";
import axios from "axios";
import Swal from "sweetalert2";

const MenuList = ({ onClose }) => {
  const location = useLocation();
  const isMyOrder = location.pathname.includes("order");
  const isAddresses = location.pathname.includes("addresses");
  const isPersonalInfo = location.pathname.includes("personal");
  const navigate = useNavigate();
  const handleLogOut = () => {
    axios
      .get("logout")
      .then((res) => {
        if (res.data.status === true) {
          localStorage.removeItem("authToken");
          Swal.fire({
            position: "center",
            icon: "success",
            title: "SignOut successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        } else {
          // Handle other cases if needed
        }
      })
      .catch((error) => {});
  };
  return (
    <>
      <ul>
        <NavLink to={"/my-account/order/active"}>
          <li
            onClick={onClose}
            className={`${
              isMyOrder
                ? "bg-[#FFF1F4] border-[#F40F6F] border-l-2"
                : "border-white border-l-2"
            }  mb-2 hover:cursor-pointer`}
          >
            {isMyOrder ? (
              <span className="py-3 text-[#F40F6F] flex items-center gap-4 ps-5 md:ps-0 md:w-9/12 mx-auto text-lg font-semibold">
                <img src={orderIconActive} alt="" />
                My orders
              </span>
            ) : (
              <span className="py-3 flex items-center gap-4 ps-5 md:ps-0 md:w-9/12 mx-auto text-lg font-medium text-[#666666]">
                <img src={orderIcon} alt="" />
                My orders
              </span>
            )}
          </li>
        </NavLink>

        <NavLink to={"/my-account/addresses/view"}>
          <li
            onClick={onClose}
            className={`${
              isAddresses
                ? "bg-[#FFF1F4] border-[#F40F6F] border-l-2"
                : "border-white border-l-2"
            }  mb-2 hover:cursor-pointer`}
          >
            <span
              className={`py-3 text-lg font-medium flex items-center gap-4 ps-5 md:ps-0 md:w-9/12 mx-auto ${
                isAddresses
                  ? "text-[#F40F6F] font-semibold"
                  : "text-[#666666] font-medium "
              }`}
            >
              <IoHomeOutline />
              Addresses
            </span>
          </li>
        </NavLink>
        <NavLink to={"/my-account/personal-info/view"}>
          <li
            onClick={onClose}
            className={`${
              isPersonalInfo
                ? "bg-[#FFF1F4] border-[#F40F6F] border-l-2"
                : "border-white border-l-2"
            }  mb-2 hover:cursor-pointer`}
          >
            <span
              className={`py-3 text-lg flex items-center gap-4 ps-5 md:ps-0 md:w-9/12 mx-auto ${
                isPersonalInfo
                  ? "text-[#F40F6F] font-semibold"
                  : "text-[#666666] font-medium "
              }`}
            >
              <GoPerson />
              Personal Info
            </span>
          </li>
        </NavLink>

        <li
          // onClick={onClose}
          className={"border-white border-l-2 mb-2 hover:cursor-pointer"}
          onClick={handleLogOut}
        >
          <span
            className={
              "py-3 text-lg font-medium flex items-center gap-4 ps-5 md:ps-0 md:w-9/12 mx-auto text-[#666666]"
            }
          >
            <GoSignOut />
            Sign out
          </span>
        </li>
      </ul>
    </>
  );
};

export default MenuList;
