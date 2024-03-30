import { AiOutlineSend } from "react-icons/ai";
import { BiSolidCamera } from "react-icons/bi";
import { MdKeyboardVoice } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import ArrowDown from "../assets/ArrowDown.png";
import profilePhoto from "../assets/profilePhoto.png";
import circleLogo from "../assets/circleLogo.png";
import { useState, useEffect, useRef } from "react";
import api from "../api/axiosConfig";

import PieChart from "../pages/Analysis/pieChart";
import BarGraph from "../pages/Analysis/barGraph";
import LineGraph from "../pages/Analysis/lineGraph";
import SimplePieChart from "../pages/Analysis/simplePieChart";
import { choose_graph } from "../pages/Analysis/graphUtils"; //determine the graph type and generate the data

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
          className="inline-flex items-center p-2 rounded-2xl hover:bg-gray-50 border border-black text-gray-700"
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
          userPrompt: message,
          userId: 1,
          tableId: selectedUser.tableId,
          // "tableId": 1, // hardcoded for now
          chatId: currentChatId,
        };

        if (message.toLowerCase().includes("suspicious")) {
          try {
            const response = await api.post("/chatbot/fraudDetection", {
              tableId: selectedUser.tableId,
            });
            const botReponse = response.data.response[0];
            const transactionData = response.data.response[1];

            // if (currentChatId == "") {
            //   setCurrentChatId(chatId);
            // }
    
            const chatbotResponse = {
              author: "bot",
              content: botReponse,
              timestamp: currentTime,
              transactionData: transactionData,
            };

            const newConversation = [...conversation, newMessage, chatbotResponse];
            setConversation(newConversation);
          } catch (error) {
            console.error(error);
          }
        } else {
          console.log("input");
          console.log(input);
          const response = await api.post("/chatbot/generateChatResponse", input);

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
            transactionData: transactionData,
          };

        const generatedGraph = generateChatbotResponse(message); //Call generateChatbotResponse function

        // if generateChatbotResponse not return {}, then reamin the same, else use the response from generateChatbotResponse
        if (generatedGraph.content === undefined) {
          console.log("No graph to render");
        } else {
          chatbotResponse.content = generatedGraph.content;
          chatbotResponse.graphType = generatedGraph.graphType;
          chatbotResponse.data = generatedGraph.data;
        }

        const newConversation = [...conversation, newMessage, chatbotResponse];
        setConversation(newConversation);
        }
        // console.log(response.data.tables);
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

  //generateChatbotResponse function
  const generateChatbotResponse = (userInput) => {
    const keywords = [
      "Show me",
      "Plot",
      "Display",
      "Visualize",
      "chart",
      "graph",
      "Illustrate",
    ]; // Keywords related to graph plotting
    const containsKeyword = keywords.some((keyword) =>
      userInput.includes(keyword)
    );

    if (containsKeyword) {
      const { graphType, data } = choose_graph(userInput);

      // Log the data to check if it exists
      console.log("Graph Data:", data);

      // Log the labels and data for the pie chart
      console.log("Pie Chart Labels:", data.labels);
      console.log("Pie Chart Data:", data.data);

      return {
        content: `Generating ${graphType} graph...`,
        author: "chatbot",
        timestamp: new Date().toLocaleTimeString(),
        graphType,
        data,
      };
    } else {
      return {};
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the message container when conversation updates
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
    console.log(conversation);
  }, [conversation]);

  useEffect(() => {
    setConversation([]);
    setCurrentChatId([]);
  }, [selectedUser]);

  // Function to add indices to labels
  const addIndices = (labels) => {
    return labels.map((label, index) => `${index + 1}. ${label}`);
  };

  return (
    <div className="h-full grow relative">
      <div
        id="myChatbot"
        className={`absolute flex flex-col h-full w-[800px] overflow-hidden transition-all left-[${positionToLeft}]`}
      >
        <div className="m-3 flex w-[100%] justify-center items-center text-3xl font-semibold mb-2">
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
                    <img src={profilePhoto} className="rounded-full" />
                  </div>
                </div>
                <div className="mt-3 mr-2 text-right">{msg.content}</div>
              </div>
            ) : (
              //chatbot response
              <div className="flex flex-col w-full h-fit mt-2">
                <div className="flex items-center">
                  <div className="ml-2 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <img src={circleLogo} className="rounded-full" />
                  </div>
                  <div className="ml-2">Quirx</div>
                </div>
                <div className="mt-3 ml-3 text-left animate-typing">
                    {msg.content.split("\n").map((i, key) => {
                      return (
                        <p key={key} className="mb-1">
                          {i}
                        </p>
                      );
                    })}
                </div>
                {/* Render the graph based on chatbot's response */}
                {msg.graphType && (
                  <div className="flex justify-center items-center mt-3">
                    {/* Render graph based on graphType */}
                    {/* You can add logic here to render different types of graphs */}
                    {/* Render PieChart */}
                    {msg.graphType === "pie" && (
                      <div>
                        <SimplePieChart
                          labels={msg.data.labels}
                          data={msg.data.data}
                        />
                      </div>
                    )}
                    {msg.graphType === "bar" && (
                      <div>
                        <BarGraph
                          labels={msg.data.labels}
                          data={msg.data.data}
                        />
                      </div>
                    )}
                    {msg.graphType === "line" && (
                      <div>
                        <LineGraph data={msg.data} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          )}
        </div>
        <div
          id="inputSession"
          className="border flex w-full mb-2 border-gray-600 rounded-xl"
        >
          <button className="p-2">
            <div>
              <MdKeyboardVoice className="w-8 h-8" />
            </div>
          </button>
          {/* <button className="p-2">
            <div>
              <BiSolidCamera className="w-8 h-8" />
            </div>
          </button>
          <button className="p-2">
            <div>
              <GrAttachment className="w-8 h-8" />
            </div>
          </button> */}
          <textarea
            value={message}
            onChange={handleChange}
            className="w-[93%] resize-none text-base rounded-xl text-black items-center justify-center p-2 focus:outline-none"
            placeholder="What is your inquiry?"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent default behavior of newline in textarea
                handleSend();
              }
            }}
          />
          <button className="p-2" onClick={handleSend}>
            <div>
              <AiOutlineSend className="w-8 h-8" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
