/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { PAY, RESET } from '../actions/wallet.js';

const defaultTransactions = [{
  category: 'Bills',
  total: 32,
  items : [{paidTo: 'Light Bill', date: '04/07/2018', amount: 32}]
}, {
  category: 'Food & Drinks',
  total: 500,
  items : [{paidTo: 'Good restaurant', date: '04/07/2018', amount: 240},
        {paidTo: 'Good Coffee', date: '05/07/2018', amount: 260}]
}, {
  category: 'Shopping',
  total: 1200,
  items : [{paidTo: 'Apple', date: '04/07/2018', amount: 999},
        {paidTo: 'RayBan', date: '05/07/2018', amount: 51},
        {paidTo: 'Titan', date: '07/07/2018', amount: 50}]
}];
const defaultBalance = 1000;

let _transactions, _balance;

try{
  let str = localStorage.getItem('transactions');
  if(str){
    _transactions = JSON.parse(str);
  }
}catch(e){
  _transactions = null;
}

_balance = localStorage.getItem('balance');

if(!_transactions){
  _transactions = defaultTransactions;
}

if(!_balance){
  _balance = defaultBalance;
}

const addTransaction = (transactions, category, paidTo, date, amount) => {
  let index;

  let transaction = transactions.find((item, i) => {
    index = i;
    return item.category.toLowerCase() === category.toLowerCase();
  });
  
  if(transaction){
    let obj = {
      category: transaction.category,
      total: transaction.total + amount,
      items : transaction.items.slice()
    };
    obj.items.push({paidTo: paidTo, date: date, amount: amount});
    transactions[index] = obj;
  } else {
    transactions.push({
      category: category,
      total: amount,
      items : [{paidTo: paidTo, date: date, amount: amount}]
    });
  }
  return transactions.slice();
}

const balance = (state = {balance: _balance, transactions: _transactions.slice()}, action) => {
  switch (action.type) {
    case RESET:
    return {
      'balance': defaultBalance,
      'transactions': defaultTransactions.slice()
    }
    case PAY:
      action.amount = parseInt(action.amount);
      if(state.balance < action.amount){
        return {
          'balance': state.balance,
          'transactions': state.transactions 
        }
      }

      let transactions = addTransaction(state.transactions, action.category, action.paidTo, action.date, action.amount);
      localStorage.setItem('transactions', JSON.stringify(transactions));
      localStorage.setItem('balance', state.balance - action.amount);

      return {
        'balance': state.balance - action.amount,
        'transactions': transactions
      };
    default:
      return state;
  }
};

export default balance;
