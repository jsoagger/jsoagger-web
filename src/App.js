import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const AdminDefaultLayout = React.lazy(() => import('./containers/Admin/DefaultLayout'));
const ClientDefaultLayout = React.lazy(() => import('./containers/Client/DefaultLayout'));
const AnonDefaultLayout = React.lazy(() => import('./containers/Anon/DefaultLayout'));


// Pages
const LoginPage = React.lazy(() => import('./pages/Client/Login'));
const Page404 = React.lazy(() => import('./pages/Common/Page404/Page404'));
const Page500 = React.lazy(() => import('./pages/Common/Page500/Page500'));

const ResetLostPassword = React.lazy(() => import('./pages/Client/LostPass/ResetLostPassword'));

// history
export const browserHistory = createBrowserHistory();

/**
 * 
 * This is the first component displayed in the application.
 * 
 * Following pages are public (not auth required): login, register, lostpass,404,500.
 * 
 * Other pages are private
 */
class App extends Component {

  render() {

    return (
      <HashRouter history={browserHistory}>
          <React.Suspense fallback={loading()}>
            <Switch>
            	
            	// anon pages
            	<Route path="/a/" name="Anon pages" component={AnonDefaultLayout} />
            
            	// clients pages 
            	// 1. redirect '/' to '/login' or '/home'
            	// 2. redirect '/c' to '/login' or '/home'
            	<Route exact path="/" render={props => (
                    localStorage.getItem('sessionId') 
                    ? <Redirect to={{ pathname: '/c/home', state: { from: props.location } }} />
                    : <Redirect to={{ pathname: '/c/login', state: { from: props.location } }} />
                )} />
                <Route exact path="/c" render={props => (
                    localStorage.getItem('sessionId') 
                    ? <Redirect to={{ pathname: '/c/home', state: { from: props.location } }} />
                    : <Redirect to={{ pathname: '/c/login', state: { from: props.location } }} />
                )} />

              <Route exact path="/c/login" name="Client login" render={props => <LoginPage {...props}/>} />
              <Route path="/c/" name="Client pages" component={ClientDefaultLayout} />
              
              // Admin pages
              <Route path="/admin/p/" name="Admin pages" component={AdminDefaultLayout} />
              
              // Other pages
              <Route path="/rc/" name="Admin pages" component={AdminDefaultLayout} />
              <Route path="/appVersionHistory"  name="Admin pages" component={AdminDefaultLayout} />
              
              
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;

