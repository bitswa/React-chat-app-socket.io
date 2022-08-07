import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import ProfileModal from "../../components/ProfileModal";

function Home() {
  const { showProfileModal, profile, selectedUser } = useContext(AppContext);

  return (
    <div className="relative font-poppins flex h-[100vh] text-lg">
      <Sidebar profile={profile} />
      {selectedUser && <Chat selectedUser={selectedUser} />}

      {showProfileModal && <ProfileModal profile={profile} />}
    </div>
  );
}
export default Home;
