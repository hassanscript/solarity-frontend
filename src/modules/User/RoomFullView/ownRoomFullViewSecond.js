import { useEffect, useState } from "react";
import { start_loading_screen_listeners, build_loading_screen } from "modules/ChatModule/loading_screen";
import {choose_controls, pass_controls} from 'modules/ChatModule/utils'
import styles from 'modules/ChatModule/chat.module.css';
import { useRouter } from "next/router";

export default function RoomFullView({user}) {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const { roomId } = router.query;
  const [room, setRoom] = useState({});
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
      var loading_screenEl = document.getElementById('loading_screen');
      var loading_textEl = document.getElementById('loading_text');
      var loading_barEl = document.getElementById('loading_bar');
      if(sceneEl && loading_textEl  && loading_barEl  &&  loading_screenEl) {
        build_loading_screen();
        start_loading_screen_listeners();
        sceneEl.addEventListener('loaded', start_scene);
        clearInterval(clearHandle);
      }
    }, 300);
  }, [])

  const start_scene = () => {
    // setGifIntervalId(start_screens())
    choose_controls();
    pass_controls();
  }

  if (mounted) {
    return (
        <div className="h-[100vh]">
          <div id="loading_screen" className={styles.loading_screen_profile}>
            <div id="loading_text" className={styles.loading_text}>
            </div>
            <div id="loading_bar" className={styles.loading_bar_profile}>
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
            id="scene_wrapper" 
            style={{opacity: 0, position: "absolute", top: "0px", zIndex: 0}}
        >
                <a-assets timeout="100000">
                  <a-asset-item id="room2-gltf" src="/assets/models/own_second/Thomas virtual temple v2.glb"></a-asset-item>
                  <a-asset-item id="navmesh-gltf" src="/assets/models/navmesh.gltf"></a-asset-item>

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

            {/* {assets.map((asset, index) => (
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
                {!!room && room != {} &&
                    !!room.nftStates &&
                    room.nftStates.map((nft, index1) => {
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
            ))} */}
            <a-sky src="#sky-img"></a-sky>
          </a-scene>
      </div>
    );
  }
  return <div>load...</div>;
}
