import React, { Component } from 'react';
import { TabPane, TabContent, NavItem, NavLink, Nav, ListGroup, ListGroupItem, Button, Card, CardBody, Col, Row} from 'reactstrap';
import classnames from 'classnames';
import { 
	AttributeListGroup, 
	Contactable,
	ResetPassword,
	UpdatePassword,
	LockUser,
	UnLockUser,
} from '_components';
import { connect } from 'react-redux';
import { accountService } from '_services/account.services.js';
import { toast } from 'react-toastify';
/**
 * People details page
 */
const mapStateToProps = store => ({
	accountLockedState: store.peopleDetails.accountLocked,
})
/**
 * People details
 */
class PeopleDetails extends Component {
	constructor(props){
		super(props);
		this.state = {
			item: {},	
			accountId: props.accountId ? props.accountId : this.props.match.params.accountId,
			loadDataError: false,
            summaryMode: 'view',
			activeTab: '1',
			userProfile: null,
			userAccount: null,
        }

        this.toggle = this.toggle.bind(this);
        this.overviewTabContent = this.overviewTabContent.bind(this);
        this.profileAttributesList = this.profileAttributesList.bind(this);
        this.accountAttributesList = this.accountAttributesList.bind(this);
		this.contactTabContent = this.contactTabContent.bind(this);
		this.updateProfile = this.updateProfile.bind(this);
		this.isLocked = this.isLocked.bind(this);
	}
	
	isLocked(){
		if(this.state.userAccount.locked) return true
		return false
	}

	updateProfile(formData) {
		var id = formData.id
		accountService
		.updatePersonProfile(id, formData)
		.then(response => {
			this.updateProfileSuccess()
		})
		.catch(error => {
			this.toggle();
			toast.error('Error updating profile!')
			console.error(error)
		});
	}
	
	updateProfileSuccess(){
		var accountId = this.state.accountId;
		accountService.accountDetails(accountId)
		.then(response => {
			this.setState({
				loadDataError: false,
				userProfile:  response.data.attributes,
			});
		})
		.catch(error => {
			console.error(error)
        })
	}

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    /**
     * Tab pane configuration
     */
    tabsConfigs(){
        const tabsConfig = {
            tabItems: [
                {id: '1', title: 'Overview', tabContent: () => this.overviewTabContent()},
                {id: '2', title: 'Contacts', tabContent: () => this.contactTabContent()},
            ],
        }
        return tabsConfig
    };

    contactTabContent(){
        return <TabPane tabId="2"> 
            <Row>
                <Col md="12">
                    <Contactable businessId={this.state.userProfile.id}/>
                </Col>
            </Row>
        </TabPane>    
	}
	

	refreshUserAccount(){
	}

	refreshUserProfile(){
	}
	
	/**
	 * Called by REDUX
	 */
	 async componentWillReceiveProps(props) {
		var accountId = this.state.accountId
		await accountService.accountDetails(accountId)
		.then(response => {
			this.setState({
				loadDataError: false,
				userAccount: response.data.links.account
			});
		})
		.catch(error => {
			console.error(error)
			this.setState({
        		loadDataError: true
        	})
        })
	}
	
	/**
	 * Called without REDUX
	 */
	componentDidMount() {
		var accountId = this.state.accountId
		accountService.accountDetails(accountId)
		.then(response => {
			this.setState({
				loadDataError: false,
				userProfile:  response.data.attributes,
				userAccount: response.data.links.account
			});
		})
		.catch(error => {
			console.error(error)
			this.setState({
        		loadDataError: true
        	})
        })
    }
    
    overviewTabContent() {
        return ( 
			<TabPane tabId="1"> 
				<Row>
					<Col md="12" xl="10">
						<div className="sidebar-nav-fixed affix">
							<AttributeListGroup 
								attributesListConfig={this.profileAttributesList()} 
								data={this.state.userProfile}
								standardFooterActions="true"
								displayHeader={true}/>

							<AttributeListGroup 
								attributesListConfig={this.accountAttributesList()} 
								data={this.state.userAccount}
								displayHeader={true}/>   
						</div>
					</Col>
				</Row>
			</TabPane>
		)    
    }

