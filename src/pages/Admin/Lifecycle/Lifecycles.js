import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { 
	Button, 
	ListGroupItem, 
	ListGroup, 
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
import { DataTable, ContextualMenu, ListGroupDataTable } from '../../../_components';
import { containerService } from '_services/container.services.js';
import {commons} from '../../../_helpers/commons.js';

const tableConfig = {
	title: 'Lifecycles',
	tableSize: 'sm',
	paginationSize: 'sm',
	emptyMessageTitle: 'No lifecycles',
	emptyMessageDescription: commons.getWorkingContainerName() + ' has no lifecycles',
	emptyMessageSubDescription: 'You can either change working container or upload new lifecycle.',
	columnsConfig: [
		{ displayComponent: (v) => inheritedIcon(v) },
	    { name: 'Name', displayComponent: (v, i) => LinkTo(v,i), dataField: 'masterAttributes.name', defaultSortOrder: 'asc' },
	    { name: 'Version', dataField: 'attributes.iterationInfo.iterationNumber', defaultSortOrder: 'asc' },
	    { name: '', displayComponent: () => lockedIcon(), dataField: 'attributes.workInfo.locked', defaultSortOrder: 'asc' },
	    { name: 'Description', dataField: 'masterAttributes.description', defaultSortOrder: 'asc' },
	    { name: '', displayComponent: (v) => moreActions(v)},
	],
}
/**
 * Generates href with link to details view
 */
const LinkTo = (val, item) => {
	const link = `/admin/p/lifecycles/${item.attributes.id}`
	return <td><Link to={link}><i className="fa fa-angle-right fa-lg"></i></Link></td>
}
const url = (item) => {
    const url = `/admin/p/lifecycles/${item.attributes.id}`
    return url;
}
/**
 * Generates context menu
 */
const moreActions = (val) => {
	return (
		<React.Fragment>
			<Row>
				<Col lg="12">
					<Link color="primary"><i className="fa fa-check"></i>&nbsp;DETAILS</Link>
					<Link color="light"><i className="fa fa-"></i>&nbsp;DOWNLOAD</Link>
				</Col>
			</Row>
		</React.Fragment>
	)
}
/**
 * Generates inherited from parent icon
 */
const inheritedIcon = (val) => {
	if(val) return <td><i className="fa fa-flash icons font-lg"></i></td>
	return <td></td>
}
/**
 * Locked or not
 */
const lockedIcon = (val) => {
	if(val) return <td><i className="icon-lock icons font-sm"></i></td>
	else return <td><i className="icon-lock-open icons font-sm"></i></td>
}
/**
 * Lifecycle management page
 */
class Lifecycles extends Component {

	constructor(props){
		super(props);
		this.state = {
			items: [],	
			metaData: ''
		}
	}
	
	componentDidMount(){
		containerService.getAllLifecycles(0, 4, false)
        .then(json => {
        	console.log(json);
            return json;
        })
        .then(json => {
        	this.setState({items: json.data})
        	this.setState({metaData: json.metaData})
        })
        .catch(error => {
        	console.error(error);
        })
	}
	
	populateRows() {
        const rows = [];
        const itms = this.state.items;
        if(itms) {
			itms.forEach((item) => {
				var title = commons.getPropByString(item, 'masterAttributes.name');
				var description = commons.getPropByString(item, 'masterAttributes.description');
				var link = LinkTo(title, item);
				var uri = '#' + url(item);
	            rows.push(
	                <ListGroupItem className="justify-content-between" tag="a" href={uri}>
	                	<Row><div className="spacer-10"></div></Row>
	                	<Row>
	                		<Col lg="11">
	                			<span><h5>{title}</h5></span>
	                			<p className="description">{description}</p>
	                		</Col>
	                		<Col lg="1">
	                			<div className="spacer-10"></div>
	                			<div className="float-right">{link}</div>
	                		</Col>
	                	</Row>
	                </ListGroupItem>
	            );
			 });
        }
		return rows;
	}
	
	render() {
		const rows = this.populateRows()
		const items = this.state.items
		const metaData = this.state.metaData
		
		return (
			<Row>
				<Col xs="0" sm="0" md="0" lg="1" xl="2"></Col>
				<Col xs="12" sm="12" md="12" lg="10" xl="8">
					<ListGroupDataTable items={JSON.stringify(items)} 
						rows={rows} 
						metaData={JSON.stringify(metaData)} 
						tableConfig={tableConfig}/>
				</Col>
				<Col xs="0" sm="0" md="0" lg="1" xl="2"></Col>
			</Row>
		) 
  }
}

export default Lifecycles;


