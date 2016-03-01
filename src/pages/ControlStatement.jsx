'use strict';
import React, {Component} from 'react';
import {Link} from 'react-router';
import {Panel, Icon} from 'amazeui-react';
import {Fmk} from 'components/Fmk';
import {FmkComponent} from 'components/FmkComponent';

export default class ControlStatement extends FmkComponent {
  render() {
    var panelHeader = (
      <Icon icon="tags">扩展标签示例</Icon>
    );
    return (
      <Panel header={panelHeader} style={{
        width: 800,
        margin: 20
      }}>
      <If condition={this.props.myCondition === 'maybe'}>
        <span>IfBlock</span>
      <Else />
        <span>ElseBlock</span>
      </If>
      </Panel>
    );
  }
}
