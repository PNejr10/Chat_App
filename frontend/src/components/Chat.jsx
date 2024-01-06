import { curUser, user_secret } from '../context'
import React, { useState } from 'react'
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'


const DirectChatPage = () => {
	const [username, setUsername] = useState('')

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

	function renderChatForm(creds) {
		return (
			<div>
				<input 
					placeholder='Username' 
					value={username} 
					onChange={(e) => setUsername(e.target.value)} 
				/>
				<button onClick={() => createDirectChat(creds)}>
					Create
				</button>
			</div>
		)
	}

	return (
		<ChatEngine
			userName={curUser}
			userSecret={user_secret}
			projectID='
			8f4ef2ab-e0c0-4b83-9cc6-669c0a2a3195'
			height = '93vh'
			renderNewChatForm={(creds) => renderChatForm(creds)}
		/>
	)
}

export default DirectChatPage;
