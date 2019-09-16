import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Button, ListGroupItem, ListGroup, Container, Jumbotron, Badge, Card, CardBody, CardSubtitle, CardTitle, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import {DataTable, ContextualMenu } from '../../../_components';
import { containerService } from '_services/container.services.js';
import {commons} from '../../../_helpers/commons.js';

const tableConfig = {
	title: 'Team templates',
	tableSize: 'lg',
	paginationSize: 'md',
	emptyMessageTitle: 'No team templates',
	emptyMessageDescription: commons.getWorkingContainerName() + ' does not contain any team templates',
	emptyMessageSubDescription: 'You can either change working container or upload new template.',
	columnsConfig: [
		{ displayComponent: (v) => folderIcon(v) },
	    { name: 'Name', displayComponent: (v, i) => LinkTo(v,i), dataField: 'attributes.displayName', defaultSortOrder: 'asc' },
	    { name: 'Description', dataField: 'attributes.description', defaultSortOrder: 'asc' },
	    { name: 'Last Modified', dataField: 'attributes.lastModifiedDate', dateFormat: 'dd-MM-yyy' },
	    { name: 'By', dataField: 'attributes.lastModifiedBy', defaultSortOrder: 'asc' },
	    { name: '', displayComponent: (v) => moreActions(v) },
	],
} ;
/**
 * Generates href with link to details view
 */
const LinkTo = (val, item) => {
	const link = `/admin/p/lifecycles/${item.attributes.id}`
	return <td><Link to={link}>{val}</Link></td>
}
/**
 * Generates ellipsis
 */
const moreActions = (val) => {
	return <ContextualMenu val={val} /> 
}
/**
 * Generates folder icon
 */
const folderIcon = (val) => {
	if(val) return <td><i className="icon-folder icons font-xl"></i></td>
	return <td></td>
}
/**
 * Team template page
 */
class TeamTemplates extends Component {

	constructor(props){
		super(props);
		this.state = {
			items: [],	
			metaData: ''
		}
	}
	
	componentDidMount(){
		containerService.getAllTeamTemplates(0, 6, false)
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
        });
	}
	
	render() {
		const items = this.state.items;
		const metaData = this.state.metaData;
		return (
			<div className="flex-row align-items-center">
				<Row>
					<Col xs="0" sm="0" md="0" lg="1" xl="2"></Col>
					<Col xs="12" sm="12" md="12" lg="10" xl="8">					
						<DataTable items={JSON.stringify(items)} metaData={JSON.stringify(metaData)} tableConfig={tableConfig}/>
					</Col>
					<Col xs="0" sm="0" md="0" lg="1" xl="2"></Col>
				</Row>
			</div>
		) 
  }
}

export default TeamTemplates;


