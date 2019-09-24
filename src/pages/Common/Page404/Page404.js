import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import JSoagerLogo from '../../../_components/JSoagerLogo';

/**
 * Page not found
 */
class Page404 extends Component {

  render() {

    return (
      <div className="flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
          	<Col md="2"></Col>
            <Col md="8">
              <div>
                <h1 className="float-left display-3 mr-1">404</h1>
                <h4 className="pt-3">Oops! You're lost.</h4>
                <p className="text-muted float-left">The page you are looking for was not found.</p>
              </div>
            </Col>
            <Col md="2"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page404;
