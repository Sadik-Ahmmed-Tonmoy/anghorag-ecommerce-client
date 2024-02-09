import React, { useState } from "react";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";
import BottomNav from "../../components/BottomNav/BottomNav";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import MenuList from "../../pages/MyAccount/MenuList/MenuList";
import { Button, Drawer, Space } from "antd";
import { AiOutlineMenu } from "react-icons/ai";
import useUserAddress from "../../hooks/useUserAddress";

const MyAccount = () => {
  const { userAddress, isUserAddressLoading } = useUserAddress();
  // drawer
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  return (
    <div className="bg-white text-black">
      <Navbar />
      <BottomNav title={"My Account"}/>
      <div className="container mx-auto px-2 ">
        <div className="md:flex justify-between gap-10">
          <div className="md:w-4/12 lg:w-3/12 flex md:flex-col justify-between md:justify-start ">
            <div>
              <h2 className="text-2xl font-semibold mb-2 leading-[33.5px] tracking-[0.48px]">Hello User</h2>
              <p className="font-normal text-sm mb-5 md:mb-10 tracking-[0.28px]">
                Welcome to your Account
              </p>
            </div>
            {/* Menu list for mobile start */}
            <div className="md:hidden m-1">
              <Space>
                <div
                  value="left"
                  onClick={showDrawer}
                  className="px-5 py-2 rounded-md bg-[#FFBFCD] text-[#F40F6F]"
                >
                  <AiOutlineMenu />
                </div>
              </Space>
              <Drawer
                title="Menu"
                placement={"right"}
                width="80%"
                onClose={onClose}
                open={open}
              >
                <MenuList onClose={onClose} />
              </Drawer>
            </div>
            {/* Menu list for mobile end */}
            {/* Menu list for pc start */}
            <div className="w-full hidden md:block">
              <MenuList />
            </div>
            {/* Menu list for pc end */}
          </div>
          <div className="md:w-8/12 lg:w-9/12 min-h-[calc(100vh-60vh)] md:min-h-[calc(100vh-400px)]">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccount;
