import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Container, Jumbotron, Badge, Card, CardBody, CardSubtitle, CardTitle, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { DataTable, ContextualMenu } from '../../../_components';
import { installationService } from '_services/installation.services.js';

const tableConfig = {
	title: 'Installation history',
	tableSize: 'sm',
	paginationSize: 'sm',
	columnsConfig: [
		{ displayComponent: (v) => inheritedIcon(v) },
        { name: 'Module', displayComponent: (v, i) => LinkTo(v,i), dataField: 'attributes.moduleName', defaultSortOrder: 'asc' },
        { name: 'Version', dataField: 'attributes.moduleVersion'},
	    { name: 'Type', dataField: 'attributes.moduleType'},
	    { name: 'Installed on', dataField: 'attributes.lastModifiedDate', dateFormat: 'd/MM/YYYY hh:mm', type: 'date' },
	    { name: 'Status', dataField: 'attributes.status'},
	],
}
/**
 * Generates href with link to details view
 */
const LinkTo = (val, item) => {
	const link = `/appVersionHistory/${item.attributes.id}`
	return <td><Link to={link}>{val}</Link></td>
}
/**
 * Generates context menu
 */
const moreActions = (val) => {
	return <ContextualMenu value={val}/>
}
/**
 * Generates inherited from parent icon
 */
const inheritedIcon = (val) => {
	if(val) return <td><i className="fa fa-recycle icons font-lg"></i></td>
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
class AppVersions extends Component {

	constructor(props){
		super(props);
		this.state = {
			items: [],	
			metaData: ''
		}
	}
	
	componentDidMount(){
		installationService.getHistories()
        .then(json => {
        	console.log(json);
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
	
	render() {
		const items = this.state.items;
		const metaData = this.state.metaData;
        return (
            <div className="flex-row align-items-center">
                <Row>
                	<Col xs="0" sm="0" md="0" lg="1" xl="1"></Col>
                    <Col xs="12" sm="12" md="12" lg="11" xl="10">
                    	<Card className="no-radius no-border">
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
}

export default AppVersions;


