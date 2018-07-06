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
  _render({opened,item}) {
    return html`
      ${SharedStyles}
      <style>
       
      </style>
      <section class="row">
        <section class="header" on-click="${(e) => this._onRowClick(e)}">
          <section>${item.category}</section>
          <section>$ ${item.total}</section>
        </section>
        <iron-collapse opened="${opened}" on-opened-changed="${(e) => this._onOpenedChanged(e)}">
          <section class="table">
          ${repeat(item.items, (i) => i.date, (i, index) => html`
            <div class="row">
              <div>${i.paidTo}</div>
              <div>${i.date}</div>
              <div>$ ${i.amount}</div>
            </div>`)}
          </section>
        </iron-collapse>
      </section>
      <iron-icon icon="hardware:keyboard-arrow-right" hidden="${opened}"></iron-icon>
      <iron-icon icon="hardware:keyboard-arrow-down" hidden="${!opened}"></iron-icon>
    `;
  }

  static get properties() { return {
    item: Object,
    opened: Boolean
  }}

  constructor() {
    super();
    this.opened = false;
  }

  _onRowClick(){
    this.opened = !this.opened;
  }

  _onOpenedChanged(e){
    this.opened = e.detail.value;
  }
}

window.customElements.define('ecopay-transaction-row', EcopayTransactionRow);
