import React, { Component } from 'react';
import { Container, Form, FormGroup, Label, Input, FormText, Col, Row, CardFooter, ListGroup, ListGroupItem, CardHeader,Card,CardTitle, CardText,TabContent,TabPane, CardBody, Button, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import ViewDefinition from '_components/ViewDefinition';
import { containerService } from '_services/container.services.js';
import { DataTable, ContextualMenu } from '../../../_components';
import * as actions from '_actions/actions.js';

const mapStateToProps = store => ({
	userWorkingContainer: store.currentContainers,
})

const mapDispatchToProps = (disptach) => ({
	dispatchSwitchToContainerEvent: (e) => disptach(actions.switchToContainer(e)),
})

/**
 * 
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
		return <td><Button  color="primary" className="float-right" onClick={e => this.switchTo(e, val)}>Switch to</Button></td>
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
				<Button block color="primary" onClick={e => this.switchToParent(e)}>To parent</Button>
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
				tableSize: 'md',
				paginationSize: 'md',
				emptyMessageTitle: 'No child container',
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
	        return (
	            <div>
	                <Row>
	                    <Col lg="1"></Col>
	                    <Col lg="10">
	                        <DataTable items={JSON.stringify(items)}
	                        	metaData={JSON.stringify(metaData)} 
	                            tableConfig={tableConfig} 
	                        paginate="false"/>
	                    </Col>
	                    <Col lg="1"></Col>
	                </Row> 
	            </div>
	        ) 
		}
		return ('Loading...')
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (Containers)


