import React, { FC, useEffect, useState } from "react";
import VolumeUp from '../../components/Icons/VolumeUp';
import VolumeOff from '../../components/Icons/VolumeOff';
import NestedToolTip from 'components/NestedToolTip';
import { Copy, Join, Minus } from 'components/Icons';

export type UserPanelProps = {
    isUserPanel: Boolean;
    rooms: any[];
    roomIndex: number;
    userName: String;
    volumes: any[];
    userlist: any[];
    clients: any[];
    toggleUserPanel: Function;
    toggleVolume: Function;
    provideRef: Function;
    inviteFriend: Function;
    getAvatarImg: Function;
};

const UserPanel: FC<UserPanelProps> = ({  
    isUserPanel,
    rooms,
    roomIndex,
    userName,
    volumes,
    userlist,
    clients,
    toggleUserPanel,
    toggleVolume,
    provideRef,
    inviteFriend,
    getAvatarImg,
}) => {
    const [ roomId, setRoomId ] = useState("");
    useEffect(() => {
        if(!!rooms[roomIndex] && !!rooms[roomIndex].invitationHash) {
            setRoomId(rooms[roomIndex].invitationHash)
        }
    }, [rooms[roomIndex]])

    useEffect(() => {
        console.log('clients: ', clients);
    }, [clients])

    return (
        <div className={"fixed top-[20vh] left-[30px] w-[250px] transition-opacity " + (isUserPanel ? 'opacity-100' : 'opacity-0')}>
            <div className='rounded-lg bg-brandblack px-4 py-2 w-full h-full'>
                <div className='text-lg mb-4 flex justify-between pt-4'>
                    <div>User List</div>
                    <div className="flex">
                        <div className="flex mr-3">
                            <NestedToolTip 
                                link={ 
                                    process.env.NODE_ENV === "development" ? 
                                    process.env.NEXT_PUBLIC_LOCAL_FRONTEND_URL + '/experience/invitation/' + roomId : 
                                    process.env.NEXT_PUBLIC_FRONTEND_URL + '/experience/invitation/' + roomId
                                }
                                content={<Copy />}
                            />
                        </div>
                        <div 
                            className='cursor-pointer pt-[3px]' 
                            onClick={() => toggleUserPanel()}
                        >
                            <Minus />
                        </div>
                    </div>
                </div>
                <div className='list overflow-auto h-[55vh]'>
                    <ul className='no-underline'>
                        {!!clients && clients.map((ele, index) => (
                        <li className={'border-b border-gray-700 py-2 px-1 flex justify-between'} key={index}>
                            <div className='flex'>
                                <img src={ele.avatarUrl ? ele.avatarUrl: "/images/placeholder/avatars/avatar.png"} className="rounded-full border border-gray-400 mr-3" width={40} height={40} />
                                <span className='text-white pt-[3px]' key={index}>{ele.name}</span>
                            </div>
                            <div className={"pt-3 cursor-pointer " + (ele.name == userName ? "hidden": "")} onClick={() => toggleVolume(ele.name)}>
                                <audio
                                    volume="0"
                                    autoPlay
                                    ref={(instance) => (provideRef(instance, ele.name))}
                                />
                                {
                                    !!volumes[ele.name] ? (
                                    <VolumeOff />
                                    ) : (
                                    <VolumeUp />
                                    )
                                }
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserPanel;
