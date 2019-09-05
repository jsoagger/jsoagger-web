import React, { Component } from 'react'
import { 
	Badge, 
	DropdownItem, 
	DropdownMenu, 
	DropdownToggle, 
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
			userAccount: null
		}

        this.toProfile =  this.toProfile.bind(this);
        this.logout =  this.logout.bind(this);
        this.toRegister =  this.toRegister.bind(this);
	}
	
	componentDidMount(){
		var userAccount = JSON.parse(localStorage.getItem('user_account'))
		this.setState({
			userAccount: userAccount 
		})
	}
	
	toRegister(){
		const userAccountId = this.state.userAccount.id
        window.location.href = '#/register/cu';
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

        return (
            <React.Fragment>
              <AppHeaderDropdown direction="down">
                    <DropdownToggle nav>
                        <span className="jsoager-user-badge">{nickname}</span>
                        <img src={'../../assets/img/avatars/1.png'} className="img-avatar" alt="jsoageruser" />
                    </DropdownToggle>
                    <DropdownMenu right style={{ right: 'auto' }}>
                        <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
                        <DropdownItem onClick={e => this.toProfile()}><i className="fa fa-user"></i> Profile</DropdownItem>
                        <DropdownItem onClick={e => this.toRegister()}><i className="fa fa-user"></i> Add User</DropdownItem>
                        <DropdownItem onClick={e => this.logout()}><i className="fa fa-lock"></i> Logout</DropdownItem>
                    </DropdownMenu>
                </AppHeaderDropdown>
            </React.Fragment>
        );
    }
}

export default UserMenu;


