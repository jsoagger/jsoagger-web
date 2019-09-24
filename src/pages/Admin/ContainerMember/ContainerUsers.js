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
import SearchResult from './SearchUsersResult.js'
import ManageContainerUsers from './ManageContainerUsers.js'
import SearchUsers from './SearchUsers.js'
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
 * Container registered users
 */
class ContainerUsers extends Component {
    render() {
        return (
            <React.Fragment>
                <Row>
                <Col xs="12" lg="2" xl="2"></Col>
                <Col xs="12" lg="8" xl="8">
                        <div id="jsoagger-search-member-concent-area">
                            <ManageContainerUsers {...this.props}/>
                        </div>
                    </Col>
                    <Col xs="12" lg="2" xl="2"></Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ContainerUsers);

