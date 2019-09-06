import React, { Component, Suspense } from 'react';
import { Button, CardFooter, Container, Jumbotron, Card, CardBody, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { DataTableHeader, DataTableRow } from '../../DataTable';
import PropTypes from 'prop-types';

const propTypes = {
    tableConfig: PropTypes.array,
    items: PropTypes.any,
    metaData: PropTypes.any,
    tableClassName: PropTypes.string,
    paginate: PropTypes.bool,
};

const defaultProps = {
    tableConfig:[], 
    items:'',
    metaData: '',
    tableClassName: 'jsoa-simple-table',
    paginate: true,
};


/**
 * Simple DataTable
 */
class DataTable extends Component {
    
	populatePagination() {
		var index = 0;
		const pitem = [];
        var pagination;

        if(this.props.paginate === true) {

            const metaData = JSON.parse(this.props.metaData);
            let hasPreviousPage = !metaData.hasPreviousPage;
            let hasNextPage = !metaData.hasNextPage;
            
            pitem.push(<PaginationItem disabled={hasPreviousPage}>
                <PaginationLink previous tag="button">Prev</PaginationLink>
            </PaginationItem>);
        
            for(var i = index; i < metaData.totalPages; i++) {
                pitem.push(<PaginationItem active={metaData.pageNumber === i}>
                    <PaginationLink tag="button">{++index}</PaginationLink>
                    </PaginationItem>);
            }

            pitem.push(<PaginationItem disabled={hasNextPage}>
                    <PaginationLink next tag="button">Next</PaginationLink>
                </PaginationItem>);

            pagination = <CardFooter className="jsoa-simple-table-footer">
                <Row>
                    <Col md="6"></Col>
                    <Col md="6">
                        <div className="float-right">
                            <Pagination aria-label="Page navigation" size={this.props.tableConfig.paginationSize}>{pitem}</Pagination>
                        </div>
                    </Col>
                </Row>    
            </CardFooter>
        }
        else {
            pagination = <div></div>
        }
        
		return pagination;
    }
    
	loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
    
    populateRows() {
        const rows = [];
        const itms = JSON.parse(this.props.items);
		itms.forEach((item) => {
            rows.push(
             <DataTableRow  {...this.props} item={item}  columns={this.props.tableConfig.columnsConfig}/>
            );
		 });
		 return rows;
	}
	
	render() {
		if(this.props.totalElements > 0 ||
				(this.props.metaData && JSON.parse(this.props.metaData).totalElements > 0)){
			
			const rows = this.populateRows();
			const pagination = this.populatePagination();
            const title = this.props.tableTitle ? this.props.tableTitle : 
            	this.props.tableConfig.title? this.props.tableConfig.title.toUpperCase() : '';
            	
            const titleDisplay = title ? (
            	<Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardBody className="jsoagger-card-title">
                                <h3 className="float-left, jsoa-table-title">{title}</h3>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            ): ''
            
			return (
				<div>
                        {titleDisplay}
			            <Row>
                            <Col xs="12" lg="12">
                                <Card>
                                    <CardBody className="jsoagger-paddingless-cardbody">
                                        <Table hover responsive 
                                        	size={this.props.tableConfig.tableSize} 
                                        	className={this.props.tableClassName}>
                                            
                                        	<DataTableHeader {...this.props} columns={this.props.tableConfig.columnsConfig}/>
                                            <tbody>{rows}</tbody>
                                        </Table>
                                    </CardBody>
                                   {pagination}
                                </Card>
                            </Col>
                        </Row>
			   </div>
		  );
		}
		else {
            return emptyTableContent(this.props.tableConfig.emptyMessageTitle, 
                this.props.tableConfig.emptyMessageDescription, 
                this.props.tableConfig.emptyMessageSubDescription,
                this.props.tableConfig.emptyActions);
		}
  }
}

const emptyTableContent = (title, description, subDescription, emptyActions) => {
	var emptyActionsDisplay
	if(emptyActions){
		emptyActionsDisplay = emptyActions()
	}
	
	return (
        <div className="flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col xs="12" sm="10" md="10">
                        <Card className="card-accent-warning">
                            <CardBody>
                                <Jumbotron className="white-background" fluid>
                                    <Container fluid className="white-background">
                                        <h3 className='display-3'>{title}</h3>
                                        <p className='lead'>{description}</p>
                                        <hr className='my-2'/>
                                        <p>{subDescription}</p>
                                        <Col md="12" >
                                            {emptyActionsDisplay}
                                        </Col>
                                    </Container>
                                </Jumbotron>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
  )
}


DataTable.propTypes = propTypes;
DataTable.defaultProps = defaultProps;

export default DataTable;
