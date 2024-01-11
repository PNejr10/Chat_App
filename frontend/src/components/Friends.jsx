/* eslint-disable react/prop-types */
import { useState } from 'react'
import '../styles/friends.css'
import { useSnackbar } from 'notistack';



export default function Friends (props){
    const { enqueueSnackbar } = useSnackbar();
    const [text, setText] = useState(props.text)



    function HandleClick() {
 
        if (text === 'Add') {
          setText('Remove');
          enqueueSnackbar('User added to the Friends List', { variant: 'success' });
        } else {
          setText('Add');
          enqueueSnackbar('User removed from the Friends List', { variant: 'error' });
      }
       
        props.onFriendClick({
          id: props.id,
          username: props.User,
        });
      }
    
   
   
    
    
    return(
        <div className="card">
            <h5>Name: {props.Name}  </h5>
            <h5>Username: {props.User}  </h5>
            <button onClick={HandleClick}>{text}</button>
        </div>
    )
}