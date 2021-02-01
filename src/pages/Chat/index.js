// @flow

import React, { useState, useEffect, useRef } from 'react';
import type { Element } from 'react';
import { connect } from 'react-redux';
// import components
import Title from '../../components/Title/index';
// import actions
import { getMessages, getTimeMessages, sendMessage } from '../../modules/actions/MessagesActions';
// import types
import type { State } from '../../modules/constants/flowTypes';
import type { Message } from '../../modules/reducers/MessagesReducer';
// import styles
import styles from './assets/chat.module.scss';

type Value = {
	message: string,
	author: string,
}
type Props = {
	messages: Array<Message>,
	getMessages: () => void;
	getTimeMessages: (number) => void,
	sendMessage: (Value) => void,
}

function Chat(props: Props): Element<any> {
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

	const author = localStorage.getItem('myChatUsername') || '';

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

	// get 10 messages, simulate life reload, get 10 more messages on every 10s

	useEffect(() => {
		const timeout = setTimeout(() => {
			const t = new Date();
			setRefreshTime(t - 10000);
		}, 10000);

		return () => {
			clearTimeout(timeout);
		};
	});

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
		const data: Value = { message, author };
		await sendMessageAction(data);
		setMessage('');
		setRefreshTime(Date.now());
		setMessageSent(!messageSent);
	};

	// format time to local date/time format

	const formatDate = (timestamp: number) => {
		const locale: string = window.navigator.userLanguage || window.navigator.language;
		const options = {
			year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
		};
		const res = new Intl.DateTimeFormat(locale, options).format(timestamp);
		return res;
	};

	return (
		<>
			<Title />
			<div className={styles.chat}>
				<div className={styles.messages}>
					{messages.map((el) => (
						<div key={el._id} className={el.author === author ? `${styles.msg} ${styles.owner}` : `${styles.msg} ${styles.guest}`}>
							{el.author !== author && <p className={styles.sender}>{el.author}</p>}
							<p className={styles.content}>{el.message}</p>
							<p className={styles.sender}>{formatDate(el.timestamp)}</p>
						</div>
					))}
					<div style={{ float: 'left', clear: 'both' }} ref={messageEnd} />
				</div>
				<div className={styles.footer}>
					<div className={styles.newMessage}>
						<form onSubmit={submitMessage}>
							<input
								placeholder="Message"
								onChange={handleMessageInput}
								required
								maxLength="256"
								value={message}
							/>
							<button
								type="submit"
							>
								Send
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

const mapStateToProps = (state: State) => ({
	messages: state.messages.messages,
});

const mapDispatchToProps = {
	getMessages,
	getTimeMessages,
	sendMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
