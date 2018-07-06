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

// These are the elements needed by this element.
import '@polymer/iron-icons/communication-icons.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import './ecopay-page';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class EcopayLogin extends PageViewElement {
  _render() {
    return html`
      ${SharedStyles}
      <style>
        .main-container {
          background-color: whitesmoke;
          @apply --layout-vertical;
          @apply --layout-center-center;
          @apply --layout-fit;
        }

        .card {
          @apply --layout-vertical;
          @apply --layout-center-center;
        }

        iron-icon, div[suffix] {
          color: hsl(0, 0%, 50%);
          margin-right: 12px;
        }
      </style>
      <ecopay-page mainTitle="Sign In" showBalance backHref="/" closeHref="/" confirmHref="/home">
        <section class="main-container">
          <section class="card">
            <iron-image src="${resolveUrl('images/logo.png')}"></iron-image>
            <paper-input label="Mobile Number" allowed-pattern="[0-9]">
                <iron-icon icon="communication:stay-primary-portrait" slot="prefix"></iron-icon>
            </paper-input>
            <paper-input label="Password" type="password">
                <iron-icon icon="lock-outline" slot="prefix"></iron-icon>
            </paper-input>
            <paper-button>Forgot password?</paper-button>
          <section>
        </setion>
      </ecopay-page>
    `;
  }

  static get properties() { return {}}
}

window.customElements.define('ecopay-login', EcopayLogin);
