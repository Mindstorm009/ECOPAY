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

// These are the elements needed by this element.
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-collapse/iron-collapse.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class EcopayTransactionRow extends LitElement {
  _render() {
    return html`
      ${SharedStyles}
      <style>
       
      </style>
      <section class="row">
        <section class="header" on-click="">
          <section>Bills</section>
          <section>$ 32.00</section>
        </section>
        <iron-collapse>
          <section class="table">
            My content here
          </section>
        </iron-collapse>
      </section>
      <iron-icon></iron-icon>
    `;
  }

  static get properties() { return {
    item: Object
  }}
}

window.customElements.define('ecopay-transaction-row', EcopayTransactionRow);
