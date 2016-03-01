'use strict';
import {Dispatcher} from 'flux';
import {EventEmitter} from 'fbemitter';
import {Navi} from 'components/Navi';
import request from 'superagent/lib/client';
const _dispatcher = new Dispatcher();

//For IE9 supporting
if (Function.prototype.name === undefined && Object.defineProperty !== undefined) {
  Object.defineProperty(Function.prototype, 'name', {
    get: function() {
      var funcNameRegex = /function\s+([^\s(]+)\s*\(/;
      var results = (funcNameRegex).exec((this).toString());
      return ((results && results.length > 1) ? results[1] : "");
    },
    set: function(value) {}
  });
}

export class Fmk {

  static getDispatcher(){
    return _dispatcher;
  }

  static post(apiUrl, param, callback) {
    let r = request.post(apiUrl);
    if (arguments.length == 2 && typeof arguments[1] === 'function') {
      callback = param;
    } else {
      r.send(param);
    }
    Fmk.__sendRequest(r, callback);
  }

  static get(apiUrl, param, callback) {
    let r = request.post(apiUrl);
    if (arguments.length == 2 && typeof arguments[1] === 'function') {
      callback = param;
    } else {
      r.query(param);
    }
    Fmk.__sendRequest(r, callback);
  }

  static __sendRequest(req, callback) {
    req.set('X-Auth-Token', Fmk.XAuthToken).set('Accept', 'application/json').end(function(err, res) {
      if (err || !res.ok) {
        console.log(err);
      } else {
        let result = null;
        if (res.type.toLowerCase() === 'application/json') {
          result = res.body;
        } else {
          result = JSON.parse(res.text);
        }
        callback(result);
      }
    });
  }

  static autobind(target) {
    for (let m in target) {
      if (typeof target[m] === 'function') {
        target[m] = target[m].bind(target);
      }
    }
    return target;
  }

  static get navi() {
    return Navi;
  }

  static get dispatcher() {
    return _dispatcher;
  }

  static act(action = {
    type: '$'
  }) {
    _dispatcher.dispatch(action);
  }

  static iehack(store) {
    if (!store.__emitter) {
      store.__className = store.constructor.name;
      store.__changed = false;
      store.__changeEvent = 'change';
      store.__dispatcher = _dispatcher;
      store.__emitter = new EventEmitter();
      store._dispatchToken = _dispatcher.register(function(payload) {
        store.__invokeOnDispatch(payload);
      });
      store._state = store.getInitialState();
      store._iehacked = true;
    } else {
      store._iehacked = false;
    }
    return store;
  }

  static store(storeClass, singleton = true) {
    if (singleton) {
      if (storeClass.singletonInstance === undefined || storeClass.singletonInstance === null) {
        let sto = Fmk.iehack(new storeClass(_dispatcher));
        sto._isSingleton = true;
        storeClass.singletonInstance = sto;
      }
      return storeClass.singletonInstance;
    } else {
      let sto = Fmk.iehack(new storeClass(_dispatcher));
      sto._isSingleton = false;
      return sto;
    }
  }
}
