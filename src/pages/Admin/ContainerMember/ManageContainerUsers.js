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
import SearchUsersResult from './SearchUsersResult.js'
import SearchMembers from './SearchUsers.js'

/**
 * Users are people register in application whatever his container
 * access privileges.
 */
class ManageContainerUsers extends Component {

	constructor(props){
		super(props)
		this.renderResult = this.renderResult.bind(this)
	}
	
	renderResult(response){
		ReactDOM.render(
				<SearchUsersResult results={response}/>, document.getElementById('NavigateMembers_SearchUsersResults'));
	}
	
    render() {
        var isFirstLoad = this.props.loading;
        var loading = (
            <div className="animated fadeIn pt-1 text-center">I am loading...</div>
        )

        var defaultView = <div>
                <SearchMembers {...this.props} 
                	title="Manager users"  
                	updateArea='NavigateMembers_SearchUsersResults'
                	renderResult={this.renderResult}
                	filterByType={true}/>
            	<div id="NavigateMembers_SearchUsersResults">
            		<SearchUsersResult {...this.props}/>
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


export default ManageContainerUsers


