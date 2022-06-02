import React, { FC } from "react";
import MicrophoneOn from '../../components/Icons/MicrophoneOn';
import MicrophoneOff from '../../components/Icons/MicrophoneOff';
import Back from '../../components/Icons/Back';
import UserList from '../../components/Icons/UserList';
import ChatOutline from '../../components/Icons/ChatOutline';
import UserListOutline from '../../components/Icons/UserListOutline';
import { Chat } from '../../components/Icons';
export type ChatToolbarProps = {
  isMute: Boolean;
  isUserPanel: Boolean;
  isChatPanel: Boolean;
  provideRef: Function;
  handelMuteBtnClick: Function;
  toggleUserPanel: Function;
  toggleChatPanel: Function;
  handelManualLeave: Function;
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
}) => {

  return (
    <div className='fixed flex bottom-[5vh] left-[30px] rounded-lg bg-brandblack px-4 py-2'>
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
        <div className='p-2 border border-gray-600 rounded-lg mx-1 cursor-pointer hover:border-gray-400' onClick={() => toggleUserPanel()}>
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
        <div className='p-2 border border-gray-600 rounded-lg mx-1 cursor-pointer hover:border-gray-400' onClick={() => handelManualLeave()}>
            <Back />
        </div>
    </div>
  );
};

export default ChatToolbar;
