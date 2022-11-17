import React from "react";
import MyFooter from "./MyFooter";
import MyNavbar from "./MyNavbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <MyNavbar />
        <Outlet/>
      <MyFooter/>
    </>
  );
};

export default Layout;
