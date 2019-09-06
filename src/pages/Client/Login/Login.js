import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardGroup, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Form from "react-jsonschema-form";

import { loginService } from '_services/login.services.js';
import { uiSchemaService } from '_services/uischema.services.js';
import { containerService } from '_services/container.services.js';

import * as actions from '_actions/actions.js';
import logo from '../../../assets/img/brand/logo.png'
import './Login.css';

/**
 * Format is 'store.reducer.state'
 */
const mapStateToProps = store => ({
	currentUserAccount: store.currentUser.account,
	currentUserDetails: store.currentUser.details,
	currentUserSessionId: store.currentUser.session_id,
	
	userWorkingContainer: store.currentContainers.workingContainer,
	applicationContainer: store.currentContainers.applicationContainer,
});

const mapDispatchToProps = (disptach) => ({
	onlogin: (e) => disptach(actions.loginUser(e)),
	onlogout: (e) => disptach(actions.logoutUser(e)),
	setUserWorkingContainer: (e) => disptach(actions.setUserWorkingContainer(e)),
	setApplicationContainer: (e) => disptach(actions.setApplicationContainer(e)),
});

/**
 * Submit the user login.
 */
const LOGIN_JSON_SCHEMA_NAME = "login_view_jsonschema";
/**
 * ClientLoginPage component
 */
class Login extends Component {

    constructor(props) {
        super(props);
        this.logout();
        this.state = {
            submitted: false,
            loading: false,
            error: '',
            uischema: {},
            jsonschema: {}
        }
        
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.logout = this.logout.bind(this)
        this.logout = this.logout.bind(this)
        this.handleResponseError = this.handleResponseError.bind(this)
        this.lostPass = this.lostPass.bind(this)
    }
    /**
     * Submit the form
     * 
     * @param {*} formdata 
     * @param {*} e 
     */
    onSubmit(form, e){
        try {
            e.preventDefault();
            var jsonstring = JSON.stringify(form);
            var jsonobject = JSON.parse(jsonstring);
            var formData = jsonobject.formData;

            loginService.login(formData)
            .then(response => {
            	if(response.status !== 200){
            		this.handleResponseError(response)
            	}
            	else {
            		var json = response.json();
                    return json;
            	}
            })
            .then(json => {
        		this.handleLoginSuccess(json)
            })
            .catch(error => {
            	this.handleResponseError(error);
            });
        } catch(error){
            alert(error);
        }
    }
    /**
     * Logout application
     */
    logout(){
    	// dispatch core redux events
    	this.props.onlogout();
    	this.props.setUserWorkingContainer();
    	this.props.setApplicationContainer();
    	
    	loginService.logout();
        this.setState({ 
        	loading: false,
        	uischema: '', 
        	jsonschema: '' 
        })

        // clear session
        localStorage.removeItem("sessionId");
    }
    /**
     * 
     */
    handleResponseError(json){
    	this.setState({
    		error: 'Login error: Bad credentials.'
    	})
    }
    /**
     * Manages login success.
     * 
     * @param {*} json The response json 
     */
    handleLoginSuccess(json) {
    	var authPayload = {}, containerPayload = {}, appContainerPayload = {};

    	// set sessionId in order to activa client routes
    	localStorage.setItem('session_id', json.metaData.session_id);
    	localStorage.setItem('is_administrator', true);
    	
        createSessionCookie(json.metaData.session_id);
        authPayload['session_id'] = json.metaData.session_id;
        
        // user and account
        //console.debug(json.data.links.user);
        //console.debug(json.data.links.account);
        const user = json.data.links.user;
        const account = json.data.links.account;
        
    	authPayload['account'] = json.data.links.account;
        authPayload['details'] = json.data.links.user;
        this.props.onlogin(authPayload);

        // working container
        //console.debug(json.data.links.container);
        // JSON.stringify(payload)
        const workingContainer = json.data.links.container;
        containerPayload['workingContainer'] = workingContainer;
        this.props.setUserWorkingContainer(workingContainer);
        
        // application container
        const applicationContainer = json.data.links.applicationContainer;
        appContainerPayload['applicationContainer'] = applicationContainer;
        this.props.setApplicationContainer(appContainerPayload);
            
        var userAccount = JSON.parse(localStorage.getItem('user_account'))
        const active = userAccount.active 
        if(active) {    
            // redirect to homepage
            window.location.href = '#/c/home';
        }
        else {
        	// redirect to activate account page
        	let login = account.nickName
        	window.location.href = '#/c/activateAccount';
        }
    }
    /**
     * Load forms and datas
     */
    async componentDidMount(){
        const schemas = await uiSchemaService.getUISchemaByInternalName(LOGIN_JSON_SCHEMA_NAME, "web");

        console.debug("web_login_view_uischema: " + schemas.data.attributes.web_login_view_uischema);
        const uischemadecoded = atob(schemas.data.attributes.web_login_view_uischema);
        console.debug("uischemadecoded:" + uischemadecoded);
        const uischema = JSON.parse(uischemadecoded);
        console.debug("uischema decoded: " + uischemadecoded);

        const jsonschemadecoded = atob(schemas.data.attributes.jsonSchema);
        const jsonschema = JSON.parse(jsonschemadecoded);
        console.debug("jsonschema decoded: " + jsonschemadecoded);
        
    	const container = await containerService.getApplicationRootContainer();
    	localStorage.setItem('workingContainer', JSON.stringify(container.data.attributes))

        this.setState({
        	uischema:uischema, 
        	jsonschema: jsonschema
        });
    }
    /**
     * redirect to lostPass
     */
    lostPass(e){
    	e.preventDefault()
    	window.location.href = '#/lostPass';
    }
    /**
     * Render the view
     */
    render () {
        return (
             <div className="app flex-row align-items-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col md="8">
                            <CardGroup>
                                <Card className="p-4">
                                	<CardBody>
                                		<h1>Sign In</h1>
                                		<h5 className="jsoagger-form-error">{this.state.error}</h5>
                                	</CardBody>
                                    <CardBody>
                                        <Form schema={this.state.jsonschema}
                                                uiSchema={this.state.uischema}
                                                onSubmit={this.onSubmit}
                                                onError={onerror} >

                                                <Row>
                                                    <Col xs="12" xl="12" lg="12">
                                                    	<Button block type="submit" color="danger" className="px-4">Login</Button>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                	<Col xs="6" className="text-right"></Col>
	                                                <Col xs="6" className="text-right">
	                                                	<Button color="link" className="px-0" onClick={this.lostPass}>Lost password</Button>
	                                                </Col>
	                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
	                                <CardBody className="text-center">
	                                  <div>
	                                    <img src={logo} className="img-avatar" alt="JSOAGGER logo" />
	                                    <div className="flex-row align-items-center">
	                                        <p className="h3">Welcome to JSOAGGER</p>
	                                    </div>
	                                    <Link to="/register/an">
	                                      <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
	                                    </Link>
	                                  </div>
	                                </CardBody>
	                            </Card>
                            </CardGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

/**
 * Login error.
 */
const onerror = ({formData}, e) => {
    console.debug(e);
}

const createSessionCookie = (cookieValue) => {
    let date = new Date();
    date.setTime(date.getTime()+(60 * 60 * 1000));
    document.cookie =  "sid= " + cookieValue + "; expires = " + date.toGMTString();
};

export default connect(mapStateToProps, mapDispatchToProps) (Login);



