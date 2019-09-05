import React, { Component } from 'react';
import { Input} from 'reactstrap';
import { businessRulesService } from '_services/business.rule.services.js';
/**
 * Business event select input 
 */
class BusinessEventSelectInput extends Component {
    
    constructor(props) {
        super(props);
        this.state ={
            items: '',
        }
        
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount(){
        businessRulesService.getAllBusinessEvent()
        .then(json => {
        	console.log(json.metaData);
            return json;
        })
        .then(json => {
        	this.setState({
                items: JSON.stringify(json.metaData),
            })
        })
        .catch(error => {
        	console.error(error);
        });
    }
    
    onChange(e){
    	if(this.props.businessEventChangeFunction){
    		this.props.businessEventChangeFunction(e)
    	}
    }

    render() {
        const options = [];
        if(this.state.items){
            const items = JSON.parse(this.state.items);
            items.event.map(i => {
                options.push(<option value={i}>{i}</option>)
            });
        }

        return (
            <div>
                <Input value={this.props.defaultValue} type="select" name="select" id="select" onChange={this.onChange}>
                    <option value="">Any event</option>
                    {options}
                </Input>
            </div>
        )
    }
}

export default BusinessEventSelectInput;


