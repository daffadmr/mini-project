import { useSubscription } from "@apollo/client";
import { Dropdown, Navbar } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { USER_SUBS } from "../GraphQL/subscriptions";
import Auth from "../utils/Auth";
import Cookies from "js-cookie";
import React from "react";
import LoadingDot from "../assets/svg/LoadingDot";
import Logo from "../assets/svg/Logo";
import Swal from "sweetalert2";

const MyNavbar = () => {
  const userId = Cookies.get("userId");
  const { data, loading } = useSubscription(USER_SUBS, {
    variables: { id: userId },
  });

  const navigate = useNavigate();

  const logOut = () => {
    Auth.signOut(navigate);
    Swal.fire({
      title: "Success",
      text: "Berhasil Log Out",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <Navbar
      style={{ backgroundColor: "#94a3b8" }}
      className="sticky top-0 w-full z-50"
    >
      <Link to={"/"}>
        <Logo />
      </Link>
      <div className="list-none">
        {Auth.isAuthorization() ? (
          <>
            {loading ? (
              <LoadingDot />
            ) : (
              <>
                <Dropdown label={data?.user[0].username} inline={true}>
                  <Link
                    to="/dashboard"
                    className="flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <Dropdown.Item onClick={() => logOut()}>Log Out</Dropdown.Item>
                </Dropdown>
              </>
            )}
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className="text-slate-100 bg-slate-700 hover:opacity-80 p-[16px]"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </Navbar>
  );
};

export default MyNavbar;
