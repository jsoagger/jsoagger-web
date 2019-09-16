import React from 'react';
import { Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter ,
	NavLink,
	CardGroup,
	Label,
	Card, CardBody, 
	CardFooter, Col, 
	Container, 
	Form, Input, 
	InputGroup, InputGroupAddon, 
	InputGroupText, Row
} 
from 'reactstrap';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { accountService } from '_services/account.services.js';
import * as actions from '_actions/actions.js';
import { toast } from 'react-toastify';
import logo from '../../../assets/img/brand/logo.png'
import LostPassSuccess from './LostPassSuccess.js'

/**
 * LostPass component
 */
class LostPass extends React.Component {

	 constructor(props) {
	    super(props);
	    this.state = {
	      formValid: false, 
	      emailValid: false,
		  formData: {
		  },
		  formErrors: {'email':''}
	    };

		this.doSendUpdatePasswordLink = this.doSendUpdatePasswordLink.bind(this);
		this.validateField = this.validateField.bind(this)
		this.backToLogin = this.backToLogin.bind(this)
		this.handleUserInput = this.handleUserInput.bind(this)
		this.validateForm = this.validateForm.bind(this)
	 }
	 handleUserInput (e) {
		  const name = e.target.name;
		  const value = e.target.value;
		  let formdata = this.state.formData;
		  formdata[name] = value
		  this.setState({formData: formdata}, 
		                () => { this.validateField(name, value) });
	}
	 /**
	  * Handle form change
	  */
	 validateField(fieldName, value) {
		 let fieldValidationErrors = this.state.formErrors;
		 let emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
		 
		 fieldValidationErrors.email = emailValid ? '' : ' is invalid';
		 this.setState({
			 formErrors: fieldValidationErrors,
             emailValid: emailValid,
         }, this.validateForm);
	 }
	 /**
	  * Update the state form valid
	  */
	 validateForm() {
		  this.setState({
			  formValid: this.state.emailValid
		  });
	 }
	 /**
	  * Send an email whatever the provided email.
	  * Do not tell hacker that an account does not exists in database.
	  */
	 doSendUpdatePasswordLink(e) {
		 e.preventDefault()
		 var email = this.state.formData.email
		 accountService.lostPassword(email)
		 .then(response => {
    		var json = response.json();
            return json;
          })
	      .then(json => {
	    	  ReactDOM.render(<LostPassSuccess email={email}/>, document.getElementById('lost_pass_content_container'))
	      })
         .catch(error => {
        	 ReactDOM.render(<LostPassSuccess email={email}/>, document.getElementById('lost_pass_content_container'))
         });
	 }
	 /**
	  * Go back to login page
	  */
	 backToLogin(){
		 window.location.href = '#/c/login';
	 }
    /**
     * Render the view
     */
    render() {
        return (
        	<div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
		                <Col md="6">
		                	<div id="lost_pass_content_container">
			                    <CardGroup>
			                        <Card className="p-4">
			                        	<CardBody>
			                        		<div>
			                        			<img src={logo} className="img-logo-s" alt="JSOAGGER logo"/>
			                        			<h1>LOST PASSWORD</h1>
			                        			<hr/>
			                        			<h5>Please provide your login</h5>
			                        		</div>
			                            	<Form>
			              	                  <div className="spacer-20">&nbsp;</div>
			              	                  <div>{this.state.formError}</div>
			              	                  <InputGroup className="mb-3">
			              	                    <InputGroupAddon addonType="prepend">
			              	                      <InputGroupText>
			              	                        <i className="icon-lock"></i>
			              	                      </InputGroupText>
			              	                    </InputGroupAddon>
			              	                    <Input type="text" required="true" name="email" placeholder="Your login" autoComplete="login" onChange={(e) => this.handleUserInput(e)}/>
			              	                  </InputGroup>
			              	                </Form>
			                        	</CardBody>
			                        	<CardFooter>
			                        		<Row>
			                        			<Col lx="6" lg="6">
			                        				<Button block color="primary" onClick={(e) => this.backToLogin(e)}>Login</Button>
			                        			</Col>
			                        			<Col lx="6" lg="6">
			                        				<Button block color="danger" type="submit" disabled={!this.state.formValid} onClick={(e) => this.doSendUpdatePasswordLink(e)}>Done</Button>
			                    				</Col>
			                        		</Row>
			                        	</CardFooter>
			                        </Card>
			                    </CardGroup>
		                    </div>
		                </Col>
		             </Row>
                </Container>
            </div>
        );
    }
}

export default LostPass;

