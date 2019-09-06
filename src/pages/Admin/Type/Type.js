import React, { Component } from 'react';
import { Label, Input, Col, Row, Card,TabContent,TabPane, CardBody, Button, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { AttributeListGroup, AttributesGroup, DataTable } from '_components';
import ContentHolderPrimaryInfo from '_components/ContentHolder/ContentHolderInfo/ContentHolderPrimaryInfo.js'
import ContentHolderInfo from '_components/ContentHolder/ContentHolderInfo/ContentHolderInfo.js'
import ViewDefinition from '_components/ViewDefinition';
import rootTypeManaged from 'pages/Admin/Type/_typesManaged.js';
import { businessRulesService } from '_services/business.rule.services.js';
import { typeService } from '_services/type.services.js';

import './Types.css';

const summaryAttributesList = {
    items: [
        {
            title: 'SUMMARY',
            icon: 'fa fa-info float-right',
            updatable: false,
            actions: () => summaryActions(),
            attributes: [
                {name: 'Display name', dataField: 'attributes.displayName'},
                {name: 'Logical name', dataField: 'attributes.logicalName'},
                {name: 'Logical path', dataField: 'attributes.logicalPath'},
                {name: 'Description',  dataField: 'attributes.description'},
            ]
        },
        {
            title: 'LOCALISATION',
            icon: 'icon-globe float-right',
            updatable: true,
            actions: () => localisationActions(),
            attributes: [
                {name: 'Icon path',    dataField: 'attributes.iconPath'},
                {name: 'Icon name',    dataField: 'attributes.iconName'},
                {name: 'I18N key',   dataField: 'attributes.i18nKey'},
            ]
        },
    ],
}


const summaryActions = () => {
    return (
        <Col col="3" sm="12" md="9" className="float-right">
            <Row>
                <Col xs="12" md="4" className="float-right">
                <Button size="md" color="light" block><i className="fa fa-edit"></i>&nbsp;EDIT</Button>
                </Col>
                 <Col xs="12" md="4" className="float-right">
                <Button size="md" color="light" block><i className="fa fa-times"></i>&nbsp;CANCEL</Button>
                </Col>
                <Col xs="12" md="4" className="float-right">
                <Button size="md" color="danger" block><i className="fa fa-check"></i>&nbsp;UPDATE</Button>
                </Col>
            </Row>
		</Col>
    )
}

const localisationActions = () => {
    return (
        <Col col="3" sm="12" md="9" className="float-right">
            <Row>
                <Col xs="12" md="4" className="float-right">
                <Button size="md" color="light" block><i className="fa fa-edit"></i>&nbsp;EDIT</Button>
                </Col>
                <Col xs="12" md="4" className="float-right">
                <Button size="md" color="light" block><i className="fa fa-times"></i>&nbsp;CANCEL</Button>
                </Col>
                <Col xs="12" md="4" className="float-right">
                <Button size="md" color="danger" block><i className="fa fa-check"></i>&nbsp;UPDATE</Button>
                </Col>
            </Row>
		</Col>
    )
}

const propTypes = {
	item: PropTypes.any,
};

const defaultProps = {
	item: {}, 
};

const typeViewDefinitionTabContent = () => {
    return  (
        <TabPane tabId="3">
            <Row>
                <Col md="12">
                    <Card>
                        <CardBody>
                            <Col md="12">
                                <Label htmlFor="select">Select a view</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="select" name="select" id="select">
                                    <option value="0">Please select</option>
                                    <option value="1">Create form</option>
                                </Input>
                            </Col>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ViewDefinition />
        </TabPane>
    )
}

const summaryTabContent = (item) => {
    const d = [];
    var view = (
        <AttributesGroup attributesGroup={summaryAttributesList} 
        data={item} orientation="horizontal" displayHeader="true"/>
    )

    d.push(view);
    return <TabPane tabId="1">{d}</TabPane>   
}


const dynAttributesTabContent = () => {
    return <TabPane tabId="2"> 
        <Row>
            <Col md="12">
                <Card>
                    <CardBody>
                        <Col md="12">
                            <h1>Not implemented</h1>
                            <hr/>
                            <p>This function will be implemented in near future.</p>
                        </Col>
                    </CardBody>
                </Card>
            </Col>
        </Row>
    </TabPane>    
}


/**
 * Type info view
 */
class TypeDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            tabContent: null,
            businessRules: {}
        }

        this.toggle = this.toggle.bind(this);
    }
    
    businessRulesTabContent(){
    	var datatable = ''
    	var item = JSON.parse(this.props.item)
    	var businessRules = loadBusinessRule(item)
		if(businessRules){
			if(businessRules.items && businessRules.items.length > 0) {
				datatable = (
					<TabPane tabId="2">
						<Row>
			                <Col lg="1"></Col>
			                <Col lg="10" xl="10">
			                    <DataTable items={JSON.stringify(businessRules.items)} 
			                    	metaData={JSON.stringify(businessRules.metaData)} 
			                        tableConfig={tableConfig} paginate={false}/> 
			                </Col>
			                <Col lg="1"></Col>
			            </Row> 
		            </TabPane>
				)	
			}
		}
    	return datatable
    }
    
    tabsConfig() {
    	const tabsConfig = {
		    tabItems: [
		        {id: '1', title: 'Overview', tabContent: (item) => summaryTabContent(item)},
		        {id: '2', title: 'Business rules', tabContent: (item) => this.loadBusinessRule(item)},
		        {id: '3', title: 'Dynamical attributes', tabContent: () => dynAttributesTabContent()},
		    ],
		}
    	
    	return tabsConfig
	 }

    lifecycleOf() {
    	const d = [];
    	if(this.state.lifecycle){
	        var view = (
	        	d.push(<ContentHolderPrimaryInfo displayHeader={false} contentHolderId={this.state.lifecycle.lifecycleIterationId} />)
	        )
    	}
        return d
    }
    
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    
    async loadBusinessRule(item){
    	if(item) {
	    	const logicalName = item.attributes.logicalName
	    	const logicalPath = item.attributes.logicalPath
	    		
	    	var classname
	    	rootTypeManaged.items.map(type => {
	    		if(type.rootType === logicalPath || logicalPath.startsWith(type.rootType + '/')){
	    			classname = type.businessClass
	    		}
	    	})
	    	
	    	let form = new FormData()
	    	//form['businessType'] = logicalPath
	    	form['businessClass']= classname
	    	form['vetoable']= true
	    	form['container']= getWorkingCurrentContainerId()
	    	
	    	const response = await businessRulesService.getApplicableRules(form)
	    	.then(e => {
	    		if(e){
	    			this.setState({
	    				businessRules:{
		    				items: response.items,
		    				metaData: response.metaData
		    			}
	    			})
	    		}
	    	})
	    	
	    	var l = await response.businessRules
	    	return l
    	}
    }
    
    businessRulesTab(){
    	if(this.state.businessRulesItems){
	    	return <TabPane tabId="2">
				<Row>
		            <Col lg="12" xl="12">
		                <DataTable items={JSON.stringify(this.state.businessRulesItems)} 
		                	metaData={JSON.stringify(this.state.businessRulesMetaData)} 
		                    tableConfig={tableConfig} paginate={false}/> 
		            </Col>
		        </Row> 
		    </TabPane>
    	}
    	else {
    		return <TabPane tabId="2">
	    		<Row>
		            <Col md="12">
		                <Card>
		                    <CardBody>
		                        <Col md="12">
		                            <h1>No applicable rules</h1>
		                            <hr/>
		                            <p>No applicable rules found.</p>
		                        </Col>
		                    </CardBody>
		                </Card>
		            </Col>
		        </Row>
	    </TabPane>
    	}
    }
    
    async componentDidMount(){
    	this.loadData()
    }
    
    async componentWillReceiveProps(){
    	this.loadData()
    }
    
    async loadData(){
    	let item = this.props.item
    	if(item) {
	    	var parsed = JSON.parse(item),
	    	l = await loadBusinessRule(parsed)
	    	var items =  await l.items
	    	
	    	var lifecycle = await getLifecycleOf(parsed)
	    	var lifecycleAttributes = lifecycle.data ? lifecycle.data.attributes : {}
	    	this.setState({
				businessRulesItems: l.items,
				businessRulesMetaData: l.metaData,
				lifecycle: lifecycleAttributes
			})
    	}
    }
    
    render() {
        const item = this.props.item;
        const navTabItems = [];
        const navTabContents = [];
        const businessRulesTab = this.businessRulesTab()
        
        const lifecycleAttributesList = {
			items: [
				{
				    title: 'LIFECYCLE',
				    icon: 'icon-globe float-right',
				    updatable: false,
				    attributes: [
				    	{ displayComponent: (v) => this.lifecycleOf(v), dataField: 'attributes.logicalName', type: 'custom'},
				    ]
				}
			],
		}
        
        if(item){
            const ritm = JSON.parse(item);

            this.tabsConfig().tabItems.forEach(tabItem => {
                const id = tabItem.id;
                navTabItems.push( 
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === id.toString()})}
                            onClick={() => { this.toggle(id.toString()); }}>
                            {tabItem.title}</NavLink>
                    </NavItem>
                )
            });

            this.tabsConfig().tabItems.forEach(tabItem => {
                const id = tabItem.id;
                if(id === '2'){
	                navTabContents.push( <TabPane tabId={id.toString()}>
	                    {businessRulesTab}
	                </TabPane>)
                }
                else if(id === '1'){
                	navTabContents.push( 
                		<TabPane tabId={id.toString()}>
                			<div>
                				{tabItem.tabContent(ritm)}
                			</div>
                			<div className='tab-pane'>
                				<AttributesGroup attributesGroup={lifecycleAttributesList} 
                	        		data={ritm} orientation="horizontal" displayHeader="true"/>
                			</div>
                		</TabPane>
                	)
                }
                else {
                	navTabContents.push( <TabPane tabId={id.toString()}>
                    	{tabItem.tabContent(ritm)}
                    </TabPane>)
                }
            });

        return (
         <React.Fragment>
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardBody className="jsoagger-card-title">
                            <h3 className="float-left, jsoa-table-title">{ritm.attributes.displayName} </h3>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
             <Row>   
                 <Col xs="12" lg="12">
                        <Nav pills>
                            {navTabItems}
                        </Nav>
                        <hr/>
                        <TabContent activeTab={this.state.activeTab}>
                            {navTabContents}
                        </TabContent>
                    </Col>
            </Row>
        </React.Fragment>
    );
  }
  else {
       return (<React.Fragment>empty</React.Fragment>)}
  }
}


