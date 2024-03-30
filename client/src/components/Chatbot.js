import SendIcon from "../assets/SendIcon.png";
import ArrowDown from "../assets/ArrowDown.png";
import { useState, useEffect, useRef } from "react";
import api from "../api/axiosConfig";

function Chatbot({
  isSideBarHidden,
  selectedUser,
  setSelectedUser,
  users,
  conversation,
  setConversation,
  currentChatId,
  setCurrentChatId,
}) {
  let positionToLeft = isSideBarHidden ? "360px" : "80px";

  // const users= ['Ahmad', 'Bryan', 'Charles', 'Danish', 'Emily'];
  // const [selectedUser,setSelectedUser]=useState(users[0]);
  // const [conversation,setConversation]=useState([]);

  const [message, setMessage] = useState("");
  const messageContainerRef = useRef(null);
  const [isDropDownActive, setIsDropDownActive] = useState(false);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleToggle = () => {
    setIsDropDownActive(!isDropDownActive);
  };

  const handleSelectedUser = (user) => {
    setSelectedUser(user);
    console.log("selected user: ", user);
    setIsDropDownActive(false);
  };

  const UserDropDownList = () => {
    return (
      <div>
        <button
          id="btnChooseUser"
          onClick={handleToggle}
          className={`flex items-center px-4 py-2  font-semibold ${
            isDropDownActive ? "bg-white text-black" : "bg-white text-black"
          } `}
        >
          {selectedUser.tableName}
          <img
            src={isDropDownActive ? ArrowDown : ArrowDown}
            alt="arrow down"
            className="w-3 h-3 ml-2"
          />
        </button>
        {isDropDownActive && (
          <div className="absolute  z-10 max-h-[20%] overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg">
            {/* Choose User Button */}
            {users.map((user) => (
              <button
                key={user.tableId}
                onClick={() => handleSelectedUser(user)}
                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {user.tableName}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleSend = async () => {
    const currentTime = new Date().toLocaleTimeString();
    const newMessage = {
      author: "user",
      content: message,
      timestamp: currentTime,
    };

    const newConversation = [...conversation, newMessage];
    setConversation(newConversation);

    try {
      const input = {
        "userPrompt": message,
        "userId": 1,
        "tableId": selectedUser.tableId,
        // "tableId": 1, // hardcoded for now
        "chatId": currentChatId
      }
      console.log("input");
      console.log(input);
      const response = await api.post("/chatbot/generateChatResponse", 
        input
      );
      
      console.log(response.data);
      const botReponse = response.data.response.response;
      const transactionData = response.data.response.transactionData;
      const chatId = response.data.response.chatId;

      if (currentChatId == "") {
        setCurrentChatId(chatId);
      }

      const chatbotResponse = {
        author: "bot",
        content: botReponse,
        timestamp: currentTime,
      };

      const newConversation = [...conversation, newMessage, chatbotResponse];
      setConversation(newConversation);
      
      console.log(response.data.tables);
    } catch (error) {
      console.error(error);
    }

    // Example Bot Response
    // "response": {
    //   "response": "The coffee transaction data you requested includes two entries. The first transaction occurred on January 6th at a Coffee Shop, paid in cash for $20. The second transaction took place on January 8th at the same Coffee Shop, paid with a debit card for $15.",
    //   "chatId": "2tltHUTArqqOJIatgM9J",
    //   "transactionData": [
    //       {
    //           "transactionTableID": 1,
    //           "transactionID": "TRX20220328123527",
    //           "date": "2024-01-06",
    //           "transactionDetails": "Coffee Shop",
    //           "description": "Expenses for coffee and snacks",
    //           "category": "Dining",
    //           "paymentMethod": "Cash",
    //           "withdrawalAmt": 20.0,
    //           "depositAmt": null
    //       },

    // const chatbotResponse = {
    //   text: "Chatbot response",
    //   sender: "chatbot",
    //   timeStamp: currentTime,
    // };
    // const newConversation = [...conversation, newMessage, chatbotResponse];
    // setConversation(newConversation);

    setMessage("");
  };

  useEffect(() => {
    // Scroll to the bottom of the message container when conversation updates
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  useEffect(() => {
    setConversation([]);
    setCurrentChatId("");
  }, [selectedUser]);

  return (
    <div className="h-full grow relative">
      <div
        id="myChatbot"
        className={`absolute flex flex-col h-full w-[800px]  overflow-hidden transition-all left-[${positionToLeft}]`}
      >
        <div className="flex w-[100%] justify-center items-center text-xl font-bold mb-2">
          Quirx
        </div>
        <div className="flex justify-end">
          <UserDropDownList />
        </div>
        {conversation.length === 0 ? (
          <div className="flex flex-col mt-36">
            <p className="flex justify-center font-semibold text-3xl">
              Hello, {selectedUser.tableName}
            </p>
            <p className="flex justify-center font-semibold text-3xl">
              How can I help you today?
            </p>
          </div>
        ) : (
          <div />
        )}
        <div
          id="responseSession"
          ref={messageContainerRef}
          className="grow overflow-y-auto mb-10"
        >
          {conversation.map((msg, index) =>
            msg.author === "user" ? (
              //user message
              <div className="flex flex-col w-full h-fit px-5 mt-2">
                <div className="flex justify-end items-center">
                  <div className="">You</div>
                  <div className="ml-5 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    {/* <img alt='user profile pic'/> */}
                  </div>
                </div>
                <div className="mt-3 mr-2 text-right">{msg.content}</div>
              </div>
            ) : (
              //chatbot response
              <div className="flex flex-col w-full h-fit mt-2">
                <div className="flex items-center">
                  <div className="ml-2 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    {/* <img alt='user profile pic'/> */}
                  </div>
                  <div className="ml-2">Chatbot</div>
                </div>
                <div className="mt-3 ml-3 text-left">{msg.content}</div>
              </div>
            )
          )}
        </div>
        <div
          id="inputSession"
          className="flex w-full h-fit mb-5 border-gray-300"
        >
          <textarea
            value={message}
            onChange={handleChange}
            className=" w-[93%] h-10 resize-none text-base border rounded-lg text-gray-900 rows-3"
            placeholder="What is your inquiry?"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent default behavior of newline in textarea
                handleSend();
              }
            }}
          />
          <button className="ml-2 w-[5%] h-full" onClick={handleSend}>
            <img src={SendIcon} alt="send icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
