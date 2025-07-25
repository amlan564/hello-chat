import { useNavigate } from "react-router-dom";
import {
  EllipsisVertical,
  LogOut,
  MessageSquareMore,
  Search,
  SquarePen,
} from "lucide-react";
import avatar from "../assets/avatar.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { ChatContext } from "../../context/ChatContext.jsx";

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages,
  } = useContext(ChatContext);

  const { logout, onlineUsers } = useContext(AuthContext);

  const [input, setInput] = useState("");

  const navigate = useNavigate();

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div
      className={`h-full ${!selectedUser ? "max-md:h-screen" : ""} overflow-y-scroll text-white`}
    >
      <div className="p-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MessageSquareMore className="text-white" size={30} />
            <p className="text-white">HelloChat</p>
          </div>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button">
              <EllipsisVertical className="text-white  cursor-pointer" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-[#242526] text-gray-100 rounded-md z-1 w-50 p-2 shadow-sm"
            >
              <p
                onClick={() => navigate("/profile")}
                className="text-sm cursor-pointer font-semibold px-2 py-1.5 rounded flex items-center gap-2 hover:bg-[#3b3d3e]"
              >
                <SquarePen size={18} />
                Edit Profile
              </p>
              <hr className="m-2 border-t border-[#55585b]" />
              <p
                onClick={() => logout()}
                className="text-sm cursor-pointer font-semibold px-2 py-1.5 rounded flex items-center gap-2 hover:bg-[#3b3d3e]"
              >
                <LogOut size={18} />
                Logout
              </p>
            </ul>
          </div>
        </div>

        <div className="bg-[#38393b] rounded-full flex items-center gap-2 px-4 py-3 mt-5">
          <Search className="w-4 md:min-w-4" />
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-white text-sm placeholder-[#c8c8c8] flex-1"
            placeholder="Search User"
          />
        </div>
      </div>

      <div>
        {filteredUsers.map((user, index) => (
          <div
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            key={index}
            className={`relative flex items-center gap-2 p-3 mx-5 rounded cursor-pointer max-sm:text-sm ${
              selectedUser?._id === user._id && "bg-[#333334]"
            }`}
          >
            <img
              src={user?.profilePic || avatar}
              alt=""
              className="w-[40px] aspect-square object-cover rounded-full"
            />
            <div className="flex flex-col leading-6">
              <p>{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-green-400 text-xs">Online</span>
              ) : (
                <span className="text-neutral-400 text-xs">Offline</span>
              )}
            </div>
            {unseenMessages[user._id] > 0 && (
              <p className="absolute top-4 right-4 text-xs w-5 h-5 flex items-center justify-center rounded-full bg-blue-500">
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