TypeDetails.propTypes = propTypes;
TypeDetails.defaultProps = defaultProps;

export default TypeDetails;

const getLifecycleOf = async (item) => {
	var lifecycle = {}
	if(item) {
		const response = await typeService.getLifecycleOf(item.attributes.id)
		if(response){
			lifecycle = response
		}
	}
	return lifecycle
}

const loadBusinessRule = async (item) => {
	var businessRules = {}
	if(item) {
    	const logicalName = item.attributes.logicalName
    	const logicalPath = item.attributes.logicalPath
    	
    	var classname
    	rootTypeManaged.items.map(type => {
    		if(type.rootType === logicalPath || logicalPath.startsWith(type.rootType + '/')){
    			classname = type.businessClass
    		}
    	})
    	
    	let form = new FormData()
    	//form['businessType'] = logicalPath
    	form['businessClass']= classname
    	form['vetoable']= true
    	form['container']= getWorkingCurrentContainerId()
    	
    	const response = await businessRulesService.getApplicableRules(form)
		if(response){
			businessRules.items =  await response.data
			businessRules.metaData = await response.metaData
		}
	}
	
	return businessRules
}

function getWorkingCurrentContainerId(){
	var json = JSON.parse(localStorage.getItem('workingContainer'))
	return json.id
}


const tableConfig = {
		title: 'Applicable rules',
		tableSize: 'md',
		paginationSize: 'md',
		columnsConfig: [
			{ name: 'Active', dataField: 'attributes.active', type: 'bool'},
			{ name: 'Order', dataField: 'attributes.order'},
	        { name: 'Rule',  dataField: 'attributes.rule'},
	        { name: 'Event', dataField: 'attributes.event'},
	        { name: 'Business type', dataField: 'attributes.businessType'},
		],
}

