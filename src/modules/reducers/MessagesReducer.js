// @flow

const initialState = {
	messages: [],
	loading: false,
};
export type Message = {
	author: string,
	message: string,
	timestamp: number,
	token: string,
	_id: string,
}
export type MessageState = {
	messages: Array<Message>,
	loading: boolean,
}

type MessageAction = {
    type:
	| 'SEND_MESSAGE'
	| 'SEND_MESSAGE_SUCCESS',
	payload: {
		data: Message,
	},
}

type MessagesAction = {
    type:
	| 'GET_MESSAGES'
    | 'GET_MESSAGES_SUCCESS'
    | 'GET_TIME_MESSAGES'
	| 'GET_TIME_MESSAGES_SUCCESS',
	payload: {
		data: Array<Message>,
	},
}
type Action = MessageAction | MessagesAction;

// fake reducer until response from the backend

function messagesReducer(state: MessageState = initialState, action: Action): MessageState {
	switch (action.type) {
	case 'GET_MESSAGES':
		return {
			...state,
			loading: true,
		};
	case 'GET_MESSAGES_SUCCESS':
		return {
			...state,
			loading: false,
			messages: action.payload.data,
		};
	case 'GET_TIME_MESSAGES':
		return {
			...state,
			loading: true,
		};
	case 'GET_TIME_MESSAGES_SUCCESS':
		return {
			...state,
			loading: false,
			messages: [...state.messages, ...action.payload.data],
		};
	case 'SEND_MESSAGE':
		return {
			...state,
			loading: true,
		};
	case 'SEND_MESSAGE_SUCCESS':
		return {
			...state,
			loading: false,
			messages: [...state.messages, action.payload.data],
		};
	default:
		return state;
	}
}

export default messagesReducer;
