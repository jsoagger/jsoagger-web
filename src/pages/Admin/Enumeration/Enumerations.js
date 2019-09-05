import React, { Component } from 'react';
import JSoagerLogo from '../../../_components/JSoagerLogo';
import { connect } from 'react-redux';
import { listValuesService } from '_services/listvalues.services.js';
import {Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, ListGroup, ListGroupItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import { DataTable, ContextualMenu, ListGroupDataTable } from '../../../_components';
import * as actions from '_actions/actions.js';

const mapStateToProps = store => ({
	selectedItem: store.enumerations,
})
const mapDispatchToProps = (disptach) => ({
	updateEnumerationsSelection: (e) => disptach(actions.updateEnumerationsSelection(e)),
})
class Enumerations extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			names :[],
			selectedItem: this.props.selectedItem ? this.props.selectedItem : null,
			'en': this.props.selectedItem.fr ? this.props.selectedItem.en : [],
			'fr': this.props.selectedItem.en ? this.props.selectedItem.fr : [],
		}
		this.selectItem = this.selectItem.bind(this)
	}
	
	componentDidMount() {
		listValuesService.names()
		.then(names => {
			this.setState({
				names: names.data
			})
		})
	}
	
	 selectItem(e, item){
        e.preventDefault();
        const cursel = this.state.selectedItem;
        var source = e.target || e.srcElement;
        //if(cursel) cursel.activate = false;
        source.activate = true;
        
		var formData  = new FormData()
        formData['name'] = item

        if(source !== this.state.selectedItem) {
	        listValuesService.noLocale(formData)
			.then(names => {
				var en = [], fr = []
				names.data.map(i => {
					if(i.attributes.locale === 'en'){
						en.push(i)
					}
					else {
						fr.push(i)
					}
				})
				
				var payload = []
				payload.push(en)
				payload.push(fr)
				
				this.props.updateEnumerationsSelection(payload)
				this.setState({
					selectedItem: source,
					'en': en,
					'fr': fr,
				})
			})
        }
	 }
	 
	 render() {
		 const navs = [];
         this.state.names.forEach((item) => {
             navs.push(
                 <ListGroupItem tag="a" href="#" onClick={(e) => this.selectItem(e, item)} action>
                         {item}
                         <i className="fa fa-angle-right icons font-lg float-right"></i>
                 </ListGroupItem>
             );
         });
         
         var en, fr
         if(this.state.en && this.state.en.length > 0){
        	en = ( <DataTable items={JSON.stringify(this.state.en)}
        			tableTitle = 'English'
        			totalElements='2'
        			paginate={false}
					tableConfig={tableConfig}/>
			)
         }
         
         if(this.state.fr && this.state.fr.length > 0){
        	 fr = ( <DataTable items={JSON.stringify(this.state.fr)}
        	 	tableTitle = 'Français'
				totalElements='2'
				paginate={false}
				tableConfig={tableConfig}/>
        	 ) 
         }
         
	    return (
    		 <div className="flex-row align-items-center">
                <Row>
                    <Col md="3">
                        <div class="sidebar-nav-fixed affix jsoager-left-pane jsoager-scroll-y">
                            <ListGroup>{navs}</ListGroup>
                        </div>
                    </Col>
                    <Col md="8">
	                    <div>
	                    	<Row>
	                    		<Col md="12">{en}</Col>
	                    	</Row>
	                    	<Row>
		                    	<Col md="12">{fr}</Col>
		                    </Row>
	                    </div>
                    </Col>
                </Row>
	        </div>
	    );
	  }
}

const tableConfig = {
		tableSize: 'md',
		paginationSize: 'md',
		columnsConfig: [
			{ name: 'Displayed value',  displayComponent: (v, i) => LinkTo(v, i)},
			{ name: 'Saved value', dataField: 'attributes.savedValue', },
		    { name: 'Name', dataField: 'attributes.name' },
		    { name: 'Locale', dataField: 'attributes.locale'},
		    { displayComponent: (v, i) => angleRight(i)},
		],
}
/**
 * Generates an angle right icon
 */
const angleRight = (v, item) => {
	const link = `/admin/p/enumerations/${v.attributes.id}`
	return <td><Link to={link}><i className="fa fa-angle-right fa-lg"></i></Link></td>
}

/**
 * Generates an angle right icon
 */
const LinkTo = (v, i) => {
	const link = `/admin/p/enumerations/${i.attributes.id}`
	return <td><Link to={link}>{i.attributes.value}</Link></td>
}


export default connect(mapStateToProps, mapDispatchToProps) (Enumerations)



