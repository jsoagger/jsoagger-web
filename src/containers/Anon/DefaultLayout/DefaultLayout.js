import React, { Component, Suspense } from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container, Row, Col, CardText, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import SearchMembersResult from '../../../pages/Admin/ContainerMember/SearchMembersResult.js'

import {
  AppAside,
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

import * as actions from '../../../_actions/actions.js';
import routes from '../../../routes/anonRoutes';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const Page404 = React.lazy(() => import('../../../pages/Common/Page404/Page404'));


const mapStateToProps = store => ({
	userWorkingContainer: store.currentContainers,
	searchResults: store.headerSearchComp.searchResults,
});


/**
 * Anon default layout
 */
class DefaultLayout extends Component {
	
   constructor(props){
		super(props)
   }

   loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
	  
	let mainContent = (
		<div id="jsoagger-main-content">
		     <Row>
            	<Col md="2"/>
            	<Col md="8">
                	<div className="w-spacer"/>
                	<div className="clearfix jsoagger-bread">
	                 	<Suspense fallback={this.loading()}>
			                 <Switch>
			                   {routes.map((route, idx) => {
			                	   if(route.component){
			                		   return <Route
	 			                        key={idx}
	 			                        path={route.path}
	 			                        exact={route.exact}
	 			                        name={route.name}
	 			                        render={props => (
	 			                          <route.component {...props} />
	 			                        )} />
			                	   }
			                	   else {
			                		   return <Route
				                        key={idx}
				                        path={route.path}
				                        exact={route.exact}
				                        name={route.name}
				                        render={props => (
				                          <Page404 {...props} />
				                        )} 
			                         /> 
			                	   }
			                   	})
			                   }
			                 </Switch>
			            </Suspense>
		            </div>
		         </Col>
		         <Col md="2"/>
		     </Row>
	     </div>
	)
	
    return (
      <div className="app">
        <div className="app-body">
          <main className="main">
			     {mainContent}
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

