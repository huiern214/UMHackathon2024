import SendIcon from '../assets/SendIcon.png'
import ArrowDown from '../assets/ArrowDown.png'
import {useState,useEffect,useRef} from 'react'

function Chatbot({isSideBarHidden,selectedUser,setSelectedUser,users,conversation,setConversation}){
    let positionToLeft=isSideBarHidden?'360px':'80px'

    // const users= ['Ahmad', 'Bryan', 'Charles', 'Danish', 'Emily'];
    // const [selectedUser,setSelectedUser]=useState(users[0]);
    // const [conversation,setConversation]=useState([]);
    
    const [message,setMessage]=useState("")
    const messageContainerRef = useRef(null);
    const [isDropDownActive,setIsDropDownActive]=useState(false);

    const handleChange=(e)=>{
        setMessage(e.target.value);
    }

    const handleToggle=()=>{
        setIsDropDownActive(!isDropDownActive);
    }

    const handleSelectedUser=(user)=>{
        setSelectedUser(user);
        setIsDropDownActive(false);
    }

    const UserDropDownList=()=>{
        return(
            <div>
                <button id='btnChooseUser' onClick={handleToggle} className={`flex items-center px-4 py-2  font-semibold ${isDropDownActive ? 'bg-white text-black' : 'bg-white text-black'} `}>
                    {selectedUser}
                    <img src={isDropDownActive? ArrowDown : ArrowDown} alt="arrow down" className="w-3 h-3 ml-2"/>
                </button>
                {isDropDownActive && (
                    <div className="absolute  z-10 max-h-[20%] overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg">
                        {/* Choose User Button */}
                    {users.map((user) => (
                        <button
                            key={user}
                            onClick={() => handleSelectedUser(user)}
                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            {user}
                        </button>
                    ))}
                    </div>
                )}
            </div>
        )
    }

    const handleSend=()=>{
        const currentTime = new Date().toLocaleTimeString();
        const newMessage={
            text:message,
            sender:'user',
            timeStamp:currentTime
        }
        const chatbotResponse={
            text:'Chatbot response',
            sender:'chatbot',
            timeStamp:currentTime
        }
        const newConversation=[...conversation,newMessage,chatbotResponse];
        setConversation(newConversation);

        setMessage("")
    }

    useEffect(() => {
        // Scroll to the bottom of the message container when conversation updates
        if (messageContainerRef.current) {
          messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
      }, [conversation]);
    
    useEffect(() => {
        setConversation([])
    }, [selectedUser]);

    return(
        <div className="h-full grow relative">
            <div id='myChatbot' className={`absolute flex flex-col h-full w-[800px]  overflow-hidden transition-all left-[${positionToLeft}]`}>
                <div className='flex w-[100%] justify-center items-center text-xl font-bold mb-2'>Quirx</div>
                <div className='flex justify-end'><UserDropDownList/></div>
                {conversation.length===0?
                    <div className='flex flex-col mt-36'>
                        <p className='flex justify-center font-semibold text-3xl'>Hello, {selectedUser}</p>
                        <p className='flex justify-center font-semibold text-3xl'>How can I help you today?</p>
                    </div>
                    

                    :

                    <div/>
                }
                <div id='responseSession' ref={messageContainerRef} className="grow overflow-y-auto mb-10">
                    {conversation.map((msg,index)=>(
                        msg.sender==="user"?
                        //user message
                        <div className='flex flex-col w-full h-fit px-5 mt-2'>
                            <div className='flex justify-end items-center'>
                                <div className=''>You</div>
                                <div className='ml-5 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center'>
                                    {/* <img alt='user profile pic'/> */}
                                </div>
                            </div>
                            <div className='mt-3 mr-2 text-right'>{msg.text}</div>
                        </div>
                        :
                        //chatbot response
                        <div className='flex flex-col w-full h-fit mt-2'>
                            <div className='flex items-center'>
                                <div className='ml-2 w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center'>                                 
                                    {/* <img alt='user profile pic'/> */}
                                </div>
                                <div className='ml-2'>Chatbot</div>
                            </div>
                            <div className='mt-3 ml-3 text-left'>{msg.text}</div>
                        </div>
                    ))}
                </div>
                <div id='inputSession' className="flex w-full h-fit mb-5 border-gray-300">
                    <textarea
                        value={message}
                        onChange={handleChange}
                        className=" w-[93%] h-10 resize-none text-base border rounded-lg text-gray-900 rows-3"
                        placeholder="What is your inquiry?"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault(); // Prevent default behavior of newline in textarea
                              handleSend();
                            }
                          }}           
                    />
                    <button className='ml-2 w-[5%] h-full' onClick={handleSend}>
                        <img src={SendIcon} alt="send icon"/>
                    </button>
                </div>

            </div>

        </div>
    )
}


export default Chatbot;