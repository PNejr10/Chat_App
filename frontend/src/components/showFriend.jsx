/* eslint-disable react/prop-types */
// Updated showFriend component with PascalCase
import '../styles/ShowFriend.css';

export default function ShowFriend(props) {
   
  return (
    
    
    
    <div className="showFriend">
      {/* eslint-disable-next-line react/prop-types */}
      <h5>Name: {props.Name}</h5>
      <h5>Username: {props.User}</h5>
    </div>
  );
}
