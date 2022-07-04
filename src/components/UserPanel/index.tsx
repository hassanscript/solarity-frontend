import React, { FC, useEffect, useState } from "react";
import VolumeUp from '../../components/Icons/VolumeUp';
import VolumeOff from '../../components/Icons/VolumeOff';
import NestedToolTip from 'components/NestedToolTip';
import { Copy, Minus } from 'components/Icons';

export type UserPanelProps = {
    isUserPanel: Boolean;
    rooms: any[];
    roomIndex: number;
    userName: String;
    volumes: any[];
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
    clients,
    toggleUserPanel,
    toggleVolume,
    provideRef,
    inviteFriend,
    getAvatarImg,
}) => {
    const [ roomId, setRoomId ] = useState("");
    const [ userNames, setUserNames ] = useState<any[]>([]);
    const [ avatars, setAvatars ] = useState<any[]>([]);
    useEffect(() => {
        if(!!rooms[roomIndex]) {  //if current room is exist
            // if invitation hash is
            if(!!rooms[roomIndex].invitationHash) {
                setRoomId(rooms[roomIndex].invitationHash)
            }
            setUserNames(rooms[roomIndex].speakers);
            setAvatars(rooms[roomIndex].avatars);
        }
    }, [rooms[roomIndex]])

    return (
        <div className={"hidden sm:block fixed top-[5vh] sm:top-[20vh] left-[10px] sm:left-[30px] w-[215px] " + (isUserPanel ? 'block' : 'hidden')}>
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
                <div className='list overflow-auto h-[calc(65vh-54px)] sm:h-[calc(50vh-54px)]'>
                    <ul className='no-underline'>
                        {userNames.map((name, index) => {
                            if(name == userName) {
                                return (
                                    <li className={'border-b border-gray-700 py-2 px-1 flex justify-between'} key={index}>
                                        <div className='flex'>
                                            <img src={avatars[index] ? avatars[index]: "/images/placeholder/avatars/avatar.png"} className="rounded-full border border-gray-400 mr-3" width={40} height={40} />
                                            <span className='text-white pt-[3px]'>{name}</span>
                                        </div>
                                    </li>
                                )
                            }
                        })}
                        {userNames.map((name, index) => {
                            if(name != userName) {
                                var user = clients.find(s => s.name == name);
                                var avatarUrl = avatars[index];
                                return (
                                    <li className={'border-b border-gray-700 py-2 px-1 flex justify-between'} key={index}>
                                        <div className='flex'>
                                            <img src={avatarUrl ? avatarUrl: "/images/placeholder/avatars/avatar.png"} className="rounded-full border border-gray-400 mr-3" width={40} height={40} />
                                            <span className='text-white pt-[3px]'>{name}</span>
                                        </div>
                                        {!!user && (
                                            <div className={"pt-3 cursor-pointer"} onClick={() => toggleVolume(name)}>
                                                <audio
                                                    volume="0"
                                                    autoPlay
                                                    ref={(instance) => (provideRef(instance, name))}
                                                />
                                                {
                                                    !!volumes[name] ? (
                                                    <VolumeOff />
                                                    ) : (
                                                    <VolumeUp />
                                                    )
                                                }
                                            </div>
                                        )}
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserPanel;
