import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilCursor, cilFile,
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
        component: CNavItem,
        name: 'Medias',
        to: '/admin/medias',
        icon: <CIcon icon={cilFile} customClassName="nav-icon" />,

    },
    {
        component: CNavGroup,
        name: 'Users',
        to: '/admin/users',
        icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
        items: [
            {
                component: CNavItem,
                name: 'List',
                to: '/admin/users',
            },
            {
                component: CNavItem,
                name: 'Roles',
                to: '/admin/roles',
            },
        ],
    },

]

export default _nav
