import 'AppCss';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';
import {Fmk} from 'components/Fmk';

render((
  <Router history={Fmk.navi.history}>
    <Route path="/" component={require('react-router?name=AppCtl!ctls/AppCtl')}>
      <IndexRoute component={require('react-router?name=Welcome!pages/Welcome')}/>
      <Route path="news" component={require('react-router?name=NewsCtl!ctls/NewsCtl')}/>
      <Route path="about" component={require('react-router?name=About!pages/About')}/>
      <Route path="control_statement" component={require('react-router?name=ControlStatement!pages/ControlStatement')}/>
      <Route path="*" component={require('react-router?name=Welcome!pages/Welcome')}/>
    </Route>
  </Router>
), document.getElementById('app'));
