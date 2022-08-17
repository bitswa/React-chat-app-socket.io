import { useState, useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import CheckIcon from "./CheckIcon";
import CloseIcon from "./CloseIcon";
import PencilIcon from "./PencilIcon";

interface Context {
  profile: {
    userId: string;
    username: string;
    image: string;
  };
  image: string;
  username: string;
  setImage: (value: string) => void;
  setUsername: (value: string) => void;
  handleModification: () => void;
}

function ProfileModal() {
  const {
    setImage,
    image,
    setUsername,
    username,
    handleModification,
    profile,
  } = useContext<Context>(AppContext);

  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const [showChangeImage, setShowChangeImage] = useState(false);

  return (
    <div className="absolute flex flex-col items-center gap-2 p-4 bg-zinc-600 rounded-md w-[calc(375px+5%)] translate-x-[20%] translate-y-[-70%]">
      <div className="w-[120px] h-[120px]">
        <img
          className="w-full h-full rounded-full"
          src={profile.image}
          alt=""
        />
      </div>

      <div className="flex flex-col w-full">
        <span className="flex flex-col">
          <label className="">username</label>
          <span className="flex gap-2">
            <input
              type="text"
              className="w-full outline-none bg-transparent border-b"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={!showChangeUsername}
            />

            {showChangeUsername ? (
              <div className="flex gap-2">
                <button
                  className="p-1 rounded-full bg-green-500"
                  onClick={() => {
                    handleModification();
                    setShowChangeUsername(false);
                  }}
                >
                  <CheckIcon />
                </button>
                <button
                  className="p-1 rounded-full bg-red-500"
                  onClick={() => setShowChangeUsername(false)}
                >
                  <CloseIcon />
                </button>
              </div>
            ) : (
              <button
                className="p-1 rounded-full bg-blue-400"
                onClick={() => setShowChangeUsername(true)}
              >
                <PencilIcon />
              </button>
            )}
          </span>
        </span>
        <span className="flex flex-col">
          <label>image</label>
          <span className="flex gap-2">
            <input
              type="text"
              className="w-full bg-transparent outline-none border-b"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              disabled={!showChangeImage}
            />
            {showChangeImage ? (
              <div className="flex gap-2">
                <button
                  className="p-1 rounded-full bg-green-500"
                  onClick={() => {
                    setShowChangeImage(false);
                    handleModification();
                  }}
                >
                  <CheckIcon />
                </button>
                <button
                  className="p-1 rounded-full bg-red-500"
                  onClick={() => setShowChangeImage(false)}
                >
                  <CloseIcon />
                </button>
              </div>
            ) : (
              <button
                className="p-1 rounded-full bg-blue-400"
                onClick={() => setShowChangeImage(true)}
              >
                <PencilIcon />
              </button>
            )}
          </span>
        </span>
      </div>
    </div>
  );
}
export default ProfileModal;
