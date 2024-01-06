import "./AddFrined.css";
import NavBar from "../components/NavBar";
import { useState, useEffect, useRef  } from "react";
import axios from "axios";
import { uID, curUser } from "../context";
import Friends from "../components/Friends";
import { useSnackbar } from "notistack";

export default function AddFriend() {
  useEffect(() => {
    if (curUser === "") {
      enqueueSnackbar("Please Sign in!", { variant: "error" });
      navigate("/");
    }
  }, []);

  
  // form data
  const [data, setData] = useState({ User: "", Type: "Username" });
  // res is the list of all the people that have the username that user searched
  let [res, setRes] = useState([]);
  // this just controlls whather or not to show the search bar or the result page
  let [show, setShow] = useState(false);
  // the User's friend's List
  let [friendList, setFriendList] = useState([]);
  let [friendInfo, setFriendInfo] = useState([]);
  const didMountRef = useRef(false);
 
  

  const { enqueueSnackbar } = useSnackbar();

  // this functions finds all the users that have the entered username
  function handleSubmit(event) {
    event.preventDefault();
    if (data.User == "") {
      enqueueSnackbar("Search Bar Empty!", { variant: "error" });
      return;

    }
    console.log(data)
    axios.post("http://localhost:1010/search", data).then((response) => {
      console.log('here')
      console.log(response.data)
      setRes(response.data);
      if (res) setShow(!show);
    });
    
  }

  function HandleChange(event) {
    setData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleClick() {
    setShow(!show);
  }


  function handleFriendClick(friend) {
    // Check if the friend is already in the friendList
    if (!friendList.some((f) => f === friend.id)) {
      // Add the friend to the friendList
      setFriendList((prevFriendList) => [...prevFriendList, friend.id]);
    } else {
      // Remove the friend from the friendList
      setFriendList((prevFriendList) =>
        prevFriendList.filter((f) => f !== friend.id)
      );
    }
    const data = {
      id: uID,
      friendId: friend.id,
    };
    axios
      .post("http://localhost:1010/AddRemoveFriend", data)
      .then((response) => {
        console.log(response.data);
      });
  }

  // this gets the current user's friend list from the DB and sets it to FriendList array
  useEffect(() => {
    const fetchFriendList = async () => {
      
      try {
        const data = { id: uID, Type: "id" };
        const response = await axios.post("http://localhost:1010/search", data);
        setFriendList(response.data[0].friends);
      } catch (error) {
        console.error("Error fetching friend list:", error);
      }
    };
  
    fetchFriendList();
  },[]);

  

  const FriendElements = res.map((friend) => {
    if (friend._id === uID) {
      return null;
    }
    let t = "";
    if (friendList.includes(friend._id)) {
      t = "Remove";
    } else {
      t = "Add";
    }

    return (
      // eslint-disable-next-line react/jsx-key
      <Friends
        Name={friend.Name}
        User={friend.User}
        id={friend._id}
        text={t}
        onFriendClick={handleFriendClick}
      />
    );
  });

  useEffect(() => {
      const fetchFriendInfo = async () => {
        const friendInfoPromises = friendList.map(async (friendId) => {
          const data = { id: friendId, Type: "id" };
          const response = await axios.post(
            "http://localhost:1010/search",
            data
          );
          return response.data[0];
        });

        try {
          const friendInfoResults = await Promise.all(friendInfoPromises);
          setFriendInfo(friendInfoResults);
        } catch (error) {
          console.error("Error fetching friend info:", error);
        }
      };
      fetchFriendInfo();

  }, [friendList]);


  const AllFriends = friendInfo.map((friend) => (
    friend && <Friends 
    Name={friend.Name}
    User={friend.User}
    id={friend._id}
    text={"Remove"}
    show= {false}
    onFriendClick={handleFriendClick}
    />
  ));



  return (
    <>
      <NavBar />
     
     <div className='main-page'>
      <div className="test">
        {AllFriends}
      </div>
      <div className="main-Friend"> 
      {!show && (
        <div className="search">
          <form onSubmit={handleSubmit}>
            <h1>Enter a Username to add the Friend</h1>
            <input
              type="text"
              placeholder="Username"
              autoComplete="off"
              name="User"
              value={data.User}
              autoFocus
              onChange={HandleChange}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      )}
      {show && (
        <div className="list">
          <i className="gg-close-o" onClick={handleClick}></i>
          {FriendElements}
        </div>
      )}
      </div>
      </div>
    </>
  );
}
