import React, { Component } from 'react';
import { Container, Form, FormGroup, Label, Input, FormText, Col, Row, CardFooter, ListGroup, ListGroupItem, CardHeader,Card,CardTitle, CardText,TabContent,TabPane, CardBody, Button, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import ViewDefinition from '_components/ViewDefinition';
import { containerService } from '_services/container.services.js';
import { DataTable, ContextualMenu } from '../../../_components';
import * as actions from '_actions/actions.js';
import { commons } from '../../../_helpers/commons.js';

const mapStateToProps = store => ({
	userWorkingContainer: store.currentContainers,
})

const mapDispatchToProps = (disptach) => ({
	dispatchSwitchToContainerEvent: (e) => disptach(actions.switchToContainer(e)),
})

/**
 * Containers list/Switch container view
 */
class Containers extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			items: [],	
			metaData: '',
		}
		
		this.switchToParent = this.switchToParent.bind(this)
		this.switchTo = this.switchTo.bind(this)
		this.emptyTableActions = this.emptyTableActions.bind(this)
	}
	
	switchToLink(val){
		return <td><Button  size="md" color="success" onClick={e => this.switchTo(e, val)}>Switch <i className="fa fa-chevron-right"></i></Button></td>
	}

	
	switchTo(e, container) {
		if(e) e.preventDefault()
		containerService.getById(container)
		.then(json => {
			this.props.dispatchSwitchToContainerEvent(JSON.stringify(json.data.attributes))
			containerService.getChildrenContainers(container)
			.then(json => {
	            return json;
	        })
	        .then(json => {
	        	this.setState({
	        		currentContainer: container,
	        		items: json.data,
	        		metaData: json.metaData
	        	})
	        })
	        .catch(error => {
	        	console.error(error);
	        });
		})
	}
	
	switchToParent(e){
		if(e) e.preventDefault()
		
		var containerId
		if(this.props.userWorkingContainer && this.props.userWorkingContainer.currentContainer){
			var json  = JSON.parse(this.props.userWorkingContainer.currentContainer)
	      	containerId = json.id
		}
		else {
			var json = localStorage.getItem('workingContainer')
			var wc = JSON.parse(json)
			containerId = wc.id
		}
      	
		containerService.getParentContainer(containerId)
        .then(json => {
            return json;
        })
        .then(json => {
        	let parentId = json.data.attributes.id
        	this.props.dispatchSwitchToContainerEvent(JSON.stringify(json.data.attributes))
        	containerService.getChildrenContainers(parentId)
			.then(json => {
	            return json;
	        })
	        .then(json => {
	        	this.setState({
	        		items: json.data,
	        		metaData: json.metaData
	        	})
	        })
        })
        .catch(error => {
        	console.error(error);
        });
	}
	
	emptyTableActions(){
		return (
			<React.Fragment>
				<Button size="md" color="primary" onClick={e => this.switchToParent(e)}>Parent</Button>
			</React.Fragment>
		)
	}
	
	componentDidMount(){
		var wc = localStorage.getItem('workingContainer')
		
		if(wc){
			let t  = JSON.parse(wc);
			containerService.getChildrenContainers(t.id)
	        .then(json => {
	            return json;
	        })
	        .then(json => {
	        	this.setState({
	        		items: json.data,
	        		metaData: json.metaData
	        	})
	        })
	        .catch(error => {
	        	console.error(error);
	        });
		}
	}
	
	render() {
		const items = this.state.items;
		const metaData = this.state.metaData;
		
		const tableConfig = {
				tableSize: 'sm',
				paginationSize: 'sm',
				emptyMessageTitle: 'No containers',
                emptyMessageDescription: 'This container has no children containers',
                emptyActions: this.emptyTableActions,
				columnsConfig: [
				    { name: 'Name', dataField: 'attributes.name'},
				    { name: 'Path', dataField: 'attributes.path'},
				    { name: 'Description', dataField: 'attributes.description'},
				    { displayComponent: (v) => this.switchToLink(v), dataField: 'attributes.id' },
				],
		}
		
		if(items){
			let isRootContainer = commons.getWorkingContainerId() == commons.getRootContainerId()
	        return (
	            <div>
		            <Row>
		            	<Col xs="0" sm="0" md="0" lg="1" xl="1"></Col>
			            	<Col xs="12" sm="12" md="12" lg="10" xl="10">
					            <div className="jsoagger-table-header">
					            	<div><Button  size="xl" color="light" onClick={e => this.switchToParent(e)} disabled={isRootContainer}><i className="fa fa-chevron-left"></i> BACK</Button></div>
			                    </div>
			                </Col>
		                <Col xs="0" sm="0" md="0" lg="1" xl="1"></Col>
		            </Row> 
	                <Row>
	                	<Col xs="0" sm="0" md="0" lg="1" xl="1"></Col>
	                	<Col xs="12" sm="12" md="12" lg="10" xl="10">
	                		<Card className="no-radius">
	                			<CardBody>
			                        <DataTable items={JSON.stringify(items)}
			                        	metaData={JSON.stringify(metaData)} 
			                            tableConfig={tableConfig} 
			                        paginate="false"/>
		                        </CardBody>
	                        </Card>
	                    </Col>
	                    <Col xs="0" sm="0" md="0" lg="1" xl="1"></Col>
	                </Row> 
	            </div>
	        ) 
		}
		return ('Loading...')
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (Containers)


