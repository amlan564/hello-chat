import { useContext } from "react";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import Sidebar from "../components/Sidebar";
import { ChatContext } from "../../context/ChatContext";

const Home = () => {
  const { selectedUser, isSidebarVisible } = useContext(ChatContext);

  return (
    <div className="w-full h-screen ">
      <div
        className={`grid h-full overflow-hidden relative ${
          selectedUser ? "md:grid-cols-[1fr_1.5fr] xl:grid-cols-[1fr_2.5fr]" : "md:grid-cols-2"
        }`}
      >
        <Sidebar />
        <div
          className={`h-screen ${selectedUser ? "max-md:w-screen" : ""} ${
            isSidebarVisible && "grid grid-cols-1 xl:grid-cols-2"
          }`}
        >
          <ChatContainer />
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
