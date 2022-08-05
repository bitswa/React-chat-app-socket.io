import React, { useEffect, useState } from "react";

interface Props {
  messages: [
    msg: {
      from: string;
      content: string;
    }
  ];
  selectedUser: string;
  handleText: () => void;
}

function Chat(props: Props) {
  const [emojis, setEmojis] = useState([]);
  const [showEmojisModal, setShowEmojiModal] = useState(false);

  useEffect(() => {
    fetch(
      `https://emoji-api.com/emojis?access_key=${import.meta.env.VITE_EMOJI_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setEmojis(data));
  }, []);

  useEffect(() => {
    console.log(emojis.slice(0, 100));
    console.log(emojis[0])
  }, [emojis]);

  return (
    <div className="w-full flex flex-col justify-between">
      <div className="h-[60px] border flex items-center p-4">
        <h1>Chat with: {props.selectedUser}</h1>
      </div>

      <div className="h-full border">
        {props.messages?.map((msg, index) => {
          return (
            <div key={index}>
              <div>{msg.from}</div>
              {msg.content}
            </div>
          );
        })}
      </div>

      <div className=" p-2 h-[60px]">
        <form
          className="border flex gap-4 justify-between h-full"
          onSubmit={(e) => {
            e.preventDefault();
            props.handleText();
          }}
        >
          <input
            className="w-full h-full outline-none"
            type="text"
            value={props.message}
            onChange={(e) => props.setMessage(e.target.value)}
            placeholder="type..."
          />
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEmojiModal((prev) => !prev)}
              className="h-full"
            >
              {emojis[Math.random(0, 10)]?.character}
            </button>
            {showEmojisModal && (
              <div className="absolute grid grid-cols-6 overflow-y-auto h-[210px] w-max top-0 left-0 bg-slate-400 translate-x-[-60%] translate-y-[-110%]">
                {emojis?.slice(0, 100).map((emoji) => {
                  return (
                    <button
                      key={emoji.codePoint}
                      type="button"
                      onClick={() => {
                        props.setMessage((prev) => prev + emoji.character);
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

          <button className="h-full" type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
export default Chat;
