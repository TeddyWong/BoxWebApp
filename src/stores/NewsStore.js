'use strict';
import {
  FmkStore
} from 'components/FmkStore';
import {
  Fmk
} from 'components/Fmk';
var moment = require('moment');

export class NewsStore extends FmkStore {
  getInitialState() {
    this.mm = moment();
    return {
      picture2: 'images/loading.gif'
    };
  }

  $$ = (startingState, action) => {
    Fmk.get('/dsapi/', {
      'date': this.mm.format("YYYY-MM-DD")
    }, (res) => {
      this.changeState(res);
    });
  }

  $news$previous = (startingState, action) => {
    if (this.mm) {
      this.mm.subtract(1, 'days');
      this.$$(startingState, action);
    }
  }

  $news$next = (startingState, action) => {
    if (this.mm && moment().diff(this.mm, 'days') > 0) {
      this.mm.add(1, 'days');
      this.$$(startingState, action);
    }
  }
}
