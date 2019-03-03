import React, { Component } from 'react';

import { connect } from 'react-redux';


import LineItem from '../components/LineItem';

import {
    runActionEditDiscount,
    runActionComputeInvoice,
    runActionAddLineItem,
    runActionToggleAllLineItem,
    runActionRemoveSelectedLineItem
} from '../redux/actions';

import {formatMoney} from '../lib/utilities';



export class Invoice extends Component {

    onFormSubmit = (event) => {
        event.preventDefault();
    }
    
    componentDidMount = () => {
        this.props.runActionAddLineItem();
    }

    onChangeToggleAllLineItems = (event) => {
        const isSelected = event.target.checked;

        this.props.runActionToggleAllLineItem(isSelected);
    }

    onClickRemoveSelectedLineItems = () => {
        this.props.runActionRemoveSelectedLineItem();
        this.props.runActionComputeInvoice();
    }

    onChangeDiscount = (event) => {
        const discountRate = event.target.value;

        this.props.runActionEditDiscount(discountRate);
        this.props.runActionComputeInvoice();
    }

    onClickSaveDraft = () => {
        const invoiceDraft = {
            lineItems:             this.props.lineItems,
            grandTotal:            this.props.grandTotal,
            subTotal:              this.props.subTotal,
            vat:                   this.props.vat,
            discountRate:          this.props.discountRate,
            discountTotal:         this.props.discountTotal
        }

		window.localStorage.setItem("draft", JSON.stringify(invoiceDraft));
    }

    render() {
        // argument map -> valeur / indice / copie (falc)
        const lineItems = this.props.lineItems.map((lineItem, index) => (<LineItem 
            key={index}

            lineItemId={index}
            isSelected={lineItem.isSelected} 
            name={lineItem.name}
            quantity={lineItem.quantity}
            unitPrice={lineItem.unitPrice}
            totalPrice={lineItem.totalPrice}/>
        ));

        return (
            <div className="ui container">
                <form onSubmit={ this.onFormSubmit }>
                    <h1>Invoice</h1>
                    <div className="ui top attached segment">
                        <div className="ui small icon buttons">
                            <div className="ui small basic icon buttons">
                                <button className="ui button" type="button" onClick={ this.props.runActionAddLineItem }>
                                    <i className="plus icon"></i>
                                </button>
                                <button className="ui button" type="button" onClick={ this.onClickRemoveSelectedLineItems }>
                                    <i className="trash icon"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <table className="ui attached celled structured large table">
                        <thead>
                            <tr>
                                <th className="ui center aligned">
                                    <div className="ui left floated compact">
                                        <div className="ui fitted checkbox">
                                            <input type="checkbox" onChange={ this.onChangeToggleAllLineItems } />
                                            <label></label>
                                        </div>
                                    </div>
                                </th>
                                <th>Nom</th>
                                <th>Prix</th>
                                <th>Quantité</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            { lineItems }
                        </tbody>
                    </table>
                    <div className="ui bottom attached segment">
                        <div className="ui small basic icon buttons">
                            <button className="ui button" type="button" onClick={ this.props.runActionAddLineItem }>
                                <i className="plus icon"></i>
                            </button>
                            <button className="ui button" type="button" onClick={ this.onClickRemoveSelectedLineItems }>
                                <i className="trash icon"></i>
                            </button>
                        </div>
                    </div>
                </form>
                <div className="ui piled segments">
                    <div className="ui segment">
                        <p>Sous total HT : { formatMoney(this.props.subTotal) }</p>
                    </div>
                    <div className="ui segment">
                        <p>Montant de la remise : - { formatMoney(this.props.discountTotal) }</p>
                    </div>
                    <div className="ui segment">
                        <p>Total HT : { formatMoney(this.props.subTotal - this.props.discountTotal) }</p>
                    </div>
                    <div className="ui segment">
                        <p>Montant de la TVA : { formatMoney(this.props.vat) }</p>
                    </div>
                    <div className="ui segment">
                        <p>Montant TTC : { formatMoney(this.props.grandTotal) }</p>
                    </div>
                </div>
                <div className="ui grid">
                    <div className="four column row">
                        <div className="left floated column">
                            <input type="text" onChange={ this.onChangeDiscount }  value={ this.props.discountRate } />
                        </div>
                        <div className="right floated column">
                            <button className="ui positive icon right floated button">
                                <i className="check icon" />Valider la facture
                            </button>
                            <button className="ui positive icon right floated button" onClick={this.onClickSaveDraft}>
                                <i className="save icon" />Enregistrer le brouillon
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const InvoiceWithRedux = connect(
    // Injection des dépendances du state pour le composant Invoice
    (state) => ({
        // Nom de la prop      où se trouve le state original qu'on veut recopier dans une prop
        lineItems:             state.invoice.lineItems,
        grandTotal:            state.invoice.grandTotal,
        subTotal:              state.invoice.subTotal,
        vat:                   state.invoice.vat,
        discountRate:          state.invoice.discountRate,
        discountTotal:         state.invoice.discountTotal
    }),

    // injection des action creators
    {
        runActionEditDiscount,
        runActionComputeInvoice,
        runActionAddLineItem,
        runActionToggleAllLineItem,
        runActionRemoveSelectedLineItem
    }
)(Invoice);

export default InvoiceWithRedux;