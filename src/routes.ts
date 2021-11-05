import Forgot from './components/forgot/forgot.component';
import Landing from './components/landing/landing.component';
import Login from './components/login/login.component';
import Register from './components/register/register.component';
import Reset from './components/reset/reset.component';

import DashboardContent from './components/dashboard-content/dashboard-content.component';
import Logs from './components/logs/logs.component';
import LogCreate from './components/log-create/log-create.component';
import LogDetail from './components/log-detail/log-detail.component';
import LogRouter from './components/log-router/log-router.component';

import DashboardIcon from '@mui/icons-material/Dashboard';
import GraphIcon from '@mui/icons-material/ShowChart';

export const ROUTES = [
    {
        path: '/',
        name: 'Landing',
        includeInSidebar: false,
        icon: null,
        component: Landing,
        isExact: true,
    },
    {
        path: '/login',
        name: 'Login',
        includeInSidebar: false,
        icon: null,
        component: Login,
        isExact: true,
    },
    {
        path: '/forgot',
        name: 'Forgot Password',
        includeInSidebar: false,
        icon: null,
        component: Forgot,
        isExact: true,
    },
    {
        path: '/register',
        name: 'Landing',
        includeInSidebar: false,
        icon: null,
        component: Register,
        isExact: true,
    },
    {
        path: '/reset',
        name: 'Reset Password',
        includeInSidebar: false,
        icon: null,
        component: Reset,
        isExact: true,
    },
];

export const PRIVATE_ROUTES = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        includeInSidebar: true,
        icon: DashboardIcon,
        component: DashboardContent,
        isExact: true,
        children: [],
    },
    {
        path: '/dashboard/logs',
        name: 'Logs',
        includeInSidebar: true,
        icon: GraphIcon,
        component: LogRouter,
        isExact: false,
    },
];

export const LOG_ROUTES = [
    {
        path: '/dashboard/logs',
        name: 'Logs',
        includeInSidebar: false,
        icon: null,
        component: Logs,
        isExact: true,
    },
    {
        path: '/dashboard/logs/create',
        name: 'Create Log',
        includeInSidebar: false,
        icon: null,
        component: LogCreate,
        isExact: true,
    },
    {
        path: '/dashboard/logs/:logId',
        name: 'Log Detail',
        includeInSidebar: false,
        icon: null,
        component: LogDetail,
        isExact: true,
    },
];

export const SIDENAV_ROUTES = PRIVATE_ROUTES.filter((route: any) => route.includeInSidebar);
