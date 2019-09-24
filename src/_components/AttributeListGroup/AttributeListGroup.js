import React, { Component } from 'react';
import {Button, Label, Card, CardBody, Table, Col, Input, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import {commons} from '../../_helpers/commons.js';
import AttributeArrayGroup from './AttributeArrayGroup.js';
import AttributeArrayObjectGroup from './AttributeArrayObjectGroup.js';

const propTypes = {
  data: PropTypes.object,
  attributesListConfig: PropTypes.object.isRequired,
  cardClassName: PropTypes.string,
  orientation: PropTypes.string,
  displayHeader: PropTypes.bool,
  actions: PropTypes.func,
};

const defaultProps = {
    cardClassName: "jsoa-borderless jsoagger-form-card",
    orientation: "horizontal",
    displayHeader: false
};

/**
 * Displays a list of attributes grouped in table.
 */
class AttributeListGroup extends Component {

	constructor(props){
		super(props)
		this.state = {
			formsState: [],
			editingFormData: props.data == undefined ? '{}' : props.data,
			initialData: props.data == undefined ? '{}' : props.data,
		}
		
		this.standardFooterActions = this.standardFooterActions.bind(this)
		this.standardEditForm = this.standardEditForm.bind(this)
		this.standardSaveForm = this.standardSaveForm.bind(this)
		this.standardResetForm = this.standardResetForm.bind(this)
		this.handleFormChange = this.handleFormChange.bind(this)
		this.isEditing = this.isEditing.bind(this)
	}

	handleFormChange(event){
		var { editingFormData } = this.state
		editingFormData[event.target.name] = event.target.value
		this.setState({
			editingFormData: editingFormData,
		})
	}
	
	setFormDataValue(key, value){
		var { editingFormData } = this.state
		editingFormData[key] = value
		this.setState({
			editingFormData: editingFormData,
		})
	}

	standardEditForm(e, token){
		e.preventDefault()
		var formsState = this.state.formsState.slice()
		formsState[token] = 'edit'
		
		if(this.state.editingFormData == undefined){
			this.setState({
				formsState: formsState,
				editingFormData: {}
			})
		}
		else {
			this.setState({
				formsState: formsState,
			})
		}
		
	}
	
	standardSaveForm(e, token, attributesListConfig){
		e.preventDefault()
		var formsState = this.state.formsState.slice()
		formsState[token] = 'view'
		var formData = JSON.parse(JSON.stringify(this.state.editingFormData))
		this.setState({
			formsState: formsState,
			//initialData: formData
		})

		// THIS METHOD SHOULD COLLECT FORM DATA
		// SEND REDUX ACTION EVENT TO INFORM FORM
		// OWNER TO UPDATE DATA IN REMOTE API
		// THE OWNER WILL THE UPDATE STATE AND VIEW WILL BE
		// REFRESHED
		attributesListConfig.onSubmit(formData)
	}
	
	standardResetForm(e, token){
		e.preventDefault(token)
		var formsState = this.state.formsState.slice()
		formsState[token] = 'view'
		var formData = JSON.parse(JSON.stringify(this.state.initialData))
		this.setState({
			formsState: formsState,
			editingFormData: formData
		})
		
		var form = document.getElementById(token.split('_view')[0]);
		if(form) form.reset();
	}

	standardFooterActions = (formId, attributesListConfig) => {
		var token = formId + "_view"
		if(this.state.formsState[token] === 'edit' || this.props.formMode === 'create_object') {
			if(this.props.formMode === 'create_object'){
				return (
					<React.Fragment>
						<Col lg="4"></Col>
		                <Col lg="4" className="float-right">
			                <Button block color="primary" onClick={(e) => this.standardSaveForm(e, token, attributesListConfig)}> SAVE</Button>
			            </Col>
			            <Col lg="4"></Col>
			        </React.Fragment>
				)
			} 
			else {
				return (
					<React.Fragment>
						<Col lg="6"></Col>
						<Col lg="6" className="text-center">
							<Button className="ml-auto" size="md" color="light" onClick={(e) => this.standardSaveForm(e, token, attributesListConfig)}> SAVE</Button>
		                	<Button className="ml-auto" size="md" color="light" onClick={(e) => this.standardResetForm(e, token)}> CANCEL</Button>
		                </Col>
			        </React.Fragment>
				)
			}
		}
		else if(!this.state.formsState[token] || this.state.formsState[token] === 'view') {
			if(this.props.canEdit === true){
				return (
					<React.Fragment>
							<Col lg="9"></Col>
				            <Col lg="3" className="float-right">
				                <Button size="md" color="light" onClick={(e) => this.standardEditForm(e, token)}><i className="fa fa-pencil"></i> EDIT</Button>
				            </Col>
			        </React.Fragment>
				)
			}
			else {
				return <hr/>
			}
		}
	}

    processGroup(attributes) {
        const attrs = [];
        if(attributes && attributes.length > 0){
        attributes.map(attribute => {
        	if(attribute.type && (attribute.type === 'custom')) {
        		if(attribute.displayComponent){
        			attrs.push(attribute.displayComponent())	
        		}
        	}
        	else if(attribute.type && (attribute.type === 'object')) {
        		attrs.push(
                    <React.Fragment>
                        <tr className="noBorder">
                        	<td colSpan="3">
                        		<div className="spacer-20"></div>
                        	</td>
                        </tr>  
                        <tr className="noBorder">
                            <td colSpan="3" className="paddingless">
                                <Row>
                                    <Col lg="8">
                                        <label className="jsoagger-form-title-level-1">{attribute.title}</label>
                                    </Col>
                                    <Col lg="4">
                                        <div className="float-right">
                                            {headerActions}
                                        </div>
                                    </Col> 
                                </Row>
                            </td>
                        </tr>
                        <tr>
                        </tr>  
                    </React.Fragment>  
                )
                attribute.items.map(a => {
                		attrs.push(this.simpleHRow(a));
                })
        	}
        	else if(attribute.type && (attribute.type === 'objectarray' 
            	|| attribute.type === 'editableLabelObjectarray')) {

                // for objectarray form, title is computed on this level
                // when it does not repeated on each bloc of array.
                // If need to repeat it, use arrayTitleProvider
                var headerActions;
                if(attribute.headerActions) headerActions = attribute.headerActions();
                var title =  attribute.title;
                if(attribute.title || attribute.titleProvider){
                    title = attribute.title ? attribute.title : attribute.titleProvider()
                    attrs.push(
                        <React.Fragment>
                            <tr>
                                <td colSpan="3" className="paddingless">
                                    <div className="objectarray-top-title"></div>
                                </td>
                            </tr>  
                            <tr>
                                <td colSpan="3" className="paddingless">
                                    <Row>
                                        <Col lg="8">
                                            <label className="jsoagger-form-title-level-1">{title}</label>
                                        </Col>
                                        <Col lg="4">
                                            <div className="float-right">
                                                {headerActions}
                                            </div>
                                        </Col> 
                                    </Row>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="paddingless">
                                    <div className="objectarray-bottom-title"></div>
                                </td>
                            </tr>  
                        </React.Fragment>  
                    )
                }
                attrs.push(this.simpleArrayRow(attribute));
            }
            else {
                var rowActions = attribute.rowActions ? attribute.rowActions() : "";
                if("horizontal" === this.props.orientation) {
                    if(rowActions){
                        attrs.push(this.actionableHRow(attribute));
                    }
                    else {
                        attrs.push(this.simpleHRow(attribute));
                    }
                }
                else {
                    attrs.push(this.simpleVRow(attribute))
                }
            }
        });
        }

        return attrs;
    }

    processHeader(){
        var header, headerActions;
        if(this.props.displayHeader === 'true' && this.props.attributesListConfig.headerActions) {
            headerActions = this.props.attributesListConfig.headerActions()
        }

        if(this.props.displayHeader === 'true' && this.props.attributesListConfig.title) {
            header = <tr>
                <td colSpan="3" className="paddingless">
                    <Row>
                        <Col lg="8">
                            <h3 className="jsoagger-form-title-level-0">{this.props.attributesListConfig.title.toUpperCase()}</h3>
                        </Col>
                        <Col lg="4">
                            <div className="float-right">
                                {headerActions}
                            </div>
                        </Col> 
                    </Row>
                </td>
            </tr> 
        }

        if(this.props.displayHeader === 'true' && this.props.attributesListConfig.titleProvider) {
            header = <tr>
                    <td colSpan="3" className="paddingless">
                        <Row>
                            <Col lg="8">
                                <h3>{this.props.attributesListConfig.titleProvider()}</h3>
                            </Col>
                            <Col lg="4">
                                <div className="float-right">
                                    {headerActions}
                                </div>
                            </Col> 
                        </Row>
                    </td>
                </tr>  
        }
        return header;
    }

    /**
     * Attribute array ca be:
     * 1. An array of string
     * 2. An array of object
     * 
     * Array of string (stringarray) example: {email:[
     *  'toto@me.com','tata@me.com',
     * ]
     * 
     * Array of object (editableLabelObjectarray) example:
     * phones: [
     *   	{'Home phone': '33 11 123 12'},
     *   	{'Mobile phone': '32 12 123 12'},
     * ]
     * Array of object labels can be editable
     */
    simpleArrayRow(attribute) {
        const rootdata = this.state.editingFormData;
        if(attribute.type === 'objectarray' || attribute.type === 'editableLabelObjectarray') {

        	var arrayOfvalues = commons.getPropByString(rootdata, attribute.dataField);
			// in this case, the header is not repeated for each line bloc
			// we just display each row with action, unique header and footer actions
			if(attribute.type === 'editableLabelObjectarray'){
				var formId = 'formid_array_group_1'
				return <AttributeArrayGroup {...this.props} 
					canEdit={this.props.canEdit} 
					items={arrayOfvalues} 
					attribute={attribute} 
					wrapInform={formId}/>
			}
			else {
				var rows = <AttributeArrayObjectGroup {...this.props} items={arrayOfvalues} attribute={attribute}/>
            	return (
					<React.Fragment>
						<tr> 
							<td colSpan="3">
								<table width="100%">
									<tbody>{rows}</tbody>
								</table>
							</td>
						</tr>
						<tr>
							<td colSpan="3"></td>
						</tr>
					</React.Fragment>
            	)
			}
		}
	}
	
	rowActions(attribute){
		const rowActions = attribute.items.rowActions ? attribute.items.rowActions() : '';
		return 	(
			<tr>
				<td colspan="2"  align="right">{rowActions}</td>
			</tr>
		)
	}
	
    simpleVRow(attribute) {
        const data = this.state.editingFormData;
        var val = commons.getPropByString(data, attribute.dataField);
        var editor = commons.getInputType(attribute);
        return (<React.Fragment>
            <tr> 
                <td>{attribute.name}</td>
            </tr>
            <tr> 
                <td><Input type={editor} defaultValue={val} onChange={(e) => this.handleFormChange(e)} name={attribute.dataField}/></td>
            </tr>
        </React.Fragment>
        )
    }

    simpleHRow(attribute) {
		if(this.isEditing() && !attribute.readOnly){
			const data = this.state.editingFormData;
        	var val = data ? commons.getPropByString(data, attribute.dataField) : '';
			var editor = commons.getInputType(attribute);
			if("select" === editor && attribute.enumProvider){
				var options = [], enums = attribute.enumProvider()
				options.push(<option value=''>Select...</option>)
				enums.map(e => {
					var opt = <option value={e.key}>{e.value}</option>
					options.push(opt)
				})
				
				return (
					<React.Fragment>		
						<tr>
							<td width="45%"><Label className="control-label-view">{attribute.name}</Label></td>
							<td>
								<select value={val} onChange={this.handleFormChange} name={attribute.dataField}>
									{options}
						        </select>
						     </td>
			            </tr>
			        </React.Fragment>
				)
			}
			
			return (
				<React.Fragment>
					<tr> 
						<td width="45%"><Label className="control-label-view">{attribute.name}</Label></td>
						<td><Input type={editor} defaultValue={val} onChange={(e) => this.handleFormChange(e)} name={attribute.dataField}/></td>
					</tr>
				</React.Fragment>
			)
		}
		else {
			const data = this.state.initialData;
			const value = data ? commons.getPropByString(data, attribute.dataField) : '';
			const display = commons.getAttributeViewer(attribute, value)
			return (
				<React.Fragment>
					<tr> 
						<td width="45%"><Label className="control-label-view">{attribute.name}</Label></td>
						<td>{display}</td>
					</tr>
				</React.Fragment>
			)
		}
    }


    actionableHRow(attribute) {
        const data = this.state.editingFormData;
        var val = commons.getPropByString(data, attribute.dataField);
        var rowActions = attribute.rowActions ? attribute.rowActions() : "";
        var rowGroupActions = attribute.rowGroupActions ? attribute.rowGroupActions() : "";
        var editor = commons.getInputType(attribute);
        return(
            <React.Fragment>
                <tr> 
                    <td><Label className="control-label-view">{attribute.name}</Label></td>
                    <td>
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td><Input type={editor} defaultValue={val} onChange={(e) => this.handleFormChange(e)} name={attribute.dataField}/></td>
                                    <td>{rowActions}</td>
                                </tr>
                                <tr>
                                    <td>{attribute.empty}</td>
                                    <td>{rowGroupActions}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
          </React.Fragment>
        )
    }
    
    processFooter(){
        var action;
        if(this.props.attributesListConfig.footerActions){
            action = this.props.attributesListConfig.footerActions();
		}
		else if(this.props.standardFooterActions) {
			action = this.standardFooterActions(this.props.attributesListConfig.formId, 
					this.props.attributesListConfig)
		}
        return action;
	}
	
	isEditing(){
		var formId = this.props.attributesListConfig.formId;
		return this.state.formsState[formId + '_view'] === 'edit' || this.props.formMode === 'create_object' 
	}
	
	componentWillReceiveProps(props) {
		this.setState({
			editingFormData: props.data,
			initialData: props.data
		})
	}

    render() {
		const attributes = this.props.attributesListConfig.attributes;
		var attrs = this.processGroup(attributes);
		
		// TOP LEVEL COMMONE HEADER OF THE GROUP
		// IF THERE IS ONE
        var finalheader;
        if(this.props.displayHeader === 'true'){
            var header = this.processHeader();
            if(header){
                finalheader = (
                    <table width="100%">
						<tbody>
							<tr>
								<td colSpan="3" className="paddingless">
									<div className="objectarray-top-title"></div>
								</td>
							</tr> 
							{header}
							<tr>
								<td colSpan="3" className="paddingless">
									<div className="jsoagger-form-title-level-0-line"></div>
								</td>
							</tr>  
						</tbody>
                    </table>
                )
            }
        }

        // COMMONS FOOTER
        var finalFooter;
        var footer = this.processFooter();
        if(footer){
            finalFooter = (
                <div className="jsoagger-form-footer-actions">
                    <Row>{footer}</Row>
                </div>
            )
        }

        // body classname
        var bodyClassName = "jsoagger-form-cardbody";
        if(this.props.attributesListConfig.addHeaderMargin || this.props.addHeaderMargin){
            bodyClassName = "jsoagger-form-cardbody jsoagger-top-margin-20";
        }

		// IF TOP LEVEL CONFIGURATION HAS DEFINED A FORMID ATTRIBUTE,
		// MEANS THAT ALL BLOCS BELONGS TO SAME FORM
		var body
		if(this.props.attributesListConfig.formId){
			body = <Card className={this.props.cardClassName}>
				<CardBody  className="paddingless jsoagger-form-cardbody">
					<form id={this.props.attributesListConfig.formId}>
						<Table borderless={this.props.attributesListConfig.borderLess || this.isEditing()} 
							size="sm" className={bodyClassName}>
							<tbody>{attrs}</tbody>
						</Table>
					</form>
				</CardBody>
			</Card> 
		}
		else {
			body = <Card className={this.props.cardClassName}>
						<CardBody className="paddingless jsoagger-form-cardbody">
							<Table borderless={this.props.attributesListConfig.borderLess || this.isEditing()} 
								size="sm" className={bodyClassName}>
								<tbody>{attrs}</tbody>
							</Table>
						</CardBody>
					</Card> 
		}

        return (
            <div>
                {finalheader}
				{body}
                {finalFooter}
            </div>
        )
    } 
}

AttributeListGroup.propTypes = propTypes;
AttributeListGroup.defaultProps = defaultProps;


export default AttributeListGroup;


