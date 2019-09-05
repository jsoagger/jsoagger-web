import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
	ButtonToolbar, 
	ButtonGroup, 
	Button, 
	Container, 
	Col, 
	Row, 
} 
from 'reactstrap';
import { workableService } from '_services/workable.services.js';
import { commons } from '../../_helpers/commons.js';

const propTypes = {
		workInfo: PropTypes.object,
		workableId: PropTypes.string,
		canCheckin: PropTypes.bool,
		canCheckout: PropTypes.bool,
		canUndoCheckout: PropTypes.bool,
		toWcCallBack: PropTypes.func,
}
const defaultProps = {
		canCheckin: false,
		canCheckout: false,
		canUndoCheckout: false,
		toWcCallBack: null
}
/**
 * Actions for workable
 */
class WorkableAction extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			wc: props.workInfo.isWorkingCopy,
			locked: this.props.workInfo.lockedBy !== '' && !this.props.workInfo.isWorkingCopy,
			workableId: props.workableId
		}

		this.checkin = this.checkin.bind(this)
		this.checkout = this.checkout.bind(this)
		this.undoCheckout = this.undoCheckout.bind(this)
		this.toWorkingCopy = this.toWorkingCopy.bind(this)
		this.toOriginalCopy = this.toOriginalCopy.bind(this)
	}
	/**
	 * To original copy
	 */
	toOriginalCopy(e){
		if(e) e.preventDefault()
		workableService.originalCopy(this.props.workableId)
		.then(response => {
			if(this.props.toWcCallBack){
				this.props.toWcCallBack(response)
			}
		})
	}
	/**
	 * toWorkingCopy
	 */
	toWorkingCopy(e){
		e.preventDefault();
		workableService.workingCopy(this.props.workableId)
		.then(response => {
			if(this.props.toWcCallBack){
				this.props.toWcCallBack(response)
			}
		})
	}
	/**
	 * Checkin
	 */
	checkin(e){
		e.preventDefault();
		workableService.checkin(this.props.workableId)
		.then(response => {
			this.setState({
				wc: this.props.workInfo.isWorkingCopy,
			})
			window.location.reload()
		})
	}
	/**
	 * Checkout
	 */
	checkout(e){
		e.preventDefault();
		workableService.checkout(this.props.workableId)
		.then(response => {
			this.setState({
				wc: this.props.workInfo.isWorkingCopy,
				locked: this.props.workInfo.lockedBy !== '' && !this.props.workInfo.isWorkingCopy 
			})
			window.location.reload()
		})
	}
	/**
	 * Undo checkout
	 */
	undoCheckout(e){
		e.preventDefault();
		let wid = this.props.workableId
		workableService.originalCopy(wid)
		.then(originalCopy => {
			workableService.undoCheckout(wid).then(response => {})
			if(this.props.toWcCallBack){
				this.props.toWcCallBack(originalCopy)
			}
		})	
	}
	/**
	 * Workable actions
	 */
	workabaleActions() {
		const wc = this.state.wc
		const canCheckout = wc || this.state.locked
		const locked = this.props.workInfo.lockedSince !==  ''
	    return (
			<React.Fragment>
				<ButtonToolbar>
					<ButtonGroup>
						<Button hidden={!wc} onClick={this.checkin}><i className="fa fa-check fa-md"></i>&nbsp;CHECKIN</Button>
						<Button hidden={canCheckout}  onClick={this.checkout}><i className="fa fa-lock fa-md"></i>&nbsp;CHECKOUT</Button>
						<Button hidden={(locked && wc) || (!canCheckout)}  onClick={this.toWorkingCopy}><i className="fa fa-forward fa-md"></i>&nbsp;WORKING COPY</Button>
						<Button hidden={(locked && !wc)|| (!canCheckout)}  onClick={this.toOriginalCopy}><i className="fa fa-forward fa-md"></i>&nbsp;ORIGINAL COPY</Button>
						<Button hidden={!wc} onClick={this.undoCheckout}><i className="fa fa-trash fa-md"></i>&nbsp;UNDO CHECKOUT</Button>
					</ButtonGroup>
	            </ButtonToolbar> 
	        </React.Fragment>
		)
	}
	
	render(){
		return (
			<div>
				{this.workabaleActions()}
			</div>
		)
	}
}

WorkableAction.propTypes = propTypes;
WorkableAction.defaultProps = defaultProps;


export default WorkableAction;

