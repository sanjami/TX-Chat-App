import { createStore, applyMiddleware, compose } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';
import rootReducer from '../../modules/reducers';

const initialState = {};
const enhancers = [];

const client = axios.create({
	baseURL: 'https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0',
	responseType: 'json',
});

const middleware = [
	axiosMiddleware(client),
	thunk,
];

if (process.env.NODE_ENV === 'development') {
	if (typeof window.__REDUX_DEVTOOLS_EXTENSION__ === 'function') {
		enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
	}
}

const composedEnhancers = compose(
	applyMiddleware(...middleware),
	...enhancers,
);

export const store = createStore(
	rootReducer,
	initialState,
	composedEnhancers,
);

export default store;
