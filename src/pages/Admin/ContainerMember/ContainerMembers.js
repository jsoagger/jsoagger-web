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
import * as actions from '_actions/actions.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ManageContainerMembers from './ManageContainerMembers.js'

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
    render() {
        return (
            <React.Fragment>
                <Row>
                <Col xs="12" lg="2" xl="2"></Col>
                <Col xs="12" lg="8" xl="8">
                        <div id="jsoagger-search-member-concent-area">
                            <ManageContainerMembers {...this.props}/>
                        </div>
                    </Col>
                    <Col xs="12" lg="2" xl="2"></Col>
                </Row>
            </React.Fragment>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ContainerMembers);

