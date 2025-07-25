import { useContext, useEffect, useState } from "react";
import avatar from "../assets/avatar.png";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import { X } from "lucide-react";

const RightSidebar = () => {
  const { selectedUser, messages, isSidebarVisible, toggleSidebar } =
    useContext(ChatContext);

  const { logout, onlineUsers } = useContext(AuthContext);

  const [msgImages, setMsgImages] = useState([]);

  console.log(msgImages);

  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  return (
    selectedUser &&
    isSidebarVisible && (
      <div
        className={`bg-[#8185b2/10] text-gray-100 w-full h-screen relative overflow-y-scroll`}
      >
        {/* <div
          onClick={() => toggleSidebar()}
          className="ml-2 mt-3 tooltip tooltip-bottom p-2 flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-all" 
          data-tip="Info"
        >
          <X size={20} />
        </div> */}
        <div
          className="mt-5 ml-4 tooltip tooltip-bottom tooltip-error"
          data-tip="Close"
        >
          <X
            onClick={() => toggleSidebar()}
            className="text-gray-100 cursor-pointer max-w-5"
          />
        </div>
        <div className="pt-10 flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={selectedUser?.profilePic || avatar}
            alt=""
            className="w-20 aspect-square object-cover rounded-full"
          />
          <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
            {selectedUser.fullName}
          </h1>
          <p className="px-10 mx-auto text-sm">{selectedUser.bio}</p>
        </div>
        <div className="px-5 mt-10 text-xs">
          <p className="text-base">Media</p>
          <div className="mt-4 max-h-[200px] overflow-y-scroll grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-2">
            {msgImages.map((url, index) => (
              <div key={index}>
                <div
                  onClick={() => document.getElementById(index).showModal()}
                  className="cursor-pointer"
                >
                  <img
                    src={url}
                    alt=""
                    className="max-sm:w-30 max-sm:h-30 sm:w-35 sm:h-35 object-cover"
                  />
                </div>
                <dialog id={index} className="modal">
                  <div className="modal-box bg-[#1c1c1d] max-md:w-md max-w-3xl py-20">
                    <form method="dialog" className="modal-backdrop">
                      <button className="btn btn-sm btn-circle btn-ghost text-white hover:text-black absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <div className="flex items-center justify-center mt-6">
                      <img
                        src={url}
                        alt=""
                        className="w-60 h-60 md:w-80 md:h-80 rounded-md object-cover"
                      />
                    </div>
                  </div>
                </dialog>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default RightSidebar;
