// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Chat from '../../pages/Chat';
import Login from '../../pages/Login';
import ProtectedRoute from './ProtectedRoute';

export default function Router() {
	return (
		<Switch>
			<Route path="/login" exact component={Login} />
			<ProtectedRoute path="/" component={Chat} />
		</Switch>
	);
}
