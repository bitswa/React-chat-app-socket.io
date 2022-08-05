import React from "react";

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

      <div className="p-2 h-[60px]">
        <form
      className="border flex justify-between p-2"
        onSubmit={(e) => {
          e.preventDefault();
          props.handleText();
        }}
      >
        <input
        className="w-full outline-none"
          type="text"
          onChange={(e) => props.setMessage(e.target.value)}
          placeholder="type..."
        />
        <button>Send</button>
      </form>
      </div>
      
    </div>
  );
}
export default Chat;
