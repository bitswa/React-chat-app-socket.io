import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../contexts/AppContext";
import Message from "./Message";
import SendIcon from "./SendIcon";

interface Context {
  message: string;
  messages: [
    {
      from: {
        id: string;
        username: string;
        image: string;
      };
      content: string;
    }
  ];
  handleText: () => void;
  setMessage: (value: string) => void;
  selectedUser: string;
}

interface Emojis {
  character: string;
  codePoint: string;
}

function Chat() {
  const { message, messages, handleText, setMessage, typing, selectedUser } =
    useContext<Context>(AppContext);

  const [emojis, setEmojis] = useState<Emojis[]>([]);
  const [showEmojisModal, setShowEmojiModal] = useState(false);
  const [emoji, setEmoji] = useState(0);

  useEffect(() => {
    fetch(
      `https://emoji-api.com/emojis?access_key=${
        import.meta.env.VITE_EMOJI_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => setEmojis(data));
    setEmoji(parseInt(Math.random() * 100));
  }, []);

  return (
    <div className="w-full flex flex-col justify-between bg-zinc-800 rounded-md">
      <div className="h-[80px] border-b border-zinc-700 flex flex-col items-start justify-center p-4">
        <h1>with: {selectedUser.username}</h1>
        
          <p className="text-sm text-gray-500">{typing}</p>
        
      </div>

      <div className="h-full p-2">
        {messages?.map(({ from, content }, index) => {
          return <Message key={index} from={from} content={content} />;
        })}

        {!messages?.length && (
          <div className="w-full h-full grid place-items-center">
            <h1 className="">0 messages, empty.</h1>
          </div>
        )}
      </div>

      <div className=" p-2 h-[60px]">
        <form
          className=" flex rounded-md  justify-between h-full bg-zinc-700"
          onSubmit={(e) => {
            e.preventDefault();
            handleText();
          }}
        >
          <input
            className="w-full h-full rounded-l-md px-2 outline-none bg-transparent"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="type..."
          />
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEmojiModal((prev) => !prev)}
              className="h-full p-2"
            >
              {emojis[emoji]?.character}
            </button>
            {showEmojisModal && (
              <div className="absolute rounded-md grid grid-cols-6 overflow-y-auto h-[210px] w-max top-0 left-0 bg-zinc-600 translate-x-[-60%] translate-y-[-110%]">
                {emojis?.slice(0, 100).map((emoji) => {
                  return (
                    <button
                      key={emoji.codePoint}
                      type="button"
                      onClick={() => {
                        setMessage((prev: string) => prev + emoji.character);
                        setShowEmojiModal(false);
                      }}
                      className=" p-2 hover:bg-zinc-500 rounded-lg text-sm"
                    >
                      {emoji.character}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button className="h-full p-2" type="submit">
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
export default Chat;
