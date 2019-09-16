import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import ReactMarkdown from 'react-markdown'

import './Home.css';
import ipad from '../../../assets/img/mob-deskt_ipad.png';
import mobile1 from '../../../assets/img/mobile1-161.png';
import mobile2 from '../../../assets/img/mobile2.png';
import mobile3 from '../../../assets/img/mobile3.png';


/**
 * Home demo mobile page
 */
class HomeDemoDesktop extends Component {
    render () {
    	
    	var title0 = "# IOS and ANDROÏD integration"
    	var title0mark = <ReactMarkdown source={title0} />
    	
    	var title1 = "# Run with update4j"
        var title1mark = <ReactMarkdown source={title1} />
    	
    	var title2 = "# Run with java"
        var title2mark = <ReactMarkdown source={title2} />

		var title3 = "# Need help?"
        var title3mark = <ReactMarkdown source={title3} />

    		
        return (
        		<div className="flex-row justify-content-center">
                    <Row>
                        <Col xs="12" md="12" lg="12" xl="12">
                            <div>
                                <p className="float-left display-4 mr-4">{title0mark}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="12" lg="12" xl="12">
                            <p>
« JSoaggerFX » concept is to build JavaFX IHM from « XML » or « JSON » configuration file. 
Each node on the scene is a reusable, configurable and injectable component, described by a configuration file. 
The visual IHM is a group of independent components, integrated at runtime by a dependency injection Framework.
Builded UI is Responsive, Adaptative and material designed. It can be easily connected to remote cloud server.
                            </p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <div className="w-spacer"/>
                    </Row>
                    <Row>
                        <Col md="4">
                            <div className="clearfix">
                                <img src={mobile1} className="" alt="toto" width="100" height="200"/>
                            </div>
                            <div className="w-spacer"/>
                        </Col>
                        <Col md="4">
	                        <div className="clearfix">
	                            <img src={mobile2} className="" alt="toto" width="100" height="200"/>
	                        </div>
	                        <div className="w-spacer"/>
	                    </Col>
	                    <Col md="4">
	                        <div className="clearfix">
	                            <img src={mobile3} className="" alt="toto" width="100" height="200"/>
	                        </div>
	                    </Col>
                    </Row>
                    <Row><div className="w-spacer"/></Row>
	                    <Row><Col xs="12" md="12" lg="12" xl="12"><hr/></Col>
	                </Row>
	                
	                
	                <Row><div className="w-spacer"/></Row>
                    <Row>
						<Col xs="12" md="12" lg="12" xl="12">
			                <div>
	                            {title2mark}
	                        </div>
	                        <div>
	                        	<p>
	                            If you have just builded the quick start project from maven, launch following command:
	                            </p>
	                            <p>
    	                    		> java -jar ./target/starter-desktop-1.0-SNAPSHOT.jar --jsoagger.client.mode=simul_desktop
    	                    	</p>
	                        </div>
	                	</Col>
                    </Row>
	                
	                <Row><div className="w-spacer"/></Row>
	                <Row><Col xs="12" md="12" lg="12" xl="12"><hr/></Col></Row>
	                <Row><div className="w-spacer"/></Row>	                
                    <Row>
						<Col xs="12" md="12" lg="12" xl="12">
			                <div>
	                            {title1mark}
	                        </div>
	                        <div>
	                        	<p>
	                            JSOAGGER uses update4j to manage software download and updates. 
	                            The update4j project makes it very easy to push new versions of your software to all installed machines.
	                            </p>
	                        </div>
	                        <div>
                        		<p>
                        			<u><a href="https://repo1.maven.org/maven2/org/update4j/update4j/1.4.4/update4j-1.4.4.jar">Download update4j</a></u> from maven central repository
                        		</p>
    	                    </div>
    	                    <div>
    	                    	<p>
    	                    		> java -jar update4j-1.4.3.jar --remote http://jsoagger.tech/jsoagger/demo/app/mobile.xml
    	                    	</p>
    	                    </div>
	                	</Col>
                    </Row>
                    
                    <Row><div className="w-spacer"/></Row>
	                <Row><Col xs="12" md="12" lg="12" xl="12"><hr/></Col></Row>
	                <Row><div className="w-spacer"/></Row>	     
	                
	                <Row>
						<Col xs="12" md="12" lg="12" xl="12">
							<div>
	                            {title3mark}
	                        </div>
						</Col>
					</Row>
					<Row>
						<Col xs="12" md="12" lg="12" xl="12">
							<div>
	                            <p>Web site: <u><a href="http://www.jsoagger.tech">http://www.jsoagger.tech</a></u></p>
	                            <p>Github: <u><a href="https://www.github.com/jsoagger">https://www.github.com/jsoagger</a></u></p>
	                        </div>
						</Col>
					</Row>
					<Row><div className="w-spacer"/></Row>
            </div>
        );
    }
}

export default HomeDemoDesktop;
