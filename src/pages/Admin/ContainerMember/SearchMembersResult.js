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
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import rootTypeManaged from 'pages/Admin/Type/_typesManaged.js';
import BusinessClassAndTypeSelect from '_components/BusinessClassAndTypeSelect';
/**
 * Result for search members
 */
class SearchMembersResult extends Component {
	
	constructor(props){
		super(props)
	}
	
    render() {
    	let pageElements = this.props.results && this.props.results.metaData ? this.props.results.metaData.pageElements : 0
    	 var display
         if(pageElements === undefined || pageElements < 1) {
            display = (
                <Row>
                    <Col md="12">
                        <Card className="no-radius">
                            <CardBody>
                                <div id="containerMembersArea">
                                    <p>(0) MEMBER(S) FOUND</p>
                                    <CardText>Members of current (and parent) container.</CardText>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            )
            
            return (display)
         }
         else {
        	 let users = []
        	 this.props.results.data.map(user => {
        		var owner = user.links.owner,
        			gender = owner.gender,
        			cardImage,
        			type = user.businessType.logicalPath;
        		
        		
    			// render people
	        	if(type.startsWith('io.github.jsoagger.people.Party/Person/')){
	        		const link = LinkToPerson(user)
	        		
	        		var cardImage
	        		if(gender === 0){
	        			cardImage = (
	    					<CardImg  src={'../../assets/img/avatars/1.png'} 
	    						className="img-avatar-md"/>
	        			)
	        		}
	        		else {
	        			cardImage = (
	    					<CardImg  src={'../../assets/img/avatars/3.png'} 
	    						className="img-avatar-md"/>
	            		)
	        		}
	        		
	        		users.push(
	        			<Col xs="6" sm="6" md="4">
		        			<Card className="user-search-result-card">
		        				<div className="user-search-result-card-avatar-ctnr">
		        				{cardImage}
		        				</div>
			                    <CardBlock>
			                      <p align="center">{link}</p> 
			                    </CardBlock>
			                </Card>
		                </Col>
	        		)
	        	}
	        	
	        	// render orgs
	        	else if(type.startsWith('io.github.jsoagger.people.Party/Organisation/')){
	        		const link = LinkToOrg(user)
	        		
	        		var cardImage = (
	    					<CardImg  src={'../../assets/img/favicon.png'} 
	    						className="img-avatar-md"/>
	        		)
	        		users.push(
	        			<Col xs="6" sm="6" md="4">
		        			<Card className="user-search-result-card">
		        				<div className="user-search-result-card-avatar-ctnr">
		        				{cardImage}
		        				</div>
			                    <CardBlock>
			                      <p align="center">{link}</p> 
			                    </CardBlock>
			                </Card>
		                </Col>
	        		)
	        	}
        	})
            display = (<Row>{users}</Row>)
            return (display)
       }
    }
}

const LinkToPerson = (item) => {
	const link = `/admin/p/manageUsers/details/${item.attributes.id}`
	return (
		<p align="center">
			<HashRouter >
				<Link to={link} className="btn-square"><h5>{item.links.owner.firstName}</h5></Link>
				<Link to={link} className="btn-square"><h4>{item.links.owner.lastName}</h4></Link>
			</HashRouter>
		</p>
	) 
}

const LinkToOrg = (item) => {
	const link = `/admin/p/manageUsers/details/${item.attributes.id}`
	return (
		<p align="center">
			<HashRouter >
				<Link to={link} className="btn-square"><h5>{item.links.owner.name}</h5></Link>
			</HashRouter>
		</p>
	) 
}

export default SearchMembersResult;

