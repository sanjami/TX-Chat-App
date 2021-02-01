// @flow

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../../lib/helpers/AuthService';
// import styles
import styles from './assets/title.module.scss';

const Title = (): any => {
	const [
		redirectToLogin,
		setRedirectToLogin,
	] = useState(false);

	const author = localStorage.getItem('myChatUsername');

	const handleLogout = async () => {
		await AuthService.signOut();
		setRedirectToLogin(true);
	};

	if (redirectToLogin === true) {
		return <Redirect to="/login" />;
	}

	return (
		<div className={styles.title}>
			{author
				? (
					<div className={styles.welcome}>
						<p>{`Welcome, ${author}`}</p>
						<button type="submit" onClick={handleLogout}>
							Sign out
						</button>
					</div>
				)
				: (
					<div className={styles.welcome}>
						<p>You are not logged in, enter your username to be able to send messages</p>
					</div>
				)}
		</div>
	);
};

export default Title;
