import React from 'react';
import ReactDOM from 'react-dom';
import FullPage from './shared/fullPage';

import {browserHistory} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';

// since we're using a custom Node server, we use 
// ReactDOM.hydrate instead of ReactDOM.render. This
// is because our Server has already downlowded the 
// html for the page. Rather than redownload, here
// we just add the events.

ReactDOM.hydrate(
    <Router history={browserHistory}>
        <FullPage />
    </Router>,
    document.getElementById('app')
);