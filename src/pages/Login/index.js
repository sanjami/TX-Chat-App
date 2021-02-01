// @flow

import React, { useState, useEffect } from 'react';
import type { Element } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../../lib/helpers/AuthService';
// import components
import Title from '../../components/Title/index';
// import styles
import styles from '../Chat/assets/chat.module.scss';

type Props = {
	history: {
		push: (string) => void,
	}
}
function Login(props: Props): Element<any> {
	const [redirect, setRedirect] = useState(false);
	const [userName, setUserName] = useState('');

	// If the user exist redirect to the chat

	useEffect(() => {
		const author: string = localStorage.getItem('myChatUsername') || '';
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
			<div className={styles.login}>
				<div className={styles.footer}>
					<div className={styles.newMessage}>
						<form onSubmit={handleLogin}>
							<input
								placeholder="Enter username"
								onChange={handleUserName}
								required
								maxLength="64"
							/>
							<button type="submit">
								Log in
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
export default Login;
