import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, ListGroup, ListGroupItem ,Button, Badge, Jumbotron, CardBody, Card, Container} from 'reactstrap';
import ReactDOM from 'react-dom';
import { containerService } from '_services/container.services.js';
import { typeService } from '_services/type.services.js';
import TypeDetails from './Type.js';
import Tree, { TreeNode } from 'rc-tree';

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
            dataRefreshed: false,
        }
    }

    selectItem(itemId){
        const cursel = this.state.selectedItemLink;
        this.setState({selectedItemLink: itemId})
        ReactDOM.render(<TypeDetails itemId={itemId}/>, document.getElementById('typeInfomationContent'));
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

    render() {
        const rawitems = this.state.items;
        const rawmetaData = this.state.metaData;
        var display;

        if(rawmetaData) {
            const items = JSON.parse(rawitems);
            display = <JSoaggerReactTree 
            	rawTreeItems={items} 
            	selectItem={(itemId) => this.selectItem(itemId)}/>
        }
      
	   return (
	        <Row>
    			<Col xs="12" sm="12" md="12" lg="4" xl="4">
    				<div className="jsoagger-left-pane jsoagger-scroll-y jsoagger-bordered">
                		{display}
                	</div>
    			</Col>
    			<Col xs="12" sm="12" md="12" lg="8" xl="8">
        			<div id="typeInfomationContent">
	                        <Card className="no-radius">
	                            <CardBody>
	                                <Jumbotron className="white-background">
	                                	<div className="text-center">
	                                        <h3 className="display-4">No item selected</h3>
	                                        <p className='lead'>Please select an item</p>
	                                    </div>    
	                                </Jumbotron>
	                            </CardBody>
	                        </Card>
				        </div>
    			</Col>
	        </Row>
	    )
	  }
}
export default Types;
/**
 * Tree implementation for JSOAGGER type manager
 */
class JSoaggerReactTree extends React.Component {
	  
	  static propTypes = {
	    keys: PropTypes.array,
	  }

	  constructor(props) {
	    super(props);
	    const keys = props.keys;
	    
	    this.state = {
	      defaultExpandedKeys: ['root_node'],
	      defaultSelectedKeys: keys,
	      defaultCheckedKeys: keys,
	      treeData: [],
	    };
	  }
	  
	  onLoadData = treeNode => {
	    return new Promise(resolve => {
	        const treeData = [...this.state.treeData];
	        const nodeKey = treeNode.props.eventKey
	        
	        this.getChildrenTreeData(treeData, nodeKey);
	        resolve();
	    });
	  }
	  
	  getChildrenTreeData(treeData, curNodeKey) {
		   if(curNodeKey !== 'root_node') {
			  const loop = (data, newChildren) => {
			    data.forEach(item => {
			      if (curNodeKey === item.key) {
			          item.children = newChildren;
			      }
			      if(item.children){
		    		loop(item.children, newChildren)
			      }
			    })
			  }
			  
			  typeService
			  	.getSubtypeOf(curNodeKey, true)
		        .then(json => {
		        	let items = json.data
		        	if(items) {
		        		let children = []
			        	items.map(i => {
							children.push({key: i.attributes.id, title: 
								i.attributes.displayName,
								isLeaf: false, 
								icon: (props) => businessIcon(props)})
						})
						loop(treeData, children);
		        		this.setState({ treeData });
		        	}
		        })
		   }
	  }
	  
	  onSelect = info => {
		  if(info.length > 0 && info[0] !== 'root_node'){
			  if(this.props.selectItem){
				  this.props.selectItem(info[0])
			  }
	  	  }
	  };
	  
	  componentDidMount(){
			containerService.getRootTypes(0, -1, true)
	        .then(json => {
	            return json;
	        })
	        .then(json => {
	        	const treedata = generateRootTreeData(json.data)
	            this.setState({
	            	treeData: treedata
	            })
	        })
	        .catch(error => {
	        	console.error(error);
	        })
			
		}
	  
	  render() {
		  let items = []
		  const { treeData } = this.state;
		  
	    const customLabel = (
	      <span className="cus-label">
	        <span>operations: </span>
	        <span style={{ color: 'blue' }} onClick={this.onEdit}>Edit</span>&nbsp;
	        <label onClick={(e) => e.stopPropagation()}>
	          <input type="checkbox" /> checked
	        </label>
	        &nbsp;
	        <span style={{ color: '#EB0000' }} onClick={this.onDel}>Delete</span>
	      </span>
	    );
		  
	    return (
	      <div style={{ margin: '20px' }}>
	        <Tree
	          	ref={this.setTreeRef}
	          	className="myCls" 
	          	showLine
	          	checkStrictly showIcon
	          	defaultExpandedKeys={this.state.defaultExpandedKeys}
	          	onExpand={this.onExpand}
	          	defaultSelectedKeys={this.state.defaultSelectedKeys}
	          	defaultCheckedKeys={this.state.defaultCheckedKeys}
	          	onSelect={this.onSelect} 
	        	onCheck={this.onCheck}
	        	loadData={this.onLoadData}
	        	treeData={treeData}>
	        </Tree>
	      </div>
	    );
	  }
	}

const generateRootTreeData = (items) => {
	var treeData = []
	var children = []
	if(items){
		items.map(i => {
			children.push({key: i.attributes.id, title: i.attributes.displayName, isLeaf: false, icon: (props) => businessIcon(props)})
		})
	}
	treeData.push({key: 'root_node', title: 'Managed Business types', children: children, icon: (props) => businessIcon(props)})
	return treeData
}

const businessIcon = (props) => {
	if(props.data.key === 'root_node') return <i className="fa fa-home fa-lg primary-icon-color"></i>
	return <i className="fa fa-cubes fa-md primary-icon-color"></i>
}


