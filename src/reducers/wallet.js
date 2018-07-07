/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { PAY } from '../actions/wallet.js';

const balance = (state = {balance: 100}, action) => {
  switch (action.type) {
    case PAY:
      if(state.balance < action.amount){
        return {
          'balance': state.balance 
        }
      }
      return {
        'balance': state.balance - action.amount
      };
    default:
      return state;
  }
};

export default balance;
