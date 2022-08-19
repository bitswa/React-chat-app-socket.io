import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { FirebaseContext } from "./FirebaseContext";

const socket = io("http://localhost:3001");

interface Message {
  from: {
    id: string;
    image: string;
    username: string;
  };
  content: String;
}

interface Users {
  userId: string;
  image: string;
  username: string;
}

interface Profile {
  userId: string;
  image: string;
  username: string;
}

export const AppContext = createContext();

function AppContextProvider({ children }) {
  const { getUserData, setUser, updateUserData } = useContext(FirebaseContext);

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState<Users[]>([]);
  const [profile, setProfile] = useState({});
  const [selectedUser, setSelectedUser] = useState({});

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");

  const handleText = () => {
    if (message === "") return;

    socket.emit("send_message", {
      from: {
        id: socket.id,
        username,
        image,
      },
      to: selectedUser.id,
      content: message,
    });
    setMessages((prev) => [
      ...prev,
      {
        from: {
          id: socket.id,
          username,
          image,
        },
        content: message,
      },
    ]);
    setMessage("");
  };

  const handleModification = () => {
    if (username === "") return;
    updateUserData(image, username).then(() => runGetUserData());
  };

  const runGetUserData = async () => {
    const data = await getUserData();
    if (!data) return;

    const { newImage, newUsername } = data;

    if (newImage === image && newUsername === username) return;

    console.log(data);

    socket.emit("user_modification", {
      userId: socket.id,
      image: newImage,
      username: newUsername,
    });

    setImage(data?.newImage);
    setUsername(data?.newUsername);
  };

  useEffect(() => {
    console.log(profile);
  }, [profile]);

  useEffect(() => {
    setTimeout(runGetUserData, 1500);
  }, []);

  useEffect(() => {
    //connected and disconnected event
    socket.on("connected", ({ users }) => {
      users.filter((user: Users) => {
        if (user.userId !== socket.id) return;

        const { userId, image, username } = user;

        setImage(image);
        setUsername(username);
        setProfile({
          userId,
          image,
          username,
        });
      });

      const newUsers = users.filter((user: Users) => user.userId !== socket.id);

      setUsers(newUsers);
      console.log(users);
    });

    // receiving message from server
    socket.on("private_message", ({ from, content }: Message) => {
      if (selectedUser.id !== from.id) return;

      setMessages((prev) => [
        ...prev,
        {
          from,
          content,
        },
      ]);
    });
  }, [socket, selectedUser]);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        showProfileModal,
        setShowProfileModal,
        selectedUser,
        setSelectedUser,
        message,
        setMessage,
        profile,
        users,
        setImage,
        image,
        setUsername,
        username,
        handleModification,
        messages,
        handleText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export default AppContextProvider;
