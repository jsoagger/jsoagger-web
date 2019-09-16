import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppSearchBar, UserMenu } from '_components';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand } from '@coreui/react';
import logo from '../../../assets/img/brand/logo.svg'
import sygnet from '../../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {}; 
/**
 * Header navigation bar definition fo client layout
 */
class DefaultHeader extends Component {

    isLoggedIn(){
	  return localStorage.getItem('session_id') && localStorage.getItem('session_id') !== 'undefined';
    }

  
    render() {

    	var json = localStorage.getItem('workingContainer')
        var wc = JSON.parse(json)
        var	container = wc.name
        
        return (
            <React.Fragment>
                
                <AppNavbarBrand className="d-lg-down-none navbrand-jsoagger-logo"
                    full={{ src: logo, width: 180, height: 55, alt: 'JSOAGGER Logo' }}
                    minimized={{ src: sygnet, width: 30, height: 30, alt: 'JSOAGGER Logo' }}/>

                <Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3"/>
                    <AppSearchBar/>
                </Nav>

                <Nav className="ml-auto" navbar>
                     <NavItem className="px-3">
                        <NavLink to="#" className="btn btn-danger" ><i className="fa fa-plus fa-md"></i> New item</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink to="/c/home" className="nav-link" >Home</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
	                    <NavLink to="/appVersionHistory" className="nav-link" >Admin</NavLink>
	                </NavItem>
	                <NavItem className="px-3 jsoagger-container-location">
	                    <NavLink to="/admin/p/switchContainers" className="nav-link">
	                        <i className="jsoagger-header-logo"></i>
	                        <span><strong>{container}</strong></span>
	                    </NavLink>
	                </NavItem>
                    <UserMenu />
                </Nav>

                {/*<AppAsideToggler className="d-md-down-none" />}
                {/*<AppAsideToggler className="d-lg-none" mobile />*/}
        </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
