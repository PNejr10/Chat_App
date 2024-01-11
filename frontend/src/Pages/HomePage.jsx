/* eslint-disable react-hooks/exhaustive-deps */
import "../styles/home.css";
import { useEffect, useState } from "react";
import { curUser, user_secret } from "../context";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { uID, User_Friends } from "../context";
import ShowFriend from "../components/showFriend";
import { PropagateLoader } from 'react-spinners'
import DirectChatPage from "../components/Chat";




export default function HomePage() {

  let [show, setShow] = useState(false)
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  // const [friendList, setFriendList] = useState([]);
  // const [friendInfo, setFriendInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (curUser === "") {
      enqueueSnackbar("Please Sign in!", { variant: "error" });
      navigate("/");
    }
  }, []);



  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.post("http://localhost:1010/search", { id: uID, Type: "id" });
  //       setFriendList(response.data[0].friends);
  //     } catch (error) {
  //       console.error("Error fetching friend list:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);



  // useEffect(() => {
  //   const fetchFriendInfo = async () => {
  //     setLoading(true);
  //     try {
  //       const friendInfoPromises = friendList.map(async (friendId) => {
  //         const response = await axios.post("http://localhost:1010/search", { id: friendId, Type: "id" });
  //         return response.data[0];
  //       });
  //       const friendInfoResults = await Promise.all(friendInfoPromises);
  //       setFriendInfo(friendInfoResults);
  //     } catch (error) {
  //       console.error("Error fetching friend info:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (friendList.length > 0) {
  //     fetchFriendInfo();
  //   }
  // }, [friendList]);


  const AllFriends = User_Friends.map((friend) => (
    friend && <ShowFriend 
      User={friend.User} key={friend.id} Id={friend._id} 
      Name={friend.Name}
    />
  ));

  function hide(){
      setShow(!show)
    }
  


  return (
    <>
      <NavBar />
     
      <div className="homePage">
      <i className="gg-menu-left-alt" onClick={hide} ></i>
      {show == true && (<div className="Friend">
     
          <h4>{User_Friends.length} Friends</h4>
          {AllFriends}
        </div>
        )}
        <div className="home">
         <DirectChatPage />
        </div>
        {loading && (
          <div className="loader">
            <PropagateLoader color="#004225" />
          </div>
        )}
      </div>
    </>
  );
}
