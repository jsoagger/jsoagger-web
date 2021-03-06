import React, { Component } from 'react';
import { 
	Row, 
	Button, 
	Col,
	ButtonGroup, 
	Jumbotron, 
	Container,
	Card, 
	CardBody
} 
from 'reactstrap';
import { 
	AttributeListGroup, 
	WorkInfo,
	PersistenceInfo,
    ContentHolderAction,
} 
from '_components';

import PropTypes from 'prop-types';
import {commons} from '../../_helpers/commons.js';
import { contactableService } from '_services/contactable.services.js';
import { toast } from 'react-toastify';

const propTypes = {
  businessId: PropTypes.string.isRequired,
};
const defaultProps = {
  businessId: ''
};
/**
 * Contactable component
 */
class Contactable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			contacts:{},
			contactMecId: '',
		}
		
		this.updateWebContactsSuccess = this.updateWebContactsSuccess.bind(this)
		this.reloadContacts = this.reloadContacts.bind(this)
	}
	/**
	 * Update the web contacts array
	 */
	updateWebContacts(formData) {
		var form = "{\"webAddresses\":".concat(JSON.stringify(formData)).concat('}')
		contactableService
		.updateWebContacts(this.props.businessId, 
				this.state.contactMecId, 
				JSON.parse(form))
		.then(response => {
			this.updateWebContactsSuccess()
		})
		.catch(error => {
			toast.error('Error occurs updating web contacts')
			console.error(error)
		});
	}
	updateWebContactsSuccess(){}
	/**
	 * Update telecom contacts array
	 */
	updateTelecomContacts(formData){
		var form = "{\"telecomAddresses\":".concat(JSON.stringify(formData)).concat('}')
		contactableService
		.updateTelecomContacts(this.props.businessId, 
				this.state.contactMecId, 
				JSON.parse(form))
		.then(response => {
			this.updateTelecomContactsSuccess()
		})
		.catch(error => {
			toast.error('Error occurs updating web contacts')
			console.error(error)
		});
	}
	updateTelecomContactsSuccess(){}
	/**
	 * Update of postal address
	 */
	updatePostalContact(formData){
		contactableService
		.updatePostalContacts(this.props.businessId, 
				this.state.contactMecId, 
				formData)
		.then(response => {
			this.updatePostalContactSuccess()
		})
		.catch(error => {
			toast.error('Error occurs updating web contacts')
			console.error(error)
		});
	}
	updatePostalContactSuccess(){
		this.reloadContacts()
	}
	/**
	 * Title of postal address section
	 */
	postalAddressTitle = (data, config) => {
		var value = commons.getPropByString(data, 'label');
		return value;
	}
	
	async componentDidMount() {
		this.reloadContacts()
    }
	
	async reloadContacts(){
		contactableService
			.getAllContacts(this.props.businessId)
			.then(response => {
				if(response && response.metaData && response.metaData.totalElements > 0){
					this.setState({
						metaData: response.metaData,
						contacts: response.data[0],
						contactMecId: response.data[0].attributes.id
					})
				}
				else {
					this.setState({
						metaData: undefined,
						contacts: undefined,
						contactMecId: undefined
					})
				}
			})
	}

    render() {
    	/**
    	 * Attributes list configuration
    	 * objectarray
    	 * stringarray
    	 */
    	const webAttributesList = {
    	    icon: 'fa fa-info float-right',
    	    formId: 'webAttributesList_form',
    	    onSubmit: (formData) => this.updateWebContacts(formData),
    	    borderLess: true,
    	    attributes: [
    	    	{
    	    		title: 'Web contacts', 
    	        	type: 'editableLabelObjectarray',
    	        	dataField: 'webAddress',
    	        	items: {
    	        		attributes: [
    	        			{name: 'Title', dataField: 'title', type: 'string'},
    	        	        {name: 'Value', dataField: 'webAddress', type: 'string'},
    	        		]
    	        	},
    	    	},
    	    ],
    	};
    	
    	/**
    	 * Attributes list configuration
    	 * objectarray
    	 * stringarray
    	 */
    	const phonesAttributesList = {
    	    icon: 'fa fa-info float-right',
    	    formId: 'phonesAttributesList_form',
    	    onSubmit: (formData) => this.updateTelecomContacts(formData),
    	    borderLess: true,
    	    attributes: [
    	    	{
    	        	title: 'Phones', 
    	        	type: 'editableLabelObjectarray',
    	        	dataField: 'telecomAddress',
    	        	items: {
    	        		attributes: [
    	            		{name: "Title", type: 'string', dataField: 'title'},
    	            		{name: "Country code", type: 'string', dataField: 'countryCode'},
    	            		{name: "Number", type: 'tel', dataField: 'telecomNumber'},
    	            	], 
    	        	},
    	    	},
    	   ],
    	};

    	const postalAddressAttributesList = {
    		title: 'Postal Address',
    		arrayTitleProvider: (data) => this.postalAddressTitle(data,this),
    		onSubmit: (formData) => this.updatePostalContact(formData),
    	    attributes: [
    	    	 // {name: 'Role', dataField: 'role', type: 'string'},
    	    	 // {name: 'Label', dataField: 'label', type: 'string'},
    	    	 // {name: 'Comment', dataField: 'comment', type: 'string'},
    	    	 // {name: 'From date', dataField: 'fromDate', type: 'string'},
    	    	 // {name: 'Thru date', dataField: 'thruDate', type: 'string'},
	    		 
		    	 {name: 'Street', dataField: 'address1', type: 'string'},
		    	 {name: '(Street)', dataField: 'address2', type: 'string'},
		    	 {name: '(Street)', dataField: 'address3', type: 'string'},
		         {name: 'Code', dataField: 'postalCode', type: 'string'},
		         {name: 'City', dataField: 'city', type: 'string'},
		         {name: 'Country', dataField: 'country', type: 'string'},
    	    ],
    	}

    	console.log(JSON.stringify(this.state))
    	
    	if(this.state.contacts && this.state.contacts.attributes){
	        return(
	            <React.Fragment>
	                <div>
	                	<AttributeListGroup {...this.props} 
	                		attributesListConfig={webAttributesList} 
	                		data={this.state.contacts.attributes}
	                		canEdit={this.props.canEdit}
	                		firstRowLabel='false'
	                		newObjectFormData={newWebFormData}/>
	                	
	                	<AttributeListGroup {...this.props} 
	                		attributesListConfig={phonesAttributesList} 
	                		data={this.state.contacts.attributes} 
	                		firstRowLabel='true' 
	                		canEdit={this.props.canEdit}
	                		newObjectFormData={newPhoneFormData}/>
	                    
	                	<AttributeListGroup {...this.props} 
	                		attributesListConfig={postalAddressAttributesList} 
	                		data={this.state.contacts.attributes.postalAddress} 
	                    	displayHeader='true'
	                    	canEdit={this.props.canEdit}
	                    	standardFooterActions="true"
	                    	newObjectFormData={newPostalAddressFormData}/>
	                </div>
	            </React.Fragment>
	        )
    	}
    	else {
    		return(
	            <div>No content</div>
	        )
    	}
	}
}

 
const newWebFormData = {
		'label':'', 'value': ''
}
const newPhoneFormData = {
		'label':'', 'number': '', 'country': ''
}
const newPostalAddressFormData = {
		'id':'', 'label': 'New postal address','street': '', 'code':'', 'county': ''
}

const postalAddressUIConfig = {
		'role': {
			'enumKey' : 'contactMechanismRole',
			'ui:widget': 'select'
		},
		'country': {
			'enumLoader' : 'loadCountries()',
			'ui:widget': 'select'
		}
}


Contactable.propTypes = propTypes;
Contactable.defaultProps = defaultProps;


export default Contactable;

