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

import {
  signin
} from '../actions/app.js';

// These are the elements needed by this element.
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-toast/paper-toast.js';
import './ecopay-page';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class EcopayLogin extends connect(store)(PageViewElement) {
  _render() {
    return html`
      ${SharedStyles}
      <style>
        .main-container {
          
          @apply --layout-vertical;
          @apply --layout-center-center;
        }

        .card {
          @apply --layout-vertical;
          @apply --layout-center-center;
        }

        iron-icon, div[suffix] {
          color: hsl(0, 0%, 50%);
          margin-right: 12px;
        }

        .forgot-password {
          margin-top: 48px;
          @apply --layout-self-start;
        }

        paper-input {
          padding: 0px 24px;
        }

      </style>
      <ecopay-page mainTitle="Sign In" backHref="/" closeHref="/" confirmHref="javascript:void(0)"
       on-confirm-clicked="${(e) => this._onConfirmClicked(e)}">
        <section class="main-container">
            <iron-image src="${resolveUrl('images/logo.png')}"></iron-image>
        </section>
        <paper-input label="Mobile Number" allowed-pattern="[0-9]"
          on-value-changed="${(e) => this._onUserNameChanged(e)}">
            <iron-icon icon="communication:stay-primary-portrait" slot="prefix"></iron-icon>
        </paper-input>
        <paper-input label="Password" type="password"
        on-value-changed="${(e) => this._onPasswordhanged(e)}">
            <iron-icon icon="lock-outline" slot="prefix"></iron-icon>
        </paper-input>
        <paper-button class="forgot-password">Forgot password?</paper-button>
      </ecopay-page>
      <paper-toast id="toast"></paper-toast>
    `;
  }

  static get properties() { return {
    _username: String,
    _password: String
  }}

  _onConfirmClicked(){
    if(this._username === '123456789' && this._password === '123456'){
      store.dispatch(signin());
    } else {
      var toast = this.shadowRoot.querySelector('#toast');
      toast.text = 'Invalid mobile number or password';
      toast.open();
    }
  }

  _onUserNameChanged(e){
    this._username = e.detail.value;
  }

  _onPasswordhanged(e){
    this._password = e.detail.value;
  }

  _stateChanged(){

  }
}

window.customElements.define('ecopay-login', EcopayLogin);
