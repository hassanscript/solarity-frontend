import React, { FC, useEffect, useState } from "react";
import VolumeUp from '../../components/Icons/VolumeUp';
import VolumeOff from '../../components/Icons/VolumeOff';
import NestedToolTip from 'components/NestedToolTip';
import { Join, Minus } from 'components/Icons';

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

    return (
        <div className={"fixed top-[20vh] left-[30px] w-[250px] transition-opacity " + (isUserPanel ? 'opacity-100' : 'opacity-0')}>
            <div className='rounded-lg bg-brandblack px-4 py-2 w-full h-full'>
                <div className='text-lg mb-4 flex justify-between pt-4'>
                    <div>User List</div>
                    <div className="flex">
                        <div className="flex" >
                            <NestedToolTip link={process.env.NODE_ENV === "development" ? "http://localhost:3000/" + 'experience/invitation/' + roomId : "https://solarity-web-git-master-hassan-sk.vercel.app/" + 'experience/invitation/' + roomId} />
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
                        {!!rooms && rooms.length != 0 && roomIndex != -1 && !!rooms[roomIndex] && rooms[roomIndex].clients && clients.map((ele, index) => (
                        <li className={'border-b border-gray-700 py-2 px-1 flex justify-between ' + (ele.name == userName ? 'hidden' : '')} key={index}>
                            <div className='flex'>
                            <img src={getAvatarImg(ele.name)} className="rounded-full mr-3" width={40} height={40} />
                            <span className='text-white' key={index}>{ele.name}</span>
                            </div>
                            <div className='pt-3 cursor-pointer' onClick={() => toggleVolume(ele.name)}>
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
                        {userlist && userlist.map((user, index) => (
                        <li className={'border-b border-gray-700 py-2 px-1 pl-5 flex justify-between ' + (user.username == userName ? 'hidden' : '')} key={(!!clients ? clients.length : 0) + index}>
                            <div className='flex'>
                            <span className='text-white'>{user.username}</span>
                            </div>
                            <div className='flex'>
                            <span className='text-white'>{!user.state ? 'idle' : user.state}</span>
                            </div>
                            <div className='pt-1 cursor-pointer'>
                            {!user.state ? (
                                <button className="rounded-full" onClick={() => inviteFriend(user.username)}>
                                    <Join />
                                </button>
                            ) : (
                                <div className="flex" >
                                    <NestedToolTip link={process.env.NODE_ENV === "development" ? "http://localhost:3000/" + 'experience/invitation/' + user.link : "https://solarity-web-git-master-hassan-sk.vercel.app/" + 'experience/invitation/' + user.link} />
                                </div>
                            )}
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
