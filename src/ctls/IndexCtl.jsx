'use strict';
import React, {Component} from 'react';
import {FmkCtl} from 'components/FmkCtl';
import {QrLoginCtl} from 'components/qrlogin';

export default class IndexCtl extends FmkCtl {
  loginSucceedHandler=()=>{
    window.location.href = 'main.html';
  }
  
  exitHandler=()=>{
    window.location.href = 'index.html';
  }

  bindStoreEvent(binder){}

  render() {
    return <QrLoginCtl style={{width:'300px', margin:'auto',marginTop:'50'}} 
    	onLoginSucceed={this.loginSucceedHandler} 
    	onExit={this.exitHandler}></QrLoginCtl>;
  }
}
