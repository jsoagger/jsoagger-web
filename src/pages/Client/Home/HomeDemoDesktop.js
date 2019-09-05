import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ReactMarkdown from 'react-markdown'

import './Home.css';
import desktop3 from '../../../assets/img/mob-deskt_ipad.png';

/**
 * Home demo mobile page
 */
class HomeDemoDesktop extends Component {
    render () {
    	
    	var title0 = "# Desktop and embedded platforms integration"
    	var title0mark = <ReactMarkdown source={title0} />
    	
    	var title1 = "# Download"
        var title1mark = <ReactMarkdown source={title1} />
    	
    	var title2 = "# Run command"
        var title2mark = <ReactMarkdown source={title2} />
    	
    		
        return (
        	<div className="flex-row justify-content-center">
                    <Row>
                    	<Col md="2"></Col>
                        <Col md="8">
                            <div>
                                <h3 className="float-left display-4 mr-4">{title0mark}</h3>
                            </div>
                        </Col>
                        <Col md="2"></Col>
                    </Row>
                    <Row className="justify-content-center">
                        <div className="w-spacer"/>
                    </Row>
                    <Row>
                    	<Col md="2"></Col>
                        <Col md="8">
	                        <div className="clearfix">
	                            <img src={desktop3} className="" alt="toto" width="300" height="300"/>
	                        </div>
	                    </Col>
	                    <Col md="2"></Col>
                    </Row>
                    <Row><div className="w-spacer"/></Row>
	                    <Row>
	                	<Col md="2"></Col>
	                	<Col md="8"><hr/></Col>
	                	<Col md="2"></Col>
	                </Row>
	                <Row><div className="w-spacer"/></Row>
                    <Row>
	                    <Col md="2"></Col>
	                	<Col md="8">
			                <div>
	                            {title1mark}
	                        </div>
	                        <div>
	                        	<p>
	                            JSOAGER uses update4j to manage software download and updates. 
	                            The update4j project makes it very easy to push new versions of your software to all installed machines.
	                            </p>
	                        </div>
	                        <div>
                        		<p>
                        			<u><a href="https://repo1.maven.org/maven2/org/update4j/update4j/1.4.4/update4j-1.4.4.jar">Download update4j</a></u> from maven central repository
                        		</p>
    	                    </div>
	                	</Col>
	                	<Col md="2"></Col>
                    </Row>
                    <Row><div className="w-spacer"/></Row>
                    <Row>
	                    <Col md="2"></Col>
	                	<Col md="8">
			                <div>
	                            {title2mark}
	                        </div>
	                        <div>
	                        	<p>
	                        		> java -jar update4j-1.4.3.jar --remote http://jsoager.tech/jsoager/demo/app/desktop.xml
	                        	</p>
	                        </div>
	                	</Col>
	                	<Col md="2"></Col>
	                </Row>
            </div>
        );
    }
}

export default HomeDemoDesktop;