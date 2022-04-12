import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilCursor,
    cilPuzzle,
    cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/admin/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        // badge: {
        //     color: 'info',
        //     text: 'NEW',
        // },
    },
    // {
    //     component: CNavTitle,
    //     name: 'Theme',
    // },


    {
        component: CNavGroup,
        name: 'Base',
        to: '/base',
        icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Accordion',
                to: '/base/accordion',
            },

        ],
    },
    {
        component: CNavGroup,
        name: 'Blogs',
        to: '/admin/blog',
        icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'Post',
                to: '/admin/blog/post',
            },

        ],
    },

]

export default _nav
