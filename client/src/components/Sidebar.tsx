import React, { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import ExitIcon from "./ExitIcon";
import MenuIcon from "./MenuIcon";

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
  const [userModal, setUserModal] = useState(false);

  const { setShowProfileModal, setSelectedUser, users, profile } =
    useContext<Context>(AppContext);

  return (
    <div className="border w-[80px] flex flex-col items-center p-2 py-4 gap-2 m-4 rounded-2xl">
      <div className="">
        <MenuIcon />
      </div>
      <span className="text-center flex flex-col">online: {users.length}</span>
      <ul className="h-[50%]">
        {users?.map(({ userId, image, username }) => {
          return (
            <li key={userId} className="relative my-2 flex">
              <button
                className="w-[50px] h-[50px] border rounded-full overflow-hidden"
                onClick={() => setUserModal((prev) => !prev)}
              >
                <img className="w-full" src={image} alt="user" />
              </button>
              {userModal && (
                <div className="absolute p-3 rounded-md flex flex-col w-max top-0 left-0 translate-x-[25%] translate-y-[-20%] bg-slate-400">
                  <span className="mb-4">
                    <h3>username: {username}</h3>
                    <h2>id: {userId}</h2>
                  </span>
                  <button
                    className="p-2 rounded-md bg-blue-300"
                    onClick={() => {
                      setSelectedUser(userId);
                      setUserModal(false);
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
      <div className="mt-auto flex flex-col items-center gap-3 border-t">
        <div className="flex mt-3">
          <button
            className="w-[50px] h-[50px] border rounded-full overflow-hidden"
            onClick={() => setShowProfileModal((prev) => !prev)}
          >
            <img
              key={profile.userId}
              className="w-full"
              src={profile.image}
              alt=""
            />
          </button>
        </div>
        <div className="">
          <button className="border w-full rounded-full p-3">
            <ExitIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
