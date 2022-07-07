import Image from 'next/image';
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useRouter } from 'next/router'

import { apiCaller } from "utils/fetcher";
import { useWebTRTC } from '../../utils/useWebTRTC';
import { setMsg, setPeers } from '../../redux/slices/chatSlice';
import ACTIONS from '../../config/actions';
import styles from './chat.module.css';
import { build_loadingScreen } from './loadingScreen'
import { startHub } from './hubUtils'
// import {start_screens} from './screens'
import { chooseControls, passControls } from './utils'
import InviteFriendModal from "components/Modals/InviteFriendModal";
import { models } from "data/experience";
import freeObjectFromMemory from '../../utils/clearObject';
import ChatToolbar from '../../components/ChatToolbar';
import UserPanel from '../../components/UserPanel';
import ChatPanel from '../../components/ChatPanel';
import ChatPublicModel from "components/ChatPublicModel";
import ChatPrivateModel from "components/ChatPrivateModel";
import { checkBrowser, getWidth } from 'utils';
import { Close } from 'components/Icons';
import { getNfts } from 'hooks';
import { NftCard } from '../User/Art';

const ChatModule = () => {
  const [mounted, setMounted] = useState(false)
  const { roomName, userName, modelIndex, msgs, peers, rooms, selectedIndex } = useAppSelector(state => state.chat);
  const { data } = useAppSelector(state => state.profile);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { rid, roomType, no } = router.query;
  const { clients, provideRef, handelMute } = useWebTRTC(rid, { name: userName ? userName: localStorage.getItem('userName'), avatarUrl: data ? data.profileImageLink: "" });
  const [sendData, setSendData] = useState('');
  const [roomIndex, setRoomIndex] = useState(-1);
  const [intervalId, setIntervalId] = useState('');
  const [volumes, setVolumes] = useState({});
  const [isMute, setMute] = useState(false);
  const [iniviteFriendModal, setIniviteFriendModal] = useState(true);
  const [isChatPanel, setChatPanel] = useState(true);
  const [isUserPanel, setUserPanel] = useState(true);
  const [userlist, setUserlist] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [nftspanel, toggleNFTsPanel] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  
  const [nfts, loading, error] = getNfts(selectedIndex == -1 ? userName: rooms[selectedIndex].name, selectedIndex == -1 ? data.solanaAddress : rooms[selectedIndex].solanaAddress);

  const toggleChatPanel = () => {
    setChatPanel(!isChatPanel);
    if(checkBrowser()) { // if mobile
      setUserPanel(isChatPanel && isUserPanel);
    }
  }
  
  const toggleUserPanel = () => {
    setUserPanel(!isUserPanel);
    if(checkBrowser()) { // if mobile
      setChatPanel(isChatPanel && isUserPanel);
    }
  }

  useEffect(() => {
    setRoomIndex(rooms.findIndex(s => s.roomId == rid))
  }, [rooms]);


  useEffect(async () => {
    if (!!rooms && rooms.length != 0 && rooms[roomIndex] && !!rooms[roomIndex].name) {
      const {
        data: { roomInfoData },
      } = await apiCaller.get(`/users/getRoomInfo/${rooms[roomIndex].name}/${rooms[roomIndex].roomNo}`);
      if (roomInfoData) {
        setRoomInfo(roomInfoData);
      }
    }
  }, [rooms, roomIndex]);

  useEffect(() => {
    function init() {
      if (open)
        getUsers();
    }
    init();
  }, [open, rooms])

  const getAvatarImg = (userName) => {
    if (roomIndex != -1 && rooms[roomIndex]) {
      const userIndex = rooms[roomIndex].speakers.findIndex(s => s == userName);
      if (userIndex != -1) {
        return models[rooms[roomIndex].models[userIndex]].imageUrl;
      }
    }
    return '/images/icons/sol.png';
  }

  const getUsers = async () => {
    var roomIndex = rooms.findIndex(s => s.roomId == rid);
    if(roomIndex != -1) {
      rooms[roomIndex].speakers.map((speaker, index) => {
        const user = {
          username: speaker,
          link: rooms[roomIndex].links[index],
        }
      })
      setUserlist();
    }
  }

  const inviteFriend = (username) => {
    var userData = userlist.concat([]);
    setUserlist(userData);
    window.socket.emit(ACTIONS.INVITE_FRIEND, { username, invitor: localStorage.getItem('name'), roomId: rid, type: rooms[roomIndex].type, roomNo: rooms[roomIndex].roomNo });
  }

  const toggleVolume = (speaker) => {
    var temp = Object.assign({}, volumes);
    temp[speaker] = volumes[speaker] != undefined ? !volumes[speaker] : true;
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
    require('aframe-extras');
    require('./components');
    require('./presentation');
    require('./page-controls');
    THREE.Cache.enabled = false;
    setMounted(true);
    if(checkBrowser()) { // if mobile
      setUserPanel(false);
    }
    if(getWidth() < 640) {
      setChatPanel(false);
    }
    localStorage.setItem('modelLoaded', "false");
    require('multiuser-aframe');
    const loadInterval = setInterval(() => {
      if (localStorage.getItem('modelLoaded') == "true") {
        clearInterval(loadInterval);
        setLoadingFlag(true);
      }
    }, 300);
    setTimeout(() => {
      clearInterval(loadInterval);
      setLoadingFlag(true);
    }, 100000);
  }, [])

  useEffect(() => {
    var clearLoading = setInterval(() => {
      var sceneEl = document.querySelector('a-scene');
      var loadingScreenEl = document.getElementById('loadingScreen');
      var loadingTextEl = document.getElementById('loadingText');
      var loadingBarEl = document.getElementById('loadingBar');
      if (sceneEl && loadingTextEl && loadingBarEl && loadingScreenEl) {
        build_loadingScreen();
      }
      clearInterval(clearLoading);
    }, 300);
  }, [])

  const start_scene = () => {
    if (roomType == 0)
      startHub();
    chooseControls();
    passControls();
  }

  const updateVolume = () => {
    var positions = {};
    for (var playerName in window.positions) {
      var player = window.positions[playerName];
      if (!!player.components) {
        positions[playerName] = player.components[0];
      }
      if (!!player.d) {
        positions[playerName] = player.d[0].components[0];
      }
    }
    var myPosition = {};
    if (!!window.myPosition) {
      if (!!window.myPosition.components) {
        myPosition = window.myPosition.components[0];
      }
      if (!!window.myPosition.d) {
        myPosition = window.myPosition.d[0].components[0];
      }
    }
    var audios = window.audios;
    for (var audio in audios) {
      if (audio != userName) {
        if (!!positions[audio] && !!myPosition) {
          var a = myPosition.x - positions[audio].x;
          var b = myPosition.z - positions[audio].z;
          var distance = (a * a + b * b);
          if (distance < 4 || !distance)
            distance = 4;
          if (!!window.volumes && !!window.volumes[audio] && !!audios && !!audios[audio]) {
            audios[audio].volume = 0;
          } else {
            if (!!audios && !!audios[audio])
              audios[audio].volume = 1 / distance;
          }
        }
      }
    }
  }

  useEffect(() => {
    const loadInterval = setInterval(() => {
      if (loadingFlag) {
        var entity = document.querySelector('#rig');
        if (!!entity) {
          window.NAF.schemas.add({
            template: '#avatar-template',
            components: [
              'position',
              'rotation',
              {
                selector: '.nametag',
                component: 'text',
                property: 'value'
              },
              {
                selector: '.model',
                component: 'src',
              }
            ]
          });
          localStorage.setItem('modelLoaded', "false");
          window.isReady1 = true;
          start_scene();
          setIntervalId(setInterval(updateVolume, 300));
          clearInterval(loadInterval);
        }
      }
    }, 300);
    setTimeout(() => {
      clearInterval(loadInterval);
    }, 10000);
  }, [loadingFlag])

  const handelMuteBtnClick = () => {
    setMute((prev) => !prev);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMsg();
    }
  }

  const sendMsg = () => {
    if(sendData != "") {
      window.socket.emit('send-msg', { roomId: rid, data: {sendData, avatarUrl: data && data.profileImageLink ? data.profileImageLink: ""} });
      setSendData('');
    }
  }

  const handelManualLeave = () => {
    clearInterval(intervalId);
    // clearInterval(gifIntervalId);

    var objectsToDelete = [];
    var items = document.querySelectorAll('.model');
    for (var iIndex = 0; iIndex < items.length; iIndex++) {
      objectsToDelete.push(items[iIndex]);
    }
    var scene = document.querySelector('scene');
    objectsToDelete.push(scene);
    for (var i = 0; i < objectsToDelete.length; i++) {
      if(!!objectsToDelete[i]) {
        freeObjectFromMemory(objectsToDelete[i].object3D, objectsToDelete[i]);
      }
    }

    window.isReady1 = false;
    window.positions = {};
    window.myPosition = {};
    window.socket.emit(ACTIONS.LEAVE, { roomId: rid, user: { name: userName } });
    dispatch(setMsg([]));
    dispatch(setPeers([]));
    if(getWidth() <= 640 && !checkBrowser()) {
      top.window.location.href = process.env.NEXT_PUBLIC_FRONTEND_URL + "/experience";
      return;
    }
    router.push('/experience');
  }


  useEffect(() => {
    if (!!document.querySelector('.ui-chat'))
      document.querySelector('.ui-chat').scrollTop = document.querySelector('.ui-chat').scrollHeight
  }, [msgs])

  const handleInviteFriendToggle = () => {
    setIniviteFriendModal(!iniviteFriendModal);
  }

  const selectCard = (index) => {
    setSelectedCardIndex(index);
  }

  if (mounted && models && models[modelIndex] && models[modelIndex].modelUrl) {
    return (
      <div>
          <div className={nftspanel ? "hidden": "block"}>
            <div id="loadingScreen" className="fixed top-0 left-0 right-0 bottom-0">
              <div className='relative h-full w-full'>
                <img src={!!localStorage.getItem("roomBgImg") ? localStorage.getItem("roomBgImg"): ""} width="100%" height="100%" className='absolute top-0 right-0 bottom-0 left-0 z-0'/>
                <div className="relative h-full w-full bg-[rgba(12,12,14,0.7)] backdrop-blur-lg pt-[calc(50vh-104px)] sm:pt-[calc(50vh-165px)] z-10">
                  <div className="w-[210px] h-[210px] sm:w-[330px] sm:h-[330px] m-auto">
                    <div className="text-white items-center flex h-full">
                      <div className="text-center m-auto h-full w-full">
                        <div className="progress relative h-full w-full">
                          <svg className="circle-loading-bar hidden sm:block w-full h-full">
                            <circle cx="165" cy="165" r="160"></circle>
                            <circle cx="165" cy="165" r="160" style={{"--percent": 0}}></circle>
                          </svg>
                          <svg className="circle-loading-bar block sm:hidden w-full h-full">
                            <circle cx="104" cy="104" r="100"></circle>
                            <circle cx="104" cy="104" r="100" style={{"--percent": 0}}></circle>
                          </svg>
                          <div className="absolute left-[65px] top-[60px] sm:top-[90px] sm:left-[105px]">
                            <h2 className="loading-status text-[40px] sm:text-[70px] font-bold font-['Outfit'] mb-2 sm:mb-5">0</h2>
                            <span className="text-xs sm:text-lg">loading models</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="sceneWrapper" style={{ opacity: "0" }}>
              {roomType > 2 ? (
                <ChatPrivateModel
                  modelNo={no}
                  roomInfo={roomInfo}
                  modelURL={models[modelIndex].modelUrl}
                  name={userName}
                />
              ) : (
                <ChatPublicModel
                  roomType={roomType}
                  modelURL={models[modelIndex].modelUrl}
                  name={userName}
                />
              )}
              <div className='hidden sm:block fixed top-[5vh] left-[30px] cursor-pointer' onClick={() => handelManualLeave()}>
                <div className='flex rounded-lg bg-brandblack px-4 py-2'>
                  <img src="/images/arrow-left.png" className='mt-1' style={{ marginTop: '7px', height: "15px" }} width={15} height={15} alt="back" srcSet="" />
                  <span className='ml-3'>All Rooms</span>
                </div>
              </div>
              <UserPanel
                isUserPanel={isUserPanel}
                rooms={rooms}
                roomIndex={roomIndex}
                userName={userName}
                volumes={volumes}
                clients={clients}
                toggleUserPanel={toggleUserPanel}
                toggleVolume={toggleVolume}
                provideRef={provideRef}
                inviteFriend={inviteFriend}
                getAvatarImg={getAvatarImg}
              />
              <ChatToolbar
                isMute={isMute}
                isUserPanel={isUserPanel}
                isChatPanel={isChatPanel}
                provideRef={provideRef}
                handelMuteBtnClick={handelMuteBtnClick}
                toggleUserPanel={toggleUserPanel}
                toggleChatPanel={toggleChatPanel}
                handelManualLeave={handelManualLeave}
                toggleNFTsPanel={toggleNFTsPanel}
              />
              <ChatPanel
                isChatPanel={isChatPanel}
                msgs={msgs}
                sendData={sendData}
                toggleChatPanel={toggleChatPanel}
                getAvatarImg={getAvatarImg}
                handleKeyDown={handleKeyDown}
                setSendData={setSendData}
                sendMsg={sendMsg}
              />
            </div>
          </div>
          <div className={(nftspanel ? "block": "hidden") + " transition-all h-[100vh] overflow-auto"}> 
            <div className='m-5 py-2 flex justify-between'>
              <h2 className='text-2xl'>NFT Gallery</h2>
              <div className='cursor-pointer hover:text-teal-300' onClick={() => toggleNFTsPanel(false)}>
                <Close />
              </div>
            </div>
            <div className="grid grid-cols-3">
              <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 my-4 m-5">
                {nfts && nfts.map((data, index) => (
                  <NftCard key={"nftCard-" + index} selected={index == selectedCardIndex} {...data} onClick={() => selectCard(index)} />
                ))}
              </div>
              <div className='col-span-1'>
                {console.log(nfts[selectedCardIndex])}
                {nfts[selectedCardIndex] && (
                  <div>
                    <div className='flex'>
                      <div>Title: </div>&nbsp;&nbsp;<div>{nfts[selectedCardIndex].name}</div>
                    </div>
                    <div className='flex'>
                      <div>Collection Name: </div>&nbsp;&nbsp;<div>{nfts[selectedCardIndex].collectionName}</div>
                    </div>
                    <div className='flex'>
                      <div>Mint Address: </div>&nbsp;&nbsp;<div>{nfts[selectedCardIndex].mintAddress}</div>
                    </div>
                    <div className='flex'>
                      <a href='#'>view Magic Eden</a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
      </div>
    );
  }
  return (
    <div id="loadingScreen">
      ...Load
    </div>
  )
};

export default ChatModule;
