import React from 'react';

// common pages
const Page404 = React.lazy(() => import('../pages/Common/Page404'));
const Page500 = React.lazy(() => import('../pages/Common/Page500'));

// clients pages
const HomePage = React.lazy(() => import('../pages/Client/Home'));
const LoginPage = React.lazy(() => import('../pages/Client/Login'));
const WorkspacePage = React.lazy(() => import('../pages/Client/Workspace'));
const PeopleDetails = React.lazy(() => import('../pages/Client/People/PeopleDetails'));

const HomeDemoDesktop = React.lazy(() => import('../pages/Client/Home/HomeDemoDesktop.js'));
const HomeDemoMobile = React.lazy(() => import('../pages/Client/Home/HomeDemoMobile.js'));
const SwitchContainers = React.lazy(() => import('../pages/Admin/Container'));

const routes = [
// client routes  
  { path: '/c', exact: true, name: '' },
  { path: '/c/404', exact: true, name: 'Not found', component: Page404},
  { path: '/c/500', exact: true, name: 'Internal server error', component: Page500},
  { path: '/c/login', exact: true, name: 'Authentication', component: LoginPage},
  
  { path: '/c/home', exact: true, name: '/ Home', component: HomePage},
  { path: '/c/home/demoDesktop', exact: true, name: 'Demo Windows', component: HomeDemoDesktop},
  { path: '/c/home/demoMobile', exact: true, name: 'Demo MacOS', component: HomeDemoMobile},
  
  { path: '/c/workspace', exact: true, name: '/ Workspace', component: WorkspacePage},
  { path: '/c/profile/:accountId', exact: true, name: '/ Profile', component: PeopleDetails},
  { path: '/c/userDetails/:accountId', exact: true, name: '/ Profile', component: PeopleDetails},
  
  { path: '/c/switchContainers', exact: true, name: 'Navigate containers', component: SwitchContainers },
];

export default routes;
