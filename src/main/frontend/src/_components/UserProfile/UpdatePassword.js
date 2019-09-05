/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter ,
	NavLink,
	Label,
	Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row
} 
from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { accountService } from '_services/account.services.js';
import * as actions from '_actions/actions.js';
import { toast } from 'react-toastify';

const propTypes = {
	accountId: PropTypes.string.isRequired,
};

const defaultProps = {
};

const mapStateToProps = store => ({
})

const mapDispatchToProps = (disptach) => ({
	onUserAccountUpdatePass: (payload) => disptach(actions.userAccountUpdatePass(payload)),
});
/**
 * 
 */
class UpdatePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  modal: false,
	  accountId: props.accountId,
	  formData: {
		  oldPassword: '',
		  newPassword: '',
		  newPasswordValidation: '',
	  },
	  formError: ''
    };

	this.toggle = this.toggle.bind(this);
	this.doUpdatePassword = this.doUpdatePassword.bind(this);
	this.handleFormChange = this.handleFormChange.bind(this)
	this.updateSuccess = this.updateSuccess.bind(this)
  }
  
  handleFormChange(event) {
	var formadata = JSON.parse(JSON.stringify(this.state.formData))
	formadata[event.target.name] = event.target.value
	var emptypass = this.state.formData.newPassword === '' 
		|| this.state.formData.newPasswordValidation === '' 
		|| this.state.formData.newPassword === ''
			
	var samePass = this.state.formData.newPasswordValidation === this.state.formData.newPassword
	console.log('Change : ' + JSON.stringify(formadata), ', same pass : ' + String(samePass))
	var formError = ''
	if(emptypass) {
		formError = 'Passwords can not be empty!'
	}
	else if(!samePass) {
		formError = 'Passwords are not same!'
	}
	else {
		formError = '--'
	}
	
	this.setState({
		formData: formadata,
		formError: formError
	})
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  doUpdatePassword(e) {
	e.preventDefault()
	accountService
	.updatePassword(this.state.accountId, this.state.formData)
	.then(response => {
		this.updateSuccess()
	})
	.catch(error => {
		this.toggle();
		toast.error('Error when updating password!')
		console.error(error)
	});
  }
  
  updateSuccess(){
	  try {
		  this.toggle()
		  toast.info('Password update success.')
	  }
	  catch(error) {
		  console.error(error);
	  }
  }

  render() {
    return (
      <div>
        <NavLink className="paddingless" onClick={this.toggle}>Update password</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Update Password</ModalHeader>
          <ModalBody>
          	<Row>
          		<Col md="12" lg="12" xl="12">
          			<Label className="jsoager-form-error">{this.state.formError}</Label>
          		</Col>
          	</Row>
          	<Row>
	          <Col md="12" lg="12" xl="12">
	            <Card className="mx-4">
	              <CardBody className="p-4">
	                <Form>
	                  <InputGroup className="mb-3">
	                    <InputGroupAddon addonType="prepend">
	                      <InputGroupText>
	                        <i className="icon-lock"></i>
	                      </InputGroupText>
	                    </InputGroupAddon>
	                    <Input type="password" name="oldPassword" placeholder="Old password" autoComplete="new-password" onChange={(e) => this.handleFormChange(e)}/>
	                  </InputGroup>
	                  <InputGroup className="mb-3">
	                    <InputGroupAddon addonType="prepend">
	                      <InputGroupText>
	                        <i className="icon-lock"></i>
	                      </InputGroupText>
	                    </InputGroupAddon>
	                    <Input type="password" name="newPassword" placeholder="New password" autoComplete="new-password" onChange={(e) => this.handleFormChange(e)}/>
	                  </InputGroup>
	                  <InputGroup className="mb-4">
	                    <InputGroupAddon addonType="prepend">
	                      <InputGroupText>
	                        <i className="icon-lock"></i>
	                      </InputGroupText>
	                    </InputGroupAddon>
	                    <Input type="password" name="newPasswordValidation" placeholder="Repeat password" autoComplete="new-password" onChange={(e) => this.handleFormChange(e)}/>
	                  </InputGroup>
	                </Form>
	              </CardBody>
	            </Card>
	          </Col>
	        </Row>
	      </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => this.doUpdatePassword(e)}>Update password</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

UpdatePassword.propTypes = propTypes;
UpdatePassword.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps) (UpdatePassword);


