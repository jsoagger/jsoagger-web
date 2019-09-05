import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import './Workspace.css';

/**
 * Workspace page
 */
class Workspace extends Component {
    render () {
        console.log('localStorage : ' + JSON.stringify(localStorage.getItem('applicationContainer')));
        return (
            <div>
                <h3 className="float-left display-3 mr-4">Workspace</h3>
            </div>
        );
    }
}

export default Workspace;

