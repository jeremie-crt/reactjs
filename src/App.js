import React, { Component } from 'react';
import {Route} 				from "react-router-dom";
import {NavLink} 			from "react-router-dom";

import HomePage 			from './pages/HomePage';
import Invoice 				from './pages/Invoice';
// import InvoiceAll 			from './pages/InvoiceAll';
import Customer 			from './pages/Customer';

export default class App extends Component {
	render() {
		return (
			<div className="App">
				<div className="ui secondary pointing menu">
					<NavLink to="/" 			exact 	className="ui item">Home</NavLink>
					<NavLink to="/Invoice" 		exact	className="ui item">Invoice</NavLink>
					{/* <NavLink to="/Invoice/all" 	exact 	className="ui item">All Invoices</NavLink> */}
					<NavLink to="/Customer" 	exact 	className="ui item">Customer</NavLink>
				</div>

				{/* routes */}
				<Route exact 	path="/" 			component={HomePage} />
				<Route exact	path="/Invoice"		component={Invoice} />
				{/* <Route exact	path="/Invoice/all"	component={InvoiceAll} /> */}
				<Route exact	path="/Customer" 	component={Customer} />
			</div>
		);
	}
}