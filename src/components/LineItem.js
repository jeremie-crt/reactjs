// Bibliotheques generales
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Bibliotheques perso
import {
    runActionComputeInvoice,
    runActionEditLineItem
} from '../redux/actions';

import {formatMoney} from '../lib/utilities';

export class LineItem extends Component {

    onChangeName = (event) => {
        const name = event.target.value;

        this.props.runActionEditLineItem(this.props.lineItemId, {name});
    }

    onChangeUnitPrice = (event) => {
        const unitPrice = parseInt(event.target.value);
        const totalPrice = unitPrice * this.props.quantity;

        this.props.runActionEditLineItem(this.props.lineItemId, {totalPrice, unitPrice});
        
        this.props.runActionComputeInvoice();
    }

    onChangeQuantity = (event) => {
        const quantity = parseInt(event.target.value);
        const totalPrice = quantity * this.props.unitPrice;
        
        this.props.runActionEditLineItem(this.props.lineItemId, {totalPrice, quantity});
        
        this.props.runActionComputeInvoice();
    }

    onChangeLineItem = (event) => {
        const isSelected = event.target.checked;

        this.props.runActionEditLineItem(this.props.lineItemId, {isSelected});
    }

    render() {
        return (
            <tr>
                <td className="ui center aligned">
                    <div className="ui left floated compact">
                        <div className="ui fitted checkbox">
                            <input type="checkbox" checked={ this.props.isSelected } onChange={ this.onChangeLineItem } />
                            <label></label>
                        </div>
                    </div>
                </td>
                <td>
                    <div className="ui input">
                        <input type="text" value={ this.props.name } onChange={ this.onChangeName } />
                    </div>
                </td>
                <td>
                    <div className="ui input">
                        <input type="text" value={ this.props.unitPrice } onChange={ this.onChangeUnitPrice } />
                    </div>
                </td>
                <td>
                    <div className="ui input">
                        <input type="text" value={ this.props.quantity } onChange={ this.onChangeQuantity } />
                    </div>
                </td>
                <td>
                    { formatMoney(this.props.totalPrice) }
                </td>
            </tr>
        );
    }
}

const LineItemWithRedux = connect(
    null,

    // injection des action creators
    {
        runActionComputeInvoice,
        runActionEditLineItem
    }
)(LineItem);

export default LineItemWithRedux;