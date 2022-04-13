import React from 'react';

const Dashboard = React.lazy(() => import('../views/admin/home/Dashboard'));
const User = React.lazy(() => import('../views/admin/user/User'))
const routes = [
    { path: '/', exact: true, name: '' },
    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/users', name: 'Users', element: User },
]

export default routes