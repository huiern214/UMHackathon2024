import PlusIcon from '../assets/PlusIcon.png'
import ChatIcon from '../assets/ChatIcon.png'
import ArrowDown from '../assets/ArrowDown.png'
import OpenSideBarIcon from '../assets/OpenSideBarIcon.png'
import {ReactComponent as XMark} from '../assets/xmark.svg'
import Chatbot from './Chatbot'
import {useState,useEffect} from 'react'

function DynamicSideBar({activeSideBar,isSideBarHidden,selectedUser,setConversation,users}){
    const [isUserTransactionDropDown,setIsUserTransactionDropDown]=useState(
        users.map((user)=>(
            {"name":user,"isDropDown":false}
        ))
    )

    const [isAddTransaction,setIsAddTransaction]=useState(false)
    const [isShowTransactionTable,setIsShowTransactionTable]=useState(false);
    const [transactionTableUser,setTransactionTableUser]=useState(selectedUser);
    const transactionCols=["Transaction ID","Date","Transaction Details","Description","Category","Payment Method","Withdrawal Amount","Deposit Amount"];
    const transactions=[
        {
            "id":"000001",
            "date":"1-Jan-24",
            "details":"fund transfer",
            "description":"Transfer of funds from Bank Rakyat",
            "category":"income/salary",
            "paymentMethod":"Bank Transfer",
            "withdrawalAmount":772.00,
            "depositAmount":1000000,
        },
        {
            "id":"000001",
            "date":"1-Jan-24",
            "details":"fund transfer",
            "description":"Transfer of funds from Bank Rakyat",
            "category":"income/salary",
            "paymentMethod":"Bank Transfer",
            "withdrawalAmount":772.00,
            "depositAmount":1000000,
        },
        {
            "id":"000001",
            "date":"1-Jan-24",
            "details":"fund transfer",
            "description":"Transfer of funds from Bank Rakyat",
            "category":"income/salary",
            "paymentMethod":"Bank Transfer",
            "withdrawalAmount":772.00,
            "depositAmount":1000000,
        },
        {
            "id":"000001",
            "date":"1-Jan-24",
            "details":"fund transfer",
            "description":"Transfer of funds from Bank Rakyat",
            "category":"income/salary",
            "paymentMethod":"Bank Transfer",
            "withdrawalAmount":772.00,
            "depositAmount":1000000,
        },
    ]

    const [chatHistory,setChatHistory]=useState([
        {
            "date":"today",
            "title":"1Month Spending",
            "content":{},
        },
        {
            "date":"today",
            "title":"1Month Spending",
            "content":{},
        },
        {
            "date":"yesterday",
            "title":"1Month Spending",
            "content":{},
        },
        {
            "date":"yesterday",
            "title":"1Month Spending",
            "content":{},
        },
        {
            "date":"This month",
            "title":"1Month Spending",
            "content":{},
        },
    ])

    const UserTransactionTable=()=>{
        return(
            <div className="fixed inset-0 flex flex-col w-full bg-gray-800 bg-opacity-50 z-50">
                <div className='relative flex justify-center mt-10'>
                    <table className='w-[70%] bg-white relative'>
                        <caption className="text-xl font-semibold bg-white">{transactionTableUser+"'s transactions"}</caption>
                        <tr>
                        {transactionCols.map((col,index)=>(
                            <td className='px-5 py-2 w-40'>{col}</td>                    
                        ))}
                        </tr>
                        {transactions.map((transaction)=>(
                            <tr>
                                <td className='px-5'>{transaction.id}</td>
                                <td className='px-5'>{transaction.date}</td>
                                <td className='px-5'>{transaction.details}</td>
                                <td className='px-5'>{transaction.description}</td>
                                <td className='px-5'>{transaction.category}</td>
                                <td className='px-5'>{transaction.paymentMethod}</td>
                                <td className='px-5'>{transaction.withdrawalAmount}</td>
                                <td className='px-5'>{transaction.depositAmount}</td>
                            </tr>
                        ))}
                    </table>
                    <button className='absolute top-0 right-56 w-5 h-5 bg-white' onClick={closeTranstionsTable}><XMark/></button>
                </div>
            </div>
        )
    }

    const closeTranstionsTable=()=>{
        setIsShowTransactionTable(false);
    }
    
    const handleShowTransactionsTable=({user})=>{
        setTransactionTableUser(user.name)
        setIsShowTransactionTable(!isShowTransactionTable);
    }

    const handleUserTransactionsDropDown=({user}) => {
        const updatedObj=[...isUserTransactionDropDown]
        for(let i=0;i<updatedObj.length;i++){
            if(updatedObj[i]===user){
                updatedObj[i].isDropDown=!(updatedObj[i].isDropDown)
            }
        }
        setIsUserTransactionDropDown(updatedObj);
    }

    const handleUserUploadTransactions=({user}) => {
        console.log("user:",user.name)
        console.log("handleUserUploadTransactions")
    }

    const handleUserAddTransactions=({user}) => {
        setIsAddTransaction(!isAddTransaction);
        console.log("handleUserAddTransactions");
    }

    const AddTransactionWindow=()=>{
        return(
            //transaction form
            <div className="fixed inset-0 flex flex-col w-full bg-gray-800 bg-opacity-50 z-50">

            </div>
        )
    }

    const UploadTransactionSideBar=()=>{
        return(
            <div style={{ display: isSideBarHidden ? 'none' : 'block'}}>
                {isShowTransactionTable&&<UserTransactionTable/>}
                {isAddTransaction&&<AddTransactionWindow/>}
                {isUserTransactionDropDown.map((user,index)=>(
                    <div className='flex flex-col ml-2 mt-2'>
                        <div className='flex mt-6'>
                            <button className='font-semibold' onClick={() => handleShowTransactionsTable({user})}>{user.name+"'s transactions"}</button>
                            <button onClick={() => handleUserTransactionsDropDown({user})}>
                                <img src={user.isDropDown?ArrowDown:OpenSideBarIcon} alt="drow down"/>
                            </button>
                        </div>
                        {user.isDropDown?
                            <div className='ml-4'>
                                <button className='flex' onClick={() => handleUserUploadTransactions({user})}>
                                    <div><img src={PlusIcon} alt="upload transactions"/></div>
                                    <p>Upload transactions</p>
                                </button>
                                <button className='flex' onClick={() => handleUserAddTransactions({user})}>
                                    <div><img src={PlusIcon} alt="add transactions"/></div>
                                    <p>Add transactions</p>
                                </button>
                            </div>
                        :
                            <div> </div>
                        }
                    </div>
                ))}
            </div>
        )
    }


    const AnalysisSideBar=()=>{
        return(
            <div style={{ display: isSideBarHidden ? 'none' : 'block'}}>
                analysis
            </div>
        )
    }

    const ChatHistorySideBar=()=>{
        const OpenNewChat=()=>{
            const newChat={
                "date":"today",
                "title":"1Month Spending",
                "content":{},
            }

            setChatHistory([...chatHistory,newChat]);

            //open a new chat
            setConversation([])
        }

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

        return(
            <div className="flex flex-col w-full h-full overflow-y-auto" style={{ display: isSideBarHidden ? 'none' : 'block'}}>
                <button className='flex w-fit mt-2 ml-3 hover:bg-gray-300 hover:border rounded-lg' onClick={OpenNewChat}>
                    <img src={PlusIcon} alt="open new chat"/>
                    <div className=''>New chat</div>
                </button>
                <div className='flex flex-col w-full mt-2 ml-3 '>
                    {todayChat.length>0?
                        <div className='flex flex-col w-full my-2'>
                            <div>Today</div>
                            {todayChat.map((chat,index)=>(
                                <IndividualChatHistory chatTitle={chat.title}/>
                            ))}
                        </div>
                    :
                        <div></div>
                    }
                </div>
                <div className='flex flex-col w-full mt-2 ml-3'>
                    {ytdChat.length>0?
                        <div className='flex flex-col w-full my-2'>
                            <div>Yesterday</div>
                            {ytdChat.map((chat,index)=>(
                                <IndividualChatHistory chatTitle={chat.title}/>
                            ))}
                        </div>
                    :
                        <div></div>
                    }
                </div>
                <div className='flex flex-col w-full mt-2 ml-3'>
                    {thisMonthChat.length>0?
                        <div className='flex flex-col w-full my-2'>
                            <div>This month</div>
                            {thisMonthChat.map((chat,index)=>(
                                <IndividualChatHistory chatTitle={chat.title}/>
                            ))}
                        </div>
                    :
                        <div></div>
                    }
                </div>
                <div className='flex flex-col w-full mt-2 ml-3'>
                    {allOtherChat.length>0?
                        <div className='flex flex-col w-full my-2'>
                            <div>All chat history</div>
                            {allOtherChat.map((chat,index)=>(
                                <IndividualChatHistory chatTitle={chat.title}/>
                            ))}
                        </div>
                    :
                        <div></div>
                    }
                </div>
            </div>
        )
    }

    const IndividualChatHistory=({chatTitle})=>{
        return(
            <button className='flex w-fit items-center pr-10 my-1 hover:bg-gray-300 hover:border rounded-lg'>
                <img src={ChatIcon} alt="chat" className='h-4 w-4 mt-1'/>
                <div className='ml-2'>{chatTitle}</div>
            </button>
        )
    }


    return(
        <div className={`flex flex-col h-full bg-grayWhite overflow-hidden transition-all ${isSideBarHidden?'w-0':'w-[25%]'}`}> 
            {activeSideBar==="updateTransaction"&&<UploadTransactionSideBar/>}
            {activeSideBar==="analysis"&&<AnalysisSideBar/>}
            {activeSideBar==="chatHistory"&&<ChatHistorySideBar/>}
        </div>

    )
}

export default DynamicSideBar;