    profileAttributesList(){
        const profileAttributesList = {
            title: 'Summary',
			icon: 'fa fa-info float-right',
			formId: 'profileAttributesList_form',
			addHeaderMargin: true,
			onSubmit: (formData) => this.updateProfile(formData),
            attributes: [
                {name: 'Gender', dataField: 'gender', type:'gender'},
                {name: 'Lastname', dataField: 'lastName', type:'string'},
                {name: 'Middlename', dataField: 'middleName', type:'string'},
                {name: 'Firstname', dataField: 'firstName', type:'string'},
                {name: 'Birth place', dataField: 'birthPlace', type:'string'},
                {name: 'Birth date', dataField: 'birthDate', type:'date'},
                {name: 'Modified on', dataField: 'lastModifiedDate', type:'date'},
                {name: 'Modified by', dataField: 'lastModifiedBy', type:'string'},
            ]
        };
        return profileAttributesList;
    }

    accountAttributesList(){
        const accountAttributesList = {
                title: 'Account',
                icon: 'fa fa-info float-right',
				addHeaderMargin: true,
                attributes: [
					{name: 'Locked', dataField: 'locked', type:'bool'},
					{name: 'Locked date', dataField: 'lockedDate', type:'string'},
                    {name: 'Activated', dataField: 'active', type:'bool'},
                    {name: 'Pass expire date', dataField: 'passwordExpirationDate', type:'date'},
                    {name: 'Pass expired', dataField: 'firstName', type:'bool'},
                    //{name: 'Created on', dataField: 'creationDate', type:'date'},
                    //{name: 'Modified on', dataField: 'modifiedDate', type:'date'},
                ]
        };
        return accountAttributesList;
    }

	loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
	error = () => <div className="animated fadeIn pt-1 text-center">User not found</div>

	render() {
		if(this.state.loadDataError === true){
			return (
				this.error()
			)
		}

		if(this.state.userProfile === null || this.state.userAccount === null){
			return (
				this.loading()
			)
		}
		
		var navTabItems = [], navTabContents = [], ritm = [];
		this.tabsConfigs().tabItems.forEach(tabItem => {
			const id = tabItem.id;
			navTabItems.push( 
				<NavItem>
					<NavLink className={classnames({ active: this.state.activeTab === id.toString()})}
						onClick={() => { this.toggle(id.toString()); }}>
						{tabItem.title}</NavLink>
				</NavItem>
			)
		});

		this.tabsConfigs().tabItems.forEach(tabItem => {
			const id = tabItem.id;
			navTabContents.push( <TabPane tabId={id.toString()}>
				{tabItem.tabContent(ritm)}
			</TabPane>);
		});
		
		const actions =[];
		actions.push(
			<ListGroupItem action>
				<ResetPassword accountId={this.state.userAccount.id}/>
			</ListGroupItem>
		)
		actions.push(<ListGroupItem action>
				<UpdatePassword accountId={this.state.userAccount.id}/>
			</ListGroupItem>
		)
		
		if(!this.isLocked()){
			actions.push(<ListGroupItem action>
				<LockUser accountId={this.state.userAccount.id}/>
			</ListGroupItem>)
		}
		else {
			actions.push(<ListGroupItem action>
				<UnLockUser accountId={this.state.userAccount.id}/>
			</ListGroupItem>)
		}
		
		return (
			<div>
				<Row>
					<Col md="4">
						<div className="sidebar-nav-fixed affix">
							<Row>
								<Col md="12" lg="10" xl="10">
								<Summary nickName={this.state.userAccount.nickName}
										login={this.state.userAccount.login}/>
								</Col>
							</Row>
							<Row>
								<Col md="12" lg="10" xl="10">
									<ListGroup>{actions}</ListGroup>
								</Col>
							</Row>
						</div>
					</Col>
					<Col md="8">
						<div>
							<Col xs="12" lg="12">
								<Nav pills>
									{navTabItems}
								</Nav>
								<hr/>
								<TabContent activeTab={this.state.activeTab} className="jsoa-borderless">
									{navTabContents}
								</TabContent>
							</Col>
						</div>
					</Col>
				</Row>
			</div>
		
		);
	}
}
/**
 * 
 */
class Summary extends Component {
    render(){
		return (
            <React.Fragment>
                <Card>
                    <CardBody>
                        <div className="align-items-center">
                            <img src={'../../assets/img/avatars/1.png'} className="img-profile" alt="jsoaggeruser" />
                        </div>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <div className="align-items-center">
                            <p className="jsoagger-profile-text-item-1"><strong>{this.props.nickName}</strong></p>
                            <p className="jsoagger-profile-text-item">{this.props.login}</p>
                        </div>
                    </CardBody>        
                </Card>
            </React.Fragment>
        )
	}
}

export default connect(mapStateToProps) (PeopleDetails);
