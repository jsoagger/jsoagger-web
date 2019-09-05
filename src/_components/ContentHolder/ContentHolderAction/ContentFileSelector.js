import React, { Component } from 'react'
import { 
	Button, 
} 
from 'reactstrap'
/**
 * 
 */
class ContentFileSelector extends Component {
	constructor(props){
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick() {
		this.refs.fileUploader.click()
	}
	render(){
		return(
			<React.Fragment>
				<Button 
					onClick={this.handleClick}
					hidden={this.props.hidden}><i className="fa fa-upload fa-md"></i></Button>	
					<input type="file" id="file" style={{display:'none'}} 
						ref='fileUploader'
						onChange={this.props.onChangeFile}/>
			</React.Fragment>
		)
	}
}

export default ContentFileSelector

