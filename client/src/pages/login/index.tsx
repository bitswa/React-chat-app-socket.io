import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseContext } from "../../contexts/FirebaseContext";
import KeyIcon from "./components/KeyIcon";
import UserIcon from "./components/UserIcon";

interface Context {
  createUserEmailPassword: (value: string, value2: string) => void;
  loginWithEmailPassword: (value: string, value2: string) => void;
}

function Login() {
  const { createUserEmailPassword, loginWithEmailPassword } =
    useContext<Context>(FirebaseContext);

  const Navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) return Navigate("/");
  }, []);

  return (
    <div className="h-[100vh] grid place-items-center bg-gray-800 text-white">
      <div className="w-auto text-center">
        <h1 className="text-2xl">Login</h1>
        <form
          className="flex flex-col gap-2 text-start"
          onSubmit={(e) => {
            e.preventDefault();
            if (email === "" || password === "") return;
            loginWithEmailPassword(email, password);
          }}
        >
          <label>
            Email
            <span className="flex border rounded-md p-1">
              <UserIcon />
              <input
                className="outline-none px-2 bg-transparent"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </span>
          </label>
          <label>
            Password
            <span className="flex border rounded-md p-1">
              <KeyIcon />
              <input
                className="outline-none px-2 bg-transparent"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </span>
          </label>
          <div className="flex gap-2">
            <button className="border rounded-md p-2 w-full">Enter</button>
            <button
              className="border rounded-md p-2 w-full"
              onClick={() => createUserEmailPassword(email, password)}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
