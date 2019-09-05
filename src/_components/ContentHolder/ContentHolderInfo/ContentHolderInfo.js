import React, { Component } from 'react';
import { 
	Button, 
    Col,  
    Row,
} 
from 'reactstrap';
import PropTypes from 'prop-types';
import AttributeListGroup from '_components/AttributeListGroup';
import ContentHolderPrimaryInfo from './ContentHolderPrimaryInfo.js';
import ContentHolderAttachmentsInfo from './ContentHolderAttachmentsInfo.js'
const propTypes = {
	contentHolderId: PropTypes.string.isRequired
}

const defaultProps = {
}
/**
 * Displays primary/attachments content infos
 */
class ContentHolderInfo extends Component {

    constructor(props){
        super(props)
    }
    
	render() {
		
		return (
			<React.Fragment>
				<div className="spacer-20"></div>
				<table width="100%">
					<tr className="noBorder">
			            <td colSpan="3" className="paddingless">
			                <Row>
			                    <Col lg="8">
			                        <label className="jsoager-form-title-level-0">CONTENT INFOS</label>
			                    </Col>
			                </Row>
			            </td>
			        </tr>
			        <tr className="noBorder">
			        	<td>
					        <ContentHolderPrimaryInfo contentHolderId={this.props.contentHolderId}/>
			        	</td>
			        </tr>
			        <tr className="noBorder">
			        	<td>
					        <div className="spacer-10">&nbsp;</div>
			        	</td>
			        </tr>
			        <tr className="noBorder">
			        	<td>
			        		<ContentHolderAttachmentsInfo contentHolderId={this.props.contentHolderId}/>
			        	</td>
			        </tr>
			    </table>
			    <div className="spacer-10"></div>
			</React.Fragment>
		)
	}
}

ContentHolderInfo.propTypes = propTypes;
ContentHolderInfo.defaultProps = defaultProps;

export default ContentHolderInfo;

