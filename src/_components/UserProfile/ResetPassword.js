/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { 
	Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter ,
	NavLink,
} 
from 'reactstrap';
import PropTypes from 'prop-types';
import { accountService } from '_services/account.services.js';
import { toast } from 'react-toastify';

const propTypes = {
	accountId: PropTypes.string.isRequired,
}

const defaultProps = {
}

/**
 * Reset password modal
 */
class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  modal: false,
	  accountId: props.accountId
    };

	this.toggle = this.toggle.bind(this);
	this.doResetPassword = this.doResetPassword.bind(this);
  }
  /**
   * Toogle the modal
   */
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  /**
   * Do reset password
   */
  doResetPassword(e){
	e.preventDefault()
	accountService
	.resetPassword(this.state.accountId)
	.then(response => {
		this.resetSuccess()
	})
	.catch(error => {
		this.toggle();
		toast.error('Error when reseting user password!')
		console.error(error)
	});
  }
  
  resetSuccess(){
	  try {
		  this.toggle()
		  toast.info('Password reset success.')
	  }
	  catch(error) {
		  console.error(error);
	  }	  
  }
  /**
   * React render
   */
  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} className="paddingless">Reset Password</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Reset Password</ModalHeader>
          <ModalBody>
			Reset password will reinit the user password to the default one.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => this.doResetPassword(e)}>Reset password</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ResetPassword.propTypes = propTypes;
ResetPassword.defaultProps = defaultProps;


export default ResetPassword;

