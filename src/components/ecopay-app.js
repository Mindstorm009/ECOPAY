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
import '@polymer/iron-image/iron-image.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-styles/color.js'

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class EcopayApp extends PageViewElement {
  _render() {
    return html`
      ${SharedStyles}
      <style>
        .main-container {
          @apply --layout-vertical;
          @apply --layout-center-center;
          @apply --layout-fit;
        }

        .card {
          @apply --layout-vertical;
          @apply --layout-center-center;
        }

        .btn-container {
          margin: 16px 0px 8px;
          @apply --layout-horizontal;
          @apply --layout-around-justified;
        }

        iron-image {
          --iron-image-width	: 256px;
        }

        paper-button.indigo {
          background-color: var(--paper-indigo-500);
          color: white;
          --paper-button-raised-keyboard-focus: {
            background-color: var(--paper-pink-a200) !important;
            color: white !important;
          };
        }
      </style>
      <section class="main-container">
        <section class="card1">
          <iron-image src="${resolveUrl('images/logo.png')}"></iron-image>
          <section class="btn-container">
            <a href="/signin"><paper-button raised class="indigo">Sign In</paper-button></a>
            <paper-button raised class="indigo">Register</paper-button>
          </section>
        </section>
      </section>
    `;
  }
}

window.customElements.define('ecopay-app', EcopayApp);
