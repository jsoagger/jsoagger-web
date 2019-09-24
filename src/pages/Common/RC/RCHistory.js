import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { DataTable, ContextualMenu } from '../../../_components';
import { 
	ButtonToolbar, 
	ButtonGroup, 
	Button,
	Container, 
	Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table
} 
from 'reactstrap';
import { revControlledService } from '_services/revcontrolled.services.js';
import { commons } from '../../../_helpers/commons.js';

const propTypes = {
		versionInfo: PropTypes.string,
		iterationInfo: PropTypes.string,
		revControlledId: PropTypes.string,
		linkToDetails: PropTypes.func,
}
const defaultProps = {
}
/**
 * Generates inherited from parent icon
 */
const workingCopy = (val) => {
	if(!val.isWorkingCopy) return <td><i className="fa fa-lock icons font-lg"></i></td>
	return <td><i className="fa fa-check icons font-lg"></i></td>
}
/**
 * Actions for revision controlled
 */
class RCHistory extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			versions: [],
			iterations: []
		}
	}
	
	componentDidMount() {
		const revControlledId = this.props.match.params.id;
		console.log(JSON.stringify(this.props.match))
		revControlledService.allIterationsOf(revControlledId)
		.then(response => {
			return response
		})
		.then(json =>{
			this.setState({
				iterations: json.data,
        		metaData: json.metaData
        	})
		})
	}
	
	/**
	 * Generates href with link to details view
	 */
	LinkToDetails(val, item){
		const link = `/admin/p/lifecycles/${item.attributes.id}`
		return <td><Link to={link}>{val}</Link></td>
	}
	
	render() {
		const items = this.state.iterations;
		const metaData = this.state.metaData;
		
		const tableConfig = {
			title: 'All iterations',
			tableSize: 'sm',
			paginationSize: 'sm',
			columnsConfig: [
				{ displayComponent: (v) => workingCopy(v), dataField: 'attributes.workInfo' },
		        { name: 'Name', displayComponent: (v, i) => this.LinkToDetails(v,i), dataField: 'masterAttributes.name', defaultSortOrder: 'asc' },
			    { name: 'Iteration', dataField: 'attributes.iterationInfo.iterationNumber'},
			    { name: 'Creation', dataField: 'attributes.lastModifiedDate', type: 'date', dateFormat: 'ddd d/MM/YYYY'},
			],
		}
		
        return (
            <div>
                <Row>
                    <Col lg="1"></Col>
                    <Col lg="10">
                        <DataTable items={JSON.stringify(items)} 
                        	metaData={JSON.stringify(metaData)}
                            tableConfig={tableConfig} 
                        paginate="true"/>
                    </Col>
                    <Col lg="1"></Col>
                </Row> 
            </div>
        ) 
	}
}

RCHistory.propTypes = propTypes;
RCHistory.defaultProps = defaultProps;


export default RCHistory;

