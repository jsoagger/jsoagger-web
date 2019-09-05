import React, { Component } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import './Home.css';

import ipad from '../../../assets/img/mob-deskt_ipad.png';
import mobile1 from '../../../assets/img/mobile1-161.png';

/**
 * Home page
 */
class Home extends Component {
	
    render () {
        return (
        	<div className="flex-row justify-content-center">
                    <Row>
                    	<Col md="2"></Col>
                        <Col md="8">
                            <div>
                                <h3 className="float-left display-3 mr-4">Welcome to JSOAGER</h3>
                            </div>
                            <div>
                                <p className="text-muted float-left">
                                    JSOAGER concept consists in generating a view from an XML or JSON configuration file, 
                                    which improves the maintainability, visibility and reusability of the components. 
                                    JSOAGER uses the same codebase for web, mobile, desktop and integrated environments. 
                                </p>
                            </div>
                        </Col>
                        <Col md="2"></Col>
                    </Row>
                    <Row className="justify-content-center">
                        <div className="w-spacer"/>
                    </Row>
                    <Row>
                    	<Col md="2"></Col>
                        <Col md="4">
                            <div className="clearfix">
                                <img src={mobile1} className="" alt="toto" width="100" height="200"/>
                                <h4 className="pt-4">JSOAGER for <i>IOS</i> and <i>ANDROID</i> platforms</h4>
                            </div>
                            <div className="clearfix">
	                            <Link to="/c/home/demoMobile">
		                            <Button  color="primary">TRY IT!</Button>
		                        </Link>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="clearfix">
                                <img src={ipad} className="" alt="toto" width="200" height="200"/>
                                <h4 className="pt-4">JSOAGER for <i>Desktop</i> and <i>Embedded</i> platforms</h4>
                            </div>
                            <div className="clearfix">
	                        	<Link to="/c/home/demoDesktop">
		                            <Button  color="primary">TRY IT!</Button>
		                        </Link>
	                        </div>
                        </Col>
                        <Col md="2"></Col>
                    </Row>
            </div>
        );
    }
}

export default Home;
