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
/**
 * Search result
 */
class SearchResult extends Component {
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
                        <Card>
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
        		let owner = user.links.owner
        		let gender = owner.gender 
        		const link = LinkTo(user)
        		
        		var cardImage
        		if(gender === 0){
        			cardImage = (
    					<CardImg  src={'../../assets/img/avatars/1.png'} 
    						className="img-avatar"/>
        			)
        		}
        		else {
        			cardImage = (
    					<CardImg  src={'../../assets/img/avatars/3.png'} 
    						className="img-avatar"/>
            		)
        		}
        		
        		users.push(
        			<Col xs="12" sm="6" md="4">
	        			<Card>
		                    {cardImage}
		                    <CardBlock>
		                      <CardTitle><p align="center"><h5>{owner.firstName}</h5></p></CardTitle>
		                      <CardTitle><p align="center"><h4>{owner.lastName}</h4></p></CardTitle>
		                      <p align="center">{link}</p> 
		                    </CardBlock>
		                </Card>
	                </Col>
        		)
        	})
        	
            display = (<Row>{users}</Row>)
            return (display)
       }
    }
}

const LinkTo = (item) => {
	const link = `containerMembers/${item.attributes.id}`
	return (
		<React.Fragment>
			<Row>
				<Col>
					<Button block color="primary">ADD</Button>
				</Col>
			</Row>
			<Row><Col>&nbsp;</Col></Row>
			<Row>
				<Col>
					<Button block color="primary">REMOVE</Button>
				</Col>
			</Row>
		</React.Fragment>
	)
}

export default SearchResult;

