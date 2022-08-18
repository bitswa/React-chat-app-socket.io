import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../contexts/AppContext";
import ExitIcon from "./ExitIcon";
import MenuIcon from "./MenuIcon";
import ProfileModal from "./ProfileModal";

interface Context {
  users: [
    {
      userId: string;
      image: string;
      username: string;
    }
  ];
  profile: {
    userId: string;
    image: string;
    username: string;
  };
  setShowProfileModal: (value: boolean) => void;
  setSelectedUser: (value: string) => void;
}

function Sidebar() {
  const {
    setShowProfileModal,
    showProfileModal,
    setSelectedUser,
    users,
    profile,
  } = useContext<Context>(AppContext);

  const [userModal, setUserModal] = useState("");
  const Navigate = useNavigate();

  return (
    <div className=" w-[80px] flex flex-col items-center p-2 py-4 gap-2 mr-4 rounded-md bg-zinc-800">
      <span className="text-center flex flex-col">online: {users.length}</span>
      <ul className="h-[50%]">
        {users?.map(({ userId, image, username }) => {
          return (
            <li key={userId} className="relative my-2 flex">
              <button
                className="w-[50px] h-[50px] rounded-full overflow-hidden"
                onClick={() => {
                  userModal === userId
                    ? setUserModal("")
                    : setUserModal(userId);
                  setShowProfileModal(false);
                }}
              >
                <img className="w-full" src={image} alt="user" />
              </button>
              {userModal === userId && (
                <div className="absolute p-3 rounded-md flex flex-col w-max translate-x-[28%] translate-y-[-20%] bg-zinc-600">
                  <span className="mb-4">
                    {username && <h3>username: {username}</h3>}
                    <h2>id: {userId}</h2>
                  </span>
                  <button
                    className="p-2 rounded-md bg-blue-500"
                    onClick={() => {
                      setSelectedUser(userId);
                      setUserModal("");
                      setShowProfileModal(false);
                    }}
                  >
                    Talk
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <div className="mt-auto flex flex-col items-center gap-3 border-t border-zinc-700">
        <div className="flex mt-3 relative">
          <button
            className="w-[50px] h-[50px] rounded-full overflow-hidden"
            onClick={() => {
              setShowProfileModal((prev) => !prev);
              setUserModal("");
            }}
          >
            <img
              key={profile.userId}
              className="w-full"
              src={profile.image}
              alt=""
            />
          </button>
          {showProfileModal && <ProfileModal />}
        </div>
        <div className="">
          <button
            className=" bg-red-500 w-full rounded-full p-3"
            onClick={() => {
              localStorage.removeItem("user");
              Navigate("/login");
            }}
          >
            <ExitIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
