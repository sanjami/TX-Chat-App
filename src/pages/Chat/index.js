// @flow

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import actions
import { getMessages, getTimeMessages } from '../../modules/actions/MessagesActions';

type Props = {
	messages: Array<Object>,
	getMessages: () => void;
	getTimeMessages: (number) => void,
}

function Chat(props: Props): any {
	const {
		messages,
		getMessages: getMessagesAction,
		getTimeMessages: getTimeMessagesAction,
	} = props;

	const [refreshTime, setRefreshTime] = useState(Date.now());

	useEffect(() => {
		getMessagesAction();
	}, []);

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

	return (
		<div>
			<h3>Chat</h3>
			{messages.map((el) => (
				<div key={el._id}>
					<p>{el.author}</p>
					<p>{el.message}</p>
					<p>{el.timestamp}</p>
				</div>
			))}
		</div>
	);
}

const mapStateToProps = (state) => ({
	messages: state.messages.messages,
});

const mapDispatchToProps = {
	getMessages,
	getTimeMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
