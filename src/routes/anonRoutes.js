import React from 'react';

const Page404 = React.lazy(() => import('../pages/Common/Page404'));
const Page500 = React.lazy(() => import('../pages/Common/Page500'));

const ActivateAccount = React.lazy(() => import('../pages/Client/ActivateAccount/ActivateAccount'));
const LostPassPage = React.lazy(() => import('../pages/Client/LostPass'));
const PeopleRegister = React.lazy(() => import('../pages/Client/People/PeopleRegister'));

const routes = [
  { path: '/a', exact: true, name: '/' },
  { path: '/a/activateAccount', exact: true, name: 'Activate account', component: ActivateAccount},
  { path: '/a/lostPass', exact: true, name: 'Lost password', component: LostPassPage},
  { path: '/a/register/:source', exact: true, name: 'Register', component: PeopleRegister},
  { path: '/a/500', exact: true, name: 'Internal server error', component: Page500},
  { path: '/a/404', exact: true, name: 'Internal server error', component: Page404},
];

export default routes;
