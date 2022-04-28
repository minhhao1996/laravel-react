import React from 'react';

const Dashboard = React.lazy(() => import('../views/admin/home/Dashboard'));
const User = React.lazy(() => import('../views/admin/user/User'))
const Media = React.lazy(() => import('../views/admin/media/Media'))
const routes = [
    { path: '/', exact: true,  name: 'Dashboard', element: Dashboard  },
    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/users', name: 'Users', element: User },
    { path: '/medias', name: 'Medias', element: Media },
]

export default routes