import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "redux/hooks";
import { build_loadingScreen } from "modules/ChatModule/loadingScreen";
import {chooseControls, passControls} from 'modules/ChatModule/utils'
import styles from 'modules/ChatModule/chat.module.css';
import freeObjectFromMemory from "utils/clearObject";
import { checkBrowser } from 'utils';

export default function Index() {
  const [mounted, setMounted] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [permition, setPermition] = useState(false);
  const [rooms, setRooms] = useState([]);
  const { activeRoomId } = useAppSelector(state => state.profile);
  const componentWillUnmount = useRef(false);

  useEffect(() => {
    require("aframe/dist/aframe-master.js");
    require('aframe-liquid-portal-shader');
    require('aframe-blink-controls');
    require('aframe-extras');
    require('modules/ChatModule/components');
    require('modules/ChatModule/presentation');

    setMounted(true);
    THREE.Cache.enabled = false;
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
  }, []);

  const start_scene = () => {
    // setGifIntervalId(start_screens())
    chooseControls();
    passControls();
  }
  if (mounted) {
    return (
      <>
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
          <a-scene renderer="antialias: true;
            colorManagement: true;
            sortObjects: true;
            physicallyCorrectLights: true;
            maxCanvasWidth: 1920;
            maxCanvasHeight: 1920;" 
            gltf-model="dracoDecoderPath: modules/ChatModule/draco/ ;
            meshoptDecoderPath: modules/ChatModule/meshopt/meshopt_decoder.js"
            networked-scene="
              room: blocks;
              debug: true;"
          >
            <a-assets timeout="100000">
              <a-asset-item id="structure" src="/assets/models/plaza/solar punk mobile no collision.glb"></a-asset-item>
              <a-asset-item id="navmesh-gltf" src="/assets/models/plaza/collision mobile.glb"></a-asset-item>

              <a-asset-item id="uv" src={"/resource/models/helmet/helmet visor.gltf"}></a-asset-item>

              <img id="sky-img" src="/assets/images/bluesky.jpg" />
              <img id="try-img" src="/assets/images/try.png" />

            </a-assets>

            {checkBrowser() ? (
              <a-entity 
                id="rig"
                position="25 3.6 0" 
                look-controls="pointerLockEnabled: true; reverseMouseDrag: false"
                movement-controls="speed: 0.2"
                simple-navmesh-constraint="navmesh:#navmesh;fall: 5;height:1.65;" 
                networked="template:#avatar-template;attachTemplateToLocal:false;"
              >
                <a-entity 
                  id="head" 
                  class="mouseOnly" 
                  raycaster="far: 10; objects: .clickable"
                  material="color: white; shader: flat" 
                  position="0 0 -0.3"
                  rotation = "0 0 0"
                  geometry="primitive: sphere; radius: 0.001"
                  camera="fov: 70; active: true"
                >
                  <a-entity 
                    id="cursor" 
                    class="mouseOnly" 
                    cursor="" 
                    raycaster="far: 10; objects: .clickable"
                    material="color: white; shader: flat" 
                    position="0 0 -0.3"
                    geometry="primitive: sphere; radius: 0.001"
                  >
                  </a-entity>
                </a-entity>
                <a-entity id="leftHand" class="leftController controllerOnly"
                  hand-controls="hand: left; handModelStyle: lowPoly; color: #15ACCF"
                  laser-controls="hand: left" vive-controls="hand: left" oculus-touch-controls="hand: left"
                  windows-motion-controls="hand: left" daydream-controls="hand: left"
                  gearvr-controls="hand: left" magicleap-controls="hand: left" oculus-go-controls="hand: left"
                  valve-index-controls="hand: left" vive-focus-controls="hand: left"
                  generic-tracked-controller-controls="hand: left" raycaster="far: 0; objects: .leftclickable;"
                  blink-controls="cameraRig: #rig; teleportOrigin: #camera; button: trigger; curveShootingSpeed: 10; collisionEntities: .collision; landingMaxAngle: 10"
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
            ): (
              <a-entity 
                id="rig"
                position="25 3.6 0" 
                look-controls="pointerLockEnabled: true; reverseMouseDrag: false"
                wasd-controls="acceleration: 20;"
                simple-navmesh-constraint="navmesh:#navmesh;fall: 5;height:1.65;" 
                networked="template:#avatar-template;attachTemplateToLocal:false;"
              >
                <a-entity 
                  id="head" 
                  class="mouseOnly" 
                  raycaster="far: 10; objects: .clickable"
                  material="color: white; shader: flat" 
                  position="0 0 -0.3"
                  rotation = "0 0 0"
                  geometry="primitive: sphere; radius: 0.001"
                  camera="fov: 70; active: true"
                >
                  <a-entity 
                    id="cursor" 
                    class="mouseOnly" 
                    cursor="" 
                    raycaster="far: 10; objects: .clickable"
                    material="color: white; shader: flat" 
                    position="0 0 -0.3"
                    geometry="primitive: sphere; radius: 0.001"
                  >
                  </a-entity>
                </a-entity>
                <a-entity id="leftHand" class="leftController controllerOnly"
                  hand-controls="hand: left; handModelStyle: lowPoly; color: #15ACCF"
                  laser-controls="hand: left" vive-controls="hand: left" oculus-touch-controls="hand: left"
                  windows-motion-controls="hand: left" daydream-controls="hand: left"
                  gearvr-controls="hand: left" magicleap-controls="hand: left" oculus-go-controls="hand: left"
                  valve-index-controls="hand: left" vive-focus-controls="hand: left"
                  generic-tracked-controller-controls="hand: left" raycaster="far: 0; objects: .leftclickable;"
                  blink-controls="cameraRig: #rig; teleportOrigin: #camera; button: trigger; curveShootingSpeed: 10; collisionEntities: .collision; landingMaxAngle: 10"
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
            )}
            {/* lights */}
            {/* ambient light */}
            <a-entity light="type: ambient; intensity: 0.5; color:  #FFFFFF; shadowCameraVisible: false;"></a-entity>
            {/* slider 
            <a-entity rotation="0 -90 0" id="slider" position="40.2 3.85 0.95"
              slideshow="forwardTrigger: #next_image; backwardTrigger: #previous_image; offset: 4.4 0 0; duration: 0.1"
            >
              <a-image id="big_screen_img" src="#try-img" rotation="0 -180 0" width="4.3" height="2.3"
                        position="0 0 0.01"></a-image>
              <a-image id="big_screen_img" src="#sky-img" rotation="0 -180 0" width="4.3" height="2.3"
                        position="0 0 0.01"></a-image>
              <a-image id="big_screen_img" src="#try-img" rotation="0 -180 0" width="4.3" height="2.3"
                        position="0 0 0.01"></a-image>
            </a-entity>*/}
            {/* arrows 
            <a-entity rotation="0 -90 0" position="40.2 3.8 1" id="slider_commands" width="4" height="3">
              <a-plane text="value: >>; wrap-count: 6; align: center" width=".2" height=".2" id="next_image"
                        class="clickable nocollision" material="shader: flat;" color="#44AABB" position="2 -1.2 0">
              </a-plane>
              <a-plane text="value: <<; wrap-count: 6; align: center" width=".2" height=".2" id="previous_image"
                        class="clickable nocollision" material="shader: flat;" color="#44AABB" position="1.8 -1.2 0">
              </a-plane>
            </a-entity>*/}
            {/* models */}
            <a-gltf-model model-info class="model" src="#structure" position="0 0 0" scale="1 1 1"> </a-gltf-model>
            {/* nav-mesh: protecting us from running thru walls */}
            <a-gltf-model id="navmesh" model-info class="model" src="#navmesh-gltf" visible="false">
            </a-gltf-model>

            <a-sky animation="property: rotation;
            to: -360 360 -360;
            dur: 5000000;
            easing: linear;
            loop:true" src="#sky-img"></a-sky>
          </a-scene>
        </div>
      </>
    );
  }
  return <div>load...</div>;
}
