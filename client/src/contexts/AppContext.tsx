import { createContext, useContext, useEffect, useState } from "react";

import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
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
  const { user, getUserData, setUser, updateUserData } =
    useContext(FirebaseContext);

  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState<Users[]>([]);
  const [profile, setProfile] = useState<Profile[]>([]);
  const [selectedUser, setSelectedUser] = useState("");

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
      to: selectedUser,
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

  const handleModification = async () => {
    console.log("modific");
    updateUserData(image, username);
    // socket.emit("user_modification", {
    //   userId: socket.id,
    //   image,
    //   username,
    // });
    test();
  };

  useEffect(() => {
    socket.on("test", () => {
      test()
    })
  }, [socket])

  useEffect(() => {
    // const getUserData = async () => {
    //   console.log(user);
    //   const docRef = doc(db, "users", auth.currentUser?.uid);
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     const { image, username } = docSnap.data();
    //     console.log("Document data:", docSnap.data());
    //     // setImage(image);
    //     // setUsername(username);
    //     // socket.emit("user_modification", {
    //     //   userId: socket.id,
    //     //   image,
    //     //   username,
    //     // });
    //     return { username, image };
    //   } else {
    //     // doc.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // };
  }, [socket]);

  useEffect(() => {
    console.log(image, username);
  }, [username, image]);

  const test = async () => {
    const data = await getUserData();
    if (!data) return;

    console.log(data);
    setImage(data?.image);
    setUsername(data?.username);

    socket.emit("user_modification", {
      userId: socket.id,
      image: data.image,
      username: data.username,
    });
  };
  useEffect(() => {
    // connected and disconnected event
    // socket.on("new_user", ({userId}) => {
    //   getUserData()
    //   socket.emit("received_new_user", {
    //     userId,
    //     image,
    //     username
    //   })
    // })

    socket.on("connected", ({ users }) => {
      const yourProfile = users.filter(
        (user: Users) => user.userId === socket.id
      );
      const newUsers = users.filter((user: Users) => user.userId !== socket.id);
      setProfile(yourProfile);
      yourProfile?.map((profile: Profile) => {
        setImage(profile.image);
        setUsername(profile.username);
      });
      setUsers(newUsers);
      console.log(users);
    });

    // receiving message from server
    socket.on("private_message", ({ from, content }: Message) => {
      if (selectedUser !== from.id) return;

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
    console.log(profile);
  }, [profile]);

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
        setUsername,
        handleModification,
        messages,
        handleText,
        test,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export default AppContextProvider;
