import React, { Component } from 'react';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import './AppSearchBar.css';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

/**
 * 
 */
class AppSearchBar extends Component {
  
    render() {
        return (
            <div>
                <InputGroup className="input-prepend">
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className="fa fa-cog"></i>
                        </InputGroupText>
                        </InputGroupAddon>
                        <Input size="40" type="text" placeholder="Search for..." />
                        <InputGroupAddon addonType="append">
                        <Button color="info">Go</Button>
                        </InputGroupAddon>
                    </InputGroup>
            </div>
        );
    }
}

AppSearchBar.propTypes = propTypes;
AppSearchBar.defaultProps = defaultProps;

export default AppSearchBar;
