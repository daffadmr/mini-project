import React, { useEffect } from "react";
import Cookies from "js-cookie";
import ModalRegister from "../components/ModalRegister";
import Swal from "sweetalert2";
import LoadingPage from "../components/Loading/LoadingPage";
import { GET_USER_DATA } from "../graphql/queries";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [getUser, { data, loading }] = useLazyQuery(GET_USER_DATA);

  const navigate = useNavigate();
  const dataUser = data?.user[0];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (password === "") {
      Swal.fire({
        title: "Warning!",
        text: "Lengkapi login",
        icon: "warning",
        confirmButtonText: "OK",
      });
    } else {
      await getUser({
        variables: {
          email: email,
          password: password,
        },
      });
    }

    if (data?.user.length === 0) {
      Swal.fire({
        title: "Error!",
        text: "Email atau Password salah",
        icon: "error",
        confirmButtonText: "OK",
      });
      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    if (data?.user.length === 1) {
      Cookies.set("userId", dataUser?.id, { path: "/" });
      Cookies.set("auth", true, { path: "/" });
      return navigate("/dashboard", { replace: true });
    }
  }, [dataUser]);

  if (loading) return <LoadingPage />;

  return (
    <>
      <Helmet>
        <title>Diariku - Log in or Sign up</title>
        <meta
          name="description"
          content="Log in atau sign up ke diariku"
        />
      </Helmet>
      <div className="flex flex-col align-middle justify-center justify-items-center h-[698px]">
        <h1 className="text-2xl font-semibold text-center text-gray-900 py-8">
          Login
        </h1>
        <form
          className="bg-slate-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80 self-center"
          onSubmit={handleLoginSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              onChange={handleChangeEmail}
              value={email}
              placeholder="ujangkopling@gmail.com"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              onChange={handleChangePassword}
              value={password}
              placeholder="********"
            />
          </div>
          <Button color="dark" type="submit" className="self-center">
            Sign In
          </Button>
        </form>
        <div className="pt-4 text-center">
          Belum punya akun? Daftar di <ModalRegister />
        </div>
      </div>
    </>
  );
};

export default Login;
