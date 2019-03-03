import { combineReducers } from 'redux';
import customerReducer from './reducers/customer';
import invoiceReducer from './reducers/invoice';


const rootReducer = combineReducers({invoice: invoiceReducer, customer: customerReducer});

export default rootReducer;