import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserMenu } from '_components';

import { AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';

import logo from '../../../assets/img/brand/logo.svg'
import sygnet from '../../../assets/img/brand/sygnet.svg'

const mapStateToProps = store => ({
	workingContainer: store.currentContainers
})


const propTypes = {
  children: PropTypes.node,
  element: PropTypes.object,
};

const defaultProps = {};

/**
 * Header navigation bar definition
 */
class DefaultHeader extends Component {
	 constructor(props){
		 super(props);
		 this.state = {
			workingContainer: 'Application'
		 }
		 
		 this.toSwitchContainer = this.toSwitchContainer.bind(this)
	 }
	
	 toSwitchContainer(){
		 window.location.href = '#/admin/p/switchContainers';
	 }
	 
	 switchToClientView(e) {
		if (document.body.classList.contains('sidebar-fixed')) {
	      document.body.classList.remove('sidebar-fixed');
	    }
	}

  
    render() {
    	//var element = React.createElement(AppSidebarToggler);
    	
        // eslint-disable-next-line
        const { children, ...attributes } = this.props;
        var container, userDetails = JSON.parse(localStorage.getItem('user_details'))
        const nickname = userDetails.nickName;
        
        var json = localStorage.getItem('workingContainer')
        var wc = JSON.parse(json)
        var	container = wc.name
        
        return (
        		
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" icon="icon-home" mobile />

                <AppNavbarBrand
                    full={{ src: logo, width: 120, height: 45, alt: 'JSOAGGER Logo' }}
                    minimized={{ src: sygnet, width: 30, height: 30, alt: 'JSOAGGER Logo' }}/>

                <AppSidebarToggler className="d-md-down-none" display="lg" />

                <Nav className="d-md-down-none" navbar>
                    <NavItem className="text-center px-3">
                        <strong>Business Administration</strong>
                    </NavItem>
                </Nav>

                <Nav className="ml-auto" navbar>
                    <NavItem className="px-3">
                        <NavLink to="/c/home" className="nav-link" onClick={this.switchToClientView}>
                            <i className="icon-home jsoagger-header-logo"></i>
                            <span><strong>Home</strong></span>
                        </NavLink>
                    </NavItem>
                    
                    <NavItem className="px-3 jsoagger-container-location">
	                    <NavLink to="/admin/p/switchContainers" className="nav-link">
	                        <i className="jsoagger-header-logo"></i>
	                        <span><strong>{container}</strong></span>
	                    </NavLink>
	                </NavItem>
                    
	                <AppHeaderDropdown direction="down">
	                    <DropdownMenu right style={{ right: 'auto' }}>
	                    	<DropdownItem></DropdownItem>
	                    </DropdownMenu>
	                </AppHeaderDropdown>
                    <UserMenu />
                </Nav>
        </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

function changeElement(elem) {
	elem.style.marginLeft = "";
}

export default connect(mapStateToProps) (DefaultHeader)

