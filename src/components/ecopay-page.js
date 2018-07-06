/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement,html } from '@polymer/lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../store.js';

// These are the actions needed by this element.
import wallet from '../reducers/wallet.js';
store.addReducers({
  wallet
});

// These are the elements needed by this element.
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/av-icons.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class EcopayPage extends connect(store)(LitElement) {
  _render({mainTitle,showBalance,hideBack,hideFooter,backHref,closeHref,confirmHref,_balance}) {
    return html`
      ${SharedStyles}
      <style>
      app-header{

      }
      .main-content {
        padding-bottom: 50px;
      }
      .balance-container{
        @apply --layout-horizontal;
        @apply --layout-center-center;
      }
      footer {
        height: 96px;
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        background: var(--app-footer-background-color);
        color: var(--app-footer-text-color);
        @apply --layout-horizontal;
        @apply --layout-center-center;
      }

      paper-icon-button.arrow-back {
        width: 48px;
        height: 48px;
      }

      paper-icon-button.footer-btn {
        height: 72px;
        width: 72px;
      }

      .main-title {
        @apply --paper-font-display1;
        font-size: 24px;
        font-weight: bold;
      }
      </style>

      <app-header-layout has-scrolling-region fullbleed>
        <app-header slot="header" fixed condenses effects="waterfall">
          <app-toolbar>
            <a href="${backHref}" hidden="${hideBack}" on-click="${(e) => this._onBackClick(e)}">
              <paper-icon-button class="arrow-back" icon="arrow-back"></paper-icon-button>
            </a>
            <div class="main-title">${mainTitle}</div>
              <div class="balance-container" hidden="${!showBalance}">
                <iron-icon icon="account-balance-wallet"></iron-icon>
                <div>$${_balance}</div>
              </div>
            </div>
          </app-toolbar>
        </app-header>
        <main role="main" class="main-content">
          <slot></slot>
        </main>
        <footer hidden="${hideFooter}">
          <a href="${closeHref}" on-click="${(e) => this._onCloseClick(e)}">
            <paper-icon-button on-tap="${(e) => this._onCloseClick(e)}" class="footer-btn" icon="icons:highlight-off"></paper-icon-button>
          </a>
          <div style="width: 120px;"></div>
          <a href="${confirmHref}" on-click="${(e) => this._onConfirmClick(e)}">
            <paper-icon-button class="footer-btn" icon="av:play-arrow"></paper-icon-button>
          </a>
       </footer>

      </app-header-layout>
    `;
  }

  static get properties() { return {
    mainTitle: String,
    showBalance: Boolean,
    hideBack: Boolean,
    hideFooter: Boolean,
    backHref: String,
    closeHref: String,
    confirmHref: String,
    _balance: Number
  }}

  // This is called every time something is updated in the store.
  _stateChanged(state) {
    this._balance = state.wallet.balance;
  }

  _onBackClick(){
    this.dispatchEvent(new CustomEvent('back-clicked', {bubbles: false}));
  }

  _onCloseClick(){
    this.dispatchEvent(new CustomEvent('close-clicked', {bubbles: false}));
  }

  _onConfirmClick(){
    this.dispatchEvent(new CustomEvent('confirm-clicked'));
  }
}

window.customElements.define('ecopay-page', EcopayPage);
