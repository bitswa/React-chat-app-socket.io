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
    <div>
      <div>
        <h1>Chat with: {props.selectedUser}</h1>
      </div>
      <div>
        {props.messages?.map((msg, index) => {
          return (
            <div key={index}>
              <div>{msg.from}</div>
              {msg.content}
            </div>
          );
        })}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.handleText();
        }}
      >
        <input
          type="text"
          onChange={(e) => props.setMessage(e.target.value)}
          placeholder="type..."
        />
        <button>Send</button>
      </form>
    </div>
  );
}
export default Chat;
