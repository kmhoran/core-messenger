import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Route, Switch} from 'react-router-dom';

class Routes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    
                    <Route exact path="/page1"
                           render={() => (
                               <h1>Page 1</h1>
                           )} />
                    <Route exact path="/"
                           render={() => (
                               <h1>Home Page</h1>
                           )} />
                    <Route render={() => (
                               <h1>No Page</h1>
                           )} />
                </Switch>
            </div>
        );
    }
}

FullPage.defaultProps = {};

export default FullPage;

