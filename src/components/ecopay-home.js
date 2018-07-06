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
import { PageViewElement } from './page-view-element.js';
import { resolveUrl } from '@polymer/polymer/lib/utils/resolve-url.js';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../store.js';

// These are the actions needed by this element.
import wallet from '../reducers/wallet.js';
store.addReducers({
  wallet
});

// These are the elements needed by this element.
import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import './ecopay-page';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class EcopayHome extends connect(store)(PageViewElement) {
  _render({_balance}) {
    return html`
      ${SharedStyles}
      <style>
        paper-tab a{
          @apply --layout-horizontal;
          @apply --layout-center-center;
        }
      </style>
      <ecopay-page mainTitle="Home" hideBack hideFooter>
        <section>
          <paper-tabs on-click="${(e) => this._clickHandler(e)}">
            <paper-tab><a href="/epayment"><iron-icon icon="credit-card"></iron-icon></a></paper-tab>
            <paper-tab><a href="/merchant"><iron-icon icon="maps:restaurant"></iron-icon></a></paper-tab>
            <paper-tab><a href="/finance-management"><iron-icon icon="thumb-up"></iron-icon></a></paper-tab>
          </paper-tabs>
          <section>
            <section>
              <h1>Hi User!</h1>
              <h1>Your eWallet: $${_balance}</h1>
            </section>
            <iron-image src="${resolveUrl('images/logo.png')}"></iron-image>
          <section>
        </setion>
      </ecopay-page>
    `;
  }

  static get properties() { return {
    _balance: Number
  }}

    // This is called every time something is updated in the store.
    _stateChanged(state) {
      this._balance = state.wallet.balance;
    }

    _clickHandler(){
      this.shadowRoot.querySelector('paper-tabs').selected = null;
    }
}

window.customElements.define('ecopay-home', EcopayHome);
