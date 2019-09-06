import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Jumbotron, Badge, Card, CardBody, CardSubtitle, CardTitle, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { DataTableHeader, DataTableRow } from '../../../_components';
import { installationService } from '_services/installation.services.js';
import { commons } from '../../../_helpers/commons.js';
import { 
	AttributeListGroup, 
	WorkInfo,
	PersistenceInfo,
	ContentHolderAction
} from '_components';

const summaryAttributesList = {
    title: '',
    icon: 'fa fa-info float-right',
    updatable: false,
    attributes: [
        {name: 'Module Name', dataField: 'attributes.moduleName'},
        {name: 'Module Version', dataField: 'attributes.moduleVersion'},
        {name: 'Module description', dataField: 'attributes.moduleDescription'},
        {name: 'Module Type', dataField: 'attributes.moduleType'},
        {name: 'Module status', dataField: 'attributes.status'},
    ]
};
/**
 * Application version history
 */
class AppVersion extends Component {

	constructor(props){
		super(props);
		this.state = {
			item: {},	
			id: ''
		}
	}
    
    componentDidMount(){
		const versionHistoryId = this.props.match.params.id;
		const d = installationService
		.details(versionHistoryId)
		.then(json => {
			this.setState({item: json, id: versionHistoryId});
        })
	}
	
	render() {
        const data = this.state.item.data;
		if(data){
			const d = commons.toJSONObject(data);
            return (
                <div className="flex-row align-items-center">
                        <Row>
                            <Col md="2"></Col>
                            <Col xs="12" lg="8">
                                <Row>
                                    <Col xs="12" lg="12">
                                        <Card>
                                            <CardBody>
                                                <h3 className="jsoa-table-title">{d.attributes.moduleName} </h3>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" lg="12">
                                        <div class="sidebar-nav-fixed affix">
                                             <Card>
				                    	        <CardBody>
                                                    <AttributeListGroup attributesListConfig={summaryAttributesList} data={d} orientation="horizontal"/>
                                                    <PersistenceInfo  {...this.props} data={d}  orientation="horizontal" displayHeader="true"/>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md="2"></Col>
                         </Row>
                </div>
            
            );
        }
        else {
            return <div>Loading</div>
        }
	}
 }

export default AppVersion;

