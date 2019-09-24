import React, { Component } from 'react';
import { 
    CardDeck,
    Row,
    Col,
} from 'reactstrap';

import PeopleDetails from 'pages/Client/People/PeopleDetails'
import OrgDetails from 'pages/Client/People/OrgDetails'
import { accountService } from '_services/account.services.js';

/**
 * Container members details
 */
class ContainerMemberDetails extends Component {
	
	constructor(props){
		super(props)
		this.state= {
			loading:true
		}
	}
	
	componentDidMount(){
		accountService
		.ownerType(this.props.match.params.accountId)
		.then(response => {
			this.setState({
				loading: false,
				typeLogicalPath: response.metaData.logicalPath
			})
		})
	}
	
	render() {
		var {loading, typeLogicalPath} = this.state
		if(loading){
			return 'loading ...'
		}
		else {
			if(typeLogicalPath.startsWith('io.github.jsoagger.people.Party/Organisation')){
				return (
						<div className="flex-row align-items-center">
							<Row>
								<Col xs="0" sm="0" md="1" lg="1" xl="1"></Col>
								<Col xs="12" sm="12" md="10" lg="9" xl="9">
									<OrgDetails accountId={this.props.match.params.accountId} 
										peopleName='name'/>
					            </Col>
					            <Col xs="0" sm="0" md="1" lg="1" xl="1"></Col>
				            </Row>
				        </div>
					)
			}
			else if(typeLogicalPath.startsWith('io.github.jsoagger.people.Party/Person')){
				return (
						<div className="flex-row align-items-center">
							<Row>
								<Col xs="0" sm="0" md="1" lg="1" xl="1"></Col>
								<Col xs="12" sm="12" md="10" lg="9" xl="9">
									<PeopleDetails accountId={this.props.match.params.accountId} 
										peopleName='name'/>
					            </Col>
					            <Col xs="0" sm="0" md="1" lg="1" xl="1"></Col>
				            </Row>
				        </div>
					)
			}
			else {
				return 'Error unkown user type ...'
			}
			
		}
	}
}

export default ContainerMemberDetails;

