import Image from 'next/image';
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useRouter } from 'next/router'

import { apiCaller } from "utils/fetcher";
import { useWebTRTC } from '../../utils/useWebTRTC';
import { setMsg, setPeers } from '../../redux/slices/chatSlice';
import ACTIONS from '../../config/actions';
import styles from './chat.module.css';
import { build_loadingScreen} from './loadingScreen'
// import {start_screens} from './screens'
import {chooseControls, passControls} from './utils'
import { Chat, Join, Minus, UserPlus, Users } from 'components/Icons';
import InviteFriendModal from "components/Modals/InviteFriendModal";
import MicrophoneOn from '../../components/Icons/MicrophoneOn';
import MicrophoneOff from '../../components/Icons/MicrophoneOff';
import Back from '../../components/Icons/Back';
import UserList from '../../components/Icons/UserList';
import ChatOutline from '../../components/Icons/ChatOutline';
import UserListOutline from '../../components/Icons/UserListOutline';
import { models } from "data/experience";
import VolumeUp from '../../components/Icons/VolumeUp';
import VolumeOff from '../../components/Icons/VolumeOff';
import NestedToolTip from 'components/NestedToolTip';
import freeObjectFromMemory from 'utils/clearObject';

const OwnChatModule = () => {
  const [mounted, setMounted] = useState(false)
  const { roomName, userName, modelIndex, msgs, peers, rooms } = useAppSelector(state => state.chat);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { rid } = router.query;
  const { clients, provideRef, handelMute } = useWebTRTC(rid, {name: userName});
  const [sendData, setSendData] = useState('');
  const [roomIndex, setRoomIndex] = useState(-1);
  const [intervalId, setIntervalId] = useState('');
  const [gifIntervalId, setGifIntervalId] = useState('');
  const [volumes, setVolumes] = useState({});
  const [isMute, setMute] = useState(false);
  const [iniviteFriendModal, setIniviteFriendModal] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isChatPanel, setChatPanel] = useState(true);
  const [isUserPanel, setUserPanel] = useState(true);
  const [userlist, setUserlist] = useState([]);
  const [ roomInfo, setRoomInfo ] = useState({});

  const assets = [
    {
      pos: "-2.25 1.65 -2.93",
      rot: "0 0 0",
    },
    {
      pos: "-2.97 1.84 -1.7",
      rot: "0 90 0",
    },
    {
      pos: "-2.97 2.15 0.49",
      rot: "0 90 0",
    },
    {
      pos: "-2.97 2.15 1.92",
      rot: "0 90 0",
    },
    {
      pos: "2.97 2.33 2.15",
      rot: "180 90 180",
    },
  ];
  
  const toggleChatPanel = () => {
    setChatPanel(!isChatPanel);
  }

  useEffect(async () => {
    if(!!rooms && rooms.length != 0 && rooms[roomIndex]) {
        const {
            data: { roomInfoData },
        } = await apiCaller.get(`/users/getRoomInfo/${rooms[roomIndex].name}/${rooms[roomIndex].roomNo}`);
        if(roomInfoData) {
            setRoomInfo(roomInfoData);
        }
    }
  }, [rooms, roomIndex]);

  useEffect(() => {
    setRoomIndex(rooms.findIndex(s => s.roomId == rid))
  }, [rooms]);

  useEffect(() => {
    if(open)
      getUsers();
  }, [open, rooms])

  const getUsers = async () => {
    const {
      data: { data },
    } = await apiCaller.get(`/users/getUsers`);
    var users = data;
    if(!!rooms && rooms.length != 0) {
        var roomIndex = rooms.findIndex(s => s.roomId == rid);
        var userFilter = [];
        users.map((user, index) => {
          if(user.username != localStorage.getItem('name')) {
            if(!!rooms[roomIndex] && !!rooms[roomIndex].speakers) {
              if(rooms[roomIndex].speakers.findIndex(s => s == user.username) == -1) {
                let stateIndex = rooms[roomIndex].states.findIndex(s => s == user.username);
                if( stateIndex > -1) {
                  users[index].state = "Pending";
                  users[index].link = rooms[roomIndex].links[stateIndex];
                }
                if(rooms[roomIndex].guests) {
                  const guestIndex = rooms[roomIndex].guests.findIndex(s => s.username == user.username);
                  if(guestIndex == -1) {
                    userFilter.push(users[index]);
                  }
                } else {
                  userFilter.push(users[index]);
                }
              } else {
                users[index].state = undefined;
              }
            }
          }
        });
        setUserlist(userFilter);
    }
  }

  const inviteFriend = (username) => {
      var userData = userlist.concat([]);
      setUserlist(userData);
      window.socket.emit(ACTIONS.INVITE_FRIEND, {username, invitor: localStorage.getItem('name'), roomId: rid, type: rooms[roomIndex].type, roomNo: rooms[roomIndex].roomNo});
  }

  const getAvatarImg = (userName) => {
    if(roomIndex != -1 && rooms[roomIndex]) {
      const userIndex = rooms[roomIndex].speakers.findIndex(s => s == userName);
      if(userIndex != -1) {
        return models[rooms[roomIndex].models[userIndex]].imageUrl;
      }
    }
    return '/images/icons/sol.png';
  }

  const toggleUserPanel = () => {
    setUserPanel(!isUserPanel);
  }

  const toggleVolume = (speaker) => {
    var temp = Object.assign({}, volumes);
    temp[speaker] = volumes[speaker] != undefined ? !volumes[speaker]: true;
    window.volumes = temp;
    setVolumes(temp);
  }

  useEffect(() => {
    handelMute(!isMute, userName);
  }, [isMute])

  useEffect(() => {
    require('aframe/dist/aframe-master.js');
    require('aframe-liquid-portal-shader');
    require('aframe-blink-controls');
    require('./components');
    setMounted(true)
    require('multiuser-aframe');
    THREE.Cache.enabled = false;
  }, [])

