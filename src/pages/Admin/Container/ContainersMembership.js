import React, { Component } from 'react';
import { ButtonGroup, Container, Form, FormGroup, Label, Input, FormText, Col, Row, CardFooter, ListGroup, ListGroupItem, CardHeader,Card,CardTitle, CardText,TabContent,TabPane, CardBody, Button, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import ViewDefinition from '_components/ViewDefinition';
import { containerService } from '_services/container.services.js';
import { accountService } from '_services/account.services.js';
import { DataTable, ContextualMenu } from '_components';
import * as actions from '_actions/actions.js';
import { commons } from '../../../_helpers/commons.js';

const mapStateToProps = store => ({
	userWorkingContainer: store.currentContainers,
})

const mapDispatchToProps = (disptach) => ({
	dispatchSwitchToContainerEvent: (e) => disptach(actions.switchToContainer(e)),
})
/**
 * 
 */
class ContainersMembership extends Component {
	
	constructor(props){
		super(props);
		this.state = {
			items: [],	
			metaData: '',
			accountId: this.props.accountId ? this.props.accountId : this.props.match.params.accountId,
			needUpdate: false
		}
		
		this.switchToParent = this.switchToParent.bind(this)
		this.emptyTableActions = this.emptyTableActions.bind(this)
		this.join = this.join.bind(this)
	}
	
	
	join(val){
		let containerId = val.id
		let isMember = this.state.membershipStates[val.name]
		
		//can not leave or join root and unaffiliated containers
		let isUnleavable = val.path === '/Application' ||
			val.path === '/Application/Unaffiliated' ||
			val.path === '/'
		
		if(isUnleavable){
			return (
				<td className="float-right">
					<ButtonGroup>
						<Button  size="md" color="light" onClick={e => this.switchTo(e, containerId)}><i className="fa fa-chevron-right"></i></Button>
					</ButtonGroup>
				</td>
			) 
		}
		else {
			return (
					<td>
						<div className="float-right">
						<ButtonGroup>
							<Button hidden={isMember || isMember == undefined}  color="danger" size="md"  onClick={e => this.addMemberToContainer(containerId, val.name)}>JOIN</Button>
							<Button hidden={!isMember || isMember == undefined} color="primary" size="md"  onClick={e => this.removeMemberFromContainer(containerId, val.name)}>LEAVE</Button>
							<Button  size="md" color="light" onClick={e => this.switchTo(e, containerId)}><i className="fa fa-chevron-right"></i></Button>
						</ButtonGroup>
						</div>
					</td>
				) 
		}
	}
	
	removeMemberFromContainer(containerId, containerName){
		let accountId = this.state.accountId
		let {membershipStates} = this.state
		
		accountService
		.removeContainerMembership(accountId, containerId)
		.then(response => {
			membershipStates[containerName] = false
			this.setState({
				membershipStates: membershipStates
			})
		})
	}
	
	addMemberToContainer(containerId, containerName){
		let accountId = this.state.accountId
		let {membershipStates} = this.state
		
		accountService
		.addContainerMembership(accountId, containerId)
		.then(response => {
			membershipStates[containerName] = true
			this.setState({
				needUpdate: true,
				membershipStates: membershipStates
			})
		})
	}
	
	switchTo(e, container) {
		if(e) e.preventDefault()
		this.loadDatas(container)
	}
	
	switchToParent(e){
		if(e) e.preventDefault()
		var containerId = this.state.currentContainerId,
			rootContainerId = commons.getRootContainerId()
		
		if(rootContainerId !== containerId){
			containerService.getParentContainer(containerId)
	        .then(json => {
	        	let parentId = json.data.attributes.id
	        	this.loadDatas(parentId)
	        })
	        .catch(error => {
	        	console.error(error);
	        });
		}
	}
	
	emptyTableActions(){
		return (
			<React.Fragment>
				<Button size="md" color="primary" onClick={e => this.switchToParent(e)}>Parent</Button>
			</React.Fragment>
		)
	}
	
	componentDidMount(){
		var current = localStorage.getItem('applicationContainer')
		if(current){
			let t  = JSON.parse(current);
			this.loadDatas(t.id)
		}
	}
	
	async loadDatas(parentContainerId){
		await containerService.getChildrenContainers(parentContainerId)
        .then(json => {
        	let membershipStates = {}
        	this.setState({
        		currentContainerId: parentContainerId,
        		items: json.data,
        		metaData: json.metaData,
        		membershipStates: membershipStates
        	})
        	return json
        })
        .then(json => {
        	json.data.map(item => {
				let containerId = item.attributes.id
				accountService
				.isUserInContainer(this.state.accountId, containerId)
				.then(response => {
					let {membershipStates} = this.state
					if(response && response.metaData && response.metaData.isMember === true){
						membershipStates[item.attributes.name] = true
					}
					else {
						membershipStates[item.attributes.name] = false
					}
					
					this.setState({
		        		membershipStates: membershipStates
		        	})
				})
			})	
        })
        .catch(error => {
        	console.error(error);
        });
	}
	
	render() {
		const {items } = this.state;
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
				    { displayComponent: (v) => this.join(v), dataField: 'attributes' },
				],
		}
		
		let isRootContainer = this.state.currentContainerId === null || this.state.currentContainerId === '' 
			|| this.state.currentContainerId == commons.getRootContainerId()
		
		if(items){
	        return (
	            <div>
			         <Row>
		            	<Col xs="12" sm="12" md="12" lg="12" xl="12">
				            <div className="jsoagger-table-header">
				            	<div><Button  size="xl" color="light" onClick={e => this.switchToParent(e)} disabled={isRootContainer}><i className="fa fa-chevron-left"></i> PARENT CONTAINER</Button></div>
		                    </div>
		                </Col>
		            </Row> 
	                <Row>
	                	<Col xs="12" sm="12" md="12" lg="12" xl="12">
	                		<Card className="no-radius no-border">
	                			<CardBody>
			                        <DataTable items={JSON.stringify(items)}
			                        	metaData={JSON.stringify(metaData)} 
			                            tableConfig={tableConfig} 
			                        paginate="false"/>
		                        </CardBody>
	                        </Card>
	                    </Col>
	                </Row> 
	            </div>
	        ) 
		}
		return ('Loading...')
	}
}

export default connect(mapStateToProps, mapDispatchToProps) (ContainersMembership)


