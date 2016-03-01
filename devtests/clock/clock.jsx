import React from 'react';
import {render} from 'react-dom';
import {ClockCtl} from 'components/clock';
import Test from '../Test';

render((
  <Test>
    <ClockCtl n={'你好~'} style={{width:'50%',margin: 'auto'}}>第二个</ClockCtl>
  </Test>
), document.getElementById('app'));
