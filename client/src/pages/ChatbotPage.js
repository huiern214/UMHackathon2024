import StaticSideBar from "../components/StaticSideBar";
import DynamicSideBar from "../components/DynamicSideBar";
import Chatbot from "../components/Chatbot";
import CollapseIcon from "../assets/CollapseIcon.png";
import OpenSideBarIcon from "../assets/OpenSideBarIcon.png";
import { useState, useEffect } from "react";

function ChatBotPage() {
  const [activeSideBar, setActiveSideBar] = useState("chatHistory");
  const [isSideBarHidden, setIsSideBarHidden] = useState(false);
  const users = ["Ahmad", "Bryan", "Charles", "Danish", "Emily"];
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [conversation, setConversation] = useState([]);

  const updateSideBar = () => {
    setIsSideBarHidden(!isSideBarHidden);
  };

  return (
    <div className="flex w-screen h-screen">
      <StaticSideBar
        activeSideBar={activeSideBar}
        setActiveSideBar={setActiveSideBar}
        setIsSideBarHidden={setIsSideBarHidden}
      />
      <div className="h-full bg-grayBlack w-0.5 "></div>
      <DynamicSideBar
        activeSideBar={activeSideBar}
        isSideBarHidden={isSideBarHidden}
        selectedUser={selectedUser}
        setConversation={setConversation}
        users={users}
      />
      <button className="h-full" onClick={updateSideBar}>
        <img
          src={isSideBarHidden ? OpenSideBarIcon : CollapseIcon}
          alt="Collapse/Hide icon"
        />
      </button>
      <Chatbot
        isSideBarHidden={isSideBarHidden}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        users={users}
        conversation={conversation}
        setConversation={setConversation}
      />
    </div>
  );
}

export default ChatBotPage;
