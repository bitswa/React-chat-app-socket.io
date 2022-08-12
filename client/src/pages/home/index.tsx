import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";

import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import ProfileModal from "../../components/ProfileModal";

interface Context {
  selectedUser: string;
  showProfileModal: boolean;
}

function Home() {
  const { selectedUser, showProfileModal } = useContext<Context>(AppContext);

  return (
    <div className="relative font-poppins flex h-[100vh] text-lg">
      <Sidebar />
      {selectedUser && <Chat />}
      {showProfileModal && <ProfileModal />}
    </div>
  );
}
export default Home;
