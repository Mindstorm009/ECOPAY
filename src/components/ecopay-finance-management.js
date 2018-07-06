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
        paper-tab a{
          @apply --layout-horizontal;
          @apply --layout-center-center;
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
          <section>
            <section hidden="${_view !== 'overview'}">
              <div>Overview Spending</div>
              <div class="overview-circle">
                <div>$ </div>
                <div>842.00</div>
              </div>
            </section>
            <section hidden="${_view !== 'history'}">
              ${repeat(_transactions, (i) => i.category, (i, index) => html`
                <ecopay-transaction-row item="${i}"></ecopay-transaction-row>`)}
            </section>
            <section hidden="${_view !== 'help'}">
              Help
            </section>
          </section>
        </setion>
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
    }]
  }

  _onSelectedhanged(e){
    this._view = e.detail.value;
  }
}

window.customElements.define('ecopay-finance-management', EcopayFinanceManagement);