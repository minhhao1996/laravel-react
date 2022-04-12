import React from 'react';

const Dashboard = React.lazy(() => import('../views/admin/home/Dashboard'));
const User = React.lazy(() => import('../views/admin/user/User'))
const routes = [
    { path: '/admin', exact: true, name: 'Home' },
    { path: '/admin/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/admin/users', name: 'Users', element: User },
]

export default routes