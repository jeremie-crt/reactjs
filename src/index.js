import React    from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter} from "react-router-dom";
import { createStore } from 'redux';        // La fonction de création d'un store Redux
import { Provider }    from 'react-redux'   // Le composant React Redux permettant d'accéder partout au store Redux
import reducer from './redux/reducer';

import App from './App';


ReactDOM.render(
    <Provider store={ createStore(reducer) }>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);