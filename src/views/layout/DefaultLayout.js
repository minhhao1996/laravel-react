import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index'
import {useSelector} from "react-redux";
import Login from '../admin/auth/Login'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
const DefaultLayout = () => {
    const ísLogged = useSelector((state) => state.listSideBars.isLogged);
    return (
            <div>
                {
                    !ísLogged ?
                        <Login/>:
                        <div>
                            <AppSidebar />
                            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                                <AppHeader />
                                <div className="body flex-grow-1 px-3">
                                    <AppContent />
                                </div>
                                <AppFooter />
                            </div>
                        </div>
                }
                <ToastContainer/>
            </div>

    )
}

export default DefaultLayout
