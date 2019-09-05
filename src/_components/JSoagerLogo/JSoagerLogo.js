import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import logo from '../../assets/img/brand/logo.png';

/**
 * Displays full JSOAGER Logo inside a row and column justified.
 */
class JSoagerLogo extends Component {

  render() {
    return (
        <React.Fragment>
          <Row className="justify-content-center">
            <Col md="8">
                <div className="clearfix animated fadeIn">
                    <img src={logo} className="img-avatar" alt="JSOAGER logo" width="300" height="200"/>
                </div>
            </Col>
          </Row>
        </React.Fragment>
    );
  }
}

export default JSoagerLogo;
