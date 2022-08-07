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
    <div className="flex border p-2">
      <div className="mr-2">
        <img className="rounded-full w-[50px]" src={from?.image} alt="" />
      </div>
      <div>
        {from?.username == "" ? from?.id : from?.username}
        <p>{content}</p>
      </div>
    </div>
  );
}

export default Message;
