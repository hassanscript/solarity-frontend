const OwnSecond = ( roomInfo ) => {
  return (
    <a-scene renderer="antialias: true;
    colorManagement: true;
    sortObjects: true;
    physicallyCorrectLights: true;
    maxCanvasWidth: 1920;
    maxCanvasHeight: 1920;" 
    networked-scene="
    room: blocks;
    debug: true;">
      <a-assets timeout="10000">

        <a-asset-item id="room2-gltf" src="/assets/models/own_second/Thomas virtual temple v2.glb"></a-asset-item>
        <a-asset-item id="navmesh-gltf" src="/assets/models/own_second/navmesh.gltf"></a-asset-item>
        <a-asset-item id="raccoon-obj" src={models[modelIndex].modelUrl}></a-asset-item>

        <img id="hub-img" src="/assets/images/hub.png"/>
        <img id="sky-img" src="/assets/images/sky.jpg"/>

        <template 
            id="avatar-template"
            dangerouslySetInnerHTML={{
                __html: '<a-gltf-model src="#raccoon-obj"></a-gltf-model>'
            }}
        />

      </a-assets>

      <a-entity 
        id="player"
        position="0 1.65 0" 
        look-controls="pointerLockEnabled: true; reverseMouseDrag: false"
        simple-navmesh-constraint="navmesh:#navmesh;fall: 5;height:1.65;" 
        wasd-controls="acceleration: 20;"
        networked="template:#avatar-template;attachTemplateToLocal:true;"
      >
        <a-entity 
          id="head" 
          rotation = "0 0 0"
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
      <a-entity position="-15 40 40"
                light="type: point; intensity:  5; distance: 100; decay: 0; color:  #FFFFFF; cast-shadow: false;">
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
          { !!roomInfo.nftStates &&
            roomInfo.nftStates.map((nft, index1) => {
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
  );
}

export default OwnSecond;