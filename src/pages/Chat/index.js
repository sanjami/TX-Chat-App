// @flow

import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
// import components
import Title from '../../components/Title/index';
// import actions
import { getMessages, getTimeMessages, sendMessage } from '../../modules/actions/MessagesActions';

type Props = {
	messages: Array<Object>,
	getMessages: () => void;
	getTimeMessages: (number) => void,
	sendMessage: ({[string]: string}) => void,
}

function Chat(props: Props): any {
	const {
		messages,
		getMessages: getMessagesAction,
		getTimeMessages: getTimeMessagesAction,
		sendMessage: sendMessageAction,
	} = props;

	const [message, setMessage] = useState('');
	const [messageSent, setMessageSent] = useState(false);
	const [refreshTime, setRefreshTime] = useState(Date.now());

	const messageEnd = useRef(null);

	const author = localStorage.getItem('myChatUsername');

	const scrollToBottom = () => {
		messageEnd?.current?.scrollIntoView({ behavior: 'smooth' });
	};

	// get all messages

	useEffect(() => {
		getMessagesAction();
	}, []);

	// get 10 messages, simulate life reload

	useEffect(() => {
		async function getRecentMessages() {
			const res = await getTimeMessagesAction(refreshTime);
			if (res?.payload?.data?.length === 10) {
				// if there are more than 10 messages, set refreshTime and get more
				const lastMsg = res.payload.data[9];
				setRefreshTime(lastMsg.timestamp);
			}
		}
		getRecentMessages();
	}, [refreshTime]);

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	// set message

	const handleMessageInput = (e) => {
		setMessage(e.target.value);
	};

	// submit sending message

	const submitMessage = async (e) => {
		e.preventDefault();
		const data = { message, author };
		const res = await sendMessageAction(data);
		console.log(res);
		setRefreshTime(Date.now());
		setMessageSent(!messageSent);
	};

	return (
		<div>
			<Title />
			{messages.map((el) => (
				<div key={el._id}>
					<p>{el.author}</p>
					<p>{el.message}</p>
					<p>{el.timestamp}</p>
				</div>
			))}
			<div>
				<form onSubmit={submitMessage}>
					<input
						placeholder="Message"
						onChange={handleMessageInput}
						required
						maxLength="256"
					/>
					<button
						type="submit"
					>
						Send
					</button>
				</form>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
	messages: state.messages.messages,
});

const mapDispatchToProps = {
	getMessages,
	getTimeMessages,
	sendMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
