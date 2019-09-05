import React, { Component } from 'react';
import LoginHeader from '_components/layout/login/Header.js';
import LoginFooter from '_components/layout/login/Footer.js';

import './LostPass.css';

/**
 * Lost password
 */
class LostPass extends Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <LoginHeader />
                <div class="flex-center">
                    <div class="col-md-4 col-md-offset-4">
                        <h1>Lost password</h1>
                    </div>
                </div>
                <LoginFooter />
            </div>
        );
    }
}


export default LostPass;


