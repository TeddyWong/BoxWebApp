import React, {Component} from 'react';
import {Fmk} from 'components/Fmk';
import {FmkComponent} from 'components/FmkComponent';

export class FmkCtl extends FmkComponent {
  componentWillMount() {
    super.componentWillMount();
    if (this.onShow) {
      this.onShow = this.onShow.bind(this);
    }
    if (this.onExit) {
      this.onExit = this.onExit.bind(this);
    }

    let defaultListenerFn = function(store) {
      this.setState(function(previousState, currentProps) {
        let newState = {};
        newState[store.bindingName] = store.getState();
        return newState;
      });
    };

    if (typeof this.bindStoreEvent === "function") {
      this.bindStoreEvent(function(bindingName, store, listener) {
        store.bindingName = bindingName;
        if (listener === undefined) {
          listener = defaultListenerFn;
        }
        this.listeners.push(store.addListener(listener.bind(this, store)));
        this.state[store.bindingName] = store.getState();
      }.bind(this));
    } else {
      throw new TypeError("Controller Class [" + this.constructor.name + "] Must override method: bindStoreEvent(binder){...}");
    }

    if (typeof this.onShow === "function") {
      this.onShow();
    }
  }

  componentWillUnmount() {
    if (this.listeners) {
      for (let k in this.listeners) {
        this.listeners[k].remove();
      }
      this.listeners = null;
    }
    if (typeof this.onExit === "function") {
      this.onExit();
    }
  }
}

FmkCtl.prototype.state = {};
FmkCtl.prototype.props = {};
FmkCtl.prototype.listeners = [];
