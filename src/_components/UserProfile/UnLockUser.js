/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter ,
	NavLink
} 
from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { accountService } from '_services/account.services.js';
import { toast } from 'react-toastify';
import * as actions from '_actions/actions.js';

const propTypes = {
	accountId: PropTypes.string.isRequired,
};

const defaultProps = {
};
const mapStateToProps = store => ({
})
const mapDispatchToProps = (disptach) => ({
	onAccountUnLocked: (payload) => disptach(actions.userAccountUnLocked(payload)),
});

/**
 * Unlock user
 */
class UnLockUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  modal: false,
	  accountId: props.accountId
    };

	this.toggle = this.toggle.bind(this);
	this.doUnlockUser = this.doUnlockUser.bind(this);
	this.unlockSuccess = this.unlockSuccess.bind(this)
  }
  /**
   * Toggle the modal
   */
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  /**
   * Unlock user
   */
  doUnlockUser(){
	accountService
	.unlock(this.state.accountId)
	.then(response => {
		this.unlockSuccess()
	})
	.catch(error => {
		this.toggle();
		toast.error('Error occurs when locking user!')
		console.error(error)
	});
  }
  /**
   * 
   */
  unlockSuccess(){
	  try {
		  this.toggle()
		  toast.info('Unlock success')
		  
		  const payload = {
			  'locked': false
		  }
		  
		  this.props.onAccountUnLocked(payload);
	  }
	  catch(error) {
		  console.error(error);
	  }	  
  }
  /**
   * Render 
   */
  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} className="paddingless">Unlock user</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Unlock user</ModalHeader>
          <ModalBody>
			Unlock the user. User can connect with his login/password.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.doUnlockUser}>Unlock user</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

UnLockUser.propTypes = propTypes;
UnLockUser.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps) (UnLockUser);


