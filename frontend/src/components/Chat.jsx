import { curUser, user_secret } from '../context'
import React, { useState } from 'react'
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import { useSnackbar } from "notistack";
import { User_Friends, projectID } from '../context';
// you can import the styles for the chat component by uncommenting the line below
// but I like the default style better
// import '../styles/chat.css'

const DirectChatPage = () => {

	const [username, setUsername] = useState('')
	// const [valid, setValid] = useState(false)
	const { enqueueSnackbar } = useSnackbar();


	function check (){
		for (let i = 0; i < User_Friends.length; i++ ){
			if (username == User_Friends[i].User){
				return true
			}
		}
		return false

	}

	function createDirectChat(creds) {
		const valid = check()
		console.log(valid)
		if (username.length>0 && !valid){
			enqueueSnackbar(`${username} is not your friend. Please enter a friend's username!`, { variant: "error" });
			return
		}

		getOrCreateChat(
			creds,
			{ is_direct_chat: true, 
				
				usernames: [username] 
			
			},
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
			projectID={projectID}
			height = '93vh'
			renderNewChatForm={(creds) => renderChatForm(creds)}
		/>
	)
}

export default DirectChatPage;
