/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat.js';

// These are the elements needed by this element.
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/hardware-icons.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-collapse/iron-collapse.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class EcopayTransactionRow extends LitElement {
  _render({opened,item,isFirst}) {
    return html`
      ${SharedStyles}
      <style>
        :host {
          @apply --layout-horizontal;
        }
        .header{
          @apply --layout-horizontal;
          @apply --layout-justified;
          padding: 8px 0px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
        }
        .row{
          @apply --layout-horizontal;
          padding: 4px 0px;
        }
        .row div{
          @apply --layout-flex;
        }
        .row .date{
          text-align: right;
        }
        .row .amount{
          text-align: right;
        }
        .outer-row[first="true"]{
          border-top: 1px solid black;
        }
        .outer-row{
          border-bottom: 1px solid black;
          @apply --layout-flex;
        }
        .table{
          margin-left: 12px;
        }
        iron-icon {
          margin-top: 11px;
        }
      </style>
      <section class="outer-row" first$="${isFirst}">
        <section class="header" on-click="${(e) => this._toogle(e)}">
          <section>${item.category}</section>
          <section>RM${item.total}</section>
        </section>
        <iron-collapse opened="${opened}" on-opened-changed="${(e) => this._onOpenedChanged(e)}">
          <section class="table">
          ${repeat(item.items, (i) => i.date, (i, index) => html`
            <div class="row">
              <div class="paid-to">${i.paidTo}</div>
              <div class="date">${i.date}</div>
              <div class="amount">RM${i.amount}</div>
            </div>`)}
          </section>
        </iron-collapse>
      </section>
      <iron-icon icon="hardware:keyboard-arrow-right" hidden="${opened}" on-click="${(e) => this._toogle(e)}"></iron-icon>
      <iron-icon icon="hardware:keyboard-arrow-down" hidden="${!opened}" on-click="${(e) => this._toogle(e)}"></iron-icon>
    `;
  }

  static get properties() { return {
    item: Object,
    opened: Boolean,
    isFirst: Boolean
  }}

  constructor() {
    super();
    this.opened = false;
  }

  _toogle(){
    this.opened = !this.opened;
  }

  _onOpenedChanged(e){
    this.opened = e.detail.value;
  }
}

window.customElements.define('ecopay-transaction-row', EcopayTransactionRow);
