import Image from 'next/image';
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useRouter } from 'next/router'

import { apiCaller } from "utils/fetcher";
import { useWebTRTC } from '../../utils/useWebTRTC';
import { setMsg, setPeers } from '../../redux/slices/chatSlice';
import ACTIONS from '../../config/actions';
import styles from './chat.module.css';
import { build_loading_screen } from './loading_screen'
import { start_screens } from './screens'
// import {start_screens} from './screens'
import { choose_controls, pass_controls } from './utils'
import InviteFriendModal from "components/Modals/InviteFriendModal";
import { models } from "data/experience";
import freeObjectFromMemory from '../../utils/clearObject';
import ChatToolbar from '../../components/ChatToolbar';
import UserPanel from '../../components/UserPanel';
import ChatPanel from '../../components/ChatPanel';
import ChatPublicModel from "components/ChatPublicModel";
import ChatPrivateModel from "components/ChatPrivateModel";

const ChatModule = () => {
  const [mounted, setMounted] = useState(false)
  const { roomName, userName, modelIndex, msgs, peers, rooms } = useAppSelector(state => state.chat);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { rid, roomType, no } = router.query;
  const { clients, provideRef, handelMute } = useWebTRTC(rid, { name: userName });
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

  const toggleChatPanel = () => {
    setChatPanel(!isChatPanel);
  }

  useEffect(() => {
    setRoomIndex(rooms.findIndex(s => s.roomId == rid))
  }, [rooms]);

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
    const {
      data: { data },
    } = await apiCaller.get(`/users/getUsers`);
    var users = data;
    if (!!rooms && rooms.length != 0) {
      var roomIndex = rooms.findIndex(s => s.roomId == rid);
      var userFilter = [];
      users.map((user, index) => {
        if (user.username != localStorage.getItem('name')) {
          if (!!rooms[roomIndex] && !!rooms[roomIndex].speakers) {
            if (rooms[roomIndex].speakers.findIndex(s => s == user.username) == -1) {
              let stateIndex = rooms[roomIndex].states.findIndex(s => s == user.username);
              if (stateIndex > -1) {
                users[index].state = "Pending";
                users[index].link = rooms[roomIndex].links[stateIndex];
              }
              if (!rooms[roomIndex].guests) {
                // const guestIndex = rooms[roomIndex].guests.findIndex(s => s.username == user.username);
                // if (guestIndex == -1) {
                //   userFilter.push(users[index]);
                // }
              // } else {
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
    window.socket.emit(ACTIONS.INVITE_FRIEND, { username, invitor: localStorage.getItem('name'), roomId: rid, type: rooms[roomIndex].type, roomNo: rooms[roomIndex].roomNo });
  }

  const toggleUserPanel = () => {
    setUserPanel(!isUserPanel);
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
    require('./components');
    setMounted(true)
    require('multiuser-aframe');
    THREE.Cache.enabled = false;
  }, [])

  useEffect(() => {
    var clearLoading = setInterval(() => {
      var sceneEl = document.querySelector('a-scene');
      var loading_screenEl = document.getElementById('loading_screen');
      var loading_textEl = document.getElementById('loading_text');
      var loading_barEl = document.getElementById('loading_bar');
      if (sceneEl && loading_textEl && loading_barEl && loading_screenEl) {
        build_loading_screen();
        sceneEl.addEventListener('loaded', start_scene);
      }
      clearInterval(clearLoading);
    }, 300);
  }, [])

  const start_scene = () => {
    start_screens();
    choose_controls();
    pass_controls();
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
    if (e.key === 'Enter') {
      sendMsg();
    }
  }

  const sendMsg = () => {
    window.socket.emit('send-msg', { roomId: rid, data: sendData });
    setSendData('');
  }

  const handelManualLeave = () => {
    clearInterval(intervalId);
    // clearInterval(gifIntervalId);

    var objectsToDelete = [];
    var items = document.querySelectorAll('.model');
    for (var iIndex = 0; iIndex < items.length; iIndex++) {
      objectsToDelete.push(items[iIndex]);
    }
    for (var i = 0; i < objectsToDelete.length; i++) {
      freeObjectFromMemory(objectsToDelete[i].object3D, objectsToDelete[i]);
    }

    window.isReady1 = false;
    window.positions = {};
    window.myPosition = {};
    window.socket.emit(ACTIONS.LEAVE, { roomId: rid, user: { name: userName } });
    dispatch(setMsg([]));
    dispatch(setPeers([]));
    router.push('/experience');
  }

  useEffect(() => {
    if (!!document.querySelector('.ui-chat'))
      document.querySelector('.ui-chat').scrollTop = document.querySelector('.ui-chat').scrollHeight
  }, [msgs])

  const handleInviteFriendToggle = () => {
    setIniviteFriendModal(!iniviteFriendModal);
  }

  if (mounted && models && models[modelIndex] && models[modelIndex].modelUrl) {
    return (
      <div>
        <video className={styles.background_video} id="background_video" autoPlay loop muted>
          <source src="/assets/video/loading_video.mp4" type="video/mp4" />
        </video>
        <div id="loading_screen" className={styles.loading_screen}>
          <div id="loading_text" className={styles.loading_text}>
          </div>
          <div id="loading_bar" className={styles.loading_bar}>
          </div>
          <div id="loading_label" className={styles.loading_label}>
            POWERED BY SOLARITY
            <img id="loading_logo" className={styles.loading_logo} src="/assets/images/loading_logo.png" alt="loadig_logo" />
          </div>
        </div>
        <div id="scene_wrapper" style={{ opacity: "0" }}>
          {roomType > 1 ? (
            <ChatPrivateModel 
              modelURL={models[modelIndex].modelUrl} 
              modelNo={no}
            />
            ): (
            <ChatPublicModel 
              type={roomType}
              modelURL={models[modelIndex].modelUrl}
            />
          )}
          <div className='fixed top-[5vh] left-[30px] cursor-pointer' onClick={() => handelManualLeave()}>
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
            userlist={userlist}
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
        <InviteFriendModal
          open={iniviteFriendModal}
          onClose={handleInviteFriendToggle}
        />
      </div>
    );
  }
  return (
    <div id="loading_screen">
      ...Load
    </div>
  )
};

export default ChatModule;
