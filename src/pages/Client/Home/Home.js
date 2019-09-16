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
                        <Col xs="12" md="12" lg="12" xl="12">
                            <div>
                                <p className="float-left display-4 mr-4">Welcome to JSOAGGER</p>
                            </div>
                            <div>
                                <p className="text-muted float-left">
                                    JSOAGGER is an open source and free framework for building cross platform Java applications. Its integrates technical framworks such as spring-boot, JPA, Hibernate, ReactJS, JavaFX11 and Docker container in order to build robust applications based on current market standards. 
                                </p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <div className="w-spacer"/>
                    </Row>
                    <Row>
                        <Col xs="12" md="12" lg="6" xl="6">
                            <div className="clearfix">
                                <img src={mobile1} className="" alt="toto" width="100" height="200"/>
                                <h4 className="pt-4">JSOAGGER for <i>IOS</i> and <i>ANDROID</i> platforms</h4>
                            </div>
                            <div className="clearfix">
	                            <Link to="/c/home/demoMobile">
		                            <Button  color="primary">TRY IT!</Button>
		                        </Link>
                            </div>
                            <div className="w-spacer"/>
                            <div className="w-spacer"/>
                        </Col>
                        <Col xs="12" md="12" lg="6" xl="6">
                            <div className="clearfix">
                                <img src={ipad} className="" alt="toto" width="200" height="200"/>
                                <h4 className="pt-4">JSOAGGER for <i>Desktop</i> and <i>Embedded</i> platforms</h4>
                            </div>
                            <div className="clearfix">
	                        	<Link to="/c/home/demoDesktop">
		                            <Button  color="primary">TRY IT!</Button>
		                        </Link>
	                        </div>
	                        <div className="w-spacer"/>
	                        <div className="w-spacer"/>
                        </Col>
                    </Row>
            </div>
        );
    }
}

export default Home;
