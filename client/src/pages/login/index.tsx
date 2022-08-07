import KeyIcon from "./components/KeyIcon";
import UserIcon from "./components/UserIcon";

function Login() {
  return (
    <div className="h-[100vh] grid place-items-center bg-gray-800 text-white">
      <div className="w-auto text-center">
        <h1 className="text-2xl">Login</h1>
        <form className="flex flex-col gap-2 text-start" action="">
          <label htmlFor="">
            Username
            <span className="flex border rounded-md p-1">
              <UserIcon />
              <input className="outline-none px-2 bg-transparent" type="text" name="" id="" />
            </span>
          </label>
          <label htmlFor="">
            Password
            <span className="flex border rounded-md p-1">
              <KeyIcon />
              <input className="outline-none px-2 bg-transparent" type="password" />
            </span>
          </label>
          <div className="flex gap-2">
            <button className="border rounded-md p-2 w-full">Enter</button>
            <button className="border rounded-md p-2 w-full">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
