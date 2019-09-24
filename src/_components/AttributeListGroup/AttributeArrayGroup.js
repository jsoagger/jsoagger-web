import React, { Component } from 'react';
import { 
	Button, 
	ButtonGroup,
	Input,
	Col,
	Row,
	Label,
	Table
} from 'reactstrap';
import {commons} from '../../_helpers/commons.js';
import PropTypes from 'prop-types';

const propTypes = {
	items: PropTypes.array.isRequired,
	attribute: PropTypes.array.object,
	firstRowLabel: PropTypes.bool,
	newObjectFormData: PropTypes.object.isRequired,
};

const defaultProps = {
	items: [],
	firstRowLabel: false
};
/**
 * 
 */
class AttributeArrayGroup extends Component {

	constructor(props){
		super(props);
		this.state = {
			'mode': 'view',
			'items': props.items,
			'initalItems': props.items
		}

		this.moveDown = this.moveDown.bind(this)
		this.moveUp = this.moveUp.bind(this)
		this.delete = this.delete.bind(this)
		this.save = this.save.bind(this)
		this.footerActions = this.footerActions.bind(this)
		this.add = this.add.bind(this)
		this.edit = this.edit.bind(this)
		this.cancel = this.cancel.bind(this)
		this.handleFormChange = this.handleFormChange.bind(this)
		this.isEditing = this.isEditing.bind(this)
	}

	handleFormChange(event){
		var name = event.target.name.split('_')[0]
		var index = event.target.name.split('_')[1]
		var items = this.state.items.slice();

		//console.log('change : ' + event.target.name	 + ' , ' + event.target.value)
		//console.log('index : ' + index)
		//console.log('1 : ' + JSON.stringify(items))
		//console.log('2 : ' + JSON.stringify(this.state.items))

		var d = items[index]
		d[name] = event.target.value
		this.setState({
			items: items,
		})
	}

	cancel(e){
		e.preventDefault();
		var items = this.state.initalItems.slice();
		this.setState({
			items: items,
			mode: 'view'
		})

		// THIS ACTION IS VALID ONLY IN INDIVIDUAL FORM
		// IN OTHER CASE, OT IS THE RESPONSABILITY OF THE
		// WRAPPER
		if(this.props.wrapInform){
			var form = document.getElementById(this.props.wrapInform)
			if(form) form.reset(); 
		}
	}

	save(e){
		e.preventDefault();
		var items = this.state.items.slice();
		this.setState({
			mode: 'view',
			initalItems: items
		})
		this.props.attributesListConfig.onSubmit(items)
	}

	add(e){
		e.preventDefault();
		var newItems = this.state.items.slice();
		newItems[newItems.length] = commons.clone(this.props.newObjectFormData) 
		this.setState({
			items: newItems
		})
	}

	moveUp(e, item){
		e.preventDefault();
		
		var newItems = this.state.items.slice();
		var a = newItems.indexOf(item);
		newItems.splice(a, 1);

		var newplace = a - 1;
		if(newplace < 0) {
			newItems.splice(newItems.length + 1, 0, item);
		}
		else {
			newItems.splice(newplace, 0, item);
		}
		
		this.setState({
			items: newItems,
		})
	}
	
	moveDown(e, item) {
		e.preventDefault();

		var newItems = this.state.items.slice();
		var a = newItems.indexOf(item);
		newItems.splice(a, 1);

		var newplace = a + 1;
		if(newplace === newItems.length) {
			newItems.splice(newItems.length, 0, item);
		}
		else if(newplace > newItems.length) {
			newItems.splice(0, 0, item);
		}
		else {
			newItems.splice(newplace, 0, item);
		}

		this.setState({
			items: newItems,
		})
	}

	delete(e, item){
		e.preventDefault();
		var newItems = this.state.items.slice();
		var a = newItems.indexOf(item);

		newItems.splice(a, 1);
		this.setState({
			items: newItems,
		})
	}

	edit(e){
		e.preventDefault();
		this.setState({
			mode: 'edit'
		})
	}

	isEditing(){
		return this.state.mode && this.state.mode ===  'edit'
	}

