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
import { revControlledService } from '_services/revcontrolled.services.js';
import { commons } from '../../_helpers/commons.js';

const propTypes = {
		versionInfo: PropTypes.string,
		iterationInfo: PropTypes.string,
		revControlledId: PropTypes.string,
}
const defaultProps = {
}
/**
 * Actions for revision controlled
 */
class RevControlledAction extends Component {
	
	constructor(props){
		super(props)

		this.iterationsHistory = this.iterationsHistory.bind(this)
	}
	/**
	 * history
	 */
	iterationsHistory(e) {
		e.preventDefault();
		window.location = '#/rc/history/' + this.props.revControlledId + '/?type=lifecycle'
	}
	/**
	 * Workable actions
	 */
	rcActions() {
	    return (
			<React.Fragment>
				<ButtonToolbar>
	                <ButtonGroup>
	                	<Button onClick={this.iterationsHistory}><i className="fa fa-list fa-md"></i>&nbsp;HISTORY</Button>
	                </ButtonGroup>
	            </ButtonToolbar> 
	        </React.Fragment>
		)
	}
	
	render(){
		return (
			<div>
				{this.rcActions()}
			</div>
		)
	}
}

RevControlledAction.propTypes = propTypes;
RevControlledAction.defaultProps = defaultProps;


export default RevControlledAction;

