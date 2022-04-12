import React from 'react';

const Dashboard = React.lazy(() => import('../views/home/Dashboard'));
const User = React.lazy(() => import('../views/user/User'))
const routes = [
    { path: '/', exact: true, name: 'Home' },
    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/users', name: 'Users', element: User },
]

export default routes