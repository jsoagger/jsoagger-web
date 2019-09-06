import React, { Component } from 'react';
import { 
	ButtonToolbar, 
	ButtonGroup, 
	Button, 
	Container, 
	Jumbotron, 
	Badge, 
	Card, 
	CardBody, 
	CardSubtitle, 
	CardTitle, 
	Col, 
	Pagination, 
	PaginationItem, 
	PaginationLink, 
	Row, 
	Table   
} 
from 'reactstrap'
import PropTypes from 'prop-types'
import FileSaver from 'file-saver'
import {contentHolderService} from '_services/contentHolder.services.js'
import ContentFileSelector from './ContentFileSelector.js'

const propTypes = {
	contentHolderId: PropTypes.string.isRequired,
	canDelete: PropTypes.bool,
	canUpdload: PropTypes.bool,
	canDownload: PropTypes.bool,
	canView: PropTypes.bool,
}

const defaultProps = {
	canDelete: false,
	canUpdload: true,
	canDownload: true,
	canView: true,
}
/**
 * Download/Upload, view content action on a content holder
 */
class ContentHolderPrimaryAction extends Component {
	
	constructor(props){
		super(props)
		this.downloadPrimaryContent = this.downloadPrimaryContent.bind(this)
		this.viewPrimaryContent = this.viewPrimaryContent.bind(this)
		this.onChangeFile = this.onChangeFile.bind(this)
	}
	
	onChangeFile(e) {
		e.preventDefault()
		var file = e.target.files[0]
		var formData = new FormData()
		formData.append('file', file)
		contentHolderService
		.setPrimaryContentFile(this.props.contentHolderId, formData)
		.then( response => {
			console.log('Response : ' + JSON.stringify(response))
		})
	}
	
	/**
	 * Download the primary content
	 */
	downloadPrimaryContent(e){
		e.preventDefault()
		contentHolderService
		.downloadPrimaryContentBlob(this.props.contentHolderId)
		.then( blob => {
			FileSaver.saveAs(blob, 'primary.txt');
		})
	}
	/**
	 * View the primary content
	 */
	viewPrimaryContent(e){
		e.preventDefault()
		contentHolderService
		.downloadPrimaryContent(this.props.contentHolderId)
		.then( response => {
			var blob = new Blob([response], { type: 'text/plain' });
			var blobUrl = URL.createObjectURL(blob);
			var w = window.open(blobUrl)
		})
	}
	/**
	 * 
	 */
	render(){
		const canUpload = this.props.canUpload ? this.props.canUpload : false
		if(canUpload){
			return (
	            <React.Fragment>
		            <ButtonToolbar>
						<ButtonGroup>
							<Button onClick={this.viewPrimaryContent} hidden={!this.props.canView}><i className="fa fa-file fa-md"></i></Button>
							<ContentFileSelector hidden={!this.props.canUpdload} onChangeFile={this.onChangeFile}/>
							<Button onClick={this.downloadPrimaryContent} hidden={!this.props.canDownload}><i className="fa fa-download fa-md"></i></Button>
						</ButtonGroup>
			            <div>&nbsp;</div>
			        </ButtonToolbar> 
	            </React.Fragment>
			)
		}
		else {
			return (
	            <React.Fragment>
		            <ButtonToolbar>
						<ButtonGroup>
							<Button onClick={this.viewPrimaryContent} hidden={!this.props.canView}><i className="fa fa-file fa-md"></i></Button>
							<Button onClick={this.downloadPrimaryContent} hidden={!this.props.canDownload}><i className="fa fa-download fa-md"></i></Button>
						</ButtonGroup>
			            <div>&nbsp;</div>
			        </ButtonToolbar> 
	            </React.Fragment>
			)
		}
		
	}
}

ContentHolderPrimaryAction.propTypes = propTypes;
ContentHolderPrimaryAction.defaultProps = defaultProps;

export default ContentHolderPrimaryAction;

