import { useState, useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import CheckIcon from "./CheckIcon";
import CloseIcon from "./CloseIcon";
import PencilIcon from "./PencilIcon";

interface Props {
  profile: [
    {
      userId: string;
      image: string;
      username: string;
    }
  ];
}

function ProfileModal({ profile }: Props) {
  const { setImage, setUsername, handleModification } = useContext(AppContext);

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
                <label htmlFor="">username</label>
                <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={!showChangeUsername}
                />

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
                <label htmlFor="">Image</label>
                <input
                  type="text"
                  onChange={(e) => setImage(e.target.value)}
                  disabled={!showChangeImage}
                />

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
