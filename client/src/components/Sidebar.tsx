import React, { useState } from "react";
import ExitIcon from "./ExitIcon";
import MenuIcon from "./MenuIcon";

interface Props {
  profile: [
    {
      userId: string;
      image: string;
      username: string;
    }
  ];
  users: [];
  setSelectedUser: (value: string) => void;
}

function Sidebar(props: Props) {
  const [userModal, setUserModal] = useState(false);

  return (
    <div className="border w-[80px] flex flex-col items-center p-2 py-4 gap-2">
      <div className="">
        <MenuIcon />
      </div>
      <ul className="h-[30%]">
        <span className="text-center flex flex-col">
          online: {props.users.length}
        </span>
        {props?.users?.map(({ userId, image, username }) => {
          return (
            <li key={userId} className="relative my-2 flex">
              <button
                className="w-[50px] border rounded-full overflow-hidden"
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
                      props.setSelectedUser(userId);
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
      <div className="mt-auto flex flex-col items-center gap-2">
        <div className="flex">
          <button
            className="w-[50px] border rounded-full overflow-hidden"
            onClick={() => props.setShowProfileModal((prev) => !prev)}
          >
            {props?.profile?.map((profile) => {
              return (
                <img
                  key={profile.userId}
                  className="w-full"
                  src={profile.image}
                  alt=""
                />
              );
            })}
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
