import { combineReducers } from 'redux';
// import reducers
import messagesReducer from './MessagesReducer';

const rootReducer = combineReducers({
	messages: messagesReducer,
});
export default rootReducer;
