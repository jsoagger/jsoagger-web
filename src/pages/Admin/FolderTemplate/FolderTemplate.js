import React, { Component } from 'react';
import { 
    ButtonToolbar,  Col,  
    Row, Card, 
    Button,
    ButtonGroup,
    CardBody  
} from 'reactstrap';
import { commons } from '../../../_helpers/commons.js';
import PropTypes from 'prop-types';
import { 
	AttributeListGroup, 
	PersistenceInfo,
	ContentHolderAction,
} from '_components';
import { folderTemplateService } from '_services/folder.template.services.js';

const propTypes = {
	item: PropTypes.object,
};

const defaultProps = {
};

/**
 * Folder Template details page
 */
class FolderTemplateDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
        	item: {},
            mode: 'view',
        }

        this.headerActions = this.headerActions.bind(this)
        this.edit = this.edit.bind(this)
        this.update = this.update.bind(this)
        this.cancel = this.cancel.bind(this)
    }
    /**
     * Edit the form
     * @param {*} e 
     */
    edit(e){
        e.preventDefault()
        this.setState({
            mode: 'edit',
        })
    }
    /**
     * Update the form
     * @param {*} e 
     */
    update(e){
        e.preventDefault()
        this.setState({
            mode: 'view',
        })
    }
    /**
     * Cancel the form edition.
     * 
     * @param {*} e 
     */
    cancel(e){
        e.preventDefault()
        this.setState({
            mode: 'view',
        })
    }
    /**
     * Header actions
     */
    headerActions () {
        const editMode = this.state.mode !== 'view';
        return (
            <React.Fragment>
                <Col sm="12" lg="12">
                        <Button color="light" hidden={editMode} onClick={this.edit}><i className="fa fa-pencil fa-2xl"></i></Button>
                </Col>
            </React.Fragment>
	    )
    }
    /**
     * Footer actions
     */
    footerActions() {
        const viewMode = this.state.mode == 'view';
        return (
            <React.Fragment>
                <Col sm="12" lg="12">
                    <Button color="danger" className="float-right" hidden={viewMode} onClick={this.update}>UPDATE</Button>
                    <Button color="light"  className="float-right" hidden={viewMode} onClick={this.cancel}>CANCEL</Button>
                </Col>
            </React.Fragment>
	    )
    }

    componentDidMount(){
		const templateId = this.props.match.params.id;
		folderTemplateService
		.getById(templateId)
		.then(json => {
            console.log(json);
			this.setState({item: json, id: templateId});
        })
    }
    
    commonActions(){
	    return (
			<React.Fragment>
				<ButtonToolbar>
					<div>&nbsp;</div>
					<ButtonGroup>
	                	<Button ><i className="fa fa-cloud-download"></i>&nbsp;DOWNLOAD CONTENT</Button>
                    </ButtonGroup>
                    <div>&nbsp;</div>
                    <ButtonGroup>    
	                	<Button ><i className="fa fa-cloud-upload"></i>&nbsp;REPLACE CONTENT</Button>
	                </ButtonGroup>
	                <div>&nbsp;</div>
	            </ButtonToolbar> 
	        </React.Fragment>
		)
    }

	render() {

        const summaryAttributesList = {
            title: 'Summary',
            icon: 'fa fa-info float-right',
            headerActions: () => this.headerActions(),
            footerActions: () => this.footerActions(),
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
                                                <AttributeListGroup attributesListConfig={summaryAttributesList} data={d} displayHeader="true" addHeaderMargin="true"/>
                                                <PersistenceInfo  data={d} {...this.props} displayHeader="true" addHeaderMargin="true"/>
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

FolderTemplateDetails.propTypes = propTypes;
FolderTemplateDetails.defaultProps = defaultProps;

export default FolderTemplateDetails;

