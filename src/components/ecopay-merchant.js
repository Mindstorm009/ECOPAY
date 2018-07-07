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
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/iron-icons/social-icons.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@em-polymer/google-map/google-map.js';
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
      <ecopay-page mainTitle="${ this._getTitle(_view) }"
        backHref="/home" showBalance hideFooter>
        <section>
        <paper-tabs selected="${_view}" attr-for-selected="name" on-selected-changed="${(e) => this._onSelectedhanged(e)}">
            <paper-tab name="map" title="Find"><a href="javascript:void(0)"><iron-icon icon="maps:place"></iron-icon></a></paper-tab>
            <paper-tab name="jobs" title="Jobs"><a href="javascript:void(0)"><iron-icon icon="social:person"></iron-icon></a></paper-tab>
            <paper-tab name="featured" title="Featured"><a href="javascript:void(0)"><iron-icon icon="maps:restaurant"></iron-icon></a></paper-tab>
          </paper-tabs>
          <section>
            <section hidden="${_view !== 'map'}">
            <google-map fit-to-markers slot="markers" api-key="AIzaSyD3E1D9b-Z7ekrT3tbhl_dy8DCXuIuDDRc">
            <google-map-marker slot="markers" latitude="37.78" longitude="-122.4" draggable="true"></google-map-marker>
          </google-map>
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

  _getTitle(view){
    if(view === 'jobs'){
      return 'Merchant - Jobs';
    }
    if(view === 'featured'){
      return 'Merchant - Featured';
    }
    return 'Merchant';
  }

  _onSelectedhanged(e){
    this._view = e.detail.value;
  }
}

window.customElements.define('ecopay-merchant', EcopayMerchant);