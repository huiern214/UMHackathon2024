import StaticSideBar from "../components/StaticSideBar";
import DynamicSideBar from "../components/DynamicSideBar";
import Chatbot from "../components/Chatbot";
import CollapseIcon from "../assets/CollapseIcon.png";
import OpenSideBarIcon from "../assets/OpenSideBarIcon.png";
import { useState, useEffect } from "react";
import api from "../api/axiosConfig";

function ChatBotPage() {
  const [activeSideBar, setActiveSideBar] = useState("chatHistory");
  const [isSideBarHidden, setIsSideBarHidden] = useState(false);
  // const users = ["Ahmad", "Bryan", "Charles", "Danish", "Emily"];
  const [selectedUser, setSelectedUser] = useState({ tableId: 1, tableName: "Ahmad" });
  const [conversation, setConversation] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(1);

  // retrieve users from the database (tableId, tableName)
  const [users, setUsers] = useState([{ tableId: 1, tableName: "Ahmad" }, { tableId: 2, tableName: "Bryan" }, { tableId: 3, tableName: "Charles" }, { tableId: 4, tableName: "Danish" }, { tableId: 5, tableName: "Emily" }]);
  
  const fetchUsers = async (e) => {
    console.log("fetching users");
    try {
      const input = {"userId": 1}
      const response = await api.post("/chatbot/retrieveTables", {
        input
      });
      setUsers(response.data.tables);
      setSelectedUser(response.data.tables[0]);
      console.log(response.data.tables);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }
  , []);
    
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
        setCurrentChatId={setCurrentChatId}
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
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
      />
    </div>
  );
}

export default ChatBotPage;
