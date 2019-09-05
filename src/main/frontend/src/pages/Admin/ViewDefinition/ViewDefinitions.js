import React, { Component } from 'react';
import { Container, Form, FormGroup, Label, Input, FormText, Col, Row, CardFooter, ListGroup, ListGroupItem, CardHeader,Card,CardTitle, CardText,TabContent,TabPane, CardBody, Button, Nav, NavItem, NavLink } from 'reactstrap';
import ViewDefinition from '_components/ViewDefinition';

/**
 * 
 */
class ViewDefinitions extends Component {

  render() {
    return (
        <div className="flex-row align-items-center">
            <Container>
                <Row>
                    <Col xs="12" lg="12">
                        <Card>
                            <CardBody className="jsoager-card-title">
                                <h3 className="float-left, jsoa-table-title">View definitions</h3>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="3">
                        <div class="sidebar-nav-fixed affix">
                            <ListGroup>
                                <ListGroupItem className="justify-content-between">Login</ListGroupItem>
                                <ListGroupItem className="justify-content-between">Batch load</ListGroupItem>
                                <ListGroupItem className="justify-content-between">Batch export</ListGroupItem>
                            </ListGroup>
                        </div>
                    </Col>
                    <Col md="9">
                        <div id="viewDefinitionContent">
                            <ViewDefinition />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
  }
}

export default ViewDefinitions;
