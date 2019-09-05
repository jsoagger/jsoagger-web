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

const propTypes = {
	contentHolderId: PropTypes.string.isRequired
}

const defaultProps = {
}
/**
 * Displays Attachments content infos
 */
class ContentHolderAttachmentsInfo extends Component {

    constructor(props){
        super(props)
        this.state = {
        	attachments: [],
        }
    }
    
    componentDidMount(){
    	let contentHolderId = this.props.contentHolderId
    	contentHolderService.contentInfos(contentHolderId, 'attachments')
    	.then(ci => {
    	})
    }

	render() {
		let header = (
    		<React.Fragment>
    			<Row>
			        <Col lg="8">
                        <label className="jsoager-form-title-level-1">Attachments</label>
                    </Col>
                </Row>
			</React.Fragment>	
	    )
	    
	    var content
	    if(this.state.attachments.length === 0){
			return (
				<React.Fragment>
	    			<div>
	    				{header}
	    				<strong>No content</strong>
	    			</div>
				</React.Fragment>
			)
	    }
	}
}

ContentHolderAttachmentsInfo.propTypes = propTypes;
ContentHolderAttachmentsInfo.defaultProps = defaultProps;

export default ContentHolderAttachmentsInfo;

