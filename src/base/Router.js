import React from 'react';
import { Route } from 'react-router-dom';
import Main from 'app/main/container';

const RouteList = () => (
    <div>
        <Route exact path="*" component={Main} />
    </div>
);
export default RouteList;
