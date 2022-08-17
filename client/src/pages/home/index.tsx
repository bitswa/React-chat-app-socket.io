import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";

import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

interface Context {
  selectedUser: string;
}

function Home() {
  const { selectedUser } = useContext<Context>(AppContext);

  return (
    <div className="relative font-poppins flex h-[100vh] text-lg bg-zinc-700 p-4 text-white">
      <Sidebar />
      {selectedUser && <Chat />}
    </div>
  );
}
export default Home;
