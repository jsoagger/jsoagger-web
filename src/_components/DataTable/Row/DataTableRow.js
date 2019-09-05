import React, { Component } from 'react';
import { Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {commons} from '../../../_helpers/commons.js';
import './DataTableRow.css';
import moment from 'moment'

const propTypes = {
	columns: PropTypes.array,
};

const defaultProps = {
	columns:[], 
};

/**
 * Simple Datatable Row
 */
class DataTableRow extends Component {
	
	constructor(props){
		super(props);
	}
	
	toRow(columns, item) {
		const cells = [];
		columns.map(col => {
			if(this.isDateCol(col)){
				var dateFormat = col.dateFormat;
				var field = col.dataField;
				var d = commons.getPropByString(item, field);
				const date = moment(d).format(dateFormat);
				cells.push(this.dateRow(date));
			}
			else if(this.isDisplayableCol(col)){
				var field = col.dataField;
				var val = commons.getPropByString(item, field);
				cells.push(col.displayComponent(val, item));
			}
			else {
				var field = col.dataField;
				cells.push(this.stringRow(item, field));
			}
		});
		
		return cells;
	}
	
	isDateCol(col){
		return col.dateFormat !== undefined;
	}
	
	isDisplayableCol(col) {
		return col.displayComponent !== undefined;
	}
	
	dateRow(value){
		return <td>{value}</td>
	}
	
	stringRow(item, field) {
		return <td>
			{String(commons.getPropByString(item, field))}
		</td>
	}
	
	render() {
		const item = this.props.item;
		const { columns, ...attributes } = this.props;
		
	    return (
	      <React.Fragment> 
  			<tr key={item.attributes.id.toString()}>
  				{this.toRow(columns, item)}
	        </tr>
		   </React.Fragment>
	    );
	 }
}

DataTableRow.propTypes = propTypes;
DataTableRow.defaultProps = defaultProps;

export default DataTableRow;

