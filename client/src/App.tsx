import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

interface Message {
  from: String;
  content: String;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

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

  useEffect(() => {
    // connected and disconnected event
    socket.on("connected", ({ users }) => {
      const newUsers = users.filter((user: string) => user !== socket.id);
      setUsers(newUsers);
      console.log(users);
      console.log("event");
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

  return (
    <div className="grid grid-cols-[0.075fr_1fr] h-[100vh]">
      <Sidebar users={users} setSelectedUser={setSelectedUser} />
      <div>
        <h1>Your socket: {socket.id}</h1>
        <h2>Chat with: {selectedUser}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleText();
          }}
        >
          <input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            placeholder="type..."
          />
          <button>Send</button>
        </form>
        {messages?.map((msg, index) => {
          return (
            <div key={index}>
              <div>{msg.from}</div>
              {msg.content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
