import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";

import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useNavigate } from "react-router-dom";

interface Context {
  selectedUser: string;
  setUser: (value: string) => void;
}

function Home() {
  const { selectedUser } = useContext<Context>(AppContext);
  const Navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (!localUser) return Navigate("/login");
    console.log(localUser);
  }, []);

  return (
    <div className="relative font-poppins flex h-[100vh] text-lg bg-zinc-700 p-4 text-white">
      <Sidebar />
      {selectedUser.id && <Chat />}
    </div>
  );
}
export default Home;
