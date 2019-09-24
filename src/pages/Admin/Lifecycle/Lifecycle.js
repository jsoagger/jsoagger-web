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
import { lifecycleService } from '_services/lifecycle.services.js';
import { commons } from '../../../_helpers/commons.js';
import { 
	AttributeListGroup,
	AttributesGroup,
	WorkInfo,
	PersistenceInfo,
	ContentHolderAction,
	WorkableAction,
	ContentHolderInfo,
	RevControlledAction
} 
from '_components';
/**
 * Lifecycle details page
 */
class LifecycleDetails extends Component {

	constructor(props){
		super(props);
		this.state = {
			item: {},
			wc: false,
			mode: 'view',
		}
		
		this.edit = this.edit.bind(this)
		this.cancel = this.cancel.bind(this)
		this.update = this.update.bind(this)
		this.headerActions = this.headerActions.bind(this)
		this.toWcCallBack = this.toWcCallBack.bind(this)
	}
	/**
	 * Changes view to current item working copy
	 */
	toWcCallBack(item){
		const lifecycleId = item.data.attributes.id
		this.props.history.push('/admin/p/lifecycles/' + lifecycleId)
		
		const current = this.props.location.pathname
		this.props.history.replace(`/lifecycles`)
	    setTimeout(() => {
	      this.props.history.replace(current);
	    })
	}
	
	edit(e){
		e.preventDefault();
		this.setState({
			mode: 'edit',
		})
	}
	
	cancel(e){
		e.preventDefault();
		this.setState({
			mode: 'view',
		})
	}
	
	update(e){
		e.preventDefault();
		this.setState({
			mode: 'view',
		})
	}
	
	footerActions() {
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
	
	headerActions() {
		var edit = this.state.mode === 'edit'
	    return (
			<React.Fragment>
                <Col sm="12" lg="3">
                	<Button color="light" onClick={this.edit} hidden={edit}><i className="fa fa-pencil"></i></Button>
                </Col>
	        </React.Fragment>
		)
	}
	
	componentDidMount(){
		const lifecycleId = this.props.match.params.id;
		const d = lifecycleService
		.details(lifecycleId)
		.then(json => {
			let location = json.data.masterAttributes.name
			document.getElementsByClassName('active breadcrumb-item')[0].innerHTML = location
			
			this.setState({
				item: json, 
				wc: json.data.attributes.workInfo.isWorkingCopy,
				id: lifecycleId
			});
        }).catch(error => {
        	console.error(error);
        })
	}
	
	render() {
		const lifecycleStatusAttributesList = {
		    title: 'Summary',
		    icon: 'fa fa-info float-right',
		    footerActions: () => this.footerActions(),
		    headerActions: () => this.headerActions(),
		    attributes: [
		    	{name: 'Name', dataField: 'masterAttributes.name'},
		        {name: 'Number', dataField: 'masterAttributes.number'},
		        {name: 'Description', dataField: 'masterAttributes.logicalName'},
		        {name: 'Initial state',  dataField: 'attributes.initialState'},
		        {name: 'Terminal state',  dataField: 'attributes.terminalState'},
		    ]
		};
		
		const data = this.state.item.data;
		if(data){
			const d = commons.toJSONObject(data);
			return (
				<div className="flex-row align-items-center">
					<Row>
						<Col xs="0" sm="0" md="0" lg="1" xl="2"></Col>
						<Col xs="12" sm="12" md="12" lg="10" xl="8">
							<Row>
								<Col xs="12" md="12" lg="12" xl="12">
									<div className="jsoagger-table-header">
		                            	<h3 className="float-left, jsoa-table-title">{d.masterAttributes.name} </h3>
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
														<WorkableAction 
															workInfo={data.attributes.workInfo} 
															workableId={data.attributes.id} 
															toWcCallBack={this.toWcCallBack}/>
													</td>
													<td><ContentHolderAction contentHolderId={data.attributes.id}/></td>
													<td><RevControlledAction revControlledId={data.attributes.id}/></td>
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
				                        	<AttributeListGroup attributesListConfig={lifecycleStatusAttributesList} data={d} addHeaderMargin="true" displayHeader='true'/>
				                        	<WorkInfo {...this.props} data={d} displayHeader='true' addHeaderMargin='true' displayActions='false'/>
				                        	<ContentHolderInfo contentHolderId={this.state.item.data.attributes.id}/>
				                            <PersistenceInfo   {...this.props} data={d} displayHeader='true' addHeaderMargin="true"/>
				                        </CardBody>	
				                    </Card>    
				                </Col>
				            </Row>
			            </Col>
			            <Col xs="0" sm="0" md="0" lg="1" xl="2"></Col>
		            </Row>
		        </div>
	        
			);
		}
		return (<div>Loading...</div>);
	}
 }

export default LifecycleDetails;


class Summary extends Component {
	render(){
		const summaryAttributesList = this.props.attributes;
		const item = this.props.data;
		
		const d = [];
	    summaryAttributesList.items.forEach(config => {
	        var view = <AttributeListGroup attributesListConfig={config} data={item} orientation="vertical"/>
	        d.push(view);
	    });

		return (<React.Fragment>{d}</React.Fragment>)
	}
}

class LifecycleStatus extends Component {
	render(){
		const summaryAttributesList = this.props.attributes;
		const item = this.props.data;
		console.log(JSON.stringify(item));
		
		const d = [];
	    summaryAttributesList.items.forEach(config => {
	        var view = <AttributeListGroup attributesListConfig={config} data={item} orientation="horizontal"/>
	        d.push(view);
	    });
	    
	    const title = "Lifecycle status".toUpperCase();
		return (
			<Card>
	           <CardHeader>
	            	<strong><i className="icon-info pr-1"></i> {title}</strong>
	           </CardHeader>
	           <CardBody>
	           	{d}
	           </CardBody>
	       </Card>
		)
	}
}


