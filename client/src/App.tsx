import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { io } from "socket.io-client";
import Chat from "./components/Chat";
import ProfileModal from "./components/ProfileModal";
const socket = io("http://localhost:3001");

interface Message {
  from: String;
  content: String;
}

interface Users {
  [user: { userId: string; image: string }];
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState<Users>([]);
  const [profile, setProfile] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [image, setImage] = useState("");
  const [username, setUsername] = useState("")

  const handleText = () => {
    if (message == "") return;
    socket.emit("send_message", {
      from: socket.id,
      to: selectedUser,
      content: message,
    });
    setMessages((prev) => [
      ...prev,
      {
        from: socket.id,
        content: message,
      },
      
    ]);
    setMessage("");
  };

  const handleModification = () => {
    socket.emit("user_modification", {
      userId: socket.id,
      image,
      username
    });
  };

  useEffect(() => {
    // connected and disconnected event
    socket.on("connected", ({ users }) => {
      const yourProfile = users.filter((user) => user.userId == socket.id);
      const newUsers = users.filter((user) => user.userId !== socket.id);
      setProfile(yourProfile);
      setUsers(newUsers);
      console.log(users);
    });

    //
    socket.on("private_message", ({ from, content }: Message) => {
      if (selectedUser !== from) return;

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

  return (
    <div className="relative flex h-[100vh] text-lg">
      <Sidebar
        users={users}
        profile={profile}
        setSelectedUser={setSelectedUser}
        setShowProfileModal={setShowProfileModal}
      />
      <Chat
        selectedUser={selectedUser}
        messages={messages}
        message={message}
        setMessage={setMessage}
        handleText={handleText}
      />
      {showProfileModal && (
        <ProfileModal
          profile={profile}
          setImage={setImage}
          setUsername={setUsername}
          handleModification={handleModification}
        />
      )}
    </div>
  );
}

export default App;
