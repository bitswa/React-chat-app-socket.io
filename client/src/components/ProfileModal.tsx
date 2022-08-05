import { useState } from "react";
import CheckIcon from "./CheckIcon";
import CloseIcon from "./CloseIcon";
import PencilIcon from "./PencilIcon";

interface Props {
  profile: [
    user: {
      image: string;
      userId: string;
    }
  ];
}

function ProfileModal({ profile }: Props) {
  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const [showChangeImage, setShowChangeImage] = useState(false);

  return (
    <div className="absolute flex p-5 pt-10 bg-slate-500 top-0 left-0 translate-x-[50vw] translate-y-[50vh]">
      {profile?.map(({ image }) => {
        return (
          <>
            <div className="relative">
              <div className="absolute top-0 left-0 translate-x-[50%] translate-y-[-100%] w-[120px]">
                <img className=" rounded-full" src={image} alt="" />
              </div>
            </div>
            <div className="flex flex-col">
              <span>
                <input type="text" value={`username`} />

                {showChangeUsername ? (
                  <>
                    <button>
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
                <input type="text" placeholder="image url" />

                {showChangeImage ? (
                  <>
                    <button>
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
          </>
        );
      })}
    </div>
  );
}
export default ProfileModal;
