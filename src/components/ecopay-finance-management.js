/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


import { html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat.js';

import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../store.js';

// These are the actions needed by this element.
import wallet from '../reducers/wallet.js';
store.addReducers({
  wallet
});

// These are the elements needed by this element.
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-icons/editor-icons.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/paper-styles/typography.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import './ecopay-page.js';
import './ecopay-transaction-row.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class EcopayFinanceManagement extends connect(store)(PageViewElement)  {
  _render({_view,_transactions,_totalSpending}) {
    return html`
      ${SharedStyles}
      <style>
        .container{
          @apply --layout-vertical;
          @apply --layout-center-center;
        }

        .title {
          @apply --paper-font-headline;
          margin: 16px 0px 0px 16px;
          @apply --layout-self-start;
          font-weight: bold;
        }

        .overview-circle {
          @apply --layout-vertical;
          @apply --layout-center-center;
          border: 2px solid black;
          border-radius: 50%;
          height: 150px;
          width: 150px;
          margin-top: 24px;
          @apply --paper-font-display1;
        }

        .table{
          margin: 48px 12px 0px 12px;
        }

        iron-image {
          height: 32px;
          width: 32px;
        }
      </style>
      <ecopay-page mainTitle="Finance Management"
        backHref="/home" showBalance hideFooter>
        <section>
        <paper-tabs selected="${_view}" attr-for-selected="name" on-selected-changed="${(e) => this._onSelectedhanged(e)}">
            <paper-tab name="overview" title="Overview Spending"><a href="javascript:void(0)"><iron-image sizing="cover" src="../../../images/rm_logo.png"></iron-image></a></paper-tab>
            <paper-tab name="history" title="History"><a href="javascript:void(0)"><iron-icon icon="icons:assignment"></iron-icon></a></paper-tab>
            <paper-tab name="help" title="Help"><a href="javascript:void(0)"><iron-icon icon="icons:help"></iron-icon></a></paper-tab>
          </paper-tabs>
          <section class="container" hidden="${_view !== 'overview'}">
            <div class="title">Overview Spending</div>
            <div class="overview-circle">
              <div>RM</div>
              <div>${_totalSpending}</div>
            </div>
          </section>
          <section hidden="${_view !== 'history'}">
           <section class="table">
            ${repeat(_transactions, (i) => i.category, (i, index) => html`
              <ecopay-transaction-row item="${i}" isFirst="${ index === 0 }"></ecopay-transaction-row>`)}
           <section>
          </section>
          <section hidden="${_view !== 'help'}">
            
          </section>
        </section>
      </ecopay-page>
    `;
  }

  static get properties() { return {
    _view: String,
    _transactions: Array,
    _totalSpending: Number
  }}

  constructor() {
    super();
    this._view = 'overview';
  }

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._balance = state.wallet.balance;
    this._transactions = state.wallet.transactions;
    this._totalSpending = this._computeTotalSpending(this._transactions);
  }

  _onSelectedhanged(e){
    this._view = e.detail.value;
  }

  _computeTotalSpending(transactions){
    if(!transactions){
      return 0;
    }
    let total = 0, index;
    for(index = 0; index < transactions.length; index++){
      total = total + transactions[index].total;
    }
    return total;
  }
}

window.customElements.define('ecopay-finance-management', EcopayFinanceManagement);