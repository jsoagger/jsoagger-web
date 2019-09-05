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
import { connect } from 'react-redux';
import { accountService } from '_services/account.services.js';
import * as actions from '_actions/actions.js';
import { toast } from 'react-toastify';
import logo from '../../../assets/img/brand/logo.png'

/**
 * LostPassSuccess component
 */
class LostPassSuccess extends React.Component {

	 constructor(props) {
	    super(props);
	    this.backToLogin = this.backToLogin.bind(this)
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
            <CardGroup>
                <Card>
                	<CardBody>
                		<div>
	            			<img src={logo} className="img-avatar" alt="JSOAGER logo" width="60"/>
	            			<h4>An email have been sent to you, please check your inbox</h4>
	            			<hr/>
	            			<div className="spacer-20">&nbsp;</div>
	            			<h1>{this.props.email}</h1>
	            			<div className="spacer-20">&nbsp;</div>
	            		</div>
                	</CardBody>
                	<CardFooter>
		                <Row>
		        			<Col xl="12" lg="12">
		        				<Button block color="primary" onClick={(e) => this.backToLogin(e)}>Login</Button>
		        			</Col>
		        		</Row>
                	</CardFooter>
                </Card>
            </CardGroup>
        );
    }
}

export default LostPassSuccess;

