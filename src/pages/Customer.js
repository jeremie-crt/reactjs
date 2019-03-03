import React, { Component } from 'react';

import { connect } from 'react-redux';


import {
    runActionEditCustomer
} from '../redux/actions';


export class Customer extends Component {

    onChangeName = (event) => {
        const name = event.target.value;

        this.props.runActionEditCustomer({name});
    }

    onChangeEmail = (event) => {
        const email = event.target.value;

        this.props.runActionEditCustomer({email});
    }

    onChangeAddress = (event) => {
        const address = event.target.value;

        this.props.runActionEditCustomer({address});
    }

    onChangeZipcode = (event) => {
        const zipcode = event.target.value;

        this.props.runActionEditCustomer({zipcode});
    }

    onChangeCity = (event) => {
        const city = event.target.value;

        this.props.runActionEditCustomer({city});
    }

    onChangePhone = (event) => {
        const phone = event.target.value;

        this.props.runActionEditCustomer({phone});
    }

	onSubmitCustomer = () => {
		const registerCustomer = {
			name:           this.props.name,
			email:          this.props.email,
			address:        this.props.address,
			zipcode:        this.props.zipcode,
			city:           this.props.city,
			phone:          this.props.phone
        }

		window.localStorage.setItem("customer", JSON.stringify(registerCustomer));
    }

    render() {
        return (
			<div className="ui container">
				<form className="ui form">
					<div className="ui equal width form">

						<div className="fields">
							<div className="field">
								<label>Nom</label>
								<input type="text" value={ this.props.name } onChange={ this.onChangeName } />
							</div>
							<div className="field">
							<label>Email</label>
								<input type="text" value={ this.props.email } onChange={ this.onChangeEmail } />
							</div>
						</div>

						<div className="field">
						<label>Adresse</label>
							<textarea rows="2" value={ this.props.address } onChange={ this.onChangeAddress } ></textarea>
						</div>

						<div className="fields">
							<div className="field">
								<label>Code postal</label>
								<input type="text" value={ this.props.zipcode } onChange={ this.onChangeZipcode } />
							</div>
							<div className="field">
								<label>Ville</label>
								<input type="text" value={ this.props.city } onChange={ this.onChangeCity } />
							</div>
							<div className="field">
								<label>Téléphone</label>
								<input type="text" value={ this.props.phone } onChange={ this.onChangePhone } />
							</div>
						</div>

						<div className="field">
							<button className="ui primary button" type="submit" onClick={this.onSubmitCustomer}>Valider</button>
						</div>

					</div>
				</form>
			</div>
        );
    }
}

const CustomerWithRedux = connect(
    // Injection des dépendances du state pour le composant Invoice
    (state) => ({
        // Nom de la prop      où se trouve le state original qu'on veut recopier dans une prop
        name:            	state.customer.name,
        email:           	state.customer.email,
        address:         	state.customer.address,
        zipcode:         	state.customer.zipcode,
        city:          		state.customer.city,
        phone:         		state.customer.phone
    }),

    // injection des action creators
    {
        runActionEditCustomer
    }
)(Customer);

export default CustomerWithRedux;