import React, { Component } from 'react';
import { store } from '../index.js';

const AdminHome = React.lazy(() => import('../pages/Admin/AdminHome'));
const AppVersions = React.lazy(() => import('../pages/Common/AppVersion'));
const AppVersion = React.lazy(() => import('../pages/Common/AppVersion/AppVersion.js'));
const BusinessRule = React.lazy(() => import('../pages/Admin/BusinessRule'));
const BusinessRuleDetails = React.lazy(() => import('../pages/Admin/BusinessRule/BusinessRuleDetails.js'));
const ContainerMember = React.lazy(() => import('../pages/Admin/ContainerMember'));
const ContainerMemberDetails = React.lazy(() => import('../pages/Admin/ContainerMember/ContainerMemberDetails.js'));
const ContentFormat = React.lazy(() => import('../pages/Admin/ContentFormat'));
const EmailTemplate = React.lazy(() => import('../pages/Admin/EmailTemplate'));
const EmailTemplateDetails = React.lazy(() => import('../pages/Admin/EmailTemplate/EmailTemplate.js'));
const Enumerations = React.lazy(() => import('../pages/Admin/Enumeration'));
const Enumeration = React.lazy(() => import('../pages/Admin/Enumeration/Enumeration.js'));
const FolderTemplate = React.lazy(() => import('../pages/Admin/FolderTemplate'));
const FolderTemplateDetails = React.lazy(() => import('../pages/Admin/FolderTemplate/FolderTemplate.js'));
const Lifecycles = React.lazy(() => import('../pages/Admin/Lifecycle'));
const LifecycleDetails = React.lazy(() => import('../pages/Admin/Lifecycle/Lifecycle.js'));
const TeamTemplate = React.lazy(() => import('../pages/Admin/TeamTemplate'));
const Types = React.lazy(() => import('../pages/Admin/Type'));
const TypeDetails = React.lazy(() => import('../pages/Admin/Type/Type.js'));
const ViewDefinition = React.lazy(() => import('../pages/Admin/ViewDefinition'));
const BatchLoad = React.lazy(() => import('../pages/Admin/BatchLoad'));
const BatchExport = React.lazy(() => import('../pages/Admin/BatchExport'));
const PeopleRegister = React.lazy(() => import('../pages/Client/People/PeopleRegister'));
const RCHistory = React.lazy(() => import('../pages/Common/RC/RCHistory'));
const SwitchContainers = React.lazy(() => import('../pages/Admin/Container'));
	
const adminRoutes = [
// admin routes
  { path: '/admin', exact: true, name: '' },
  
  { path: '/appVersionHistory', exact: true, name: 'Versions History', component: AppVersions },
  { path: '/appVersionHistory/:id', exact: true, name: 'Details', component: AppVersion },
  
  { path: '/admin/p/home', name: 'Version', component: AdminHome },
  { path: '/admin/p/businessRules', exact: true, name: 'Business Rules', component: BusinessRule },
  { path: '/admin/p/businessRules/:id', exact: true, name: 'Details', component: BusinessRuleDetails },
  
  { path: '/admin/p/containerMembers', exact: true, name: 'Members', component: ContainerMember },
  { path: '/admin/p/containerMembers/register/:source', exact: true, name: 'Register new user', component: PeopleRegister },
  { path: '/admin/p/containerMembers/details/:accountId', exact: true, name: 'Details', component: ContainerMemberDetails },
  
  { path: '/admin/p/contentFormats', name: 'Content Format', component: ContentFormat },
  
  { path: '/admin/p/emailTemplates', exact: true, name: 'Email Templates', component: EmailTemplate },
  { path: '/admin/p/emailTemplates/:id', exact: true, name: 'Details', component: EmailTemplateDetails },
  
  { path: '/admin/p/enumerations', exact: true, name: 'Enumerations', component: Enumerations },
  { path: '/admin/p/enumerations/:id', exact: true, name: 'Details', component: Enumeration },
  
  { path: '/admin/p/folderTemplates', exact: true, name: 'Folder Templates', component: FolderTemplate },
  { path: '/admin/p/folderTemplates/:id', exact: true, name: 'Details', component: FolderTemplateDetails },
  
  { path: '/admin/p/teamTemplates', name: 'Team Templates', component: TeamTemplate },
  
  { path: '/admin/p/types', name: 'Types', component: Types },
  { path: '/admin/p/types/:id', name: 'Details', component: TypeDetails },
  
  { path: '/admin/p/viewDefinitions', name: 'View Definitions', component: ViewDefinition },
  { path: '/admin/p/batchLoad', name: 'Batch Load', component: BatchLoad },
  { path: '/admin/p/batchExport', name: 'Batch Export', component: BatchExport },
  
  { path: '/admin/p/switchContainers', exact: true, name: 'Navigate containers', component: SwitchContainers },
  
  { path: '/admin/p/lifecycles', exact: true, name: 'Lifecycles', component: Lifecycles },
  { path: '/admin/p/lifecycles/:id', exact: true, name: 'Details', key: 'lifecycles', component: LifecycleDetails },
  
  // common routes
  { path: '/rc/history/:id', exact: true, name: 'Revision history', component: RCHistory },
];

export default adminRoutes;

