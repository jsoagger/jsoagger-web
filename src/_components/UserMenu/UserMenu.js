import React, { Component } from 'react'
import { 
	Badge, 
	DropdownItem, 
	DropdownMenu, 
	DropdownToggle, 
	ButtonDropdown,
	Nav, 
	NavItem
} 
from 'reactstrap'
import { 
	AppAsideToggler, 
	AppHeaderDropdown, 
	AppNavbarBrand 
} 
from '@coreui/react'
/**
 * User menu displayed on the header
 */
class UserMenu extends Component {
    
    constructor(props){
		super(props);
		this.state = {
			userAccount: null,
			dropdownOpen: false,
			appHeaderOpen: false
		}
		
		this.toggleDropDown = this.toggleDropDown.bind(this);
		this.toggleHeaderDropDown = this.toggleHeaderDropDown.bind(this);
        this.toProfile =  this.toProfile.bind(this);
        this.logout =  this.logout.bind(this);
        this.toRegister =  this.toRegister.bind(this);
	}
	
	toggleDropDown() {
    	this.setState(prevState => ({
      		dropdownOpen: !prevState.dropdownOpen
    	}));
  	}
  	
  	toggleHeaderDropDown() {
    	this.setState(prevState => ({
      		appHeaderOpen: !prevState.appHeaderOpen
    	}));
  	}

	
	componentDidMount(){
		var userAccount = JSON.parse(localStorage.getItem('user_account'))
		var userProfile = JSON.parse(localStorage.getItem('user_details'))
		this.setState({
			userAccount: userAccount, 
			userProfile: userProfile
		})
	}
	
	toRegister(){
		const userAccountId = this.state.userAccount.id
        //window.location.href = '#/register/cu';
		window.location.href = '#/admin/p/containerMembers/register/cu';
	}

    toProfile(){
		const userAccountId = this.state.userAccount.id
        window.location.href = '#/c/profile/' + userAccountId;
    }

    logout(){
         window.location.href = '#/c/login';
    }
  
    render() {
		var nickname = 'Loading...'
		if(this.state.userAccount) nickname = this.state.userAccount.nickName
		
		var userpage = false;
		if(window.location.href.includes("/#/c/")){
			userpage = true
		}
		
		var cardImage, gender = this.state.userProfile ? this.state.userProfile.gender : "1"
		if(gender === 0){
    		cardImage = (
    			<img src={'../../assets/img/avatars/1.png'} className="img-avatar" alt="jsoaggeruser" />
    		)
    	}
    	else {
    		cardImage = (
    			<img src={'../../assets/img/avatars/3.png'} className="img-avatar" alt="jsoaggeruser" />
    		)
    	}

		if(userpage) {
			return (
		            <React.Fragment>
		            	<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
		        			<DropdownToggle  caret size="sm" color="white">
		        			    {cardImage}
		        				<span className="jsoagger-user-badge">{nickname}</span>
		        			</DropdownToggle>
		        			<DropdownMenu right style={{ right: 'auto' }}>
		                        <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
		                        <DropdownItem onClick={e => this.toProfile()}><i className="fa fa-user"></i> Profile</DropdownItem>
		                        <DropdownItem onClick={e => this.logout()}><i className="fa fa-lock"></i> Logout</DropdownItem>
		                    </DropdownMenu>
		        		</ButtonDropdown>
		            </React.Fragment>
		        )
		}
		else {
			return (
		            <React.Fragment>
		            	<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
		        			<DropdownToggle  caret size="sm" color="white">
		        			{cardImage}
		        				<span className="jsoagger-user-badge">{nickname}</span>
		        			</DropdownToggle>
		        			<DropdownMenu right style={{ right: 'auto' }}>
		                        <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
		                        <DropdownItem onClick={e => this.toProfile()}><i className="fa fa-user"></i> Profile</DropdownItem>
		                        <DropdownItem onClick={e => this.toRegister()}><i className="fa fa-user"></i> Add User</DropdownItem>
		                        <DropdownItem onClick={e => this.logout()}><i className="fa fa-lock"></i> Logout</DropdownItem>
		                    </DropdownMenu>
		        		</ButtonDropdown>
		            </React.Fragment>
		        )
		}
    }
}

export default UserMenu;


