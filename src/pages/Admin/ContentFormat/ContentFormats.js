import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import JSoagerLogo from '../../../_components/JSoagerLogo';

/**
 * 
 */
class ContentFormats extends Component {

  render() {
    return (
      <div className="flex-row align-items-center">
        <Container>
          <JSoagerLogo/>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="clearfix">
                <h1 className="float-left display-3 mr-1">Manage Content Format</h1>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="8">
              <div className="clearfix">
                <h4 className="pt-3">Will be avalaible soon!</h4>
                <p className="text-muted float-left">The page you are looking for was not found.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

    );
  }
}

export default ContentFormats;
