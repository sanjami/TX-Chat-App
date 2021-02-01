// @flow

import React from 'react';
import type { Element } from 'react';
import Router from './modules/router/index';
//= import style
import './assets/style/style.scss';

function App(): Element<any> {
	return (
		<div className="container">
			<Router />
		</div>
	);
}

export default App;
