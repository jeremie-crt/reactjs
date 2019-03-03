import {
    ADD_LINE_ITEM, 
    EDIT_LINE_ITEM, 
    COMPUTE_INVOICE, 
    REMOVE_SELECTED_LINE_ITEMS, 
    TOGGLE_ALL_LINE_ITEMS, 
    EDIT_DISCOUNT,
    EDIT_CUSTOMER
} from './constants';

//////////////////////
//  ACTIONS INVOICE //
//////////////////////

export function runActionAddLineItem(){
    return { type: ADD_LINE_ITEM};
}

export function runActionEditLineItem(lineItemId, {isSelected, name, quantity, unitPrice, totalPrice}){
    return { type: EDIT_LINE_ITEM, lineItemId, isSelected, name, quantity, unitPrice, totalPrice}; 
}

export function runActionComputeInvoice(){
    return { type: COMPUTE_INVOICE };
}

export function runActionRemoveSelectedLineItem(){
    return { type: REMOVE_SELECTED_LINE_ITEMS };
}

export function runActionToggleAllLineItem(isSelected){
    return { type: TOGGLE_ALL_LINE_ITEMS, isSelected };
}

export function runActionEditDiscount(discountRate){
    return { type: EDIT_DISCOUNT, discountRate };
}

////////////////////////
//  ACTIONS CUSTOMER  //
////////////////////////

export function runActionEditCustomer({name, address, zipcode, city, phone, email}){
    return { type: EDIT_CUSTOMER, name, address, zipcode, city, phone, email}; 
}