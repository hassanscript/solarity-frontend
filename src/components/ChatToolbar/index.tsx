import React, { FC } from "react";
import MicrophoneOn from '../../components/Icons/MicrophoneOn';
import MicrophoneOff from '../../components/Icons/MicrophoneOff';
import Back from '../../components/Icons/Back';
import UserList from '../../components/Icons/UserList';
import ChatOutline from '../../components/Icons/ChatOutline';
import UserListOutline from '../../components/Icons/UserListOutline';
import { Chat, Desktop, FullScreen } from '../../components/Icons';
import { checkBrowser, getWidth } from "utils";
export type ChatToolbarProps = {
  isMute: Boolean;
  isUserPanel: Boolean;
  isChatPanel: Boolean;
  provideRef: Function;
  handelMuteBtnClick: Function;
  toggleUserPanel: Function;
  toggleChatPanel: Function;
  handelManualLeave: Function;
  toggleNFTsPanel: Function;
};

const ChatToolbar: FC<ChatToolbarProps> = ({  
    isMute,
    isUserPanel,
    isChatPanel,
    provideRef,
    handelMuteBtnClick,
    toggleUserPanel,
    toggleChatPanel,
    handelManualLeave,
    toggleNFTsPanel,
}) => {

  return (
    <div className='fixed flex bottom-[5vh] left-[10px] sm:left-[30px] rounded-lg bg-brandblack px-4 py-2'>
        <div className='p-2 border border-gray-600 rounded-lg mx-1 cursor-pointer hover:border-gray-400' onClick={() => handelMuteBtnClick()}>
            <audio
            id="player-audio"
            autoPlay
            ref={(instance) => (provideRef(instance, name))}
            />
            {
            isMute ? (
                <MicrophoneOn />
            ) : (
                <MicrophoneOff />
            )
            }
        </div>
        <div className='hidden sm:block p-2 border border-gray-600 rounded-lg mx-1 cursor-pointer hover:border-gray-400' onClick={() => toggleUserPanel()}>
            {
            isUserPanel ? (
                <UserList />
            ) : (
                <UserListOutline />
            )
            }
        </div>
        <div className='p-2 border border-gray-600 rounded-lg mx-1 cursor-pointer hover:border-gray-400' onClick={() => toggleChatPanel()}>
            {
            isChatPanel ? (
                <Chat />
            ) : (
                <ChatOutline />
            )
            }
        </div>
        <div className='p-2 border border-gray-600 rounded-lg mx-1 cursor-pointer hover:border-gray-400' onClick={() => toggleNFTsPanel(true)}>
            <Desktop />
        </div>
        <div className='p-2 border border-gray-600 rounded-lg mx-1 cursor-pointer hover:border-gray-400' onClick={() => handelManualLeave()}>
            {getWidth() <= 640 && !checkBrowser() ? (
                <FullScreen />
            ): (
                <Back />
            )}
        </div>
    </div>
  );
};

export default ChatToolbar;
