import express from "express";
import { UserDB } from "../models/UserModel.js";


const router = express.Router();

router.post("/new_user", async (req, res) => {
  try {
    console.log("Sign-up....")
    if (
      !req.body.Name ||
      !req.body.User ||
      !req.body.Email ||
      !req.body.Password
    ) {
      return res.status(400).send({
        message: "Fill in all the Required fileds",
      });
    }

    const NewUser = {
      Name: req.body.Name,
      User: req.body.User,
      Email: req.body.Email,
      Password: req.body.Password,
    };

    const user = await UserDB.create(NewUser);
    return res.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log("login....")
    const { User, Password } = req.body;

    const user = await UserDB.findOne({ User, Password });

    if (user) {
      const ret = {
        name: user.Name,
        id: user._id,
        password: user.Password
      };
      console.log(ret);
      res.status(200).send({ message: "Login successful", user: ret });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.post("/search", async (request, response) => {
  try {
    // console.log("Searching....")
    const friend = request.body;
    let users = "";

    if (friend.Type === "Username") {
      const User = friend.User;
      users = await UserDB.find({ User });
    } else if (friend.Type === "id") {
      const _id = friend.id;
      users = await UserDB.find({ _id });
    } else {
      return response.status(400).json({ message: "Invalid search type" });
    }

    response.status(200).send(users);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


router.post("/test", async (request, response) => {
  try {
    console.log(request.body.mes)
   
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// router.post("/update", async (req, res) => {
//   try {
//     const { userId, friendList } = req.body;
//     // Update the user's friendList in the database
//     const updatedUser = await UserDB.findByIdAndUpdate(
//       userId,
//       { $set: { friends: friendList } },
//       { new: true }
//     );

//     res.status(200).json(updatedUser);
//     console.log("Updated");
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.post("/AddRemoveFriend", async (req, res) => {
  try {
    console.log("Adding....")
    const { id, friendId } = req.body;
    const user = await UserDB.findById(id);
    const friend = await UserDB.findById(friendId);

    // We first check to see if the users are friends
    if (user.friends.includes(friendId)) {
      // if they are friends, we remove them from each others friend list
      // by removing the id from their friends's list
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((friendId) => friendId !== id);
    } else {
      // if not friend, we add the users id to the friends friend list
      // and vise verca
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// getting all the users
router.get("/users", async (request, response) => {
  const user = request.body;
  try {
    const users = await UserDB.find({ user });
    console.log(users.length);

    return response.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



export default router;
