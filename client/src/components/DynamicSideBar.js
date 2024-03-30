import PlusIcon from "../assets/PlusIcon.png";
import ChatIcon from "../assets/ChatIcon.png";
import ArrowDown from "../assets/ArrowDown.png";
import OpenSideBarIcon from "../assets/OpenSideBarIcon.png";
import { ReactComponent as XMark } from "../assets/xmark.svg";
import Chatbot from "./Chatbot";
import { useState, useEffect } from "react";
import { FaPlus, FaArrowDown, FaArrowUp } from "react-icons/fa";

function DynamicSideBar({
  activeSideBar,
  isSideBarHidden,
  selectedUser,
  setConversation,
  users,
}) {
  const [isUserTransactionDropDown, setIsUserTransactionDropDown] = useState(
    users.map((user) => ({ name: user, isDropDown: false }))
  );

  const [isAddTransaction, setIsAddTransaction] = useState(false);
  const [isShowTransactionTable, setIsShowTransactionTable] = useState(false);
  const [transactionTableUser, setTransactionTableUser] =
    useState(selectedUser);
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

  const [chatHistory, setChatHistory] = useState([
    {
      date: "today",
      title: "1Month Spending",
      content: {},
    },
    {
      date: "today",
      title: "1Month Spending",
      content: {},
    },
    {
      date: "yesterday",
      title: "1Month Spending",
      content: {},
    },
    {
      date: "yesterday",
      title: "1Month Spending",
      content: {},
    },
    {
      date: "This month",
      title: "1Month Spending",
      content: {},
    },
  ]);

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

            <div className="mt-5 ml-10 sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:max-w-xs sm:text-sm sm:leading-6"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Debts/Overpayments">Debts/Overpayments</option>
                  <option value="Dining">Dining</option>
                  <option value="Education">Education</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Government Services">
                    Government Services
                  </option>
                  <option value="Groceries">Groceries</option>
                  <option value="Health & Fitness">Health & Fitness</option>
                  <option value="Income/Salary">Income/Salary</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Investment">Investment</option>
                  <option value="Other Expenses">Other Expenses</option>
                  <option value="Savings">Savings</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Travel">Travel</option>
                  <option value="Utilities">Utilities</option>
                </select>
              </div>
            </div>

            <div className="mt-5 ml-10 sm:col-span-3">
              <label
                htmlFor="paymentMethod"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Payment Method
              </label>
              <div className="mt-2">
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:max-w-xs sm:text-sm sm:leading-6"
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="Bank transfer">Bank transfer</option>
                  <option value="Card payment">Card payment</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Credit card">Credit card</option>
                  <option value="Debit Card">Debit card</option>
                  <option value="Direct debit">Direct debit</option>
                  <option value="Online banking">Online banking</option>
                  <option value="Online payment">Online payment</option>
                </select>
              </div>
            </div>

            <div className="mt-5 ml-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="withdrawalAmt"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Withdrawal Amount
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 sm:max-w-md">
                    <input
                      type="number"
                      name="withdrawalAmt"
                      id="withdrawalAmt"
                      step="0.01"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0  sm:text-sm   sm:leading-6"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 ml-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="depositAmt"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Deposit Amount
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 sm:max-w-md">
                    <input
                      type="number"
                      name="depositAmt"
                      id="depositAmt"
                      step="0.01"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0  sm:text-sm   sm:leading-6"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6 mr-10 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="rounded-md text-sm px-3 py-2 font-semibold leading-6 text-gray-900 hover:bg-gray-300 hover:border hover:border-black"
                onClick={handleUserAddTransactions}
              >
                Cancel
              </button>
              <button className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

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

  const AnalysisSideBar = () => {
    return (
      <div style={{ display: isSideBarHidden ? "none" : "block" }}>
        analysis
      </div>
    );
  };

  const ChatHistorySideBar = () => {
    const OpenNewChat = () => {
      const newChat = {
        date: "today",
        title: "1Month Spending",
        content: {},
      };

      setChatHistory([...chatHistory, newChat]);

      //open a new chat
      setConversation([]);
    };

    let todayChat = [];
    let ytdChat = [];
    let thisMonthChat = [];
    let allOtherChat = [];

    for (let i = 0; i < chatHistory.length; i++) {
      let chat = chatHistory[i];
      if (chat.date === "today") {
        todayChat.push(chat);
      } else if (chat.date === "yesterday") {
        ytdChat.push(chat);
      } else if (chat.date === "This month") {
        thisMonthChat.push(chat);
      } else {
        allOtherChat.push(chat);
      }
    }

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
          <div className="">New chat</div>
        </button>
        <div className="flex flex-col w-full mt-2 ml-3 ">
          {todayChat.length > 0 ? (
            <div className="flex flex-col w-full my-2">
              <div>Today</div>
              {todayChat.map((chat, index) => (
                <IndividualChatHistory chatTitle={chat.title} />
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="flex flex-col w-full mt-2 ml-3">
          {ytdChat.length > 0 ? (
            <div className="flex flex-col w-full my-2">
              <div>Yesterday</div>
              {ytdChat.map((chat, index) => (
                <IndividualChatHistory chatTitle={chat.title} />
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="flex flex-col w-full mt-2 ml-3">
          {thisMonthChat.length > 0 ? (
            <div className="flex flex-col w-full my-2">
              <div>This month</div>
              {thisMonthChat.map((chat, index) => (
                <IndividualChatHistory chatTitle={chat.title} />
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="flex flex-col w-full mt-2 ml-3">
          {allOtherChat.length > 0 ? (
            <div className="flex flex-col w-full my-2">
              <div>All chat history</div>
              {allOtherChat.map((chat, index) => (
                <IndividualChatHistory chatTitle={chat.title} />
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  };

  const IndividualChatHistory = ({ chatTitle }) => {
    return (
      <button className="flex w-fit items-center pr-10 my-1 hover:bg-gray-300 hover:border rounded-lg">
        <img src={ChatIcon} alt="chat" className="h-4 w-4 mt-1" />
        <div className="ml-2">{chatTitle}</div>
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