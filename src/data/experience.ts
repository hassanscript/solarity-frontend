import { 
  BigRoomType, 
  RoomsType, 
  LiveRoomsType,
} from "modal/experience";

export const BIG_ROOM: BigRoomType = {
  scene: {
    bgImage: "/images/placeholder/post/post_one.png",
  },
  content: {
    title: "Plaza",
    description:
      "  Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    buttonText: "Join a Room",
    buttonLink: "/join-room",
    avatars: []
  },
};

export const models: any[] = [
  {
    imageUrl: "/images/placeholder/marketplace/gallery/SolGods.jpg",
    modelUrl: "/resource/models/sorrow_-_metaverse_avatars/scene.gltf",
    name: 'SolGods',
    position: "-120 -20 -80",
    rotation: "0 210 0",
    scale: "15 15 15",
  },
  {
    imageUrl: "/images/placeholder/marketplace/gallery/DeGods.png",
    modelUrl: "/resource/models/avatar1.glb",
    name: 'DeGods',
    position: "0 2 -10",
    rotation: "0 0 0",
    scale: "5 5 5",
  },
  {
    imageUrl: "/images/placeholder/marketplace/gallery/MoneyGirl.jpeg",
    modelUrl: "/resource/models/avatar2.glb",
    name: 'MoneyGirl',
    position: "0 -15 30",
    rotation: "0 -90 0",
    scale: "5 5 5",
  },
]

export const ROOM: RoomsType = {
  rows: [
    {
      imageUrl: "/images/placeholder/marketplace/gallery/one.png",
      title: 'Decentralart',
      description: 'Lorem ipsum dolor sit amet, consectetur',
      avatars: ['', '', '', ''],
    },
    {
      imageUrl: "/images/placeholder/marketplace/gallery/one.png",
      title: 'Decentralart',
      description: 'Lorem ipsum dolor sit amet, consectetur',
      avatars: ['', '', ''],
    },
    {
      imageUrl: "/images/placeholder/marketplace/gallery/one.png",
      title: 'Decentralart',
      description: 'Lorem ipsum dolor sit amet, consectetur',
      avatars: ['', '', '', '', ''],
    },
    {
      imageUrl: "/images/placeholder/marketplace/gallery/one.png",
      title: 'Decentralart',
      description: 'Lorem ipsum dolor sit amet, consectetur',
      avatars: [],
    },
    {
      imageUrl: "/images/placeholder/marketplace/gallery/one.png",
      title: 'Decentralart',
      description: 'Lorem ipsum dolor sit amet, consectetur',
      avatars: [],
    },
    {
      imageUrl: "/images/placeholder/marketplace/gallery/one.png",
      title: 'Decentralart',
      description: 'Lorem ipsum dolor sit amet, consectetur',
      avatars: [],
    },
    {
      imageUrl: "/images/placeholder/marketplace/gallery/one.png",
      title: 'Decentralart',
      description: 'Lorem ipsum dolor sit amet, consectetur',
      avatars: [],
    },
    {
      imageUrl: "/images/placeholder/marketplace/gallery/one.png",
      title: 'Decentralart',
      description: 'Lorem ipsum dolor sit amet, consectetur',
      avatars: ['', ''],
    },
    {
      imageUrl: "/images/placeholder/marketplace/gallery/one.png",
      title: 'Decentralart',
      description: 'Lorem ipsum dolor sit amet, consectetur',
      avatars: [],
    },
  ]
}

export const LIVE_ROOM: LiveRoomsType = {
  rows: [
    {
      title: 'Decentralart',
      creator: 'xxx',
      avatars: ['', '', ''],
    },
  ]
};