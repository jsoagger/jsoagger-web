import React from 'react';
import { Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter ,
	NavLink,
	CardGroup,
	Label,
	Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row
} 
from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { accountService } from '_services/account.services.js';
import * as actions from '_actions/actions.js';
import { toast } from 'react-toastify';
import logo from '../../../assets/img/brand/logo.svg'

/**
 * Login page will redirect the user in this page
 * if the user account is not activated.
 */
class ActivateAccount extends React.Component {

	 constructor(props) {
	    super(props);
	    this.state = {
		  modal: false,
		  accountId: props.accountId,
		  formData: {
			  password: '',
			  passwordValidation: '',
		  },
		  formError: ''
	    };

		this.doActivateAccount = this.doActivateAccount.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this)
		this.updateSuccess = this.updateSuccess.bind(this)
		this.updateFail = this.updateFail.bind(this)
	 }
	 
	 handleFormChange(event) {
			var formadata = JSON.parse(JSON.stringify(this.state.formData))
			formadata[event.target.name] = event.target.value
			var emptypass = this.state.formData.password === '' 
				|| this.state.formData.passwordValidation === '' 
				|| this.state.formData.password.trim() === ''
				|| this.state.formData.passwordValidation.trim() === ''
					
			var samePass = this.state.formData.password !== '' && (
					this.state.formData.password === this.state.formData.passwordValidation)
					
			var formError = ''
			if(emptypass) {
				formError = 'Passwords can not be empty!'
			}
			if(!samePass) {
				formError = 'Passwords are not same!'
			}
			else {
				formError = ''
			}
			
			this.setState({
				formData: formadata,
				formError: formError
			})
	 }

	 doActivateAccount(e) {
		 var userAccount = JSON.parse(localStorage.getItem('user_account'))
		 var login = userAccount.login
		 
		 e.preventDefault()
		 accountService
		 .activateAccount(login, this.state.formData)
		 .then(response => {
			 if(response.status === 200){
				 console.log('Response : ' + JSON.stringify(response))
				this.updateSuccess()	 
			 }
			 else {
				 console.log('ERROR Response : ');
			 }
			 
		 })
		 .catch(error => {
			console.error(error)
		 });
	 }
	 /**
	  * Update fails
	  */
	 updateFail(){
		 this.setState({
			 formError: 'Error occurs'
		 })
	 }
	 updateSuccess(){
		 window.location.href = '#/c/home';
	 }
    /**
     * Render the view
     */
    render () {
        return (
            <Row className="justify-content-center">
                <Col md="8">
                    <Card className="p-4">
                    	<CardBody>
                        	<Form>
                        		<img src={logo} className="img-avatar-xl" alt="JSOAGGER logo"/>
          	                  <h3>Change your password to activate your account</h3>
          	                  <hr/>
          	                  <div>{this.state.formError}</div>
          	                  <InputGroup className="mb-3">
          	                    <InputGroupAddon addonType="prepend">
          	                      <InputGroupText>
          	                        <i className="icon-lock"></i>
          	                      </InputGroupText>
          	                    </InputGroupAddon>
          	                    <Input type="password" name="password" placeholder="Your password" autoComplete="new-password" onChange={(e) => this.handleFormChange(e)}/>
          	                  </InputGroup>
          	                  <InputGroup className="mb-4">
          	                    <InputGroupAddon addonType="prepend">
          	                      <InputGroupText>
          	                        <i className="icon-lock"></i>
          	                      </InputGroupText>
          	                    </InputGroupAddon>
          	                    <Input type="password" name="passwordValidation" placeholder="Repeat password" autoComplete="new-password" onChange={(e) => this.handleFormChange(e)}/>
          	                  </InputGroup>
          	                </Form>
                    	</CardBody>
                    	<CardFooter>
                    		<Button color="danger" onClick={(e) => this.doActivateAccount(e)} disabled={this.state.formError === ''}>Update password</Button>{' '}
                    	</CardFooter>
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default ActivateAccount;
