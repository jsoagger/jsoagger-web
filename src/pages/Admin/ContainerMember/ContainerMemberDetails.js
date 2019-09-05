import React, { Component } from 'react';
import { 
    CardDeck,
    Row,
    Col,
} from 'reactstrap';
import PeopleDetails from 'pages/Client/People/PeopleDetails' 
/**
 * Container members details
 */
class ContainerMemberDetails extends Component {
	render() {
		return (
			<div className="flex-row align-items-center">
				<Row>
					<Col xs="0" sm="0" md="1" lg="1" xl="1"></Col>
					<Col xs="12" sm="12" md="10" lg="10" xl="10">
						<PeopleDetails accountId={this.props.match.params.accountId} 
							peopleName='name'/>
		            </Col>
		            <Col xs="0" sm="0" md="1" lg="1" xl="1"></Col>
	            </Row>
	        </div>
		)
	}
}

export default ContainerMemberDetails;

