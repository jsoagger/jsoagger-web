import React, { Component, Suspense } from 'react';
import { ListGroupItem, ListGroup, Button, CardFooter, Container, Jumbotron, Card, CardBody, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
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
 * Simple ListGroupDataTable
 */
class ListGroupDataTable extends Component {
    
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
    
	render() {
        const metaData = JSON.parse(this.props.metaData);
		if(metaData.totalElements > 0){
			const rows = this.props.rows;
			const pagination = this.populatePagination();
            const title = this.props.tableConfig.title.toUpperCase();
			return (
			    <div className="flex-row align-items-center">
			        <Container>
                        <Row>
                            <Col xs="12" lg="12">
                                <Card>
                                    <CardBody className="jsoager-card-title">
                                        <h3 className="float-left, jsoa-table-title">{title}</h3>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
			            <Row>
                            <Col xs="12" lg="12">
                                <ListGroup>{rows}</ListGroup>    
                                {pagination}
                            </Col>
                        </Row>
			        </Container>
			   </div>
		  );
		}
		else {
            return emptyTableContent(this.props.tableConfig.emptyMessageTitle, 
                this.props.tableConfig.emptyMessageDescription, 
                this.props.tableConfig.emptyMessageSubDescription,
                this.props.tableConfig.emptyActions)
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
                                        <Col md="3" >
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


ListGroupDataTable.propTypes = propTypes;
ListGroupDataTable.defaultProps = defaultProps;

export default ListGroupDataTable;
