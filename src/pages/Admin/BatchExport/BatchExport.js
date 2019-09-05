import React, { Component } from 'react';
import { Jumbotron, CardHeader, FormGroup, Label, Input, Button, Card, CardBody, CardGroup, Col, Container, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import { commons } from '../../../_helpers/commons.js';
import { batchService } from '_services/batch.services.js';

const uiSchema = {
  'input.file.path': {
    'ui:widget': FileWidget,
  },
  emailscc: {
      'ui:placeholder': 'me@email.com'
  },
  'job.name': {
      'ui:readonly': true
  }
}
const FileWidget = (props) => {
  return (
    <React.Fragment>
        <FormGroup row>
            <Col xs="12" md="12">
                <Input type="file" id="file-input" name="file-input" />
                <hr/>
            </Col>
        </FormGroup>
    </React.Fragment>
  )
}
const propTypes = {
    jsonschema: PropTypes.object,
    uischema: PropTypes.object,
}
const defaultProps = {
    jsonschema:'', 
    uischema: ''
}
const log = (type) => {
	console.log.bind(console, type)
	console.log(type)
}
/**
 * 
 */
class BatchExport extends Component {

    constructor(props) {
        super(props);
        this.state = {
        	jobTypes: '',
            batching: false,
        }
        
        this.onSubmit = this.onSubmit.bind(this);
        this.home = this.home.bind(this)
    }

    onSubmit = ({formData}, e) => {
        this.setState({batching: true});
        var form = {};
        for (var key in formData) {
            if(formData[key] && formData[key] !== 'undefined') form[key] = formData[key];
        }
        
        this.collectNotifications(formData, form)
        
        form['domain'] = '/'
        form['separator.char'] = '|'
        batchService.batchExport(form)
    }
    
    collectNotifications(formdata, form){
    	if(formdata.notifications){
    		for (var key in formdata.notifications) {
                form[key] = formdata.notifications[key]
            }
    	}
    }
    
    onChange =  ({formData}, e) => {
    	let v = formData['job.type']
    	if(v !== this.state.jobType) {
            batchService.jobCommands(v)
            .then(json => {
                var d = commons.getPropByString(json, 'metaData.jobCommands');
                if(d && typeof d === 'string'){
                    this.setState({
                    	jobCommands: d,
                    	jobType: v
                    })
                } 
            });
    	}
    }
    
    home(){
        this.setState({batching: false});
    }
    
    componentDidMount(){
        const job = "standardBatchExport";
        return  batchService.getJobTypes(job)
        .then(json => {
            var d = commons.getPropByString(json, 'metaData.jobTypes');
            if(d && typeof d === 'string'){
                this.setState({jobTypes: d})
            } 
        });
    }
    /**
     * Render the view
     */
    render () {
    	var display, jobs = [], commands =[];
        if(this.state.jobTypes && this.state.jobTypes.split(',').length > 0){
            jobs = this.state.jobTypes.split(',');
        }
        
        if(this.state.jobCommands && this.state.jobCommands.split(',').length > 0){
        	commands = this.state.jobCommands.split(',');
        }
        
        const formData = {
    		'job.name': 'standardBatchExport',
    	    'mail.on.success': true,
    	    'mail.on.error': true,
    	    'mail.success.template.name': 'DEFAULT_EXPORT_EMAIL_SUCCESS_TEMPLATE',
    	    'mail.error.template.name': 'DEFAULT_EXPORT_EMAIL_ERROR_TEMPLATE',
    	    'job.type': this.state.jobType
    	}
        
        const jsonschema = {
		  type: "object",
		  required: ["input.file.path", "job.name", "job.type", "export.command"],
		  properties: {
			'job.name': {type: "string", title: "Job"},
			'job.type': {type: "string", title: "Type", enum: jobs},
			'export.command': {type: "string", title: "Command", enum: commands},
			'input.file.path': {type: "string", title: "SQL file", accept: "text/plain", format: "data-url"},
			notifications: {
		        type: "object",
		        title: "Notifications",
		        properties: {
		            emailscc: {type: "string", title: "Email cc", placeholder: "me@mial.com,"},
		            'mail.on.success': {type: "boolean", title: " Email on success"},
		            'mail.on.error': {type: "boolean", title: " Email on error"},
		            'attach.discarded.file': {type: "boolean", title: " Attach discarded"},
		            'attach.log.file': {type: "boolean", title: " Attach log file"},
		            'mail.success.template.name': {type: "string", title: "Success email template"},
		            'mail.error.template.name': {type: "string", title: "Error email template"},
		        },
		    },
		  }
		}
        
        if(this.state.batching){
            display = <BacthProcessingComponent home={this.home}/>
        }
        else {
            display = <BacthExportComponent {...this.props} 
            onSubmit={this.onSubmit} 
            jsonschema={jsonschema}
            formData={formData}
            onChange={this.onChange}/>
        }

        return (
             display
        );
    }
}

class BacthProcessingComponent extends Component {

    render() {
        return (
            <div className="flex-row align-items-center">
                <Container>
                    <Row>
                        <Col xs="12" lg="12">
                            <Card>
                                <CardBody className="jsoager-card-title">
                                    <h3 className="float-left, jsoa-table-title">BATCH EXPORT</h3>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" lg="12">
                            <Jumbotron className="white-background" fluid>
                                <Container fluid className="white-background">
                                    <h3 className='display-3'>Your batch export is going on...</h3>
                                    <p className='lead'>An email will be sent to you reporting job processing result.</p>
                                    <hr className='my-2'/>
                                    <p></p>
                                    <Col md="3" >
                                        <Button block color="primary" onClick={this.props.home}>LAUNCH ANOTHER EXPORT</Button>
                                    </Col>
                                </Container>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

class BacthExportComponent extends Component {
    render() {
        return (
            <div className="flex-row align-items-center">
                <Container>
                    <Row>
                    	<Col xs="12" lg="8">
                            <Card>
                                <CardBody className="jsoager-card-title">
                                    <h3 className="float-left, jsoa-table-title">BATCH EXPORT</h3>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                    	<Col xs="12" lg="8">
                            <Card>
                                <CardHeader>
                                    <strong>Parameters</strong>
                                </CardHeader>
                                <CardBody>
                                    <Form schema={this.props.jsonschema}
                                    	onChange={this.props.onChange}
                                        uiSchema={uiSchema}
                                    	onSubmit={this.props.onSubmit}
                                        formData={this.props.formData}>
		                                <div>
		                                    <Button block type="submit" size="md" color="danger"  onClick={this.onSubmit}>EXPORT IT!</Button>
		                                </div>    
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>  
                    </Row>
                </Container>
            </div>
        )
    }
}


BatchExport.propTypes = propTypes;
BatchExport.defaultProps = defaultProps;

export default BatchExport;
