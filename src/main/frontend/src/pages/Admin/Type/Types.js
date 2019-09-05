import React, { Component } from 'react';
import { Col, Row, ListGroup, ListGroupItem ,Button, Badge} from 'reactstrap';
import ReactDOM from 'react-dom';
import { containerService } from '_services/container.services.js';
import { typeService } from '_services/type.services.js';
import TypeDetails from './Type.js';
/**
 * Manage types
 */
class Types extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: '',	
            metaData: '',
            firstRender: true,
            selectedItemLink: '',
            dataRefreshed: false
        };
    }

    loadChildItems(e, item, divId){
        if(e) e.preventDefault();
        typeService.getSubtypeOf(item.attributes.id, true)
        .then(json => {
        	let datas = this.generateItem(1, 100, JSON.stringify(json.data))
    		ReactDOM.render(<ChildItems datas={datas}/>, document.getElementById('childItemsContainer__' + divId));
        })
    }
    
    loadParentItems(e, item, divId){
    	if(e)  e.preventDefault();
    	ReactDOM.render(<ChildItems />, document.getElementById('childItemsContainer__' + divId));
	}
    
    selectItem(e, item){
        e.preventDefault();
        const cursel = this.state.selectedItemLink;
        var source = e.target || e.srcElement;
        if(cursel) cursel.activate = false;
        source.activate = true;

        this.setState({selectedItemLink: source})
        ReactDOM.render(<TypeDetails item={JSON.stringify(item)}/>, document.getElementById('typeInfomationContent'));
    }

    componentDidMount(){
		containerService.getRootTypes(0, -1, true)
        .then(json => {
            return json;
        })
        .then(json => {
            this.setState({
                items: JSON.stringify(json.data),
                metaData: JSON.stringify(json.metaData),
                selectedItemLink: json.data[0],
            })
        })
        .catch(error => {
        	console.error(error);
        })
	}
    
    generateItem(level, index, data){
    	const items = JSON.parse(data);
    	let navs = []
        items.forEach((item) => {
        	const divid = 'load-child-items-indicator' + index++
        	const plus = <Plus divId={divid} loadChildItems={e => this.loadChildItems(e,item, divid)}
        		loadParentItems={e => this.loadParentItems(e,item, divid)}/>
        	let childcontainerclassname = 'childItemsContainer__' + divid
    		
        	navs.push(
        		<React.Fragment>
        			<div className="jsoager-treeitem white-background">
        				<div className='div-float-left'>
							<ListGroupItem  
								tag="a" href="#" onClick={(e) => this.selectItem(e, item)} action>
			            		{item.attributes.displayName}
			            	</ListGroupItem>
			            </div>
			            <div  className='div-float-right'>
	            			{plus}
	            		</div>
	            	</div>
	            	<div id={childcontainerclassname} className=''></div>
            	</React.Fragment>
            )
        })
        
        var elem = document.getElementById('typeInfomationContent');
        if(elem.children.length === 0){
            ReactDOM.render(<TypeDetails item={JSON.stringify(items[0])}/>, 
                document.getElementById('typeInfomationContent'));
        }
        
        return navs
    }

    render() {
        const rawitems = this.state.items;
        const rawmetaData = this.state.metaData;
        var display;

        if(rawmetaData) {
            const items = JSON.parse(rawitems);
            display = this.generateItem(0, 0, rawitems)
        }
      
	   return (
	        <div className="flex-row align-items-center">
                <Row>
                    <Col md="3" xl="3">
                        <div class="sidebar-nav-fixed affix jsoager-left-pane jsoager-scroll-y">
                            <ListGroup>{display}</ListGroup>
                        </div>
                    </Col>
                    <Col md="8" xl="6">
                        <div id="typeInfomationContent"></div>
                    </Col>
                </Row>
	        </div>
	    )
	  }
}

export default Types;


class Plus extends Component {
	
	constructor(props){
		super(props)
		this.state = {
			mode: 'plus'
		}
	}
	
	loadChildItems(e, item, divid){
		if(e) e.preventDefault()
		this.setState({
			mode: 'minus'
		})
		
		this.props.loadChildItems(e, item, divid)
	}
	
	loadParentItems(e, item, divid){
		if(e) e.preventDefault()
		this.setState({
			mode: 'plus'
		})
		
		this.props.loadParentItems(e, item, divid)
	}
	
	render(){
		let divid = this.props.divId
		let item = this.props.item
		
		return (
			<React.Fragment>
				<Button color='white' onClick={(e) => this.loadChildItems(e, item, divid)} 
					hidden={this.state.mode !== 'plus'} block>
					<i className="fa fa-plus icons font-lg float-right"></i>
		    	</Button>
		    	<Button color='white' onClick={(e) => this.loadParentItems(e, item, divid)} 
		    		hidden={this.state.mode === 'plus'} block>
					<i className="fa fa-minus icons font-lg float-right"></i>
		    	</Button>
	    	</React.Fragment>
		)
	}
} 

class ChildItems extends Component {
	
	render(){
		console.log(this.props.datas)
		if(this.props.datas){
			return (
				<React.Fragment>{this.props.datas}</React.Fragment>
			)
		}
		else {
			return ('')
		}
	}
}