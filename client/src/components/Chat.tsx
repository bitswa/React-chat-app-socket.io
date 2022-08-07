import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import Message from "../pages/home/components/Message";

interface Props {
  selectedUser: string;
}

interface Emojis {
  character: string;
  codePoint: string;
}

function Chat({ selectedUser }: Props) {
  const { message, messages, handleText, setMessage } = useContext(AppContext);

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

  useEffect(() => {
    console.log(emojis.slice(0, 100));
  }, [emojis]);

  return (
    <div className="w-full flex flex-col justify-between">
      <div className="h-[60px] border flex items-center p-4">
        <h1>Chat with: {selectedUser}</h1>
      </div>

      <div className="h-full border">
        {messages?.map(({ from, content }, index) => {
          return <Message key={index} from={from} content={content} />;
        })}
      </div>

      <div className=" p-2 h-[60px]">
        <form
          className="border flex rounded-md  justify-between h-full"
          onSubmit={(e) => {
            e.preventDefault();
            handleText();
          }}
        >
          <input
            className="w-full h-full rounded-l-md px-2 outline-none"
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
              <div className="absolute grid grid-cols-6 overflow-y-auto h-[210px] w-max top-0 left-0 bg-slate-400 translate-x-[-60%] translate-y-[-110%]">
                {emojis?.slice(0, 100).map((emoji) => {
                  return (
                    <button
                      key={emoji.codePoint}
                      type="button"
                      onClick={() => {
                        setMessage((prev: string) => prev + emoji.character);
                        setShowEmojiModal(false);
                      }}
                      className="border p-1"
                    >
                      {emoji.character}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button className="h-full p-2" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
export default Chat;