useEffect(() => {
  var clearLoading = setInterval(() => {
    var sceneEl = document.querySelector('a-scene');
    var loadingScreenEl = document.getElementById('loadingScreen');
    var loadingTextEl = document.getElementById('loadingText');
    var loadingBarEl = document.getElementById('loadingBar');
    if(sceneEl && loadingTextEl  && loadingBarEl  &&  loadingScreenEl) {
        build_loadingScreen();
        sceneEl.addEventListener('loaded', start_scene);
        clearInterval(clearLoading);
    }
  }, 300);
}, [])
  
  const start_scene = () => {
      // setGifIntervalId(start_screens())
      chooseControls();
      passControls();
  }

  const updateVolume = () => {
    var positions = {};
    for(var playerName in window.positions) {
      var player = window.positions[playerName];
      if(!!player.components) {
        positions[playerName] = player.components[0];
      }
      if(!!player.d){
        positions[playerName] = player.d[0].components[0];
      }
    }
    var myPosition = {};
    if(!!window.myPosition) {
      if(!!window.myPosition.components) {
        myPosition = window.myPosition.components[0];
      }
      if(!!window.myPosition.d) {
        myPosition = window.myPosition.d[0].components[0];
      }
    }
    var audios = window.audios;
    for(var audio in audios) {
      if(audio != userName) {
        if(!!positions[audio] && !!myPosition) {
          var a = myPosition.x - positions[audio].x;
          var b = myPosition.z - positions[audio].z;
          var distance = (a*a + b*b);
          if(distance < 4 || !distance)
            distance = 4;
          if(!!window.volumes && !!window.volumes[audio] && !!audios && !!audios[audio]) {
            audios[audio].volume = 0;
          } else {
            if(!!audios && !!audios[audio])
              audios[audio].volume = 1 / distance;
          }
        }
      }
    }
  }

  useEffect(() => {
    const loadInterval = setInterval(() => {console.log(window.modelLoaded);
      if (isLoaded || window.modelLoaded) {
        var entity = document.querySelector('#player');
        if (!!entity) {
          window.NAF.schemas.add({
            template: '#avatar-template',
            components: [
              'position',
              'rotation',
            ]
          });
          window.isReady1 = true;
          setIntervalId(setInterval(updateVolume, 300));
          window.modelLoaded = false;
          clearInterval(loadInterval);
        }
      }
      setTimeout(() => {
        clearInterval(loadInterval);
      }, 10000);
    }, 300);
  }, [])

  const handelMuteBtnClick = () => {
    setMute((prev) => !prev);
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter') {
      sendMsg();
    }
  }

  const sendMsg = () => {
    window.socket.emit('send-msg', {roomId: rid, data: sendData});
    setSendData('');
  }

  const handelManualLeave = () => {
    clearInterval(intervalId);
    // clearInterval(gifIntervalId);

    var objectsToDelete = [];
    var items = document.querySelectorAll('.model');
    for (var iIndex = 0; iIndex < items.length; iIndex++){
      objectsToDelete.push(items[iIndex]);
    }
    for (var i = 0; i < objectsToDelete.length; i++) {
      freeObjectFromMemory(objectsToDelete[i].object3D, objectsToDelete[i]);    
    }

    window.isReady1 = false;
    window.modelLoaded = false;
    window.positions = {};
    window.myPosition = {};
    window.socket.emit(ACTIONS.LEAVE, { roomId: rid, user: {name: userName} } );
    dispatch(setMsg([]));
    dispatch(setPeers([]));
    router.push('/experience');
  }

  useEffect(() => {
    if(!!document.querySelector('.ui-chat'))
      document.querySelector('.ui-chat').scrollTop = document.querySelector('.ui-chat').scrollHeight
  }, [msgs])

  const handleInviteFriendToggle = () => {
    setIniviteFriendModal(!iniviteFriendModal);
  }

  if (mounted && models && models[modelIndex] && models[modelIndex].modelUrl) {
      return (
        <div>
          <video className={styles.background_video} id="background_video" autoPlay loop muted>
              <source src="/assets/video/loading_video.mp4" type="video/mp4"/>
          </video>
          <div id="loadingScreen" className={styles.loadingScreen}>
              <div id="loadingText" className={styles.loadingText}>
              </div>
              <div id="loadingBar" className={styles.loadingBar}>
              </div>
              <div id="loading_label" className={styles.loading_label}>
                  POWERED BY SOLARITY
                  <img id="loading_logo" className={styles.loading_logo} src="/assets/images/loading_logo.png" alt="loadig_logo"/>
              </div>
          </div>
          <div id="sceneWrapper" style={{opacity: "0"}}>
              
          <div className='fixed top-[5vh] left-[30px] cursor-pointer' onClick={() => handelManualLeave()}>
              <div className='flex rounded-lg bg-brandblack px-4 py-2'>
                <img src="/images/arrow-left.png" className='mt-1' style={{marginTop: '7px', height: "15px"}} width={15} height={15} alt="back" srcSet="" />
                <span className='ml-3'>All Rooms</span>
              </div>
          </div>

          <div className={"fixed top-[20vh] left-[30px] w-[250px] transition-opacity " + (isUserPanel ? 'opacity-100': 'opacity-0')}>
              <div className='rounded-lg bg-brandblack px-4 py-2 w-full h-full'>
              <div className='text-lg mb-4 flex justify-between pt-4'>
                  <div>User List</div>
                  <div className='cursor-pointer pt-[3px]' onClick={toggleUserPanel}><Minus /></div>
                </div>
                <div className='list overflow-auto h-[55vh]'>
                  <ul className='no-underline'>
                    {!!rooms && rooms.length != 0 && roomIndex != -1 && !!rooms[roomIndex] && rooms[roomIndex].clients && clients.map((ele, index) => (
                      <li className={'border-b border-gray-700 py-2 px-1 flex justify-between '+ (ele.name == userName ? 'hidden': '')} key={index}>
                        <div className='flex'>
                          <img src={getAvatarImg(ele.name)} className="rounded-full mr-3" width={40} height={40}/>
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
                      <li className={'border-b border-gray-700 py-2 px-1 pl-5 flex justify-between '+ (user.username == userName ? 'hidden': '')} key={(!!clients ? clients.length: 0) + index}>
                        <div className='flex'>
                          <span className='text-white'>{user.username}</span>
                        </div>
                        <div className='flex'>
                          <span className='text-white'>{!user.state ? 'idle': user.state}</span>
                        </div>
                        <div className='pt-1 cursor-pointer'>
                          {!user.state ? (
                            <button className="rounded-full" onClick={() => inviteFriend(user.username)}>
                              <Join />
                            </button>
                          ): (
                            <div className="flex" >
                              <NestedToolTip link={process.env.NODE_ENV === "development" ? "http://localhost:3000/" + 'experience/invitation/' + user.link : "https://solarity-web-git-master-hassan-sk.vercel.app/" + 'experience/invitation/' + user.link}/>
                            </div>
                          )}
                        </div>
                      </li>
                  ))}
                  </ul>
                </div>
              </div>
          </div>
    
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
            <div className='p-2 border border-gray-600 rounded-lg mx-1 cursor-pointer hover:border-gray-400' onClick={toggleChatPanel}>
              {
                isChatPanel ? (
                <Chat />
                ) : (
                <ChatOutline />
                )
              }
            </div>
            <div className='p-2 border border-gray-600 rounded-lg mx-1 cursor-pointer hover:border-gray-400' onClick={toggleUserPanel}>
              {
                isUserPanel ? (
                <UserList />
                ) : (
                <UserListOutline />
                )
              }
            </div>
            <div className='p-2 border border-gray-600 rounded-lg mx-1 cursor-pointer hover:border-gray-400' onClick={() => handelManualLeave()}>
              <Back />
            </div>
          </div>
          <div className={"fixed top-[5vh] h-[90vh] max-h-[90vh] right-[30px] min-w-[300px] bg-brandblack rounded-lg w-1/4 transition-opacity " + (isChatPanel ? 'opacity-100': 'opacity-0')}>
            <div className='w-full p-[30px] h-full flex flex-col gap-2'>
              <div className='text-lg mb-4 flex justify-between'>
                <div>Room Chat</div>
                <div className='cursor-pointer pt-[3px]' onClick={toggleChatPanel}><Minus /></div>
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
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setSendData(e.target.value)}
                  placeholder="Input a message please."
                  />
                <button label="" style={{marginLeft: "20px"}} onClick={sendMsg} >send</button>
              </div>
            </div>
          </div>
        </div>
        <InviteFriendModal 
          open={iniviteFriendModal}
          onClose={handleInviteFriendToggle}
        />
      </div>
    );
  }
  return (
    <div id="loadingScreen">
        ...Load
    </div>
  )
};

export default OwnChatModule;