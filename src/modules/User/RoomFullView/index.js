import { useEffect, useState } from "react";
import { start_loading_screen_listeners, build_loading_screen } from "modules/ChatModule/loading_screen";
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
        clearInterval(clearHandle);
        build_loading_screen();
        start_loading_screen_listeners(setLoaded);
      }
    }, 100);
  }, [])

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
            loading-screen="enabled:false" 
        >
                <a-assets timeout="100000">
                    <a-asset-item id="room-gltf" src="/assets/models/Normal room optimized.glb"></a-asset-item>
                    <a-asset-item id="arcade-gltf" src="/assets/models/Arcade console.glb"></a-asset-item>
                    <a-asset-item id="atm-gltf" src="/assets/models/ATM.glb"></a-asset-item>
                    <a-asset-item id="chair-gltf" src="/assets/models/Chair.glb"></a-asset-item>

                    <a-asset-item id="vr-gltf" src="/assets/models/VR.glb"></a-asset-item>
                    <a-asset-item id="navmesh-gltf" src="/assets/models/navmesh.gltf"></a-asset-item>

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

            <a-gltf-model shadow="cast: true; receive: true" class="model" src="#room-gltf" position="0 0 0"
                            scale="1 1 1"></a-gltf-model>
            <a-gltf-model shadow="cast: true; receive: true" class="model" src="#arcade-gltf" position="0 0 0"
                            scale="1 1 1"></a-gltf-model>
            <a-gltf-model shadow="cast: true; receive: true" class="model" src="#atm-gltf" position="0 0 0"
                            scale="1 1 1"></a-gltf-model>
            <a-gltf-model shadow="cast: true; receive: true" class="model" src="#chair-gltf" position="0 0 0"
                            scale="1 1 1"></a-gltf-model>
            <a-gltf-model shadow="cast: true; receive: true" class="model clickable nocollision" src="#vr-gltf"
                            simple-link="href: ../solarity-build-v-3/dist/index.html" position="0.4 1 -2.6" scale="1 1 1">
            </a-gltf-model>
            <a-entity id="navmesh" class="" gltf-model="#navmesh-gltf" visible="false" position="0 0 0">
            </a-entity>

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
      </div>
    );
  }
  return <div>load...</div>;
}
