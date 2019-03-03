import {
    ADD_LINE_ITEM, 
    EDIT_LINE_ITEM, 
    COMPUTE_INVOICE, 
    REMOVE_SELECTED_LINE_ITEMS, 
    TOGGLE_ALL_LINE_ITEMS, 
    EDIT_DISCOUNT
} from '../constants';

import {cloneObject} from '../../lib/utilities';

const initialState = {
    lineItems       : [],

    discountRate    : 0,
    discountTotal   : 0,
    
    grandTotal      : 0,
    subTotal        : 0,
    vat             : 0
};

export default function invoiceReducer (state = initialState, action) {
    switch (action.type) {
        case ADD_LINE_ITEM: {

            let lineItems = [...state.lineItems];

            lineItems.push({
                isSelected: false,
                name: "",
                quantity: 1,
                unitPrice: 0,
                totalPrice: 0
            });
            
            return cloneObject(state, {lineItems});
        }
        case EDIT_LINE_ITEM: {

            let lineItems = [...state.lineItems];
            
            for (const propertyName of ["isSelected", "name", "quantity", "unitPrice", "totalPrice"]) {
                if (action[propertyName] !== undefined) {
                    lineItems[action.lineItemId][propertyName] = action[propertyName];
                }
            }

            return cloneObject(state, {lineItems});
        }
        case COMPUTE_INVOICE: {

            let discountTotal;
            let subTotal = 0;
            let vat;
            let grandTotal;

            for (const item of state.lineItems) {
                subTotal += item.totalPrice;
            }

            discountTotal = subTotal * state.discountRate /100;
            vat = (subTotal - discountTotal) * 0.2;
            grandTotal = (subTotal - discountTotal)  + vat;

            return cloneObject(state, { grandTotal, discountTotal, vat, subTotal });
        }
        case REMOVE_SELECTED_LINE_ITEMS: {

            let lineItems = state.lineItems.filter((lineItem) => {
                return lineItem.isSelected === false;
            });

            return cloneObject(state, {lineItems});
        }
        case TOGGLE_ALL_LINE_ITEMS: {

            let lineItems = [...state.lineItems];

            for (let lineItem of lineItems) {
                lineItem.isSelected = action.isSelected;
            }

            return cloneObject(state, {lineItems});
        }
        case EDIT_DISCOUNT: {
            let discountRate;
            let discountTotal;

            discountRate = action.discountRate;
            discountTotal = state.subTotal * discountRate / 100;

            return cloneObject(state, { discountRate, discountTotal });
        }
        default:
            return state;
    }
}