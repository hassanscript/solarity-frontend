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
import { checkBrowser } from 'utils';
const ChatModule = () => {
  const [mounted, setMounted] = useState(false)
  const { roomName, userName, modelIndex, msgs, peers, rooms } = useAppSelector(state => state.chat);
  const { data } = useAppSelector(state => state.profile);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { rid, roomType, no } = router.query;
  const { clients, provideRef, handelMute } = useWebTRTC(rid, { name: userName, avatarUrl: data ? data.profileImageLink: "" });
  const [sendData, setSendData] = useState('');
  const [roomIndex, setRoomIndex] = useState(-1);
  const [intervalId, setIntervalId] = useState('');
  const [volumes, setVolumes] = useState({});
  const [isMute, setMute] = useState(false);
  const [iniviteFriendModal, setIniviteFriendModal] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [isChatPanel, setChatPanel] = useState(true);
  const [isUserPanel, setUserPanel] = useState(true);
  const [userlist, setUserlist] = useState([]);
  const [roomInfo, setRoomInfo] = useState({});

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
    THREE.Cache.enabled = false;
    setMounted(true);
    localStorage.setItem('modelLoaded', "false");
    require('multiuser-aframe');
  }, [])

  useEffect(() => {
    var clearLoading = setInterval(() => {
      var sceneEl = document.querySelector('a-scene');
      var loadingScreenEl = document.getElementById('loadingScreen');
      var loadingTextEl = document.getElementById('loadingText');
      var loadingBarEl = document.getElementById('loadingBar');
      if (sceneEl && loadingTextEl && loadingBarEl && loadingScreenEl) {
        build_loadingScreen();
        sceneEl.addEventListener('loaded', start_scene);
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
      if (isLoaded || localStorage.getItem('modelLoaded') == "true") {
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
          setIntervalId(setInterval(updateVolume, 300));
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
    window.socket.emit('send-msg', { roomId: rid, data: {sendData, avatarUrl: data ? data.profileImageLink: ""} });
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
        {!checkBrowser() && (
          <video className={styles.background_video} id="background_video" autoPlay loop muted>
            <source src="/assets/video/loading_video.mp4" type="video/mp4" />
          </video>
        )}
        <div id="loadingScreen" className={styles.loadingScreen}>
          <div id="loadingText" className={styles.loadingText}>
          </div>
          <div id="loadingBar" className={styles.loadingBar}>
          </div>
          <div id="loading_label" className={styles.loading_label}>
            POWERED BY SOLARITY
            <img id="loading_logo" className={styles.loading_logo} src="/assets/images/loading_logo.png" alt="loadig_logo" />
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
    <div id="loadingScreen">
      ...Load
    </div>
  )
};

export default ChatModule;
