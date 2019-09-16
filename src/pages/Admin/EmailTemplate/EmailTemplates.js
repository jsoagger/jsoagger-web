import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Button, ListGroupItem, ListGroup, Container, Jumbotron, Badge, Card, CardBody, CardSubtitle, CardTitle, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import {DataTable, ContextualMenu, ListGroupDataTable } from '../../../_components';
import { containerService } from '_services/container.services.js';
import {commons} from '../../../_helpers/commons.js';

const tableConfig = {
	title: 'Email templates',
	tableSize: 'lg',
	paginationSize: 'md',
	emptyMessageTitle: 'No email templates',
	emptyMessageDescription: commons.getWorkingContainerName() + ' does not contain any email templates',
	emptyMessageSubDescription: 'You can either change working container or upload new template.',
	columnsConfig: [
		{ displayComponent: (v) => enIcon(v) },
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
	const link = url(item);
    //return <td><Link to={link}>{val}</Link></td>
    return <Link to={link}><i className="fa fa-angle-right fa-lg"></i></Link>
}
const url = (item) => {
    const url = `/admin/p/emailTemplates/${item.attributes.id}`
    return url;
}
/**
 * Generates ellipsis
 */
const moreActions = (val) => {
	return <ContextualMenu value={val}/>
}
/**
 * Generates folder icon
 */
const enIcon = (val) => {
	if(val) return <td><i className="fa fa-envelope-o icons font-lg"></i></td>
	return <td></td>
}
/**
 * Email templates page
 */
class EmailTemplates extends Component {

	constructor(props){
		super(props);
		this.state = {
			items: [],	
			metaData: ''
		}
	}
	
	componentDidMount(){
		containerService.getAllEmailTemplates(0, 0, false)
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
    
    populateRows() {
        const rows = [];
        const itms = this.state.items;
        if(itms) {
			itms.forEach((item) => {
				var title = commons.getPropByString(item, 'attributes.displayName');
				var description = commons.getPropByString(item, 'attributes.description');
                var link = LinkTo(title, item);
                var uri = '#' + url(item);
	            rows.push(
	                <ListGroupItem className="justify-content-between" tag="a" href={uri}>
	                	<Row>
	                		<Col lg="11">
	                			<span><h5>{title}</h5></span>
	                			<p className="description">{description}</p>
	                		</Col>
	                		<Col lg="1"><div className="float-right">{link}</div></Col>
	                	</Row>
	                </ListGroupItem>
	            );
			 });
        }
		return rows;
	}
	
	render() {
		const items = this.state.items;
        const metaData = this.state.metaData;
        const rows = this.populateRows();
        
        return (
				<Row>
					<Col xs="0" sm="0" md="0" lg="1" xl="2"></Col>
					<Col xs="12" sm="12" md="12" lg="10" xl="8">
						<ListGroupDataTable items={JSON.stringify(items)} rows={rows} metaData={JSON.stringify(metaData)} tableConfig={tableConfig}/>
					</Col>
					<Col xs="0" sm="0" md="0" lg="1" xl="2"></Col>
				</Row>
		) 
  }
}

export default EmailTemplates;


