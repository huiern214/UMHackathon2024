import PlusIcon from "../assets/PlusIcon.png";
import ChatIcon from "../assets/ChatIcon.png";
import ArrowDown from "../assets/ArrowDown.png";
import OpenSideBarIcon from "../assets/OpenSideBarIcon.png";
import { ReactComponent as XMark } from "../assets/xmark.svg";
import Chatbot from "./Chatbot";
import { useState, useEffect } from "react";
import { FaPlus, FaArrowDown, FaArrowUp } from "react-icons/fa";
import PieChart from "../pages/Analysis/pieChart";
import api from "../api/axiosConfig";

function DynamicSideBar({
  activeSideBar,
  isSideBarHidden,
  selectedUser,
  setConversation,
  setCurrentChatId,
  users,
}) {
  const [isUserTransactionDropDown, setIsUserTransactionDropDown] = useState(
    users.map((user) => ({ name: user.tableName, isDropDown: false }))
  );

  const [isAddTransaction, setIsAddTransaction] = useState(false);
  const [isShowTransactionTable, setIsShowTransactionTable] = useState(false);
  const [transactionTableUser, setTransactionTableUser] = useState(selectedUser);
  const transactions = [
    {
      transactionID: "TRX20220328123461",
      date: "2024-01-01",
      transactionDetails: "Fund Transfer From Bank Rakyat",
      description: "Transfer of funds from Bank Rakyat",
      category: "Income/Salary",
      paymentMethod: "Bank Transfer",
      withdrawalAmt: 0,
      depositAmt: 100000,
    },
    {
      transactionID: "TRX20220328123467",
      date: "2024-01-01",
      transactionDetails: "fund transfer",
      description: "Transfer of funds from Bank Rakyat",
      category: "income/salary",
      paymentMethod: "Bank Transfer",
      withdrawalAmt: 772.0,
      depositAmt: 1000000,
    },
    {
      transactionID: "000001",
      date: "1-Jan-24",
      transactionDetails: "fund transfer",
      description: "Transfer of funds from Bank Rakyat",
      category: "income/salary",
      paymentMethod: "Bank Transfer",
      withdrawalAmt: 772.0,
      depositAmt: 1000000,
    },
    {
      transactionID: "000001",
      date: "1-Jan-24",
      transactionDetails: "fund transfer",
      description: "Transfer of funds from Bank Rakyat",
      category: "income/salary",
      paymentMethod: "Bank Transfer",
      withdrawalAmt: 772.0,
      depositAmt: 1000000,
    },
  ];

  // const [chatHistory, setChatHistory] = useState([
  //   {
  //     date: "today",
  //     title: "1Month Spending",
  //     content: {},
  //   },
  //   {
  //     date: "today",
  //     title: "1Month Spending",
  //     content: {},
  //   },
  //   {
  //     date: "yesterday",
  //     title: "1Month Spending",
  //     content: {},
  //   },
  //   {
  //     date: "yesterday",
  //     title: "1Month Spending",
  //     content: {},
  //   },
  //   {
  //     date: "This month",
  //     title: "1Month Spending",
  //     content: {},
  //   },
  // ]);

  const UserTransactionTable = ({ transactionItems, searchQuery }) => {
    const [sortedItems, setSortedItems] = useState(
      transactionItems.sort((a, b) => new Date(b.date) - new Date(a.date))
    );
    const [sortConfig, setSortConfig] = useState({
      transactionID: "ascending",
      date: null,
      transactionDetails: null,
      description: null,
      category: null,
      paymentMethod: null,
      withdrawalAmt: null,
      depositAmt: null,
    });

    const updateDictionary = (key, value) => {
      const updatedDictionary = { ...sortConfig };
      updatedDictionary[key] = value;
      setSortConfig(updatedDictionary);
    };

    const requestSort = (key) => {
      let direction = "ascending";
      if (sortConfig[key] === "ascending") {
        direction = "descending";
      }
      const sorted = [...sortedItems].sort((a, b) => {
        let comparison = 0;
        if (key === "date") {
          comparison = new Date(a[key]) - new Date(b[key]);
        } else {
          comparison = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
        }
        return direction === "descending" ? comparison * -1 : comparison;
      });
      setSortedItems(sorted);

      setSortConfig({
        transactionID: null,
        date: null,
        transactionDetails: null,
        description: null,
        category: null,
        paymentMethod: null,
        withdrawalAmt: null,
        depositAmt: null,
      });

      updateDictionary(key, direction);
    };
    return (
      <div className="fixed inset-0 flex flex-col w-full bg-gray-800 bg-opacity-50 z-50">
        <div className="overflow-x-auto flex flex-col flex-1 mx-3 shadow-md sm:rounded-lg justify-center items-center">
          <table className="table-auto w-[80%] h-[80%] text-sm text-right rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="bg-gray-50 font-semibold text-xl text-black">
              {transactionTableUser}'s Transactions
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th
                  className="px-1 py-3 hover:text-black cursor-pointer"
                  onClick={() => requestSort("transactionID")}
                >
                  {/* transactionID, date, transactionDetails, description, category, paymentMethod, withdrawalAmt, depositAmt */}
                  Transaction ID{" "}
                  {sortConfig["transactionID"] === null ? (
                    ""
                  ) : sortConfig["transactionID"] === "ascending" ? (
                    <FaArrowDown className="w-4 h-4 inline-block mx-1 mb-1" />
                  ) : (
                    <FaArrowUp className="w-4 h-4 inline-block mx-1 mb-1" />
                  )}
                </th>
                <th
                  className="px-1 py-3 hover:text-black cursor-pointer text-right"
                  onClick={() => requestSort("date")}
                >
                  Date{" "}
                  {sortConfig["date"] === null ? (
                    ""
                  ) : sortConfig["date"] === "ascending" ? (
                    <FaArrowDown className="w-4 h-4 inline-block mx-1 mb-1" />
                  ) : (
                    <FaArrowUp className="w-4 h-4 inline-block mx-1 mb-1" />
                  )}
                </th>
                <th
                  className="px-1 py-3 hover:text-black cursor-pointer"
                  onClick={() => requestSort("transactionDetails")}
                >
                  Transaction Details{" "}
                  {sortConfig["transactionDetails"] === null ? (
                    ""
                  ) : sortConfig["transactionDetails"] === "ascending" ? (
                    <FaArrowDown className="w-4 h-4 inline-block mx-1 mb-1" />
                  ) : (
                    <FaArrowUp className="w-4 h-4 inline-block mx-1 mb-1" />
                  )}
                </th>
                <th
                  className="px-1 py-3 hover:text-black cursor-pointer"
                  onClick={() => requestSort("description")}
                >
                  Description{" "}
                  {sortConfig["description"] === null ? (
                    ""
                  ) : sortConfig["description"] === "ascending" ? (
                    <FaArrowDown className="w-4 h-4 inline-block mx-1 mb-1" />
                  ) : (
                    <FaArrowUp className="w-4 h-4 inline-block mx-1 mb-1" />
                  )}
                </th>
                <th
                  className="px-1 py-3 hover:text-black cursor-pointer"
                  onClick={() => requestSort("category")}
                >
                  Category{" "}
                  {sortConfig["category"] === null ? (
                    ""
                  ) : sortConfig["category"] === "ascending" ? (
                    <FaArrowDown className="w-4 h-4 inline-block mx-1 mb-1" />
                  ) : (
                    <FaArrowUp className="w-4 h-4 inline-block mx-1 mb-1" />
                  )}
                </th>
                <th
                  className="px-1 py-3 hover:text-black cursor-pointer"
                  onClick={() => requestSort("paymentMethod")}
                >
                  Payment Method{" "}
                  {sortConfig["paymentMethod"] === null ? (
                    ""
                  ) : sortConfig["paymentMethod"] === "ascending" ? (
                    <FaArrowDown className="w-4 h-4 inline-block mx-1 mb-1" />
                  ) : (
                    <FaArrowUp className="w-4 h-4 inline-block mx-1 mb-1" />
                  )}
                </th>
                <th
                  className="px-1 py-3 hover:text-black cursor-pointer"
                  onClick={() => requestSort("withdrawalAmt")}
                >
                  Withdrawal{" "}
                  {sortConfig["withdrawalAmt"] === null ? (
                    ""
                  ) : sortConfig["withdrawalAmt"] === "ascending" ? (
                    <FaArrowDown className="w-4 h-4 inline-block mx-1 mb-1" />
                  ) : (
                    <FaArrowUp className="w-4 h-4 inline-block mx-1 mb-1" />
                  )}
                </th>
                <th
                  className="px-1 py-3 hover:text-black cursor-pointer"
                  onClick={() => requestSort("depositAmt")}
                >
                  Deposit{" "}
                  {sortConfig["depositAmt"] === null ? (
                    ""
                  ) : sortConfig["depositAmt"] === "ascending" ? (
                    <FaArrowDown className="w-4 h-4 inline-block mx-1 mb-1" />
                  ) : (
                    <FaArrowUp className="w-4 h-4 inline-block mx-1 mb-1" />
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.map((item, index) => (
                <tr>
                  {/* transactionID, date, transactionDetails, description, category, paymentMethod, withdrawalAmt, depositAmt */}
                  <td className="py-2 bg-gray-50">{item.transactionID}</td>
                  <td className="py-2 bg-gray-50">{item.date}</td>
                  <td className="py-2 bg-gray-50">{item.transactionDetails}</td>
                  <td className="py-2 bg-gray-50">{item.description}</td>
                  <td className="py-2 bg-gray-50">{item.category}</td>
                  <td className="py-2 bg-gray-50">{item.paymentMethod}</td>
                  <td className="py-2 bg-gray-50">{item.withdrawalAmt}</td>
                  <td className="py-2 bg-gray-50">{item.depositAmt}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex items-center justify-center">
            <button
              className="border border-black bg-white p-2 rounded-md hover:bg-gray-200"
              onClick={closeTransactionsTable}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const closeTransactionsTable = () => {
    setIsShowTransactionTable(false);
  };

  const handleShowTransactionsTable = ({ user }) => {
    setTransactionTableUser(user.name);
    setIsShowTransactionTable(!isShowTransactionTable);
  };

  const handleUserTransactionsDropDown = ({ user }) => {
    const updatedObj = [...isUserTransactionDropDown];
    for (let i = 0; i < updatedObj.length; i++) {
      if (updatedObj[i] === user) {
        updatedObj[i].isDropDown = !updatedObj[i].isDropDown;
      }
    }
    setIsUserTransactionDropDown(updatedObj);
  };

  const handleUserUploadTransactions = ({ user }) => {
    console.log("user:", user.name);
    console.log("handleUserUploadTransactions");
  };

  const handleUserAddTransactions = ({ user }) => {
    setIsAddTransaction(!isAddTransaction);
  };

  const AddTransactionWindow = () => {
    const getTodayDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const handleSave = (event) => {
      event.preventDefault();

      const newTransaction = {
        transactionID: document.getElementById("transactionID").value,
        date: document.getElementById("date").value,
        transactionDetails: document.getElementById("transactionDetails").value,
        description: document.getElementById("description").value,
        category: document.getElementById("category").value,
        paymentMethod: document.getElementById("paymentMethod").value,
        withdrawalAmt: parseFloat(
          document.getElementById("withdrawalAmt").value
        ),
        depositAmt: parseFloat(document.getElementById("depositAmt").value),
      };

      handleUserAddTransactions();
    };
    return (
      //transaction form
      <div className="z-[50] fixed inset-0 flex items-center justify-center h-screen">
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="modal-content absolute h-5/6 w-1/3 bg-[#FFFFFF] overflow-y-auto rounded-lg">
          <form onSubmit={handleSave}>
            <h2 className="mt-10 ml-10 text-base font-semibold leading-7 text-gray-900">
              Add Transaction
            </h2>
            <p className="mt-1 ml-10 text-sm leading-6 text-gray-600">
              This information will only be visible by you.
            </p>

            <div className="mt-5 ml-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="transactionID"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Transaction ID
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 sm:max-w-md">
                    <input
                      type="text"
                      name="transactionID"
                      id="transactionID"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0  sm:text-sm   sm:leading-6"
                      placeholder="TRX##############"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 ml-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 sm:max-w-md">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0  sm:text-sm   sm:leading-6"
                      placeholder="dd/mm/yyyy"
                      defaultValue={getTodayDate()}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-10 mt-5 mcol-span-full">
              <label
                htmlFor="transactionDetails"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Transaction Details
              </label>
              <div className="mt-2">
                <textarea
                  id="transactionDetails"
                  name="transactionDetails"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  required
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Elaborate the details.
              </p>
            </div>

            <div className="mx-10 mt-5 mcol-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  required
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Describe the transaction.
              </p>
            </div>
          </form>
        </div>
      </div>
        )
    }


  const UploadTransactionSideBar = () => {
    return (
      <div style={{ display: isSideBarHidden ? "none" : "block" }}>
        {isShowTransactionTable && (
          <UserTransactionTable transactionItems={transactions} />
        )}
        {isAddTransaction && <AddTransactionWindow />}
        {isUserTransactionDropDown.map((user, index) => (
          <div className="flex flex-col ml-2 mt-2">
            <div className="flex mt-6">
              <button
                className="font-semibold"
                onClick={() => handleShowTransactionsTable({ user })}
              >
                {user.name + "'s transactions"}
              </button>
              <button onClick={() => handleUserTransactionsDropDown({ user })}>
                <img
                  src={user.isDropDown ? ArrowDown : OpenSideBarIcon}
                  alt="drow down"
                />
              </button>
            </div>
            {user.isDropDown ? (
              <div className="ml-4">
                <button
                  className="flex"
                  onClick={() => handleUserUploadTransactions({ user })}
                >
                  <div>
                    <img src={PlusIcon} alt="upload transactions" />
                  </div>
                  <p>Upload transactions</p>
                </button>
                <button
                  className="flex"
                  onClick={() => handleUserAddTransactions({ user })}
                >
                  <div>
                    <img src={PlusIcon} alt="add transactions" />
                  </div>
                  <p>Add transactions</p>
                </button>
              </div>
            ) : (
              <div> </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const AnalysisSideBar=()=>{
    const [selectedMonth1, setSelectedMonth1] = useState(1); // Initial selected month state for pie1
    const [selectedMonth2, setSelectedMonth2] = useState(1); // Initial selected month state for pie2
    const [chartData, setChartData] = useState({
        "Other Expenses": 242385.91,
        "Government Services": 78652.37,
        "Utilities": 32814.15,
        "Debts/Overpayments": 31770.46,
        "Insurance": 11530
    }); // Initial dummy data for pie chart
    const [chartData2, setChartData2] = useState({
      "Other Expenses": 242385.91,
      "Government Services": 78652.37,
      "Utilities": 32814.15,
      "Debts/Overpayments": 31770.46,
      "Insurance": 11530
    }); // Initial dummy data for pie chart

    // Define an array of months for the dropdown options
    const months = ['January', 'February', 'March'];

    // Function to handle the change in the selected month for pie1
    const handleMonthChange1 = async (event) => {
      setSelectedMonth1(parseInt(event.target.value));
      console.log("selectMonth1",selectedMonth1)
      
      try {
        const input = { "tableId": selectedUser.tableID, "month": selectedMonth1 }
        console.log("heyy",input);
        const response = await api.post("/analysis/categoryExpensesByMonth", 
          input
        );
        console.log(response.data.response);
        setChartData(response.data.response);
      } catch (error) {
        console.error(error);
      }
    };

    // Function to handle the change in the selected month for pie2
    const handleMonthChange2 = async (event) => {
      setSelectedMonth2(parseInt(event.target.value));
      
      try {
        const input = { "tableId": selectedUser.tableID, "month": selectedMonth2 }
        console.log("heyy",input);
        const response = await api.post("/analysis/paymentMethodExpensesByMonth", 
          input
        );
        console.log(response.data.response);
        setChartData2(response.data.response);
      } catch (error) {
        console.error(error);
      }
    };

    // Define the handlePrediction function
    const handlePrediction = () => {
        // Logic for prediction goes here
        console.log('Predicting expenses for next month...');
    };

    useEffect(() => {
      handleMonthChange1({ target: { value: selectedMonth1 } });
      handleMonthChange2({ target: { value: selectedMonth2 } });
    }, [selectedMonth1, selectedMonth2]);

    return (
        <div className='flex flex-col justify-center items-center'>
        <button
            onClick={handlePrediction}
            className='mt-4 mb-4'
            style={{
            border: '1px solid black',
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            }}
        >
            Predict Next Month Expenses
        </button>

        <div>
            <h3 className="font-bold">Top 5 Category Expenses by Month</h3>
            <div>
            <label htmlFor="monthSelect1">Select Month:</label>
            <select id="monthSelect1" value={selectedMonth1} onChange={handleMonthChange1}>
                {/* {months.map((month) => (
                <option key={month} value={month}>{month}</option>
                ))} */}
              {months.map((month, index) => (
                <option key={index+1} value={index+1}>{month}</option>
              ))}
            </select>
            </div>
            <div>
            <PieChart id="pie1" data={chartData} />
            </div>
        </div>

        <div className='mt-5'>
            <h3 className="font-bold">Top 5 Category Expenses by Month</h3>
            <div>
            <label htmlFor="monthSelect2">Select Month:</label>
            <select id="monthSelect2" value={selectedMonth2} onChange={handleMonthChange2}>
                {/* {months.map((month) => (
                <option key={month} value={month}>{month}</option>
                ))} */}
              {months.map((month, index) => (
                <option key={index+1} value={index+1}>{month}</option>
              ))}
            </select>
            </div>
            <div>
            <PieChart id="pie2" data={chartData2} />
            </div>
        </div>
        </div>
    );
    }

  const ChatHistorySideBar = () => {   
    const [allChat, setAllChat] = useState([]);

    const OpenNewChat = () => {
      const newChat = {
        chatId: "",
        chatName: "New Chat",
      };

      setAllChat([...allChat, newChat]);
      //open a new chat
      setConversation([]);
    };


    // by tableId
    const fetchAllChats = async (e) => {
      console.log("fetching all chats");
      try {
        console.log('selectedUser',selectedUser);
        const input = { "tableId": selectedUser.tableID }
        console.log("hellooooooooooooo",input);
        const response = await api.post("/chatbot/retrieveChats", 
          input
        );
        // console.log('responseData',response.data);
        setAllChat(response.data.chats);
        console.log(response.data.chats);
      } catch (error) {
        console.error(error);
      }
    }
    
    useEffect(() => {
      fetchAllChats();
    }
    ,[selectedUser]);
    
    

    return (
      <div
        className="flex flex-col w-full h-full overflow-y-auto"
        style={{ display: isSideBarHidden ? "none" : "block" }}
      >
        <button
          className="flex w-fit mt-2 ml-3 hover:bg-gray-300 hover:border rounded-lg"
          onClick={OpenNewChat}
        >
          <img src={PlusIcon} alt="open new chat" />
          <div className="">New Chat</div>
        </button>
        <div className="flex flex-col w-full mt-2 ml-3">
          {allChat.length > 0 ? (
            <div className="flex flex-col w-full my-2">
              <div>Chat Session</div>
              {allChat.map((chat, index) => (
                <IndividualChatHistory chatTitle={chat.chatName} chatId={chat.chatId} />
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  };

  const openConversation = async (chatId) => {
    setConversation([])
    //get conversation from chatId
    try {
      console.log('chatId',chatId);
      const input = { "chatId": chatId }
      // console.log(input);
      const response = await api.post("/chatbot/retrieveChatHistory", 
        input
      );
      console.log(response.data.response);
      setConversation(response.data.response);
      setCurrentChatId(chatId);
    } catch (error) {
      console.error(error);
      }
  }
      
  const IndividualChatHistory = ({ chatTitle, chatId }) => {
    return (
      <button className="flex w-fit items-center pr-10 my-1 hover:bg-gray-300 hover:border rounded-lg" onClick={() => openConversation(chatId)}>
        <img src={ChatIcon} alt="chat" className="h-4 w-4 mt-1" />
        <div className="ml-2">{chatTitle ? chatTitle : "New Chat"}</div>
      </button>
    );
  };

  return (
    <div
      className={`flex flex-col h-full bg-grayWhite overflow-hidden transition-all ${
        isSideBarHidden ? "w-0" : "w-[25%]"
      }`}
    >
      {activeSideBar === "updateTransaction" && <UploadTransactionSideBar />}
      {activeSideBar === "analysis" && <AnalysisSideBar />}
      {activeSideBar === "chatHistory" && <ChatHistorySideBar />}
    </div>
  );
}

export default DynamicSideBar;
