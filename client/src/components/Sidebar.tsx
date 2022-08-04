import React, { useState } from "react";
import ExitIcon from "./ExitIcon";
import MenuIcon from "./MenuIcon";

function Sidebar(props) {
  const [userModal, setUserModal] = useState(false);

  return (
    <div className="border flex flex-col items-center p-2 py-4 gap-3">
      <div className="">
        <MenuIcon />
      </div>
      <ul className="overflow-y h-[30%]">
        {props?.users?.map((userId: string) => {
          return (
            <li className="relative my-2">
              <button className="border rounded-full overflow-hidden" onClick={() => setUserModal((prev) => !prev)}>
                <img
                  className="w-full"
                  src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"
                  alt="user"
                />
              </button>
              {userModal && (
                <div className="absolute left-0 top-0 translate-x-[35%] translate-y-[-20%]">
                  <span>
                    <h3>username: {userId}</h3>
                  </span>
                  <button onClick={() => props.setSelectedUser(userId)}>
                    Talk
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      <div className="mt-auto">
        <button className="border rounded-full p-3">
          <ExitIcon />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
