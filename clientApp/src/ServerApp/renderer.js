import React from 'react';
import {renserToString} from 'react-dom/server';
import {StaticRouter as Router} from 'react-router-dom';

import FullPage from '../ClientApp/shared/fullPage';

export default (req) => {
    let context = {};
    const content = renserToString(
        <Router location={req.path} context={context}>
          <FullPage />
        </Router>
    );

    return {
        htmlcode: `<html>
        <head>
          <title>My React Application</title>
          <link rel="stylesheet" href="App.css">
        </head>
        <body>
          <div id="app">${content}</div>
          <script src="clientbundle.js"></script>
        </body>
        </html>
        `, routestatus: context.status
    }
};