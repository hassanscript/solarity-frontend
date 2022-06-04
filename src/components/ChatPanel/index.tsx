import React, { FC } from "react";
import { Minus } from '../../components/Icons';

export type ChatPanelProps = {
    isChatPanel: Boolean;
    msgs: any[];
    sendData: any[];
    toggleChatPanel,Function;
    getAvatarImg: Function;
    handleKeyDown: Function;
    setSendData: Function;
    sendMsg: Function;
};

const ChatPanel: FC<ChatPanelProps> = ({  
    isChatPanel,
    msgs,
    sendData,
    toggleChatPanel,
    getAvatarImg,
    handleKeyDown,
    setSendData,
    sendMsg,
}) => {

    return (
        <div className={"fixed top-[5vh] h-[90vh] max-h-[90vh] right-[30px] min-w-[300px] bg-brandblack rounded-lg w-1/4 transition-opacity " + (isChatPanel ? 'opacity-100' : 'opacity-0')}>
            <div className='w-full p-[30px] h-full flex flex-col gap-2'>
                <div className='text-lg mb-4 flex justify-between'>
                    <div>Room Chat</div>
                    <div className='cursor-pointer pt-[3px]' onClick={() => toggleChatPanel()}><Minus /></div>
                </div>
                <div className='ui-chat overflow-auto h-full'>
                    {
                    msgs && Array.from(msgs).map((ele, ind) => {
                        return (
                        <div className='flex flex-row py-1' key={ind}>
                            <div className='rounded-full mr-5 mt-1 flex-shrink-0'>
                            <img src={getAvatarImg(ele.user)} className="rounded-full border border-gary-900" alt="" width={40} height={40} />
                            </div>
                            <div>
                            <h3 className='text-secondary'>{ele && ele.user}</h3>
                            <p className='text-sm font-light'>{ele && ele.msg}</p>
                            </div>
                        </div>
                        )
                    })
                    }
                </div>
                <div className='flex'>
                    <input
                    type="text"
                    className="w-[80%] py-2 pl-6 text-[15px] font-light text-white border-transparent border rounded-md bg-primary focus:outline-none focus:border-gray-500 focus:border focus:text-white placeholder:text-gray-950Í"
                    value={sendData}
                    onKeyDown={(e) => handleKeyDown(e)}
                    onChange={(e) => setSendData(e.target.value)}
                    placeholder="Input a message please."
                    />
                    <button style={{ marginLeft: "20px" }} onClick={() => sendMsg()} >send</button>
                </div>
            </div>
        </div>
    );
};

export default ChatPanel;
