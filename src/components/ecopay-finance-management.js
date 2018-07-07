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

// These are the elements needed by this element.
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
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

class EcopayFinanceManagement extends PageViewElement {
  _render({_view,_transactions}) {
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
      </style>
      <ecopay-page mainTitle="Finance Management"
        backHref="/home" showBalance hideFooter>
        <section>
        <paper-tabs selected="${_view}" attr-for-selected="name" on-selected-changed="${(e) => this._onSelectedhanged(e)}">
            <paper-tab name="overview" title="Overview Spending"><a href="javascript:void(0)"><iron-icon icon="editor:monetization-on"></iron-icon></a></paper-tab>
            <paper-tab name="history" title="History"><a href="javascript:void(0)"><iron-icon icon="icons:assignment"></iron-icon></a></paper-tab>
            <paper-tab name="help" title="Help"><a href="javascript:void(0)"><iron-icon icon="icons:help"></iron-icon></a></paper-tab>
          </paper-tabs>
          <section class="container" hidden="${_view !== 'overview'}">
            <div class="title">Overview Spending</div>
            <div class="overview-circle">
              <div>$ </div>
              <div>842.00</div>
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
    _transactions: Array
  }}

  constructor() {
    super();
    this._view = 'overview';
    this._transactions = [{
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
    }]
  }

  _onSelectedhanged(e){
    this._view = e.detail.value;
  }
}

window.customElements.define('ecopay-finance-management', EcopayFinanceManagement);