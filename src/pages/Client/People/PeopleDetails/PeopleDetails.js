import React, { Component } from 'react';
import { TabPane, TabContent, NavItem, NavLink,
	Nav, 
	ListGroup, 
	ListGroupItem, 
	Button, 
	Card, 
	CardBody, 
	Col, 
	Row,
	CardImg
} from 'reactstrap';
import classnames from 'classnames';
import { 
	AttributeListGroup, 
	Contactable,
	ResetPassword,
	UpdatePassword,
	LockUser,
	UnLockUser,
	DataTable
} from '_components';
import { connect } from 'react-redux';
import { accountService } from '_services/account.services.js';
import { toast } from 'react-toastify';
import { commons } from '../../../../_helpers/commons.js';
import ContainersMembership  from 'pages/Admin/Container/ContainersMembership.js'
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
                {id: '1', title: 'Overview', tabContent: () => this.overviewTabContent(), visible: () => true},
                {id: '2', title: 'Contacts', tabContent: () => this.contactTabContent(), visible: () => true},
                {id: '3', title: 'Containers', tabContent: () => this.containerAccessTabContent(), 
                	visible: () => this.containerAccessTabContentVisible()},
            ],
        }
        return tabsConfig
    }
    
    containerAccessTabContentVisible(){
    	return this.state.isCurrentAccountOwner || commons.isAdministrator()
    }

    containerAccessTabContent(){
    	const accessTableConfig = {
    		  tableSize: 'sm',
    			paginationSize: 'sm',
    			emptyMessageTitle: 'No container access',
    			emptyMessageDescription: 'User does not have access to any container.',
    			columnsConfig: [
    		        { name: 'Name', dataField: 'attributes.name'},
    		        { name: 'Path', dataField: 'attributes.path'}
    			],
    	}
    	
    	// if admin navigate through containers
    	// if user, just show access
    	if(commons.isAdministrator()){
    		return <TabPane tabId="3" className="no-padding">
	    		<ContainersMembership accountId={this.state.accountId} />
		    </TabPane>
    	}
    	else {
    		return (
				 <DataTable items={JSON.stringify(this.state.containerMembership)} 
	         		metaData={JSON.stringify(this.state.containerMembershipMetaData)} 
	             	tableConfig={accessTableConfig} 
	            	paginate="false"/>
    		)
    	}
    }
    
    emptyContainerTableActions(){
    	return(
    		<div>
    			<Button>ADD MEMBERSHIPS</Button>
    		</div>
    	)
    }
    
    contactTabContent(){
    	var canEdit = this.state.isCurrentAccountOwner || commons.isAdministrator()
        return <TabPane tabId="2"> 
            <Row>
                <Col xs="12" sm="12" md="12" lg="10" xl="12">
                    <Contactable businessId={this.state.userProfile.id} canEdit={canEdit}/>
                </Col>
            </Row>
        </TabPane>    
	}
	
	/**
	 * Called by REDUX
	 */
	componentWillReceiveProps(props) {
		this.loadAllDatas()
	}
	/**
	 * Called without REDUX
	 */
	componentDidMount() {
		this.loadAllDatas()
    }
	
	loadAllDatas(){
		var accountId = this.state.accountId
		accountService.accountDetails(accountId)
		.then(response => {
			var currentAccountOwner = commons.isAccountOwner(response.data.links.account)
			let location = response.data.attributes.lastName + ' ' + response.data.attributes.firstName 
			document.getElementsByClassName('active breadcrumb-item')[0].innerHTML = location
			this.setState({
				loadDataError: false,
				userProfile:  response.data.attributes,
				userAccount: response.data.links.account,
				isCurrentAccountOwner: currentAccountOwner
			});
			return response;
		})
		.then(response => {
			var currentAccountId = response.data.links.account.id
			accountService
			.containersMembership(currentAccountId)
			.then(response => {
				this.setState({
					containerMembership: response.data,
					containerMembershipMetaData: response.metaData,
				})
			})
		})
		.catch(error => {
			console.error(error)
			this.setState({
        		loadDataError: true
        	})
        })
	}
    
    overviewTabContent() {
    	var canEdit = this.state.isCurrentAccountOwner || commons.isAdministrator()
        return ( 
			<TabPane tabId="1"> 
				<Row>
					<Col xs="12" sm="12" md="12" lg="10" xl="12">
						<div className="sidebar-nav-fixed affix">
							<AttributeListGroup 
								attributesListConfig={this.profileAttributesList()} 
								data={this.state.userProfile}
								canEdit={canEdit}
								standardFooterActions="true"
								displayHeader={true}/>

							<AttributeListGroup 
								attributesListConfig={this.accountAttributesList()} 
								data={this.state.userAccount}
								canEdit={canEdit}
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
			return (this.error())
		}

		if(this.state.userProfile === null || this.state.userAccount === null){
			return (this.loading())
		}
		
		var navTabItems = [], navTabContents = [], ritm = [];
		this.tabsConfigs().tabItems.forEach(tabItem => {
			const id = tabItem.id;
			if(tabItem.visible() ===  true) {
				navTabItems.push( 
					<NavItem>
						<NavLink className={classnames({ active: this.state.activeTab === id.toString()})}
							onClick={() => { this.toggle(id.toString()); }}>
							{tabItem.title}</NavLink>
					</NavItem>
				)
			}
		});

		this.tabsConfigs().tabItems.forEach(tabItem => {
			const id = tabItem.id;
			if(tabItem.visible() ===  true) {
				navTabContents.push( <TabPane tabId={id.toString()}>
					{tabItem.tabContent(ritm)}
				</TabPane>);
			}
		});
		
		const actions = [],
			  isAdmin = commons.isAdministrator()
			 
		if(isAdmin){
			actions.push(
				<ListGroupItem action>
					<ResetPassword accountId={this.state.userAccount.id}/>
				</ListGroupItem>
			)
		}
		
		if(this.state.isCurrentAccountOwner) {
			actions.push(<ListGroupItem action>
					<UpdatePassword accountId={this.state.userAccount.id}/>
				</ListGroupItem>
			)
		}
		
		if(isAdmin){
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
		}
		
		return (
			<div>
				<Row>
					<Col md="4">
						<div className="sidebar-nav-fixed affix">
							<Row>
								<Col md="12" lg="10" xl="10">
								<Summary gender={this.state.userProfile.gender}
										 nickName={this.state.userAccount.nickName}
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
					

class Summary extends Component {
	
    render() {
    	var cardImage, gender = this.props.gender ? this.props.gender:"0"
    		
    	if(gender === "0"){
    		cardImage = (
    			<CardImg  src={'../../assets/img/avatars/1.png'} className="img-profile"/>
    		)
    	}
    	else {
    		cardImage = (
    			<CardImg  src={'../../assets/img/avatars/3.png'} className="img-profile"/>
    		)
    	}
    	
		return (
            <React.Fragment>
                <Card className="no-radius">
                    <CardBody>
                        <div className="align-items-center">
                        {cardImage}
                        </div>
                    </CardBody>
                </Card>
                <div className="spacer-20"></div>
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

