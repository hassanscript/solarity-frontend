import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "redux/hooks";
import { build_loadingScreen } from "modules/ChatModule/loadingScreen";
import {chooseControls, passControls} from 'modules/ChatModule/utils'
import styles from 'modules/ChatModule/chat.module.css';
import freeObjectFromMemory from "utils/clearObject";

export default function AframeComp2({user, permitionFlag}) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [permition, setPermition] = useState(false);
  const [rooms, setRooms] = useState([]);
  const { activeRoomId } = useAppSelector(state => state.profile);
  const componentWillUnmount = useRef(false);
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
  useEffect(() => {
    require("aframe/dist/aframe-master.js");
    require('aframe-liquid-portal-shader');
    require('aframe-blink-controls');
    require('modules/ChatModule/components');
    if(user != {} && !!user.rooms) {
      var roomIndex = -1;
      if(activeRoomId != "") {
        roomIndex = user.rooms.findIndex(s => s._id == activeRoomId);
      } else {
        roomIndex = user.rooms.findIndex(s => s.active == true);
      }
      if(roomIndex != -1) {
        setRooms([user.rooms[roomIndex]]);
      }
    }
    setMounted(true);
    THREE.Cache.enabled = false;
  }, []);

  useEffect(() => {
    return () => {
        componentWillUnmount.current = true
    }
  }, [])

  var items = document.querySelectorAll('.model');
  useEffect(() => {
    return () => {
      if (componentWillUnmount.current) {
        var objectsToDelete = [];
        for (var iIndex = 0; iIndex < items.length; iIndex++){
          objectsToDelete.push(items[iIndex]);
        }
        for (var i = 0; i < objectsToDelete.length; i++) {
          freeObjectFromMemory(objectsToDelete[i].object3D, objectsToDelete[i]);    
        }
      }
    }
  }, [items]);

  useEffect(() => {
    var roomIndex = -1;
    if(activeRoomId != "") {
      roomIndex = user.rooms.findIndex(s => s._id == activeRoomId);
    }
    if(roomIndex != -1) {
      setRooms([user.rooms[roomIndex]]);
    }
  }, [activeRoomId]);

  useEffect(() => {
    if (rooms.length == 0) {
      setPermition(false);
    } else {
      setPermition(true);
    }
  }, [rooms])

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
  }, []);

  const start_scene = () => {
    // setGifIntervalId(start_screens())
    chooseControls();
    passControls();
  }

  if((user.rooms && user.rooms.length != 0) || permitionFlag) {
    if (permition || permitionFlag) {
      if (mounted) {
        return (
          <>
            <div id="loadingScreen" className={styles.loadingScreen_profile}>
                <div id="loadingText" className={styles.loadingText}>
                </div>
                <div id="loadingBar" className={styles.loadingBar_profile}>
                </div>
                <div id="loading_label" className={styles.loading_label}>
                    POWERED BY SOLARITY
                    <img id="loading_logo" className={styles.loading_logo} src="/assets/images/loading_logo.png" />
                </div>
            </div>
            <a-scene 
              embedded
              renderer="antialias: true;
              colorManagement: true;
              sortObjects: true;
              physicallyCorrectLights: true;
              maxCanvasWidth: 1920;
              maxCanvasHeight: 1920;" 
              id="sceneWrapper" 
              style={{opacity: 0, position: "absolute", top: "0px", zIndex: 0}}
            >
                  <a-assets timeout="100000">
                      <a-asset-item id="room-gltf" src="/assets/models/own/Normal room optimized.glb"></a-asset-item>
                      <a-asset-item id="arcade-gltf" src="/assets/models/own/Arcade console.glb"></a-asset-item>
                      <a-asset-item id="atm-gltf" src="/assets/models/own/ATM.glb"></a-asset-item>
                      <a-asset-item id="chair-gltf" src="/assets/models/own/Chair.glb"></a-asset-item>

                      <a-asset-item id="vr-gltf" src="/assets/models/own/VR.glb"></a-asset-item>
                      <a-asset-item id="navmesh-gltf" src="/assets/models/own/navmesh.gltf"></a-asset-item>

                      <img id="hub-img" src="/assets/images/hub.png" />
                      <img id="sky-img" src="/assets/images/sky.jpg"/>

                      <img id="gif-img1" src="/assets/images/gif_img1.jpeg"/>
                      <img id="gif-img2" src="/assets/images/gif_img2.jpeg"/>
                      <img id="gif-img3" src="/assets/images/gif_img3.jpeg"/>
                      <img id="gif-img4" src="/assets/images/gif_img4.jpeg"/>

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

                <a-gltf-model shadow="cast: true; receive: true"  model-info class="model" src="#room-gltf" position="0 0 0"
                              scale="1 1 1"></a-gltf-model>
                <a-gltf-model shadow="cast: true; receive: true"  model-info class="model" src="#arcade-gltf" position="0 0 0"
                              scale="1 1 1"></a-gltf-model>
                <a-gltf-model shadow="cast: true; receive: true"  model-info class="model" src="#atm-gltf" position="0 0 0"
                              scale="1 1 1"></a-gltf-model>
                <a-gltf-model shadow="cast: true; receive: true"  model-info class="model" src="#chair-gltf" position="0 0 0"
                              scale="1 1 1"></a-gltf-model>
                <a-gltf-model shadow="cast: true; receive: true"  model-info class="model clickable nocollision" src="#vr-gltf"
                              simple-link="href: ../solarity-build-v-3/dist/index.html" position="0.4 1 -2.6" scale="1 1 1">
                </a-gltf-model>
                <a-gltf-model id="navmesh" model-info class="model" src="#navmesh-gltf" visible="false">
                </a-gltf-model>

                <a-entity position="0 2 0" rotation="0 0 0"
                          light="type: point; intensity:  5; distance: 10; decay: 1; color:  #FFFFFF; cast-shadow: false; shadowCameraVisible: false;">
                </a-entity>
                <a-entity position="2.7 1 -0.35" rotation="-30 110 0"
                          light="type: spot; intensity:  0.2; distance:0.6; penumbra: 0.5; decay: 1; color:  #FFFFFF; cast-shadow: true; shadow-map-height: 1024; shadow-map-width: 1024; shadowCameraVisible: false;">
                </a-entity>
                <a-entity light="type: ambient; intensity: 0.2; color:  #FFFFFF; shadowCameraVisible: false;"></a-entity>

                {assets.map((asset, index) => (
                  <a-plane
                    key={index}
                    class={`frame picno${index + 1}`}
                    position={asset.pos}
                    width="1.1"
                    height="1.1"
                    rotation={asset.rot}
                    material="shader:standard;"
                    color="#111122"
                  >
                    {rooms && rooms != [] &&
                      !!rooms[0] &&
                      !!rooms[0].nftStates &&
                      rooms[0].nftStates.map((nft, index1) => {
                        if (index + 1 == nft.no)
                          return (
                            <a-image
                              src={nft.link}
                              key={index1}
                              width="1.1"
                              height="1.1"
                              position=""
                              material=""
                              geometry=""
                            ></a-image>
                          );
                      })}
                  </a-plane>
                ))}

                <a-plane id="screen" width="2" height="1.2" rotation="0 180 0" material="shader: standard;"
                        position="0.4065 1.16 2.63" color="#CC22FF">
                    <a-text align="center" rotation="0 0 0" width="0.9" value="FLOOR PRICE" position="0.5 0.3 0.01"
                            x-offset="0.05" wrap-count="20" color="#FFFFFF"></a-text>
                </a-plane>
                <a-image width="1.5" height="2" class="clickable nocollision" simple-link="href: ../hub/hub.html"
                        src="#hub-img" position="-1.9 1.1 2.9" rotation="0 0 0" material=" shader: liquid-portal">
                    <a-box color="black" width="1.5" position="0 -1 0" height="0.1" depth="0.1"></a-box>
                    <a-box color="black" width="1.5" position="0 1 0" height="0.1" depth="0.1"></a-box>
                    <a-box color="black" width="0.1" position="0.7 0 0" height="1.9" depth="0.1"></a-box>
                    <a-box color="black" width="0.1" position="-0.7 0 0" height="1.9" depth="0.1"></a-box>
                </a-image>
                <a-sky src="#sky-img"></a-sky>
            </a-scene>
          </>
        );
      }
      return <div>load...</div>;
    } else {
      return (
        <div className="pt-20 text-center">
          {"You don't have any active room. Active a room in assets menu please."}
        </div>
      );
    }
  } else {
    return (
      <div className="pt-20 text-center">
        {"You don't have any room. Buy a room in marketplace page please."}
      </div>
    );
  }
}
