// @flow

import React from 'react';
import { Redirect } from 'react-router-dom';

type Props = {
    component: Object;
}

// If the user doesn't exist redirect to the login
const ProtectedRoute = (props: Props) => {
	const { component: Component } = props;
	const author = localStorage.getItem('myChatUsername');

	return author
		? (
			<Component />
		) : (
			<Redirect to={{ pathname: '/login' }} />
		);
};

export default ProtectedRoute;
