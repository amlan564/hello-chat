import { ChevronLeft, Image, Info, Send } from "lucide-react";
import avatar from "../assets/avatar.png";
import chat from "../assets/chat.png";
import { useContext, useEffect, useRef, useState } from "react";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const {
    messages,
    selectedUser,
    setSelectedUser,
    sendMessage,
    getMessages,
    toggleSidebar,
  } = useContext(ChatContext);

  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();

  const [input, setInput] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendMessage({ text: input.trim() });
    setInput("");
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      await sendMessage({ image: reader.result });
      e.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="bg-[#242526] h-full overflow-y-scroll relative backdrop-blur-lg">
      {/* header area */}
      <div className="flex items-center gap-3 p-4 shadow-sm">
        <ChevronLeft
          onClick={() => setSelectedUser(null)}
          className=" text-gray-100 cursor-pointer md:hidden"
        />
        <img
          src={selectedUser.profilePic || avatar}
          alt=""
          className="w-8 aspect-square object-cover rounded-full"
        />
        <p className="flex-1 text-lg text-gray-100 flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 mt-1 rounded-full bg-green-500"></span>
          )}
        </p>
        <div className="tooltip tooltip-bottom tooltip-info" data-tip="Info">
          <Info
            onClick={() => toggleSidebar()}
            className="text-gray-100 cursor-pointer max-w-5"
          />
        </div>
      </div>

      {/* chat area */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-end justify-end gap-2 ${
              message.senderId !== authUser._id && "flex-row-reverse"
            }`}
          >
            {message.image ? (
              <img
                src={message.image}
                alt=""
                className="max-w-[250px] rounded-lg overflow-hidden mb-8"
              />
            ) : (
              <p
                className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-gradient-to-r from-blue-600 to-violet-700 text-white ${
                  message.senderId == authUser._id
                    ? "rounded-br-none"
                    : "rounded-bl-none"
                }`}
              >
                {message.text}
              </p>
            )}
            <div className="text-center text-xs">
              <img
                src={
                  message.senderId == authUser._id
                    ? authUser?.profilePic || avatar
                    : selectedUser?.profilePic || avatar
                }
                alt=""
                className="w-7 h-7 object-cover rounded-full"
              />
              <p className="text-gray-500">
                {formatMessageTime(message.createdAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={scrollEnd}></div>
      </div>

      {/* bottom area */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-4">
        <div className="flex-1 flex items-center bg-[#38393b] px-3 rounded-full">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handleSendMessage(e) : null)}
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm p-3 border-none outline-none rounded-lg text-gray-100 placeholder-gray-400"
          />
          <input
            onChange={handleSendImage}
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <Image className="w-5 mr-2 cursor-pointer text-neutral-400" />
          </label>
        </div>
        <button
          onClick={handleSendMessage}
          className="bg-gradient-to-r from-blue-600 to-violet-700 p-2 rounded-full cursor-pointer"
        >
          <Send className="text-gray-100" size={16} />
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen gap-2 bg-[#242526] max-md:hidden">
      <img src={chat} alt="" className="max-w-16" />
      <p className="text-lg font-medium text-gray-100">
        Chat anytime, anywhere
      </p>
    </div>
  );
};

export default ChatContainer;
