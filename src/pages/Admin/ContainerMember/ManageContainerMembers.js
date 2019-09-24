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
import SearchMembersResult from './SearchMembersResult.js'
import AddExistingMember from './AddExistingMember.js'
import AddExistingMemberResult from './AddExistingMemberResult.js'
/**
 * Members are people/party having access into that container.
 * When created, parties are affiliated to  /Application/Unaffiliated, they
 * do not have access to other containers. They will not appear in search result.
 */
class ManageContainerMembers extends Component {

	constructor(props){
		super(props)
		this.renderResult = this.renderResult.bind(this)
	}
	
	renderResult(response){
		ReactDOM.render(
				<AddExistingMemberResult results={response}/>, 
					document.getElementById('NavigateMembers_SearchMembersResults'));
	}
	
    render() {
        var isFirstLoad = this.props.loading;
        var loading = (
            <div className="animated fadeIn pt-1 text-center">I am loading...</div>
        )

        var defaultView = <div>
                <AddExistingMember {...this.props} 
                	title="Manage members"  
                	updateArea='NavigateMembers_SearchMembersResults'
                	renderResult={this.renderResult}
                	filterByType={true}/>

            	<div id="NavigateMembers_SearchMembersResults">
            	</div>
            </div>

        return (
            <div>
                {(() => {
                    switch (isFirstLoad) {
                    case true:   return loading;
                    default:     return defaultView;
                    }
                })()}
            </div>
        );
    }
}


export default ManageContainerMembers


