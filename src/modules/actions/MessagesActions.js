// @flow

import {
	GET_MESSAGES,
	GET_TIME_MESSAGES,
	SEND_MESSAGE,
} from '../constants/type';

const token = 'someToken';

export function getMessages(): function {
	return (dispatch): void => dispatch({
		type: GET_MESSAGES,
		payload: {
			request: {
				url: `/?token=${token}`,
			},
		},
	});
}

export function getTimeMessages(time: string):function {
	return (dispatch): void => dispatch({
		type: GET_TIME_MESSAGES,
		payload: {
			request: {
				url: `/?since=${time}&limit=10&token=${token}`,
			},
		},
	});
}

export function sendMessage(data: {[string]: string}):function {
	return (dispatch): void => dispatch({
		type: SEND_MESSAGE,
		payload: {
			request: {
				method: 'POST',
				url: '/',
				headers: {
					'Content-Type': 'application/json',
					token,
				},
				data: JSON.stringify(data),
			},
		},
	});
}
