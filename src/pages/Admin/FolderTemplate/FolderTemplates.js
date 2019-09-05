import React, { Component, Suspense } from 'react';
import { ListGroupItem, Button, CardFooter, Container, Jumbotron, Card, CardBody, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import {DataTable, ContextualMenu, ListGroupDataTable } from '../../../_components';
import { containerService } from '_services/container.services.js';
import {commons} from '../../../_helpers/commons.js';

const tableConfig = {
	title: 'Folder templates',
	tableSize: 'lg',
	paginationSize: 'md',
	emptyMessageTitle: 'No folder templates',
	emptyMessageDescription: commons.getWorkingContainerName() + ' does not contain any folder templates',
	emptyMessageSubDescription: 'You can either change working container or upload new template.',
	columnsConfig: [
		{ displayComponent: (v) => folderIcon(v) },
	    { name: 'Name', displayComponent: (v, i) => LinkTo(v,i), dataField: 'attributes.displayName', defaultSortOrder: 'asc' },
	    { name: 'Description', dataField: 'attributes.description', defaultSortOrder: 'asc' },
	    { name: 'Created on', dataField: 'attributes.lastModifiedDate', dateFormat: 'dd-MM-yyy' },
	    { name: '', displayComponent: (v) => moreActions(v) },
	],
} ;
/**
 * Generates href with link to details view
 */
const LinkTo = (val, item) => {
	const link = `/admin/p/folderTemplates/${item.attributes.id}`
    return <td><Link to={link}><i className="fa fa-angle-right fa-lg"></i></Link></td>
}
const url = (item) => {
    const url = `/admin/p/folderTemplates/${item.attributes.id}`
    return url;
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
 * Folder template page
 */
class FolderTemplates extends Component {

	constructor(props){
		super(props);
		this.state = {
			items: [],	
			metaData: ''
		}
	}
	
	componentDidMount(){
		containerService.getAllFolderTemplates(0, 6, false)
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
            <div>
                <Row>
                    <Col lg="2"></Col>
                    <Col lg="8">
                        <ListGroupDataTable items={JSON.stringify(items)} rows={rows} metaData={JSON.stringify(metaData)} tableConfig={tableConfig}/>
                    </Col>
                    <Col lg="2"></Col>
                </Row> 
            </div>
       )
  }
}

export default FolderTemplates;


