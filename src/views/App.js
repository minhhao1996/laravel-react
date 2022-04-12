import React, { Component, Suspense } from 'react'
import '../App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import DefaultLayoutFrontEnd from "./layout/DefaultLayoutFrontEnd";
import {ToastContainer} from "react-toastify";
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
//Pages
const Login = React.lazy(() => import('./admin/auth/Login'));
const Register = React.lazy(() => import('./admin/auth/Register'));
const Page404 = React.lazy(() => import('./errors/Page404'));
const Page500 = React.lazy(() => import('./errors/Page500'));
const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)
function App() {
  return (
    <>
        <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/admin/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route  path="/admin/*" name="Dashboard" element={<DefaultLayout />}/>

            // Front end layout
            <Route  path="*" name="Home" element={<DefaultLayoutFrontEnd />}  />

        </Routes>

    </>

  );
}

export default App;
