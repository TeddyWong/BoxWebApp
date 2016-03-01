'use strict';
import React, {Component} from 'react';
import {Link} from 'react-router';
import {Panel, Icon} from 'amazeui-react';
import {FmkComponent} from 'components/FmkComponent';

export default class About extends FmkComponent {
  render() {
    var panelHeader = (
      <Icon icon="child">关于这个Demo</Icon>
    );
    return (
      <Panel header={panelHeader} style={{
        width: 500,
        margin: 20
      }}>
        基于 React、Amaze UI 组件、Webpack（with 'React Hot Loader'）、react-router、Facebook官方Flux实现等开源前端技术开发。
      </Panel>
    );
  }
}
