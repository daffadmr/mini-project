import React from "react";
import Layout from "../components/Layout";
import Dashboard from "../pages/Dashboard";
import DiaryDetail from "../pages/DiaryDetail";
import CreateDiary from "../pages/CreateDiary";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import EditDiary from "../pages/EditDiary";
import ScrollToTop from "../components/ScrollToTop";
import NotFound from "../pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const SetupRouters = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="dashboard/diari/:id" element={<DiaryDetail />} />
          <Route path="dashboard/create" element={<CreateDiary />} />
          <Route path="dashboard/edit/:id" element={<EditDiary />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SetupRouters;
