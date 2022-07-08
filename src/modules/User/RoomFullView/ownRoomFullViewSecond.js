import { useEffect, useState } from "react";
import { build_loadingScreen } from "modules/ChatModule/loadingScreen";
import {chooseControls, passControls} from 'modules/ChatModule/utils'
import styles from 'modules/ChatModule/chat.module.css';
import { useRouter } from "next/router";
import { Close, Desktop } from "components/Icons";
import { getNfts } from "hooks";
import { NftCard } from "../Art";
import { minifyAddress, getWidth } from "utils";

export default function RoomFullView({user}) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const { roomId } = router.query;
  const [room, setRoom] = useState({});
  const [nftspanel, toggleNFTsPanel] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const [nfts, loading, error] = getNfts(user.username, user.solanaAddress);

  const assets = [
    {
      pos: "-5.97 1.876 1.82",
      rot: "0 90 0",
    },
    {
      pos: "-5.97 1.876 -0.1",
      rot: "0 90 0",
    },
    {
      pos: "-5.97 1.876 -2.087",
      rot: "0 90 0",
    },
    {
      pos: "5.2333 1.889 -2.060",
      rot: "0 -90 0",
    },
    {
      pos: "5.2333 1.889 -0.079",
      rot: "0 -90 0",
    },
    {
      pos: "5.2333 1.889 1.830",
      rot: "0 -90 0",
    },
  ];
  useEffect(() => {
    require("aframe/dist/aframe-master.js");
    require('aframe-liquid-portal-shader');
    require('aframe-blink-controls');
    require('modules/ChatModule/components');
    if(user.rooms) {
      var room = user.rooms.find(s => s._id == roomId);
      if(!!room) {
        setRoom(room);
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    var clearHandle = setInterval(() => {
      var sceneEl = document.querySelector('a-scene');
      var loadingScreenEl = document.getElementById('loadingScreen');
      var loadingTextEl = document.getElementById('loadingText');
      var loadingBarEl = document.getElementById('loadingBar');
      if(sceneEl && loadingTextEl  && loadingBarEl  &&  loadingScreenEl) {
        build_loadingScreen();
        sceneEl.addEventListener('loaded', start_scene);
        clearInterval(clearHandle);
      }
    }, 300);
  }, [])

  const start_scene = () => {
    // setGifIntervalId(start_screens())
    chooseControls();
    passControls();
  }

  const selectCard = (index) => {
    setSelectedCardIndex(index);
  }

  if (mounted) {
    return (
      <div>
        <div className={"h-[100vh] " + (nftspanel ? "hidden": "block")}>
          <div id="loadingScreen" className="fixed top-0 left-0 right-0 bottom-0">
            <div className='relative h-full w-full'>
              <img src={'/images/placeholder/marketplace/rooms/1.png'} width="100%" height="100%" className='absolute top-0 right-0 bottom-0 left-0 z-0'/>
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
          <div id="sceneWrapper" style={{opacity: 0}}>
            <a-scene 
              embedded
              renderer="antialias: true;
              colorManagement: true;
              sortObjects: true;
              physicallyCorrectLights: true;
              maxCanvasWidth: 1920;
              maxCanvasHeight: 1920;" 
              id="sceneWrapper" 
              style={{position: "absolute", top: "0px", zIndex: 0}}
          >
              <a-assets timeout="100000">
                <a-asset-item id="room2-gltf" src="/assets/models/own_second/SolGod ancient temple.glb"></a-asset-item>
                <a-asset-item id="navmesh-gltf" src="/assets/models/own_second/navmesh.gltf"></a-asset-item>

                <img id="hub-img" src="/assets/images/hub.png"/>
                <img id="sky-img" src="/assets/images/sky.jpg"/>

              </a-assets>

              <a-entity id="player">
                  <a-entity simple-navmesh-constraint="navmesh:#navmesh;fall:0.5;height:1.65;" id="head"
                              camera="fov: 70; active: true" position="0 1.65 0" wasd-controls="acceleration: 20;"
                              look-controls="pointerLockEnabled: true; reverseMouseDrag: false">
                      <a-entity id="cursor" class="mouseOnly" cursor="mousedown: true;" raycaster="far: 10; objects: .clickable"
                                  material="color: white; shader: flat" position="0 0 -0.3"
                                  geometry="primitive: ring; radiusInner: 0.005; radiusOuter: 0.007">
                      </a-entity>
                  </a-entity>
                  <a-entity id="leftHand" class="leftController controllerOnly"
                              hand-controls="hand: left; handModelStyle: lowPoly; color: #15ACCF"
                              laser-controls="hand: left" vive-controls="hand: left" oculus-touch-controls="hand: left"
                              windows-motion-controls="hand: left" daydream-controls="hand: left"
                              gearvr-controls="hand: left" magicleap-controls="hand: left" oculus-go-controls="hand: left"
                              valve-index-controls="hand: left" vive-focus-controls="hand: left"
                              generic-tracked-controller-controls="hand: left" raycaster="far: 0; objects: .leftclickable;"
                              blink-controls="cameraRig: #player; teleportOrigin: #camera; button: trigger; curveShootingSpeed: 10; collisionEntities: .collision; landingMaxAngle: 10"
                              visible="true"></a-entity>
                  <a-entity id="rightHand" class="rightController controllerOnly"
                              hand-controls="hand: right; handModelStyle: lowPoly; color: #15ACCF"
                              laser-controls="hand: right" vive-controls="hand: right" oculus-touch-controls="hand: right"
                              windows-motion-controls="hand: right" daydream-controls="hand: right"
                              gearvr-controls="hand: right" magicleap-controls="hand: right"
                              oculus-go-controls="hand: right" valve-index-controls="hand: right"
                              vive-focus-controls="hand: right" generic-tracked-controller-controls="hand: right"
                              raycaster="showLine: true; far: 10; interval: 0; objects: .clickable, a-link;"
                              line="color: lawngreen; opacity: 0.5" visible="true"></a-entity>
              </a-entity>

              {/* "ambient" lights */}
              <a-entity position="-15 40 40" light="type: point; intensity:  5; distance: 100; decay: 0; color:  #FFFFFF; cast-shadow: false;">
              </a-entity>
              {/* ambient light */}
              <a-entity light="type: ambient; intensity: 0.5; color:  #FFFFFF;"></a-entity>
              {/* models */}
              <a-gltf-model shadow="cast: true; receive: true" model-info class="model" src="#room2-gltf" position="0 0 0" scale="1 1 1"></a-gltf-model>
              <a-gltf-model id="navmesh" model-info class="model" src="#navmesh-gltf" visible="false">
              </a-gltf-model>

              {assets.map((asset, index) => (
                  <a-plane
                  key={index}
                  class={`frame picno${index + 1}`}
                  position={asset.pos}
                  width="1.370"
                  height="1.370"
                  rotation={asset.rot}
                  material="shader:standard;"
                  color="#111122"
                  >
                  {!!room && room != {} &&
                      !!room.nftStates &&
                      room.nftStates.map((nft, index1) => {
                      if (index + 1 == nft.no)
                          return (
                          <a-image
                              src={nft.link}
                              key={index1}
                              width="1.370"
                              height="1.370"
                              position=""
                              material=""
                              geometry=""
                          ></a-image>
                          );
                      })}
                  </a-plane>
              ))}
              <a-sky src="#sky-img"></a-sky>
            </a-scene>
            <div className='fixed top-[5vh] left-[30px] cursor-pointer' onClick={() => toggleNFTsPanel(true)}>
              <div className='flex rounded-lg bg-brandblack px-4 py-2'>
                <Desktop />&nbsp;
                <span className='ml-3'>View Assets</span>
              </div>
            </div>
          </div>
        </div>
        <div className={(nftspanel ? "block": "hidden") + " transition-all h-[100vh] overflow-auto"}> 
          <div className='m-5 py-2 flex justify-between'>
            <h2 className='text-2xl'>NFT Gallery</h2>
            <div className='cursor-pointer hover:text-teal-300' onClick={() => toggleNFTsPanel(false)}>
              <Close />
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 mb-4">
            <div className="col-span-3 mx-5 p-5 pr-2 border-[2px] rounded-l-xl border-secondary">
              <div className='w-full h-[42vw] sm:h-[calc(100vh-148px)] overflow-auto grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-3 pr-3'>
                {nfts && nfts.map((data, index) => (
                  <NftCard key={"nftCard-" + index} selected={index == selectedCardIndex} mini={getWidth() < 640 ? true: false} {...data} onClick={() => selectCard(index)} />
                ))}
              </div>
            </div>
            <div className='hidden sm:block col-span-2 sm:col-span-1 border-[2px] rounded-r-xl border-secondary mr-5 p-5'>
              {nfts[selectedCardIndex] && (
                <div>
                  <h3 className='text-lg sm:text-xl mb-5'>{nfts[selectedCardIndex].name}</h3>
                  <div className='text-sm sm:text-lg'>
                    <div>Collection Name: </div><div>{nfts[selectedCardIndex].collectionName}</div>
                  </div><br />
                  <div className='text-sm sm:text-lg'>
                    <div>Mint Address: </div>
                    <div>{minifyAddress(nfts[selectedCardIndex].mintAddress, 8)}</div>
                  </div><br />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div>load...</div>;
}
