import Head from "next/head";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useAppSelector } from "../store/hooks";
import { selectUser } from "../store/UserSLice";

const ChatEngine = dynamic(() =>
	import("react-chat-engine").then((module) => module.ChatEngine)
);

const Chat = () => {
	const { userId, email } = useAppSelector(selectUser);
	const [showChat, setShowChat] = useState(false);

	useEffect(() => {
		if (typeof document !== undefined) {
			setShowChat(true);
		}
	}, []);

	if (!showChat) return <div />;

	return (
		<>
			<Head>
				<title>Chat</title>
				<link rel="icon" href="/tconnotext.png" />
			</Head>
			<div>
				<ChatEngine
					height="calc(100vh - 65px)"
					projectID="48c2e8af-b857-4a4b-a2b0-3b9ac844e0fe"
					userName={email}
					userSecret={userId}
					onNewMessage={() =>
						new Audio(
							"https://chat-engine-assets.s3.amazonaws.com/click.mp3"
						).play()
					}
				/>
			</div>
		</>
	);
};

export default Chat;
