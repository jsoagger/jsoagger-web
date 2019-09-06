import React, { Component } from 'react';
import { 
    Col, InputGroup,
    InputGroupAddon, 
    Row, 
    Input, Card, 
    CardHeader, 
    FormGroup, CardBody, 
    Button 
} from 'reactstrap';
import PropTypes from 'prop-types';
import { typeService } from '_services/type.services.js';
import rootTypeManaged from 'pages/Admin/Type/_typesManaged.js';

const propTypes = {
  displayFunction: PropTypes.func,
}

const defaultProps = {};
var defaultClassRootType
/**
 * Displays two select:
 * 1. One to select business classes
 * 2. One to select business type
 * 
 * Both items are linked and auto update
 * 
 */
class BusinessClassAndTypeSelect extends Component {
    
    constructor(props){
        super(props);
        var rootBusinessClasses = []
        
        if(props.rootType) {
        	rootTypeManaged.items.map(type => {
        		if(type.rootType === props.rootType){
        			rootBusinessClasses.push(type)
        		}
        	})
        }
        else {
        	rootBusinessClasses = rootTypeManaged.items
        }
        
        this.state = {
            rootBusinessType: '',
            rootBusinessTypeSubTypes: '',
            businessClasses: rootBusinessClasses,
            mandatorySubType: props.mandatorySubType ? props.mandatorySubType : true
        }
        
        this.onBusinessSubtypeChange = this.onBusinessSubtypeChange.bind(this)
    }
    /**
     * 
     */
    onBusinessSubtypeChange(value){
    	if(this.props.updateFunction) {
    		this.props.updateFunction('rootBusinessTypeSubTypes', value)
    	}
    }
    /**
     * @param {*} event 
     */
    onBusinessClassChange(event) {
        var selectedRootType = event.target.value.split('#')[0];
        
        if(this.props.updateFunction)
    		this.props.updateFunction('businessClass', event.target.value.split('#')[1])
        
        if(selectedRootType){
            typeService.getByPath(selectedRootType)
            .then(json => {
                var typeId = json.data.attributes.id;
                typeService.getSubtypeOf(typeId, true)
                .then(result => {
                    if(result.data) {
                        this.setState({rootBusinessTypeSubTypes: JSON.stringify(result.data)})
                    }
                    else {
                        this.setState({rootBusinessTypeSubTypes: ''})
                    }
                })
            })
            .catch(error => {
                this.setState({
                    rootBusinessType: '',
                    rootBusinessTypeSubTypes: '',
                });
                console.error(error);
            });
        }
    }
    /**
     * Generates a select box with list of business classes.
     */
    businessClassesSelect(){
        var value, 
        	defaultSelection = this.props.defaultBusinessClass,
        	businessClassOptions = [];
        
        this.state.businessClasses.map(item => {
        	var l = item.rootType + '#' + item.businessClass
        	if(defaultSelection && item.businessClass === defaultSelection){
        		value = l
        		defaultClassRootType = item.rootType
        	}
        	
            businessClassOptions.push(<option value={l}>{item.displayName}</option>);
        });

        var selectBusinessClass = (
            <Input value={value} type="select" name="business-class" id="business-class" onChange={this.onBusinessClassChange.bind(this)}>
                <option value="">Select a business class ...</option>
                {businessClassOptions}
            </Input>
        )
        
        return selectBusinessClass;
    }
    /**
     * When user selects a business class, fetch subtypes of that class and
     * display it into a select box.
     */
    businessTypesSelect(){
        var subtypesOptions = [];
        let index = 0
        
        if(this.state.mandatorySubType) {
        	subtypesOptions.push(<option value=''>Select a type ...</option>);
        }
        
    	if(this.state.rootBusinessTypeSubTypes){
            var subtypes = JSON.parse(this.state.rootBusinessTypeSubTypes);
            subtypes.map(item => {
                subtypesOptions.push(<option value={item.attributes.id}>{item.attributes.displayName}</option>);
                if(index === 0){
                	//this.onBusinessSubtypeChange(item.attributes.id)
                }
                index++
            });
        }
        
        var selectBusinessType = (
            <Input value={this.props.defaultBusinessType} type="select" name="business-type" id="business-type" 
            	onChange={(e) => this.onBusinessSubtypeChange(e.target.value)}>
                {subtypesOptions}
            </Input>
        )
        
        return selectBusinessType;
    }

    componentDidMount(){
    	if(this.props.defaultBusinessClass){
    		var rootType
    		rootTypeManaged.items.map(item => {
    			if(item.businessClass === this.props.defaultBusinessClass){
    				rootType = item.rootType 
    			}
    		})
    		
			typeService.getByPath(rootType)
		    .then(json => {
		        var typeId = json.data.attributes.id;
		        typeService.getSubtypeOf(typeId, true)
		        .then(result => {
		            if(result && result.data) {
		            	this.setState({rootBusinessTypeSubTypes: JSON.stringify(result.data)})
		            }
		        })
		    }) 	
    	}
    }
    
    render() {
        const businessTypesSelect= this.businessTypesSelect();
        var businessClassesSelect = this.businessClassesSelect();
        const display = this.props.displayFunction(businessClassesSelect, businessTypesSelect);
        return (
            <React.Fragment>{display}</React.Fragment>
        )
    }
}

async function toto(defaultClassRootType, subtypesOptions){
	await typeService.getByPath(defaultClassRootType)
    .then(json => {
        var typeId = json.data.attributes.id;
        typeService.getSubtypeOf(typeId, true)
        .then(result => {
            if(result && result.data) {
            	result.data.map(item => {
                    subtypesOptions.push(<option value={item.attributes.id}>{item.attributes.displayName}</option>);
                });
            }
        })
    }) 
}

BusinessClassAndTypeSelect.propTypes = propTypes;
BusinessClassAndTypeSelect.defaultProps = defaultProps;


export default BusinessClassAndTypeSelect;
