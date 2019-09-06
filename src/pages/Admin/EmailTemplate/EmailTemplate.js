import React, { Component } from 'react';
import { 
    ButtonToolbar,  Col,  
    Row, Card, Button,
    CardBody , ButtonGroup
} from 'reactstrap';
import { commons } from '../../../_helpers/commons.js';
import PropTypes from 'prop-types';
import { 
	AttributeListGroup, 
	PersistenceInfo,
	ContentHolderAction,
} from '_components';
import { enTemplateService } from '_services/entemplates.services.js';

const propTypes = {
    item: PropTypes.object,
    mode: PropTypes.string
};

const defaultProps = {
    mode: 'view'
};

/**
 * Email Template details page
 */
class EmailTemplateDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
        	item: {},
            mode: 'view',
        };

        this.edit = this.edit.bind(this);
        this.cancel = this.cancel.bind(this);
        this.update = this.update.bind(this);
        this.headerActions = this.headerActions.bind(this);
        this.footerActions = this.footerActions.bind(this);
    }

    edit(){
        this.setState({
            mode: 'edit',
        })
    }

    cancel(){
        this.setState({
            mode: 'view',
        })
    }

    update(){
        this.setState({
            mode: 'view',
        })
    }
    
    headerActions(){
        var view = this.state.mode === 'view'
        if(view) {
            return (
                <React.Fragment>
                    <Col sm="12" lg="12">
                        <ButtonGroup size="md" className="float-right">
                            <Button color="danger" onClick={this.edit}><i className="fa fa-pencil"></i></Button>
                        </ButtonGroup>
                    </Col>
                </React.Fragment>
            )
        }
    }

    footerActions(){
        var edit = this.state.mode === 'edit'
        if(edit){
            return (
                <React.Fragment>
                    <Col sm="12" lg="12">
                        <ButtonGroup size="md" className="float-right">
                            <Button color="danger" onClick={this.update}>UPDATE</Button>
                            <Button color="light"  onClick={this.cancel}>CANCEL</Button>
                        </ButtonGroup>
                    </Col>
                </React.Fragment>
            )
        }
    }

    commonActions() {
        var view = this.state.mode === 'view'
        var edit = this.state.mode === 'edit'
	    return (
			<React.Fragment>
				<ButtonToolbar>
					<ButtonGroup>
	                	<Button><i className="fa fa-cloud-download"></i>&nbsp;DOWNLOAD CONTENT</Button>
                     </ButtonGroup>   
                    <div>&nbsp;</div>
	                <ButtonGroup>
	                	<Button ><i className="fa fa-cloud-upload"></i>&nbsp;REPLACE CONTENT</Button>
	                </ButtonGroup>
	                <div>&nbsp;</div>
                    <ButtonGroup>
                        <Button onClick={this.edit} hidden={edit}><i className="fa fa-pencil"></i></Button>
                    </ButtonGroup>
	            </ButtonToolbar> 
	        </React.Fragment>
		)
	}

    componentDidMount(){
		const templateId = this.props.match.params.id;
		enTemplateService
		.getById(templateId)
		.then(json => {
            this.setState({
                item: json, 
                id: templateId});
        })
	}

	render() {
        const summaryAttributesList = {
            title: 'Summary',
            icon: 'fa fa-info float-right',
            footerActions: this.footerActions,
            attributes: [
                {name: 'Name', dataField: 'attributes.displayName'},
                {name: 'Internal name', dataField: 'attributes.internalName'},
                {name: 'Description', dataField: 'attributes.logicalName'},
            ]
        };

        if(this.state.item && this.state.item.data){
            const data = this.state.item.data;
            if(data){
                const d = commons.toJSONObject(data);
                return (
                    <Row>
                    	<Col xs="0" sm="0" md="1" lg="1" xl="2"></Col>
                    	<Col xs="12" sm="12" md="10" lg="10" xl="8">
	                    	<div className="flex-row align-items-center">
	                            <Row>
	                            	<Col xs="12" md="12" lg="12" xl="12">
	                                    <Card>
	                                        <CardBody className="jsoagger-card-title">
	                                            <h3 className="float-left, jsoa-table-title">{d.attributes.displayName} </h3>
	                                        </CardBody>
	                                    </Card>
	                                </Col>
	                            </Row>
	                            <Row>
									<Col xs="12" md="12" lg="12" xl="12">
										<div>
											<table>
												<tbody>
													<tr>
														<td><ContentHolderAction contentHolderId={data.attributes.id}/></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div className="spacer-20"></div>
									</Col>
								</Row>
	                            <Row>
	                            	<Col xs="12" md="12" lg="12" xl="12">
	                                    <Card>
	                                        <CardBody>
	                                            <AttributeListGroup {...this.props} attributesListConfig={summaryAttributesList} data={d} displayHeader='true' addHeaderMargin='true'/>
	                                            <PersistenceInfo  {...this.props} data={d} displayHeader="true" addHeaderMargin='true'/>
	                                        </CardBody>
	                                    </Card>    
	                                </Col>
	                            </Row>
	                        </div>
                        </Col>
                        <Col xs="0" sm="0" md="1" lg="1" xl="2"></Col>
                    </Row>
                );
            }
        }
        return (<div>Loading...</div>);
    }
}

EmailTemplateDetails.propTypes = propTypes;
EmailTemplateDetails.defaultProps = defaultProps;

export default EmailTemplateDetails;

