import { useState } from "react";
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
  setImage: (value: string) => void;
  setUsername: (value: string) => void;
  handleModification: () => void;
}

function ProfileModal({
  profile,
  setImage,
  setUsername,
  handleModification,
}: Props) {
  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const [showChangeImage, setShowChangeImage] = useState(false);

  return (
    <>
      {profile?.map(({ image, userId }) => {
        return (
          <div
            key={userId}
            className="absolute flex p-5 pt-10 bg-slate-500 top-0 left-0 translate-x-[30vw] translate-y-[50vh]"
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
                    <button onClick={() => handleModification()}>
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
                    <button onClick={() => handleModification()}>
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
