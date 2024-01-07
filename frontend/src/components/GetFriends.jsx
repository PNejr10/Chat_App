import axios from 'axios';
import { useState, useEffect } from "react";
import { Set_User_Friends, User_Friends } from "../context";

export default function GetFriends(data){
 // res is the list of all the people that have the username that user searched
 let [res, setRes] = useState([]);

 // the User's friend's List
 let [friendList, setFriendList] = useState([]);
 let [friendInfo, setFriendInfo] = useState([]);

 if (data.User == "") {
   enqueueSnackbar("Search Bar Empty!", { variant: "error" });
   return;
 }
 axios.post("http://localhost:1010/search", data).then((response) => {
  setRes(response.data);
 });

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
    Set_User_Friends(friendInfoResults);
  } catch (error) {
    console.error("Error fetching friend info:", error);
  }
};
fetchFriendInfo();
 


}