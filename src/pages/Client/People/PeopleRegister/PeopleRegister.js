import React, { Component } from 'react';
import { 
	Button, 
	Card, 
	CardBody, 
	CardFooter, 
	Col, 
	Container, 
	Form, 
	Input, 
	InputGroup, 
	InputGroupAddon, 
	InputGroupText, 
	Row 
} 
from 'reactstrap';
import { 
	AttributeListGroup, 
} 
from '_components';
import logo from '../../../../assets/img/brand/logo.png'
import { accountService } from '_services/account.services.js'
import { commons } from '../../../../_helpers/commons.js';
import Page500  from 'pages/Common/Page500'
/**
 * Register new people.
 * Be aware set a default container if register from login page.
 * When in login page, the container in not set on backing storage 
 */
class PeopleRegister extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			formData: {
				'container': commons.getCurrentContainer(),
				'people.type': 'io.github.jsoagger.people.Party/Person',
				'people.withAccount': true,
				'account.password': '',
				'account.repeatPassword': '',
				'account.source': ''
			},
			errors:[]
		}
		
		this.registerAttributesList = this.registerAttributesList.bind(this)
		this.registerUser = this.registerUser.bind(this);
		this.handleResponse = this.handleResponse.bind(this)
	}
	
	registerUser(formData) {
		formData['account.source'] = this.state.source
		accountService
		.registerPersonWithAccount(formData)
		.then(response => {
			var json = response.json()
			return json
		})
		.then(json => {
			this.handleResponse(json, formData)
		})
		.catch(error => {
			console.error(error)
		});
	}
	/**
	 * Handle save response.
	 * 1. If register from login => autologin and redirect to profile page
	 * 2. If register from logged user => redirect to profile 
	 */
	handleResponse(json, formData){
		let errorMessages = json.messages
		let errorStates = []
		if(errorMessages && errorMessages.length > 0){
			errorMessages.map(mes => {
				if(mes.detail !== undefined && mes.detail !== null && mes.detail !== 'null'){
					console.log(mes.detail)
					errorStates.push(mes.detail)
				}
			})
		}
		// user was added by a connected user
		else if(this.state.source === 'cu') {
			let userAccountId = json.data.links.account.id
			window.location.href = '#/admin/p/containerMembers/details/' + userAccountId + '/?welcome=true';
		}
		// user was created from login view
		// new account created by the user itself
		else if(this.state.source === 'an') {
			let userAccountId = json.data.links.account.id
			window.location.href = '#/c/login/?welcome=true';
		}

		this.setState({
			errors: errorStates,
			formData: formData
		})
	}
	/**
	 * Attributes list
	 */
	registerAttributesList(){
        const profileAttributesList = {
            title: 'Summary',
			icon: 'fa fa-info float-right',
			formId: 'profileAttributesList_form',
			addHeaderMargin: true,
			onSubmit: (formData) => this.registerUser(formData),
            attributes: [
                {name: 'Gender', dataField: 'gender', type:'string'},
                {name: 'Lastname', dataField: 'lastName', type:'string'},
                {name: 'Middlename', dataField: 'middleName', type:'string'},
                {name: 'Firstname', dataField: 'firstName', type:'string'},
                {name: 'Birth date', dataField: 'birthDate', type:'date'},
                {name: 'Birth place', dataField: 'birthPlace', type:'string'},
                {
                	title: 'Account', dataField: 'account', type:'object',
            		items: [
            			{name: 'Email', dataField: 'account.email', type:'string'},
            			{name: 'Password', dataField: 'account.password', type:'password'},
            			{name: 'Repeat password', dataField: 'account.repeatPassword', type:'password'},
                    ]
                }
            ]
        }
        
        return profileAttributesList;
    }
	
	componentDidMount(){
		// 2 sources for registering:
	   // 1. from login page (anonymous: an)
	   // 2. user created by admin (connected user: cu)
	   var source = this.props.match.params.source
	   this.setState({
		   source: source ? source : 'an' 
	   })
	}
	
   render() {
	   if(this.state.source === undefined){
		   return <Page500 />
	   }
	   
	   if(this.state.source !== 'an' && this.state.source !== 'cu') {
		   return <Page500 />
	   }
		   
	   let errors = []
	   if(this.state.errors.length > 0) {
		   errors.push(<p><strong>Please correct following errors:&nbsp;</strong></p>)
		   errors.push(<hr/>)
		   this.state.errors.map(error => {
			   errors.push(<p>{error}</p>)
		   })
		   errors.push(<hr/>)
	   }
	   
	   let header = ''
	   if(this.props.source === 'an'){
		   header = (
			   <Row className="justify-content-center">
		         	<Col md="7" lg="7" xl="7" xs="12">
		         	 	 <Card className="mx-4">
		         	 		<CardBody className="p-4">
			            		<div>
			            			<img src={logo} className="img-avatar" alt="JSOAGER logo" width="60"/>
			            			<h1>REGISTER</h1>
			            			<hr/>
			            			<h5>Create an account</h5>
			            		</div>
			            	</CardBody>
			            </Card>
		         	</Col>
	          </Row>
		   )
	   }
	   
	   return (
	        <div>
	      		 {header}
		          <Row className="justify-content-center">
			          <Col md="7" lg="7" xl="7" xs="12">
			              <Card className="mx-4">
			              	<CardBody className="p-4">
			              		<div id="form-errors-section" className="jsoager-form-error">
			              			{errors}
			              		</div>
				                <AttributeListGroup 
									attributesListConfig={this.registerAttributesList()} 
									data={this.state.formData}
									standardFooterActions="true"
									formMode='create_object'/>
			                </CardBody>
			              </Card>
			            </Col>
		          </Row>
	      </div>
	   );
  }
}

export default PeopleRegister;



