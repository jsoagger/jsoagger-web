import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
import { commons } from '../../../_helpers/commons.js';
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
                <Card className="no-radius no-border">
                    <CardBody className="">
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
        }

        this.toggle = this.toggle.bind(this);
    }
    
    tabsConfig() {
    	const tabsConfig = {
		    tabItems: [
		        {id: '1', title: 'Overview', tabContent: (item) => summaryTabContent(item)},
		        {id: '2', title: 'Business rules', tabContent: (item) => this.businessRulesTab()},
		        {id: '3', title: 'Dynamical attributes', tabContent: () => dynAttributesTabContent()},
		    ],
		}
    	
    	return tabsConfig
	 }

    lifecycleOf(v) {
    	const d = [];
    	let { lifecycle } = this.state
    	if(lifecycle) {
	        var view = (
	        	d.push(<ContentHolderPrimaryInfo 
	        			displayHeader={false} 
	        			contentHolderFileName={this.state.lifecycle.lifecycle}
	        			contentHolderId={this.state.lifecycle.lifecycleIterationId} />)
	        )
    	}
    	else {
    		let itemName = this.state.item.attributes.displayName
    		d.push(<div><strong>{itemName}</strong> has no associated lifecycle.</div>)
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
    
    loadBusinessRule(item) {
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
	    	form['businessClass']= classname
	    	form['vetoable'] = true
	    	form['container'] = getWorkingCurrentContainerId()
	    	form['includeParentRules'] = 'false'
	    	form['businessType'] = item.attributes.id
	    	
	    	businessRulesService.getApplicableRules(form)
	    	.then(e => {
	    		if(e){
	    			this.setState({
	    				businessRulesItems: e.data,
	    				businessRulesMetaData: e.metaData
	    			})
	    		}
	    	})
    	}
    }
    
    businessRulesTab(){
    	if(this.state.businessRulesItems  
    			&& this.state.businessRulesItems.length > 0) {
    		
	    	return <TabPane tabId="2">
				<Row>
		            <Col lg="12" xl="12">
		                <DataTable 
		                	items={JSON.stringify(this.state.businessRulesItems)} 
		                	metaData={JSON.stringify(this.state.businessRulesMetaData)} 
		                    tableConfig={tableConfig} paginate={false}/> 
		            </Col>
		        </Row> 
		    </TabPane>
    	}
    	else {
    		let containerName = commons.getWorkingContainerName()
    		return <TabPane tabId="2">
	    		<Row>
		            <Col md="12">
		                <Card className="no-radius no-border">
		                    <CardBody className="">
		                        <Col md="12">
		                            <h1>No applicable rules</h1>
		                            <hr/>
		                            <p><strong>{containerName}</strong> has no applicable rules for the selected type</p>
		                        </Col>
		                    </CardBody>
		                </Card>
		            </Col>
		        </Row>
		   </TabPane>
    	}
    }
    
    /**
     * Called the first time component is rendered 
     */
    componentDidMount() {
    	if(this.props.itemId && this.props.itemId !== 'root_node') {
    		this.loadData(this.props.itemId)
    	}
    }
    /**
     * Called when component is re rendered with new props (when selecting item)
     */
    componentWillReceiveProps(nextProps){
    	if(this.props.itemId && nextProps.itemId !== 'root_node') {
    		this.loadData(nextProps.itemId)
    	}
    }
    
    loadData(itemId) {
    	typeService
		.getById(itemId)
		.then(json => {
			let type = json.data
			this.setState({
				item: json.data,
				lifecycle:null,
			})
			
			// load business rules
			this.loadBusinessRule(type)
			
	    	// load lifecycles
			typeService
			.getLifecycleOf(type.attributes.id)
			.then(json => {
				// some type may not have lifecycle
				if(json){
					this.setState({
						lifecycle: json.data ? json.data.attributes : {}
					})
				}
			}).catch(error => {
	    		this.setState({
	    			lifecycle: null
	    		})
	        });
		})
    }
    
    render() {
        const { item } = this.state;
        
        const navTabItems = [];
        const navTabContents = [];
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
        
        if(item) {
        	const businessRulesTab = this.businessRulesTab()
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
                if(id === '2' && this.state.businessRulesItems){
	                navTabContents.push( <TabPane tabId={id.toString()}>
	                    {businessRulesTab}
	                </TabPane>)
                }
                else if(id === '1'){
                	navTabContents.push( 
                		<TabPane tabId={id.toString()}>
                			<div>
                				{tabItem.tabContent(item)}
                			</div>
                			<div className='tab-pane'>
                				<AttributesGroup attributesGroup={lifecycleAttributesList} 
                	        		data={item} orientation="horizontal" displayHeader="true"/>
                			</div>
                		</TabPane>
                	)
                }
                else {
                	navTabContents.push( <TabPane tabId={id.toString()}>
                    	{tabItem.tabContent(item)}
                    </TabPane>)
                }
            });

            return (
		         <React.Fragment>
		             <Row>   
		             	<Col xs="12" md="12" lg="12" xl="12">
		                        <Nav pills>{navTabItems}</Nav>
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
		       return (<React.Fragment>loading...</React.Fragment>)}
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

function getWorkingCurrentContainerId(){
	var json = JSON.parse(localStorage.getItem('workingContainer'))
	return json.id
}


const tableConfig = {
		title: 'Applicable rules',
		tableSize: 'sm',
		paginationSize: 'sm',
		columnsConfig: [
			{ name:'', dataField: 'attributes.active', type: 'bool', displayComponent: (v) => activeOrNot(v)},
	        { name: 'Rule',  dataField: 'attributes.rule'},
	        { name: 'Event', dataField: 'attributes.event'},
		],
}

function activeOrNot(v){
	if(v){
		return <td> <i className="fa">.</i></td>
	}
	else {
		return <td> <i className="fa fa-ban fa-lg icon-red"></i></td> 
	}
}


