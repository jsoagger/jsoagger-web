import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import JSoagerLogo from '../../../_components/JSoagerLogo';

/**
 * Page 500
 */
class Page500 extends Component {

  render() {

    return (
      <div className="flex-row align-items-center">
        <Container>
         <JSoagerLogo />
          <Row className="justify-content-center">
            <Col md="8">
              <span className="clearfix">
                <h1 className="float-left display-3 mr-1">500</h1>
                <h4 className="pt-3">Houston, we have a problem!</h4>
                <p className="text-muted float-left">The page you are looking for is temporarily unavailable.</p>
              </span>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Page500;
