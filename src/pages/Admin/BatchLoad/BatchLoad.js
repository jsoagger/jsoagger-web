import React, { Component } from 'react';
import { Popover, 
    PopoverHeader, 
    PopoverBody, 
    DropdownToggle, 
    Badge, 
    NavItem, Nav, 
    NavLink, 
    Jumbotron, 
    CardHeader, 
    FormGroup, Label, 
    Input, 
    Button, Card, 
    CardBody, 
    CardGroup, Col, 
    Container, Row,
    CardText 
} from 'reactstrap';
import PropTypes from 'prop-types';
import Form from 'react-jsonschema-form';
import { commons } from '../../../_helpers/commons.js';
import { batchService } from '_services/batch.services.js';
/**
 * Input files validation 
 */
function processFile(files) {
  const f = files[0];
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.readAsDataURL(f);
  });
}
/**
 * Validate max file size
 */
const validateSize = (event) => {
  let file = event.target.files[0];
  let size = 30000;
  let err = '';
  if (file.size > size) {
    err = file.type + 'is too large, please pick a smaller file\n';
    alert(err);
  }
}
/**
 * Schemas
 */
const formData = {
    job: 'standardBatchImport',
    notifications: {
        emailOnSuccess: true,
        emailOnError: true,
        attachDiscarded: true,
        attachlogFile: true,
        'email.success.template.name': 'DEFAULT_LOADER_EMAIL_SUCCESS_TEMPLATE',
        'email.error.template.name': 'DEFAULT_LOADER_EMAIL_ERROR_TEMPLATE'
    }
}
const uiSchema = {
    emailscc: {
        'ui:placeholder': 'me@email.com'
    },
    job: {
        'ui:readonly': true
    },
    type: {
        'ui:widget': 'select',
    }
}
const propTypes = {
    jsonschema: PropTypes.object,
    uischema: PropTypes.object,
}
const defaultProps = {
    jsonschema:'', 
    uischema: ''
}
const log = (type) => console.log.bind(console, type);
/**
 * Batch load class and view
 */
class BatchLoad extends Component {

    constructor(props) {
        super(props);
        this.state = {
             jobTypes: '',
             batching: false,
             notification: {},
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.home = this.home.bind(this)
    }

    onSubmit = ({formData}, e) => {
        this.setState({batching: true});
        
        // collect non undefined datas
        var form = {};
        for (var key in formData) {
            if(formData[key] && formData[key] !== 'undefined') form[key] = formData[key];
        }
        
        this.collectNotifications(formData, form)
        
        form['domain'] = '/'
        form['separator.char'] = '|'
        batchService.batchLoad(form)
    }
    
    collectNotifications(formdata, form){
    	if(formdata.notifications){
    		for (var key in formdata.notifications) {
                form[key] = formdata.notifications[key]
            }
    	}
    }

    home() {
        this.setState({batching: false});
    }

    componentDidMount(){
        const job = "standardBatchImport";
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
        var display, jobs = [];
        if(this.state.jobTypes && this.state.jobTypes.split(',').length > 0){
            jobs = this.state.jobTypes.split(',');
        }

        const batchLoadSchema = {
            type: "object",
            required: ["job.name", "job.type", "input.file.path"],
            properties: {
                'job.name': {type: "string", title: "Job", default: "standardBatchImport", readOnly: true},
                'job.type': {type: "string", title: "Type", enum: jobs},
                'input.file.path': {type: "string", title: "Input file", accept: "text/plain", format: "data-url",},
                'attachment.path': {type: "string", title: "Attachments", accept: "text/plain", format: "data-url",},
                //mappingFilePath: {type: "string", title: "Mapping file", accept: "text/plain", format: "data-url",},
                notifications: {
                    type: "object",
                    title: "Notifications",
                    properties: {
                        emailscc: {type: "string", title: "Email cc", placeholder: "me@mial.com,"},

                        'mail.on.success': {type: "boolean", title: " Email on success"},
                        'mail.on.error': {type: "boolean", title: " Email on error"},
                        'attach.discarded.file': {type: "boolean", title: " Attach discarded"},
                        'attach.log.file': {type: "boolean", title: " Attach log file"},

                        'email.success.template.name': {type: "string", title: "Success email template"},
                        'email.error.template.name': {type: "string", title: "Error email template"},
                    },
                },
            },
        };


        if(this.state.batching) {
            display = <BacthProcessingComponent home={this.home}/>
        }
        else {
            display = <BacthLoadComponent {...this.props} onSubmit={this.onSubmit}
            typesLoader={this.typesLoader} 
            batchLoadSchema={batchLoadSchema}
            batchLoadUiSchema={uiSchema}
            batchLoadData={formData}/>
        }

        return (
             display
        );
    }
}
/**
 * Processing panel
 */
class BacthProcessingComponent extends Component {

    render() {
        return (
            <div className="flex-row align-items-center">
                    <Row>
                    	<Col lg="1" md="1" xl="2"></Col>
                        <Col xs="10" lg="10" xl="10">
                            <Card>
                                <CardBody className="jsoagger-card-title">
                                    <h3 className="float-left, jsoa-table-title">BATCH LOAD</h3>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="1" md="1" xl="2"></Col>
                    </Row>
                    <Row>
	                    <Col lg="1" md="1" xl="2"></Col>
	                    <Col xs="10" lg="10" xl="10">					
                            <Jumbotron className="white-background" fluid>
                                <Container fluid className="white-background">
                                    <h3 className='display-3'>Your batch job is going on...</h3>
                                    <p className='lead'>An email will be sent to you reporting job processing result.</p>
                                    <hr className='my-2'/>
                                    <p></p>
                                    <Col md="3" >
                                        <Button block color="primary" onClick={this.props.home}>LAUNCH ANOTHER JOB</Button>
                                    </Col>
                                </Container>
                            </Jumbotron>
                        </Col>
                        <Col lg="1" md="1" xl="2"></Col>
                    </Row>
            </div>
        )
    }
}
class BacthLoadComponent extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="flex-row align-items-center">
                <Container>
                    <Row>
                    	<Col xs="12" lg="8">
                            <Card>
                                <CardBody className="jsoagger-card-title">
                                    <h3 className="float-left, jsoa-table-title">BATCH LOAD</h3>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" lg="8">
                            <Card>
                                 <CardBody>
                                        <Row>
                                         <Col xs="12" lg="12">
                                            <Form schema={this.props.batchLoadSchema}
                                                uiSchema={this.props.batchLoadUiSchema}
                                                formData={this.props.batchLoadData}
                                                onSubmit={this.props.onSubmit}
                                                onError={log("errors")}>
                                                <div>
                                                    <Button block type="submit" size="md" color="danger"  onClick={this.onSubmit}>LOAD IT!</Button>
                                                </div>    
                                            </Form>
                                         </Col>  
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}


BatchLoad.propTypes = propTypes;
BatchLoad.defaultProps = defaultProps;

export default BatchLoad;
