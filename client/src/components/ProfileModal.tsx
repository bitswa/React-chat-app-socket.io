import { useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import CheckIcon from "./CheckIcon";
import CloseIcon from "./CloseIcon";
import PencilIcon from "./PencilIcon";

interface Context {
  profile: {
    userId: string;
    username: string;
    image: string;
  };
  setImage: (value: string) => void;
  setUsername: (value: string) => void;
  handleModification: () => void;
}

function ProfileModal() {
  const { setImage, setUsername, handleModification, profile } =
    useContext<Context>(AppContext);

  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const [showChangeImage, setShowChangeImage] = useState(false);

  return (
    <>
      {profile?.map(({ image, userId }) => {
        return (
          <div
            key={userId}
            className="absolute flex p-5 pt-10 bg-slate-500 top-0 left-0 translate-x-[20vw] translate-y-[50vh]"
          >
            <div className="relative">
              <div className="absolute top-0 left-0 translate-x-[50%] translate-y-[-100%] w-[120px]">
                <img className=" rounded-full" src={image} alt="" />
              </div>
            </div>
            <div className="flex flex-col">
              <span>
                <label>
                  username
                  <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={!showChangeUsername}
                  />
                </label>

                {showChangeUsername ? (
                  <>
                    <button
                      onClick={() => {
                        handleModification();
                        setShowChangeUsername(false);
                      }}
                    >
                      <CheckIcon />
                    </button>
                    <button onClick={() => setShowChangeUsername(false)}>
                      <CloseIcon />
                    </button>
                  </>
                ) : (
                  <button onClick={() => setShowChangeUsername(true)}>
                    <PencilIcon />
                  </button>
                )}
              </span>
              <span>
                <label>
                  Image
                  <input
                    type="text"
                    onChange={(e) => setImage(e.target.value)}
                    disabled={!showChangeImage}
                  />
                </label>

                {showChangeImage ? (
                  <>
                    <button
                      onClick={() => {
                        setShowChangeImage(false);
                        handleModification();
                      }}
                    >
                      <CheckIcon />
                    </button>
                    <button onClick={() => setShowChangeImage(false)}>
                      <CloseIcon />
                    </button>
                  </>
                ) : (
                  <button onClick={() => setShowChangeImage(true)}>
                    <PencilIcon />
                  </button>
                )}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default ProfileModal;
