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
  roomType: number;
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
    roomType,
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
    <div className='fixed block sm:flex top-[5vh] sm:top-auto bottom-auto sm:bottom-[5vh] left-[10px] sm:left-[30px] rounded-lg bg-brandblack px-1 sm:px-4 py-2'>
        <div className='p-2 border border-gray-600 rounded-lg my-1 sm:mx-1 cursor-pointer hover:border-gray-400' onClick={() => handelMuteBtnClick()}>
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
        <div className='hidden sm:block p-2 border border-gray-600 rounded-lg my-1 sm:mx-1 cursor-pointer hover:border-gray-400' onClick={() => toggleUserPanel()}>
            {
            isUserPanel ? (
                <UserList />
            ) : (
                <UserListOutline />
            )
            }
        </div>
        <div className='p-2 border border-gray-600 rounded-lg my-1 sm:mx-1 cursor-pointer hover:border-gray-400' onClick={() => toggleChatPanel()}>
            {
            isChatPanel ? (
                <Chat />
            ) : (
                <ChatOutline />
            )
            }
        </div>
        {roomType > 2 && (
            <div className='p-2 border border-gray-600 rounded-lg my-1 sm:mx-1 cursor-pointer hover:border-gray-400' onClick={() => toggleNFTsPanel(true)}>
                <Desktop />
            </div>
        )}
        <div className='p-2 border border-gray-600 rounded-lg my-1 sm:mx-1 cursor-pointer hover:border-gray-400' onClick={() => handelManualLeave()}>
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
