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

// These are the elements needed by this element.
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import './ecopay-page';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class EcopayMerchant extends PageViewElement {
  _render({_view}) {
    return html`
      ${SharedStyles}
      <style>
        paper-tab a{
          @apply --layout-horizontal;
          @apply --layout-center-center;
        }
      </style>
      <ecopay-page mainTitle="Merchants"
        backHref="/home" showBalance hideFooter>
        <section>
        <paper-tabs selected="${_view}" attr-for-selected="name" on-selected-changed="${(e) => this._onSelectedhanged(e)}">
            <paper-tab name="map"><a href="javascript:void(0)"><iron-icon icon="credit-card"></iron-icon></a></paper-tab>
            <paper-tab name="jobs"><a href="javascript:void(0)"><iron-icon icon="maps:restaurant"></iron-icon></a></paper-tab>
            <paper-tab name="featured"><a href="javascript:void(0)"><iron-icon icon="thumb-up"></iron-icon></a></paper-tab>
          </paper-tabs>
          <section>
            <section hidden="${_view !== 'map'}">
              Map
            </section>
            <section hidden="${_view !== 'jobs'}">
              Jobs
            </section>
            <section hidden="${_view !== 'featured'}">
              Featured
            </section>
          <section>
        </setion>
      </ecopay-page>
    `;
  }

  static get properties() { return {
    _view: String
  }}

  constructor() {
    super();
    this._view = 'map';
  }

  _onSelectedhanged(e){
    this._view = e.detail.value;
  }
}

window.customElements.define('ecopay-merchant', EcopayMerchant);