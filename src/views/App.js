import React, { Component, Suspense } from 'react'
import '../App.css';
import {HashRouter, Route, Routes} from "react-router-dom";
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
//Pages
const Login = React.lazy(() => import('./auth/Login'));
const Register = React.lazy(() => import('./auth/Register'));
const Page404 = React.lazy(() => import('./errors/Page404'));
const Page500 = React.lazy(() => import('./errors/Page500'));
const loading = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)
function App() {
  return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />}  />
          </Routes>
        </Suspense>
      </HashRouter>
  );
}

export default App;
