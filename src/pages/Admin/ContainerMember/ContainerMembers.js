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
import SearchResult from './SearchMemberResult.js'
import NavigateContainerMembers from './NavigateContainerMembers.js'
import SearchMembers from './SearchMembers.js'
import AddExistingMember from './AddExistingMember.js'
import {commons} from '../../../_helpers/commons.js';

const mapStateToProps = store => ({
	searchTerm: store.searchMembers.searchTerm,
	searchBusinessClass: store.searchMembers.searchBusinessClass,
	searchBusinessType: store.searchMembers.searchBusinessType,
	results: store.searchMembers.searchResults,
})

const mapDispatchToProps = (disptach) => ({
	updateSearchTerm: (e) => disptach(actions.updateSearchMembersTerm(e)),
	updateSearchResults: (e) => disptach(actions.updateSearchResults(e)),
})

/**
 * Container members
 */
class ContainerMembers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            results: props.results ? props.results : {},
            searchTerm: props.searchTerm ? props.searchTerm : '',
        }

        this.navigateMembers = this.navigateMembers.bind(this)
        this.addMembers = this.addMembers.bind(this)
        this.updateSearchTerm = this.props.updateSearchTerm.bind(this)
        this.updateSearchResults = this.props.updateSearchResults.bind(this)
        this.register = this.register.bind(this)
    }
    /**
     * Click on link navigate members, displays the component.
     * @param {*} e 
     */
    navigateMembers(e) {
        if(e) e.preventDefault();
        ReactDOM.render(<NavigateContainerMembers {...this.props}
        	updateSearchTerm = {this.updateSearchTerm}
        	updateSearchResults = {this.updateSearchResults}
        	results={this.state.results}/>,
            document.getElementById('jsoagger-search-member-concent-area'));
    }
    /**
     * Click on the link add member, displays the page.
     * 
     * @param {*} e 
     */
    addMembers(e) {
        e.preventDefault();
        ReactDOM.render(<AddExistingMember />,
            document.getElementById('jsoagger-search-member-concent-area'));
    }
    /**
     * Register new user
     */
    register(e){
    	e.preventDefault();
    	window.location = '#/admin/p/containerMembers/register/cu'
    }
    /**
     * Load data
     */
    componentDidMount(){
		containerService.getAllMembers(0, 6, false)
        .then(json => {
        	console.log(json);
            return json;
        })
        .then(json => {
        	this.setState({
                items: json.data,
                metaData: json.metaData,
                loading: false
            })
        })
        .catch(error => {
            this.setState({loading: false})
        	console.error(error);
        });
    }
    
    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col xs="12" sm="12" md="12" lg="4" xl="4">
                        <div class="sidebar-nav-fixed affix">
                            <Row>
                                <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                    <NavigationMenu {...this.props}
                                    	register={this.register}
                                        navigateMembers={this.navigateMembers}
                                        addMembers={this.addMembers}/>
                                </Col>
                            </Row>
                            <Row><Col md="12">&nbsp;</Col></Row>
                            <Row>
	                            <Col md="12">
	                            </Col>
	                        </Row>
	                    </div>
	                </Col>
                    <Col xs="12" sm="12" md="12" lg="8" xl="8">
                        <div id="jsoagger-search-member-concent-area">
                            <NavigateContainerMembers {...this.props}/>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

class NavigationMenu extends Component {
    render() {
    	let canAddExistingMember = commons.getWorkingContainerName() !== 'Unaffiliated'
		if(canAddExistingMember){
			return (
	            <ListGroup>
	                <ListGroupItem tag="a" href="#" onClick={(e) => this.props.navigateMembers(e)}>Navigate members</ListGroupItem>
	                <ListGroupItem tag="a" href="#" onClick={(e) => this.props.addMembers(e)}>Add existing members</ListGroupItem>
	                <ListGroupItem tag="a" href="#" onClick={(e) => this.props.register(e)}>Create new member</ListGroupItem>
	            </ListGroup>
	        )
		}
		else {
			return (
	            <ListGroup>
	                <ListGroupItem tag="a" href="#" onClick={(e) => this.props.navigateMembers(e)}>Navigate members</ListGroupItem>
	                <ListGroupItem tag="a" href="#" onClick={(e) => this.props.register(e)}>Create new member</ListGroupItem>
	            </ListGroup>
	        )
		}
    }
}

class SideBarInfo extends Component {
    render() {
        return (
            <Card>
                <CardBody>
                    <CardText>Members are users that have been declared in current container</CardText>
                    <CardText>New users are located in  /Unaffiliated container.</CardText>
                    <CardText>In order to given a user access to a container, a user must be declared
                            as member of that container.
                    </CardText>
                </CardBody>
            </Card>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ContainerMembers);

