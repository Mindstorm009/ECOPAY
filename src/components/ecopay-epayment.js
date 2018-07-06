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
import { connect } from 'pwa-helpers/connect-mixin.js';

import { store } from '../store.js';

import {
  navigate
} from '../actions/app.js';

// These are the actions needed by this element.
import wallet from '../reducers/wallet.js';
store.addReducers({
  wallet
});

// These are the elements needed by this element.
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/maps-icons.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-item/paper-item';
import '@polymer/paper-listbox/paper-listbox.js';
import './ecopay-page';

// These are the shared styles needed by this element.
import { SharedStyles } from './shared-styles.js';

class EcopayEPayment extends connect(store)(PageViewElement) {
  _render({_view,_amount,_payingTo,_selectedItemLabel}) {
    return html`
      ${SharedStyles}
      <style>
        paper-tab a{
          @apply --layout-horizontal;
          @apply --layout-center-center;
        }
      </style>
      <ecopay-page mainTitle="ePayment - Pay"
        on-confirm-clicked="${(e) => this._onConfirmClicked(e)}"
        on-close-clicked="${(e) => this._onClosedClicked(e)}"
        on-back-clicked="${(e) => this._onBackClicked(e)}"
        closeHref="/home" showBalance>
        <section>
        <paper-tabs on-click="${(e) => this._onTabClick(e)}" selected="0">
          <paper-tab title="ePayment"><a href="/epayment"><iron-icon icon="credit-card"></iron-icon></a></paper-tab>
          <paper-tab title="Merchant"><a href="/merchant"><iron-icon icon="maps:restaurant"></iron-icon></a></paper-tab>
          <paper-tab title="Finance managment"><a href="/finance-management"><iron-icon icon="thumb-up"></iron-icon></a></paper-tab>
        </paper-tabs>
          <section>
            <section hidden="${_view === 'confirmation'}">
              <paper-input label="Key In Amount" type="number"
               on-value-changed="${(e) => this._onAmounthanged(e)}">
                <div slot="prefix">$</div>
              </paper-input>
              <paper-input label="Paying To"
               on-value-changed="${(e) => this._onPayingToChanged(e)}"></paper-input>
              <paper-dropdown-menu label="Paying For" no-animations
              on-selected-item-label-changed="${(e) => this._onSelectedItemLabelChanged(e)}" >
                <paper-listbox slot="dropdown-content" selected="1">
                  <paper-item>Food & Drinks</paper-item>
                  <paper-item>Shopping</paper-item>
                  <paper-item>Others</paper-item>
                </paper-listbox>
              </paper-dropdown-menu>
            </section>
            <section hidden="${_view !== 'confirmation'}">
              <div>Confirm payment</div>
              <div>$ ${_amount}</div>
              <div>to</div>
              <div>${_payingTo}</div>
              <div>for</div>
              <div>${_selectedItemLabel}</div>
              <div>Enter pin to confirm</div>
              <paper-input label="" type="number" maxlength="6"></paper-input>
            </section>
          <section>
        </setion>
      </ecopay-page>
    `;
  }

  static get properties() { return {
    _balance: Number,
    _view: String,
    _selectedItemLabel: String,
    _amount: String,
    _payingTo: String
  }}
    // This is called every time something is updated in the store.
    _stateChanged(state) {
      this._balance = state.wallet.balance;
    }

    _onTabClick(){
      this.shadowRoot.querySelector('paper-tabs').selected = 0; 
    }

    _onConfirmClicked(){
      if(this._view === 'confirmation'){
        this._navigateToHome();
      } else {
        if(this._validate()){
          this._view = 'confirmation';
        }     
      }
    }

    _validate(){
      if(!this._amount){
        alert('Amount is required');
        return false;
      }

      if(!this._payingTo){
        alert('PayingTo is required');
        return false;
      }

      if(this._amount > this._balance){
        alert("You haven't enough money");
        return false;
      }
      return true;
    }

    _onClosedClicked(){
      this._view = 'form';
    }

    _onBackClicked(){
      if(this._view !== 'confirmation'){
        this._navigateToHome();
      } else {
        this._view = 'form';
      }
    }

    _navigateToHome(){
      window.history.pushState({}, '', '/home');
      store.dispatch(navigate(window.decodeURIComponent('/home')));
    }

    _onAmounthanged(e){
      this._amount = e.detail.value;
    }

    _onPayingToChanged(e){
      this._payingTo = e.detail.value;
    }

    _onSelectedItemLabelChanged(e){
      this._selectedItemLabel = e.detail.value;
    }
}

window.customElements.define('ecopay-epayment', EcopayEPayment);
