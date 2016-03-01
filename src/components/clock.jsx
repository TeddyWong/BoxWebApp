'use strict';
import React, {Component} from 'react';
import {Link} from 'react-router';
import {Panel, Icon} from 'amazeui-react';
import {FmkCtl} from 'components/FmkCtl';
import {Fmk} from 'components/Fmk';
import {FmkStore} from 'components/FmkStore';
import {FmkComponent} from 'components/FmkComponent';
var moment = require('moment');

class Clock extends FmkComponent {
  render() {
    var panelHeader = (
      <Icon icon="clock-o">当前时间</Icon>
    );
    return (
      <Panel header={panelHeader} style={this.props.style}>
        <a onClick={this.props.reload}>reload</a><br/>
        <a onClick={this.props.stopHandler}>stop</a>
        <h1>{this.props.myClock.time}</h1>
        <p>
          {this.props.children}<br/>
        这是n的值：{this.props.n}
        </p>
      </Panel>
    );
  }
}

class ClockStore extends FmkStore {
  getInitialState() {
    console.log('ClockStore getInitialState');
    return {time: moment().format('YYYY-MM-DD HH:mm:ss'), id: null};
  }

  start = () => {
    let id = setInterval(() => {
      let ns = this.getState();
      ns.time = moment().format('YYYY-MM-DD HH:mm:ss');
      this.changeState(ns);
    }, 1000);
    this.getState().id = id;
    console.log('clock started.');
  }

  end = () => {
    clearInterval(this.getState().id);
    console.log('clock stopped.');
  }

  $clock$reload = (startingState, action) => {
    console.log('clock$reload');
    startingState.time = moment().format('YYYY-MM-DD HH:mm:ss');
    return startingState;
  }
}

export class ClockCtl extends FmkCtl {
  bindStoreEvent(binder) {
    this.clock = Fmk.store(ClockStore, false);
    binder('clock_XxXxxxxxXXXXxxxx', this.clock);
  }

  onShow() {
    this.clock.start();
  }

  onExit() {
    this.clock.end();
  }

  stop = () =>{
    this.onExit();
  }

  reload = () =>{
    console.log("Fmk.act({type:'clock$reload'});");
    Fmk.act({type:'clock$reload', name:'xxx',gender:'male'});
  }

  render() {
    return (
      <Clock {...this.props} myClock={this.state.clock_XxXxxxxxXXXXxxxx} stopHandler={this.stop} reload={this.reload}>
        {this.props.children}
      </Clock>
    );
  }
}
