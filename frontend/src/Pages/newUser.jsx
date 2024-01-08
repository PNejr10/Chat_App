import React from "react";
import "./login.css";
import { Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { setCurUser, setID, setUser_secret } from '../context'





export default function Login() {
  const [formData, setFormData] = React.useState({
    Name: "",
    User: "",
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  function HandleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
    
  }



  const createUser = async () => {
    const url = 'https://api.chatengine.io/users/';
    const headers = {
      'PRIVATE-KEY': '6468a958-577a-4315-88ba-5a61dfb16725',
    };
  
    const userData = {
      username: formData.User,
      first_name: formData.Name,
      last_name: '',
      secret: formData.Password,
    };
  
    try {
      const response = await axios.post(url, userData, { headers });
      console.log(response)
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };






  function handleSubmit(event) {
    event.preventDefault()
    axios.post('http://localhost:1010/new_user',formData)
    .then((response) => {
     
      enqueueSnackbar('User Created successfully', { variant: 'success' });
      setCurUser(formData.User)
      setID(response.data._id)
      setUser_secret(formData.Password)
      createUser();
      // GetFriends();
      navigate('/Home');
     
    })
    .catch((error) => {
      enqueueSnackbar('Error', { variant: 'error' });
      console.log(error);
      
    });


    
  }
  
  return (
    <div className="sc">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className="input-box">
            <input
              type="text"
              name="Name"
              placeholder="Name"
              onChange={HandleChange}
              value={formData.Name}
            />
          </div>

          <div className="input-box">
            <input
              type="text"
              name="User"
              placeholder="Username"
              onChange={HandleChange}
              value={formData.User}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              name="Email"
              placeholder="Email"
              onChange={HandleChange}
              value={formData.Email}
            />
          </div>

          <div className="input-box">
            <input
              type="password"
              name="Password"
              placeholder="Password"
              onChange={HandleChange}
              value={formData.Password}
            />
          </div>
          <button type="submit">Sign Up</button>
          <p>
          Already have an account? <Link to = "/"> LOGIN </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
