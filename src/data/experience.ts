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
    modelUrl: "/resource/models/remy.glb",
    name: 'SolGods',
    position: "0 2 -20",
    rotation: "0 0 0",
    scale: "5 5 5",
  }
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