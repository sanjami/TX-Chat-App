// @flow

import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../../lib/helpers/AuthService';
// import components
import Title from '../../components/Title/index';

type Props = {
	history: {
		push: (string) => void,
	}
}
function Login(props: Props): any {
	const [redirect, setRedirect] = useState(false);
	const [userName, setUserName] = useState('');

	// If the user exist redirect to the chat

	useEffect(() => {
		const author = localStorage.getItem('myChatUsername');
		if (author) {
			props.history.push('/');
		}
	}, []);

	// set userName

	const handleUserName = (e) => {
		setUserName(e.target.value);
	};

	// submit login

	const handleLogin = async () => {
		await AuthService.storeUser(userName);
		setRedirect(true);
	};

	// redirect after login

	if (redirect === true) {
		return <Redirect to="/" />;
	}

	return (
		<>
			<Title />
			<div>
				<form onSubmit={handleLogin}>
					<input
						placeholder="Enter username"
						onChange={handleUserName}
						required
						maxLength="64"
					/>
					<button
						type="submit"
					>
						Log in
					</button>
				</form>
			</div>
		</>
	);
}
export default Login;
