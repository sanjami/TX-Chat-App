// @flow

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../../lib/helpers/AuthService';

const Title = () => {
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
		<div>
			{author
				? (
					<div>
						<p>{`Welcome, ${author}`}</p>
						<button onClick={handleLogout} type="button">
							Sign out
						</button>
					</div>
				)
				: (
					<div>
						<p>You are not logged in, enter your username to be able to send messages</p>
					</div>
				)}
		</div>
	);
};

export default Title;
