import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index'
import {useSelector} from "react-redux";
import Login from '../admin/auth/Login'

const DefaultLayout = () => {
    const isLoggedIn = useSelector((state) => state.adminStore.isLoggedIn );

    return (
            <div>
                {
                    !isLoggedIn ?
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

            </div>

    )
}

export default DefaultLayout
