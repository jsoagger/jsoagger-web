// Admins
import { 
    AdminHome, AdminLogin, 
    BusinessRule, ContainerMember, 
    ContentFormat, EmailTemplate, 
    Enumeration, FolderTemplate, 
    Lifecycle, LifecycleDetails, TeamTemplate,
    Types, TypeDetails,ViewDefinition, 
    NavigateFolders,
    Containers
} from './Admin';

// Clients
import {
    Home, 
    Login, 
    Workspace,
    ActivateAccount,
    LostPass,
    HomeDemoLinux,
	HomeDemoWindows,
	HomeDemoMacos,
	HomeDemoMobile,
} from './Client';

// Commons
import {
    LostPass, 
    Page404, 
    Page500,
    AppVersions,
    RCHistory
} from './Common';


export {

    Home, Login, Workspace,
    HomeDemoDesktop,
	HomeDemoMobile,

    // common pages
    LostPass, 
    Page404, 
    Page500,
    AppVersion,
    ActivateAccount,
    LostPass

    // Admin pages
    AdminHome, 
    AdminLogin, 
    BusinessRule, 
    ContainerMember, 
    ContentFormat,
    EmailTemplate, 
    Enumeration, 
    FolderTemplate, 
    Lifecycle,  
    LifecycleDetails, 
    TeamTemplate, 
    TypeDetails, 
    Types,
    ViewDefinition, 
    NavigateFolders, 
    RCHistory,
    Containers
}
