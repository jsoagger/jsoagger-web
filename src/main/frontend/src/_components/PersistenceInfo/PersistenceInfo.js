import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AttributeListGroup from '_components/AttributeListGroup';
/**
 * Default attributes list
 */
const persistenceInfoAttributesSchema = {
    items: [
        {
            title: 'Persistence infos',
            icon: 'fa fa-info float-right',
            attributes: [
                {name: 'Modified date',  dataField: 'attributes.lastModifiedDate',  dateFormat: 'd/MM/YYYY hh:mm', type: 'date'},
                {name: 'Modified By',  dataField: 'attributes.lastModifiedBy'},
                {name: 'Creation date',  dataField: 'attributes.creationDate',  dateFormat: 'd/MM/YYYY hh:mm', type: 'date'},
                {name: 'Created By',  dataField: 'attributes.createdBy'},
            ]
        },
    ],
};

const propTypes = {
    attributesSchema: PropTypes.array,
    orientation: PropTypes.string,
};

const defaultProps = {
    attributesSchema: persistenceInfoAttributesSchema,
    orientation: 'horizontal' 
};
/**
 * Persistnce informations of all entities
 */
class PersistenceInfo extends Component {
	render(){
		const schema = this.props.attributesSchema;
		const item = this.props.data;
		
		const d = [];
		schema.items.forEach(config => {
            var view = <AttributeListGroup {...this.props} attributesListConfig={config} data={item} 
             cardClassName={this.props.cardClassName}/>
	        d.push(view);
        });
        
		return (<React.Fragment>{d}</React.Fragment>)
	}
}

PersistenceInfo.propTypes = propTypes;
PersistenceInfo.defaultProps = defaultProps;

export default PersistenceInfo;

