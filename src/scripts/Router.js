import React from 'react';
import { Route } from 'react-router-dom';
import Index from './Index/container';

const RouteList = () => (
    <div>
        <Route exact path="*" component={Index} />
    </div>
);
export default RouteList;