	rowActions(item, colspan){
		if(this.isEditing()){
			return (
				<React.Fragment>
					<tr>
						<td align="right" colspan={colspan ?  colspan:1}>
							<table width="100%">
								<tbody>
									<tr>
										<td align="right" colspan="2">
											<ButtonGroup>
												<Button color="light" size="xs" onClick={(e) => this.moveUp(e, item)} ><i className="fa fa-arrow-circle-up"></i></Button>
												<Button color="light" size="xs" onClick={(e) => this.moveDown(e, item)}><i className="fa fa-arrow-circle-down"></i></Button>
												<Button color="danger" size="xs" onClick={(e) => this.delete(e, item)}><i className="fa fa-trash"></i> Delete</Button>
											</ButtonGroup>
										</td>
									</tr>
								</tbody>
							</table>
						</td>
					</tr>
				</React.Fragment>
			)
		}
		else {
			return (<React.Fragment><tr></tr></React.Fragment>)
		}
	}

	footerActions() {
		if(this.isEditing()){
			return <React.Fragment>
				<Row>
					<Col lg="7"></Col>
					<Col lg="5">
						<ButtonGroup>
							<Button  color="primary" size="md" onClick={(e) => this.save(e)}>SAVE</Button>
							<Button  color="primary" size="md" onClick={(e) => this.cancel(e)}>CANCEL</Button>
							<Button size="md" color="light" onClick={(e) => this.add(e)}>ADD</Button>
						</ButtonGroup>
					</Col>
				</Row>
	        </React.Fragment>
		}
		else {
			if(this.props.canEdit === true){
				return (
						<React.Fragment>
							<Row>
								<Col lg="8"></Col>
								<Col lg="4">
									<ButtonGroup>					
										<Button size="md" color="light" onClick={(e) => this.edit(e)}><i className="fa fa-pencil"></i> EDIT</Button>
									</ButtonGroup>						
								</Col>
							</Row>
				        </React.Fragment>
				 )
			}
			else {
				return ''
			}
		}
	}

	render(){
		var rows = [];
		rows.push(
			<tr>
				<td colSpan="2"><div className="spacer-20"></div></td>
			</tr>
		);

		// if empty
		if(this.state.items && this.state.items.length === 0){
			return (
				<React.Fragment>
					<tr>
						<td>
							<div>
								<strong>This section is empty.</strong>
								<div className="spacer-20"></div>
								{this.footerActions(this.props.attribute)}
							</div>
						</td>
					</tr>
				</React.Fragment>
			)
		}

		// if having data to display
		else {
			var childRows = [], colspan = 0,  index = 0

			if(this.props.firstRowLabel === 'true'){
				this.props.attribute.items.attributes.map(rowDef => {
					var label = rowDef.name;
					childRows.push(<td><strong>{label}</strong></td>);
				});
			}
			
			this.state.items.map(data => {
				var cols = []
				colspan = 0
				this.props.attribute.items.attributes.map(rowDef => {
					colspan++
					var datakey = rowDef.dataField + "_" + index
					var value = commons.getPropByString(data, rowDef.dataField);
					var editor = commons.getInputType(rowDef);

					if(this.isEditing()){
						cols.push(
							<td><Input type={editor} defaultValue={value} name={datakey} onChange={(e) => this.handleFormChange(e)}/></td>
						);
					}
					else {
						cols.push(
							<td><Label>{value}</Label></td>
						);
					}
				});

				childRows.push(<tr>{cols}</tr>);
				childRows.push(this.rowActions(data, colspan, this.props.attribute));
				index++
			})
			
			// footer actions
			childRows.push(
				<tr>
					<td colSpan={colspan}>
						{this.footerActions(this.props.attribute)}
					</td>
				</tr>
			)

			if(this.props.wrapInform) {
				var formId = this.props.wrapInform
				return (
					<React.Fragment>
						<tr>
							<td colSpan={colspan}>
								<form id={formId}>
									<Table size="sm" borderless>
										<tbody>
											{childRows}
										</tbody>
									</Table>
								</form>
							</td>
						</tr>
					</React.Fragment>
				)
			}
			else {
				return (
					<React.Fragment>
						<tr>
							<td colSpan={colspan}>
								<Table size="sm" borderless>
									<tbody>
										{childRows}
									</tbody>
								</Table>
							</td>
						</tr>
					</React.Fragment>
				)
			}
		}
	}
}

AttributeArrayGroup.propTypes = propTypes;
AttributeArrayGroup.defaultProps = defaultProps;


/**
 * Get the first key of the json data.
 * Ex: {'dod':'toto'} => dod
 * @param {*} json 
 */
const getJsonKey = (json) => {
	for(var k in json){
		return k
	}
}
const getJsonValue = (json) => {
	for(var k in json){
		return json[k]
	}
}

export default AttributeArrayGroup;


