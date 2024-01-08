import { curUser, user_secret } from '../context'
import React, { useState } from 'react'
import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import { useSnackbar } from "notistack";
import { User_Friends, projectID } from '../context';


const DirectChatPage = () => {

	const [username, setUsername] = useState('')
	const [vlaid, setValid] = useState(false)
	const { enqueueSnackbar } = useSnackbar();


	function createDirectChat(creds) {
		for (let i = 0; i < User_Friends.length; i++ ){
			if (username === User_Friends[i].Name){
				setValid(true)
				break
			}
		}
		if (username.length>0 && !vlaid){
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
