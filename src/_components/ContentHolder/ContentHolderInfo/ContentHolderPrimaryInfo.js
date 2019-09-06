import React, { Component } from 'react';
import { 
	Button, 
    Col,  
    Row,
} 
from 'reactstrap';
import PropTypes from 'prop-types';
import AttributeListGroup from '_components/AttributeListGroup';
import { contentHolderService } from '_services/contentHolder.services.js';
import ContentHolderPrimaryAction  from '_components/ContentHolder/ContentHolderAction/ContentHolderPrimaryAction.js'

const propTypes = {
	contentHolderId: PropTypes.string.isRequired
}

const defaultProps = {
}
/**
 * Displays primary content infos
 */
class ContentHolderPrimaryInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
        	primaryContent: [],
        }
    }
    
    componentDidMount(){
    	let contentHolderId = this.props.contentHolderId
    	contentHolderService.contentInfos(contentHolderId, 'primary')
    	.then(ci => {
    		this.setState({
    			primaryContent: ci.data
    		})
    	})
    }

	render() {
		console.log('ContentHolderPrimaryInfo : ' + JSON.stringify(this.props))
		var header  = ""
		if(this.props.displayHeader){
			header = (
	    		<React.Fragment>
	    			<Row>
				        <Col lg="8">
	                        <label className="jsoagger-form-title-level-1">Primary content</label>
	                    </Col>
	                </Row>
				</React.Fragment>	
		    )
		}

		var content
	    if(this.state.primaryContent.length === 0) {
			return (
				<React.Fragment>
	    			<div>
	    				{header}
	    				<strong>No content</strong>
	    			</div>
				</React.Fragment>
			)
	    }
	    else {
	    	let item = this.state.primaryContent[0]
	    	if(item && item.attributes){
	    		
	    		let displayContentSize = this.props.displayContentSize ? this.props.displayContentSize : false
	    		if(displayContentSize){
	    			return (
			    			<div>
				    			<div>{header}</div>
				    			<table>
				    				<tr>
				    					<td width="30%">{item.attributes.contentFormat.mimeType} </td>
				    					<td width="20%">{item.attributes.contentSize} octet(s)</td>
				    					<td width="30%"><ContentHolderPrimaryAction contentHolderId={this.props.contentHolderId}/></td>
				    				</tr>
				    			</table>
			    			</div>
			    	)
	    		}
	    		else {
	    			return (
			    			<div>
				    			<div>{header}</div>
				    			<table>
				    				<tr>
				    					<td width="30%">{item.attributes.contentFormat.mimeType} </td>
				    					<td width="30%"><ContentHolderPrimaryAction contentHolderId={this.props.contentHolderId}/></td>
				    				</tr>
				    			</table>
			    			</div>
			    	)
	    		}
	    	}
	    	else {
	    		return (<div><p><strong>No content format</strong></p></div>)
	    	}
	    }
	}
}

ContentHolderPrimaryInfo.propTypes = propTypes;
ContentHolderPrimaryInfo.defaultProps = defaultProps;

export default ContentHolderPrimaryInfo;

