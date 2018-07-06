import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Route, Switch} from 'react-router-dom';
import Home from '../home/home';
import Speakers from '../speakers/speakers';
import Login from "./login";
import RouteNotFound from "../routeNotFound";

class Routes extends Component {

    constructor(props){
        super(props);
        this.handler = this.handler.bind(this);
    }

    handler() {
        this.props.action();
    }

    render() {
        return (
            <div>
                <Switch>
                    
                    <Route exact path="/"
                           component={Home}/>
                    <Route exact path="/speakers"
                           component={Speakers} />
                    <Route exact path="/login"
                           component={Login} />
                    <Route render={props => <RouteNotFound action={this.handler}  />}></Route>
                </Switch>
            </div>
        );
    }
}

Routes.defaultProps = {};

export default Routes;

