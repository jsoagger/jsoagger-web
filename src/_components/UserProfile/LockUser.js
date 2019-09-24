import React from 'react';
import { 
	Button, 
	Modal, 
	ModalHeader, 
	ModalBody, 
	ModalFooter ,
	NavLink
} 
from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { accountService } from '_services/account.services.js';
import { toast } from 'react-toastify';
import * as actions from '_actions/actions.js';

const propTypes = {
	accountId: PropTypes.string.isRequired,
}

const defaultProps = {
}

const mapStateToProps = store => ({
})

const mapDispatchToProps = (disptach) => ({
	onAccountLocked: (payload) => disptach(actions.userAccountLocked(payload)),
});

/**
 * Lock user component
 */
class LockUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  modal: false,
	  accountId: props.accountId
    };

	this.toggle = this.toggle.bind(this)
	this.doLockUser = this.doLockUser.bind(this)
	this.lockSuccess = this.lockSuccess.bind(this)
  }
  /**
   * Toogle the modal
   */
  toggle() {
    	this.setState(prevState => ({
      		modal: !prevState.modal
		})
	)
  }
  /**
   * Lock the user
   */
  doLockUser(e){
	e.preventDefault()
	accountService
	.lock(this.state.accountId)
	.then(response => {
		this.lockSuccess()
	})
	.catch(error => {
		this.toggle();
		toast.error('Error occurs when locking user!')
		console.error(error)
	});
  }
  
  lockSuccess(){
	  try {
		  this.toggle()
		  toast.info('Lock success')
		  
		  const payload = {
			  'locked': true
		  }
		  
		  this.props.onAccountLocked(payload);
	  }
	  catch(error) {
		  console.error(error);
	  }	  
  }
  
  render() {
    return (
      <div>
		<NavLink onClick={this.toggle} className="paddingless">Lock user</NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Lock user</ModalHeader>
          <ModalBody>
			Locked user can not connect into the system until account is unlocked by administrator.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => this.doLockUser(e)}>Lock user</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

LockUser.propTypes = propTypes;
LockUser.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps) (LockUser);


