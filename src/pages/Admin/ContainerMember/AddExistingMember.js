import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { 
    Container, Col, 
    Row, 
    Input, 
} from 'reactstrap';
import SearchMembers from './SearchMembers.js'
import ReactDOM from 'react-dom';
import AddExistingMemberResult from './AddExistingMemberResult.js'
/**
 * 
 */
class AddExistingMember extends Component {
	constructor(props){
		super(props)
		this.renderResult = this.renderResult.bind(this)
	}
	
	renderResult(response){
		ReactDOM.render(
				<AddExistingMemberResult results={response}/>, 
					document.getElementById('NavigateMembers_searchResults'));
	}
	
    render() {
        return ( 
            <div>
                <SearchMembers {...this.props} 
                	updateArea='NavigateMembers_searchResults' 
                	title="Manage members"
                	renderResult={this.renderResult}/>
                <div id="NavigateMembers_searchResults">
                	<AddExistingMemberResult {...this.props}/>
               </div>
           </div>
        )
    }
}

export default AddExistingMember

