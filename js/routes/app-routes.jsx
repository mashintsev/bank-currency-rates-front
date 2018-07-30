'use strict';

import _ from 'lodash';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Application from '../Application.jsx';
import Index from '../pages/index.jsx';
import Rates from '../pages/rates.jsx';
import Charts from '../pages/charts.jsx';

const AppRoutes = (
  <Route path="/" component={Application} title={'Курсы валют в крупнейних розничных банках'} >
    <Route path="/ratesTable" component={Rates} />
    <Route path="/charts" component={Charts} />
    <IndexRoute component={Index} />
  </Route>
);

export default AppRoutes;
