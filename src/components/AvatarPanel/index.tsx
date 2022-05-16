import { useEffect, useState, FC } from 'react'

const AvatarPanel: FC<any> = ({
  modelPath,
  position,
  rotation,
  scale,
}: {
  modelPath: string;
  position: string;
  rotation: string;
  scale: string;
}) => {

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    require('aframe/dist/aframe-master.js')
    setMounted(true)
  }, [])

  if (mounted) {
    return (
      <a-scene arjs='' embedded >
        <a-cursor></a-cursor>
        <a-entity camera look-controls wasd-controls/> 
        <a-entity rotation="0 0 0">
          <a-entity id="player" gltf-model={modelPath} scale={scale} rotation={rotation} position={position}></a-entity>
        </a-entity>
      </a-scene>
    )
  }
  return (
    <div>load...</div>
  )
};

export default AvatarPanel;