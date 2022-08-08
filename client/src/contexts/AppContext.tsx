import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../database";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
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
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState<Users[]>([]);
  const [profile, setProfile] = useState<Profile[]>([]);
  const [selectedUser, setSelectedUser] = useState("");

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("");

  const [user, setUser] = useState({});

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

  const createUserData = async () => {
    await setDoc(doc(db, "users", user.uid), {
      username: "",
      image: "",
    });
  };

  const createUserEmailPassword = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  const loginWithEmailPassword = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleModification = () => {
    socket.emit("user_modification", {
      userId: socket.id,
      image,
      username,
    });
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      setUser(JSON.parse(localUser));
    }
  }, []);

  useEffect(() => {
    // connected and disconnected event
    socket.on("connected", ({ users }) => {
      const yourProfile = users.filter(
        (user: Users) => user.userId == socket.id
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

  // useEffect(() => {
  //   const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
  //     console.log("Current data: ", doc.data());
  //   });
  // }, [user]);

  return (
    <AppContext.Provider
      value={{
        showProfileModal,
        setShowProfileModal,
        profile,
        selectedUser,
        setSelectedUser,
        users,
        setImage,
        setUsername,
        handleModification,
        message,
        messages,
        setMessage,
        handleText,
        createUserEmailPassword,
        loginWithEmailPassword,
        user,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export default AppContextProvider;
