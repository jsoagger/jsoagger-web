import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { commons } from '../../../_helpers/commons.js';

import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

// sidebar nav config
import adminNavigation from './_adminnav';
import unaffiliatedNavigation from './_unaffiliatednav';

// routes config
import routes from '../../../routes/adminRoutes';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const Page404 = React.lazy(() => import('../../../pages/Common/Page404/Page404'));


const mapStateToProps = store => ({
	currentUserAccount: store.currentUser,
	currentUserDetails: store.currentUser,
	
	userWorkingContainer: store.currentContainers,
	applicationContainer: store.currentContainers.applicationContainer,
});

/**
 * Default admin layout.
 */
class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
	  var containerPath, json, wc
	  
	  if(this.props.userWorkingContainer  && this.props.userWorkingContainer.currentContainer){
      	json  = JSON.parse(this.props.userWorkingContainer.currentContainer)
      	containerPath = json.path
      }
      else {
    	  json = localStorage.getItem('workingContainer')
		  wc = JSON.parse(json)
    	  containerPath = wc.path
      }
	  
	  var isadmin = containerPath === '/Application', 
	  isunaffiliated = containerPath === '/Application/Unaffiliated',
	  isAdministrator = commons.isAdministrator()
	  
	  var navigation
	  if(isunaffiliated){
		  navigation = <AppSidebarNav navConfig={unaffiliatedNavigation} {...this.props} router={router}/>
	  }
	  else {
		  navigation = <AppSidebarNav navConfig={adminNavigation} {...this.props} router={router}/>
	  }
	
		  
	  const sidebarContent =  <AppSidebar fixed display="lg" animated={false}>
		      <AppSidebarHeader />
		      <AppSidebarForm />
		      <Suspense>
		          {navigation}
		      </Suspense>
		      <AppSidebarFooter />
		      <AppSidebarMinimizer />
	    </AppSidebar>
	    
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)}/>
          </Suspense>
        </AppHeader>

        <div className="app-body">
          
         {sidebarContent}

          <main className="main">
            <AppBreadcrumb appRoutes={routes} router={router}/>
            <Container fluid>
              <Suspense fallback={this.loading()}>
	              <Switch>
	              {
	            	  routes.map((route, idx) => {
	            		  if(isAdministrator){
	            			  return <Route
			                        key={route.key ? route.key : idx}
			                        path={route.path}
			                        exact={route.exact}
			                        name={route.name}
			                        render={props => (
			                          <route.component {...props} />			
		                        )} />
	            		  }
	            		  else {
	            			  var isLogedIn = true
	            			  if(isLogedIn){
	            				  return <Redirect to={{ pathname: '/c/404', state: { from: route.path } }} />
	            			  }
	            			  
	            			  return <Redirect to={{ pathname: '/c/login', state: { from: route.path } }} /> 
	            		  }
	              	})
	              }
	              </Switch>
              </Suspense>
            </Container>
          </main>

        </div>

        <AppFooter>
          <Suspense fallback={this.loading()}>
            <DefaultFooter />
          </Suspense>
        </AppFooter>
        
        <ToastContainer autoClose={6000}/>
      </div>
    );
  }
}

export default connect(mapStateToProps) (DefaultLayout);

