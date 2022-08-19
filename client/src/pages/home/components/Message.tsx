import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import TrashIcon from "./TrashIcon";

interface Props {
  from: {
    id: string;
    username: string;
    image: string;
  };
  content: string;
}

function Message({ from, content }: Props) {
  return (
    <div className="flex p-2 hover:bg-zinc-600 rounded-md hover_message">
      <div className="mr-2">
        <img className="rounded-full w-[50px]" src={from?.image} alt="" />
      </div>
      <div className="flex justify-between w-full">
        <div>
          {from?.username == "" ? from?.id : from?.username}
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
