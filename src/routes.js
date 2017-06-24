import React from 'react';
import Template from './components/template/template.jsx';
import { Route, IndexRoute } from 'react-router';

function Index() {
    return (
        <h1>
            Hello World
        </h1>
    )
}

export default (
    <Route path="/" component={Template}>
        <IndexRoute component={Index}/>
    </Route>
);
