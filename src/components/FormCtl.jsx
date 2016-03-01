'use strict';
import React, {Component} from 'react';
import {Fmk} from 'components/Fmk';
import {FmkCtl} from 'components/FmkCtl';
import {App} from 'pages/App';

export class FormCtl extends FmkCtl {
  bindStoreEvent(binder) {}

  componentWillMount() {
    super.componentWillMount();
  }

  bind = (obj, field, checkedValue) => {
    return {
      value: obj[field],
      requestChange: (newValue) => {
        if (checkedValue !== undefined) {
          if (newValue === true) {
            obj[field] = checkedValue;
          } else {
            delete obj[field];
          }
        } else {
          obj[field] = newValue;
          this.setState({
            ...this.state
          });
        }
      }
    }
  }

  bindArray = (obj, field, index, checkedValue) => {
    if (obj[field] === undefined) {
      obj[field] = [];
    }
    return {
      value: (index === undefined && checkedValue === undefined)
        ? obj[field]
        : obj[field][index],
      requestChange: (newValue) => {
        if (index === undefined && checkedValue === undefined) {
          console.error('Not supported!!!');
        } else if (checkedValue !== undefined) {
          if (newValue === true) {
            obj[field][index] = checkedValue;
          } else {
            delete obj[field][index];
          }
        } else {
          obj[field][index] = newValue;
        }
        this.setState({
          ...this.state
        });
      }
    }
  }
}
