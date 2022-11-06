import React from "react";
import { Outlet } from "react-router-dom";
import MyFooter from "./MyFooter";
import MyNavbar from "./MyNavbar";

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
