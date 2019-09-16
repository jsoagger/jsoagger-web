import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Container, Col, Row, Label, Input, Card,CardTitle, CardHeader, CardText, FormGroup, CardBody } from 'reactstrap';
import { DataTable } from '../../../_components';
import BusinessClassAndTypeSelect from '_components/BusinessClassAndTypeSelect';
import BusinessEventSelectInput from '_components/BusinessClassAndTypeSelect/BusinessEventSelectInput.js';
import { businessRulesService } from '_services/business.rule.services.js';
import * as actions from '_actions/actions.js';

const mapStateToProps = store => ({
	businessType: store.searchBusinessRules.businessType,
	businessClass: store.searchBusinessRules.businessClass,
	vetoable: store.searchBusinessRules.vetoable,
	eventKey: store.searchBusinessRules.eventKey,
	phase: store.searchBusinessRules.phase,
	rules: store.searchBusinessRules.rules,
})
const mapDispatchToProps = (disptach) => ({
	updateSearchCriterias: (e) => disptach(actions.updateBusinessRulesSearchCriterias(e)),
})

/**
 * 
 * Business rules
 */
class BusinessRules extends Component {

	constructor(props){
		super(props)
		this.state = {
			businessType: props.businessType ? props.businessType : '',
			businessClass: props.businessClass ? props.businessClass : '',
			vetoable: props.vetoable ? props.vetoable : true,
			eventKey: props.eventKey ? props.eventKey : '',
			phase: props.phase ? props.phase : '0',
			rules: props.rules ? props.rules : {},
			errors: '',
			processing: false
		}
		
		//console.log(JSON.stringify(props))
		//console.log(JSON.stringify(this.state))
		
		this.applicableRules = this.applicableRules.bind(this)
		this.updateBusinessTypeFunction = this.updateBusinessTypeFunction.bind(this)
		this.businessEventChange = this.businessEventChange.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	
	
	
	applicableRules(e){
		e.preventDefault()
		let form = new FormData()
		form['businessType'] = this.state.businessType
		form['eventKey'] = this.state.eventKey
		form['businessClass']= this.state.businessClass
		form['container']= getWorkingCurrentContainerId()
		form['phase']= this.state.phase
		form['vetoable']= this.state.vetoable
		
		if(this.state.businessClass === undefined ||
				(this.state.businessClass === '' && this.state.businessType === '')){
			this.setState({
				errors: true,
				processing: true
			})
		}
		else {
			businessRulesService.getApplicableRules(form)
			.then(e => {
				form['rules'] = e
				this.props.updateSearchCriterias(form)

				this.setState({
					rules: e,
					errors: '',
					processing: true
				})
			})
		}
	}
	
	handleChange(e){
		let value = e.target.value
		if(e.target.name === 'vetoable'){
			let vet = !this.state.vetoable
			this.setState({
				vetoable: vet
			})
		}
		else if(e.target.name === 'phase'){
			this.setState({
				phase: value
			})
		}
	}
	
	businessEventChange(e){
		this.setState({
			eventKey: e.target.value,
		})
	}
	
	updateBusinessTypeFunction(e, value){
		if(e === 'businessClass'){
			if(this.state.businessClass !== value){
				this.setState({
					businessClass: value,
				})
			}
		}
		else if(this.state.businessType !== value){
			this.setState({
				businessType: value,
			})
		}
	}
	
    displaySelectFunction(businessClass, businessTypes){
        return (
            <React.Fragment>
                <FormGroup>
                    <Row>
                        <Col md="3">
                            <Label htmlFor="select">Business class</Label>
                        </Col>
                        <Col xs="6" md="9">
                            {businessClass}
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col md="3">
                            <Label htmlFor="select">Business type</Label>
                        </Col>
                        <Col xs="6" md="9">
                            {businessTypes}
                        </Col>
                    </Row>
                </FormGroup>
            </React.Fragment>
        )
    }
    
    buildBusinessRulesTable(){
    	
    }

    render() {
      const comp = <BusinessClassAndTypeSelect {...this.props}
      	displayFunction = {this.displaySelectFunction} 
      	updateFunction = {this.updateBusinessTypeFunction}
      	defaultBusinessClass = {this.state.businessClass}
      	defaultBusinessType = {this.state.businessType}
      	mandatorySubType = {false}/>
      	
      	
      	const items = this.state.rules ? this.state.rules.data : [];
		const metaData = this.state.rules ? this.state.rules.metaData : {};
		
		var datatable
		if(items && items.length > 0) {
			datatable = (
				<Row>
                    <Col lg="1"></Col>
                    <Col lg="10" xl="10">
                        <DataTable items={JSON.stringify(items)} 
                        	metaData={JSON.stringify(metaData)} 
                            tableConfig={tableConfig} paginate={false}/> 
                    </Col>
                    <Col lg="1"></Col>
                </Row> 
			)	
		}
		else {
			if(this.state.businessClass !== '' && this.state.processing) {
				
				datatable = (
					<div>
						<Row>
							<Col lg="1"></Col>
	                        <Col xs="12" lg="10">
	                            <Card>
	                                <CardBody className="jsoagger-card-title">
	                                    <h3 className="float-left, jsoa-table-title">Applicable rules</h3>
	                                </CardBody>
	                            </Card>
	                        </Col>
	                        <Col lg="1"></Col>
	                    </Row>
	                    <Row>
	                    	<Col lg="1"></Col>
	                        <Col xs="12" lg="10">
	                            <Card>
	                                <CardBody className="jsoagger-card-title">
	                                    <h3 className="">No rules</h3>
	                                </CardBody>
	                            </Card>
	                        </Col>
	                        <Col lg="1"></Col>
	                    </Row>
	                </div>
				)
			}
		}
		
		var vetoable
		if(this.state.phase === '0'){
			vetoable = (
				<Row>
		            <Col xs="4" sm="4" md="4" lg="4" xl="4">
                        <Label htmlFor="vetoable">Vetoable</Label>
                    </Col>
                    <Col xs="2">
                        <Input checked={this.state.vetoable} type="checkbox" name="vetoable" id="vetoable" onChange={this.handleChange}/>                    	
                    </Col>
                </Row>
			)
		}
		
		var errors
		if(this.state.errors !== ''){
			errors = 'Please select a business class'
		}
		
      	return (
	        <div className="flex-row align-items-center">
	            <Container>
	                <Row className="justify-content-center">
	                	<Col md="1"></Col>
	                    <Col md="10">
	                        <Card>
	                            <CardHeader>
	                                <CardTitle><h3 className="mr-1">Business Rules</h3></CardTitle>
	                            </CardHeader>
	                            <CardBody>
				                        <Row className="justify-content-center">
				    	            		<Col xl="12">
				    	            			<div className='jsoagger-form-error'>
				    	            				<h3>{errors}</h3>
				    	            			</div>
				    	            		</Col>
				    	            	</Row>
	                                    <Row>
	                                        <Col md="12">
	                                            <Card>
	                                                <CardBody>
	                                                	<Row>
		                                                    <Col xs="12" sm="12" md="12" lg="12" xl="12">{comp}</Col>
	                                                	</Row>
	                                                    <FormGroup>
		                                                    <Row>
		                                                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
		                                                            <Label htmlFor="select">Business event</Label>
		                                                        </Col>
		                                                        <Col xs="12" sm="12" md="8" lg="12" xl="12">
		                                                            <BusinessEventSelectInput businessEventChangeFunction={this.businessEventChange}
		                                                            	defaultValue={this.state.eventKey}/>
		                                                        </Col>
		                                                    </Row>
	                                                    </FormGroup>
	                                                    <FormGroup>
		                                	                <Row>
		                                                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
		                                	                        <Label htmlFor="phase">Transaction phase</Label>
		                                	                    </Col>
		                                                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
		                                		                    <Input value={this.state.phase} type="select" name="phase" id="phase" onChange={this.handleChange}>
		                                			                    <option value="0">Before commit</option>
		                                			                    <option value="1">After success commit</option>
		                                			                    <option value="2">After rollback (commit error)</option>
		                                			                </Input>
		                                			            </Col>
		                                	                </Row>
		                                	            </FormGroup>
		                                	            <FormGroup>
		                                	            	<Row>
		                                	            	<Col xs="12" sm="12" md="12" lg="12" xl="12">{vetoable}</Col>
		                                	            	</Row>
		                                	            </FormGroup>
	                                                </CardBody>
	                                            </Card>
	                                        </Col>
	                                    </Row>
	                                    <Row>
	                                        <Col col="6"></Col>
	                                        <Col col="4" sm="8" md="4" className="float-right">
	                                            <Button block color="primary" onClick={e => this.applicableRules(e)}>Applicable Business rules</Button>
	                                        </Col>
	                                    </Row>
	                            </CardBody>
	                        </Card>
	                    </Col>
	                    <Col md="1"></Col>
	                </Row>
	                {datatable}
	            </Container>
	        </div>
    )
  }
}

const tableConfig = {
		title: 'Applicable rules',
		tableSize: 'md',
		paginationSize: 'md',
		columnsConfig: [
			{ name: 'Active', dataField: 'attributes.active', type: 'bool'},
			{ name: 'Order', dataField: 'attributes.order'},
	        { name: 'Rule', displayComponent: (v, i) => LinkTo(v,i), dataField: 'attributes.rule', defaultSortOrder: 'asc' },
	        { name: 'Event', dataField: 'attributes.event'},
	        { name: 'Business type', dataField: 'attributes.businessType'},
		],
}
/**
 * Generates href with link to details view
 */
const LinkTo = (val, item) => {
	const link = `/admin/p/businessRules/${item.attributes.id}`
	return <td><Link to={link}>{val}</Link></td>
}

export default connect(mapStateToProps, mapDispatchToProps) (BusinessRules);

function getWorkingCurrentContainerId(){
	var json = JSON.parse(localStorage.getItem('workingContainer'))
	return json.id
}

