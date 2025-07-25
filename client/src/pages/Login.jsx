import { useContext, useState } from "react";
import chat from "../assets/chat.png";
import { ChevronLeft } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentState == "Sign Up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currentState === "Sign Up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className="min-h-screen border-2 flex items-center justify-center gap-10 sm:justify-evenly max-sm:flex-col max-sm:px-10">
      {/* left */}
      <div className="flex flex-col items-center justify-center gap-2">
        <img src={chat} alt="" className="w-16" />
        <p className="text-gray-100 font-semibold text-2xl">HelloChat</p>
      </div>

      {/* right */}
      <form
        onSubmit={handleSubmit}
        className="border-2 bg-white/8 text-gray-100 border-gray-600 p-6 flex flex-col gap-6 rounded-lg shadow-lg w-sm max-sm:w-xs"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currentState}
          {isDataSubmitted && (
            <ChevronLeft
              onClick={() => setIsDataSubmitted(false)}
              className="cursor-pointer"
            />
          )}
        </h2>

        {currentState === "Sign Up" && !isDataSubmitted && (
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            type="text"
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full Name"
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Email Address"
              required
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Password"
              required
            />
          </>
        )}

        {currentState === "Sign Up" && isDataSubmitted && (
          <textarea
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            placeholder="Provide a bio..."
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-blue-600 to-violet-700 text-gray-100 rounded-md cursor-pointer"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="flex flex-col gap-2">
          {currentState === "Sign Up" ? (
            <p className="text-sm text-gray-400">
              Already have an account? &nbsp;
              <span
                onClick={() => {
                  setCurrentState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-blue-300 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Don't have an account? &nbsp;
              <span
                onClick={() => setCurrentState("Sign Up")}
                className="font-medium text-blue-300 cursor-pointer"
              >
                Create account
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
