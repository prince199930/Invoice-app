import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  { PublicRoutes } from "./utils/Routes";
import SignIn from "./pages/auth/SignIn";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import PrivateRoutes from './utils/Routes';

function App() {

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<SignIn />} />
            </Route>
          </Route>
          {/* Private Routes for Dashboard */}
          <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<DashboardLayout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
