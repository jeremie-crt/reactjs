import {
    EDIT_CUSTOMER
} from '../constants';

import {cloneObject} from '../../lib/utilities';

const initialState = {
    name: "",
    email: "",
    address: "",
    zipcode: "",
    city: "",
    phone: ""
};

export default function customerReducer (state = initialState, action) {
    switch (action.type) {
        case EDIT_CUSTOMER: {

            let invoice = {};
            
            for (const propertyName of ["name", "email", "address", "zipcode", "city", "phone"]) {
                if (action[propertyName] !== undefined) {
                    invoice[propertyName] = action[propertyName];
                }
            }

            return cloneObject(state, invoice);
        }

    default:
        return state;
    }
}