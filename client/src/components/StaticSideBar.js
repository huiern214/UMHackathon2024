import UploadIcon from '../assets/UploadIcon.png'
import AnalysisIcon from '../assets/AnalysisIcon.png'
import ChatIcon from '../assets/ChatIcon.png'
import ProfilePic from '../assets/profilePhoto.png'
import {ReactComponent as UploadIconSVG} from '../assets/UploadIcon.svg'

function StaticSideBar({activeSideBar,setActiveSideBar,setIsSideBarHidden}){
    
    function handleActiveSideBar(sideBar){
        setActiveSideBar(sideBar);
        setIsSideBarHidden(false);
    }

    return(
        <div className="flex flex-col items-center w-[3%] h-full bg-grayWhite ">
            <button className={`hover:scale-105 transition-transform  flex w-full justify-center ${activeSideBar==='updateTransaction'? 'bg-gray-300 border rounded-lg' : 'bg-grayWhite'}`} onClick={() => handleActiveSideBar('updateTransaction')}>
                <UploadIconSVG className={`w-7 h-7 my-2 `} src={UploadIcon} alt="upload transactions icon"/>
            </button>
            <button className={`hover:scale-105 transition-transform flex w-full justify-center ${activeSideBar==='analysis'? 'bg-gray-300 border rounded-lg' : 'bg-grayWhite'}`} onClick={() => handleActiveSideBar('analysis')}>
                <img className="w-6 h-6 my-2" src={AnalysisIcon} alt="analysis icon"/>
            </button>
            <button className={`hover:scale-105 transition-transform  flex w-full justify-center  ${activeSideBar==='chatHistory'? 'bg-gray-300 border rounded-lg' : 'bg-grayWhite'}`} onClick={() => handleActiveSideBar('chatHistory')}>
                <img className="w-5 h-5 my-2" src={ChatIcon} alt="chatIcon"/>
            </button>
            <button className="mt-auto">
                <img className="w-7 h-7 my-2 " src={ProfilePic} alt="profilePic"/>
            </button>
        </div>
    )
}



export default StaticSideBar;