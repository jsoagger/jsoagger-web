import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { 
    Container, Col, 
    InputGroup,
    InputGroupAddon, 
    Row, 
    Label,
    InputGroupButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    ListGroupItem,
    DropdownItem,
    Input, 
    Card, 
    ListGroup, 
    CardHeader, 
    CardText, 
    FormGroup,
    CardBlock,
    CardBody, 
    Button,
    CardImg,
    CardTitle,
    CardDeck,
} from 'reactstrap';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { 
	containerService 
} from '_services/container.services.js';
import * as actions from '_actions/actions.js';
import { 
	searchService 
} from '_services/search.services.js';
import { Link } from 'react-router-dom';
import { ContainerMemberDetails } from './ContainerMemberDetails.js'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import rootTypeManaged from 'pages/Admin/Type/_typesManaged.js';
import BusinessClassAndTypeSelect from '_components/BusinessClassAndTypeSelect';
import SearchResult from './AddExistingMemberResult.js'
import ManageContainerUsers from './ManageContainerUsers.js'
import {commons} from '../../../_helpers/commons.js';
/**
 * Class for searching users.
 */
class SearchUsers extends Component {
	
    constructor(props){
        super(props);
        this.state = {
            rootBusinessType: '',
            rootBusinessTypeSubTypes: '',
            businessClasses: rootTypeManaged.items,
            searchTerm: props.searchTerm,
            searchCriteria: 'bylogin',
            filterByType: props.filterByType ? props.filterByType : false
        }
        
        this.displaySelectFunction=this.displaySelectFunction.bind(this);
        this.searchUpdated = this.searchUpdated.bind(this)
        this.updateFunction = this.updateFunction.bind(this)
        this.searchCriteria = this.searchCriteria.bind(this)
        this.renderResult = this.renderResult.bind(this)
    }
    
    searchCriteria(criteria){
    	this.setState({
    		searchCriteria: criteria
    	})
    }
    
    renderResult(response) {
    	this.props.renderResult(response)
    }
    
    searchUpdated(event){
    	var searchTerm = event.target.value,
    		workingContainerId = commons.getWorkingContainerId()
    	
    	if(searchTerm !== '') {
	    	let payload = {}
	    	payload.searchTerm = searchTerm
	    	payload.searchType = this.state.rootBusinessTypeSubTypes
	    	payload.containerId = workingContainerId
	    	
	    	if(this.props.updateSearchTerm) this.props.updateSearchTerm(payload)
	    	if(this.state.searchCriteria === 'bylogin'){
		    	searchService
	    		.searchUserByLoginLikeInWholeApplication(searchTerm, workingContainerId)
	    		.then(response => {
	    			if(this.props.updateSearchResults) this.props.updateSearchResults(response)
	    			this.renderResult(response)
	    		})
	    	}
		    else {
		    	searchService
	    		.searchUserByNameLikeInWholeApplication(searchTerm, workingContainerId)
	    		.then(response => {
	    			if(this.props.updateSearchResults) this.props.updateSearchResults(response)
	    			this.renderResult(response)
	    		})
		    }
    	}
    	else {
    		let empty = {}
    		if(this.props.updateSearchResults) this.props.updateSearchResults(empty)
    		this.renderResult(empty)	
    	}
    }
    
    displaySelectFunction(businessClass, businessTypes){
    	if(this.state.filterByType){
    		return (
				<FormGroup row>
		            <Col md="4">
		                <FormGroup>{businessClass}</FormGroup>
		            </Col>
		            <Col md="4">
		                <FormGroup>{businessTypes}</FormGroup>
		            </Col>
		        </FormGroup>
			)
    	}
        return (
        	<div></div>
        )
    }

    updateFunction(key, value){
    	if(this.state.rootBusinessTypeSubTypes !== value){
	    	this.setState ({
	    		'rootBusinessTypeSubTypes': value
	    	})
    	}
    }    

    render() {
        const comp = <BusinessClassAndTypeSelect  {...this.props}
        	rootType="io.github.jsoagger.people.Party"
        	displayFunction={this.displaySelectFunction}
        	updateFunction={this.updateFunction}/>
        const criteria = this.state.searchCriteria === 'bylogin' ? "By login" : "By name"
    	return (
    		<React.Fragment>
            <Row>
                <Col md="12" lg="12" xl="12">
                    <Card className="no-radius">
                        <CardHeader><h3>{this.props.title}</h3></CardHeader>
                        <CardBody> 
                            <FormGroup row>
                            	<Col md="12" lg="11" xl="11">
                                    <FormGroup>
                                    	<Row>
                                    		<Col md="12" lg="12" xl="12">
		                                        <InputGroup>
		                                            <Input type="text" id="input1-group2" name="input1-group2" 
		                                            	placeholder="Search for user ..."
		                                            	defaultValue={this.props.searchTerm}
		                                            	onChange={(e) => this.searchUpdated(e)}/>
		                                            <InputGroupButtonDropdown  addonType="append"
	                                                   isOpen={this.state.fourth}
	                                                   toggle={() => { this.setState({ fourth: !this.state.fourth }); }}>
							                          <DropdownToggle color="primary" caret>
							                            {criteria}
							                          </DropdownToggle>
							                          <DropdownMenu className={this.state.fourth ? 'show' : ''}>
							                            <DropdownItem onClick={e => this.searchCriteria('bylogin')}>By login like</DropdownItem>
							                            <DropdownItem onClick={e => this.searchCriteria('byname')}>By name like</DropdownItem>
							                          </DropdownMenu>
							                        </InputGroupButtonDropdown>
		                                        </InputGroup>
		                                    </Col>
	                                    </Row>
                                    </FormGroup>
                                </Col>
                            </FormGroup>
                            {comp}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <div className="spacer-20">&nbsp;</div>
            </React.Fragment>
    	)
    }
}


export default SearchUsers


