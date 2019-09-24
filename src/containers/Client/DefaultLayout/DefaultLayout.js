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

// sidebar nav config
import navigation from './_nav';
import * as actions from '../../../_actions/actions.js';

// routes config
import routes from '../../../routes/clientRoutes';

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));
const Page404 = React.lazy(() => import('../../../pages/Common/Page404/Page404'));


const mapStateToProps = store => ({
	userWorkingContainer: store.currentContainers,
	searchResults: store.headerSearchComp.searchResults,
});


/**
 * Client default layout
 */
class DefaultLayout extends Component {
	
	constructor(props){
		super(props)
	}

   loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

   signOut(e) {
	   e.preventDefault()
	   this.props.history.push('/c/login');
   }
  
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
			                 	  return localStorage.getItem('session_id') ?
			 		                  route.component ? (
			 			                      <Route
			 			                        key={idx}
			 			                        path={route.path}
			 			                        exact={route.exact}
			 			                        name={route.name}
			 			                        render={props => (
			 			                          <route.component {...props} />
			 			                        )} />
			 			                    ) : (<Route
			 				                        key={idx}
			 				                        path={route.path}
			 				                        exact={route.exact}
			 				                        name={route.name}
			 				                        render={props => (
			 				                          <Page404 {...props} />
			 				                        )} 
			 			                         />)
			 			                    : <Redirect to={{ pathname: '/c/login', state: { from: route.path } }} />
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
        <AppHeader fixed>
          <Suspense  fallback={this.loading()}>
            <DefaultHeader onLogout={e => this.signOut(e)}/>
          </Suspense>
        </AppHeader>

        <div className="app-body">
          <main className="main">
            <Container fluid>
	            <div className="flex-row align-items-center" hidden>
		            <Row>
		                <Col md="2"/>
		                <Col md="8" className="jsoagger-padding-less">
		                    <div className="clearfix jsoagger-bread">
		                      <AppBreadcrumb appRoutes={routes} router={router}/>
		                    </div>
		                </Col>
		                <Col md="2"/>
		            </Row>
			     </div>
			     <div className="spacer-20" />
			     
			     {mainContent}
			     
            </Container>
          </main>

          <AppAside fixed>
            <Suspense fallback={this.loading()}>
              <DefaultAside />
            </Suspense>
          </AppAside>
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

