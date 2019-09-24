import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { 
	ButtonToolbar, 
	ButtonGroup, 
	Button, 
	Container, 
	Jumbotron, 
	Badge, 
	Card, 
	CardBody, 
	CardSubtitle, 
	CardTitle, 
	CardHeader, 
	Col, 
	Pagination, 
	PaginationItem, 
	PaginationLink, 
	Row, 
	Table 
} 
from 'reactstrap';
import { DataTableHeader, DataTableRow } from '../../../_components';
import { businessRulesService } from '_services/business.rule.services.js';
import { commons } from '../../../_helpers/commons.js';
import { 
	AttributeListGroup,
	AttributesGroup,
	PersistenceInfo,
} 
from '_components';
/**
 * Lifecycle details page
 */
class BusinessRuleDetails extends Component {

	constructor(props){
		super(props);
		this.state = {
			item: {},
		}
		
		this.activate = this.activate.bind(this)
		this.deactivate = this.deactivate.bind(this)
	}
	activate(e){
		e.preventDefault()
		const businessRuleId = this.props.match.params.id;
		const d = businessRulesService
		.activate(businessRuleId)
		.then(response => {
	        var json = response.json();
	        return json;
	    })
		.then(json => {
			this.setState({
				item: json, 
				id: businessRuleId
			});
        }).catch(error => {
        	console.error(error);
        })
	}
	deactivate(e){
		e.preventDefault()
		const businessRuleId = this.props.match.params.id;
		const d = businessRulesService
		.desactivate(businessRuleId)
			.then(response => {
	        var json = response.json();
	        return json;
	    })
		.then(json => {
			this.setState({
				item: json, 
				id: businessRuleId
			});
        }).catch(error => {
        	console.error(error);
        })
	}
	headerActions() {
	    return (
			<React.Fragment>
                <Col lg="12">
                	<Button color="danger" hidden={this.state.item.data.attributes.active} onClick={this.activate}>ACTIVATE RULE</Button>
                	<Button color="danger" hidden={!this.state.item.data.attributes.active} onClick={this.deactivate}>DE-ACTIVATE RULE</Button>
                </Col>
	        </React.Fragment>
		)
	}
	componentDidMount(){
		const businessRuleId = this.props.match.params.id;
		const d = businessRulesService
		.getById(businessRuleId)
		.then(json => {
			let location = json.data.attributes.rule
			document.getElementsByClassName('active breadcrumb-item')[0].innerHTML = location
			
			this.setState({
				item: json, 
				id: businessRuleId
			});
        }).catch(error => {
        	console.error(error);
        })
	}
	render() {
		const attributesList = {
		    title: 'Summary',
		    icon: 'fa fa-info float-right',
		    headerActions: () => this.headerActions(),
		    attributes: [
		    	{name: 'Name', dataField: 'attributes.rule'},
		        {name: 'Applicable on type', dataField: 'attributes.businessType'},
		        {name: 'Description', dataField: 'attributes.description'},
		        {name: 'Order', dataField: 'attributes.order'},
		        {name: 'Phase', dataField: 'attributes.transactionPhase'},
		        {name: 'Vetoable',  dataField: 'attributes.vetoable'},
		        {name: 'Active',  dataField: 'attributes.active'},
		    ]
		};
		
		const data = this.state.item.data;
		if(data){
			const d = commons.toJSONObject(data);
			return (
				<div className="flex-row align-items-center">
					<Row>
						<Col xs="0" sm="0" md="1" lg="1" xl="2"></Col>
						<Col xs="12" sm="12" md="10" lg="10" xl="8">
							<Row>
								<Col xs="12" md="12" lg="12" xl="12">
									<div className="jsoagger-table-header">
		                            	<h3 className="float-left, jsoa-table-title">{d.attributes.rule} </h3>
		                            </div>
		                        </Col>
							</Row>
							<Row>
								<Col xs="12" md="12" lg="12" xl="12">
									<div>
										<table>
											<tbody>
												<tr>
													<td>
													</td>
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
				                        	<AttributeListGroup attributesListConfig={attributesList} data={d} addHeaderMargin="true" displayHeader='true'/>
				                            <PersistenceInfo   {...this.props} data={d} displayHeader='true' addHeaderMargin="true"/>
				                        </CardBody>	
				                    </Card>    
				                </Col>
				            </Row>
			            </Col>
			            <Col xs="0" sm="0" md="1" lg="1" xl="2"></Col>
		            </Row>
		        </div>
	        
			);
		}
		return (<div>Loading...</div>);
	}
 }

export default BusinessRuleDetails;

