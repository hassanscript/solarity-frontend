import React, { FC, useEffect, useState, useCallback  } from "react";
import Image from "next/image";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { toast } from "react-toastify";

import Base from "components/Modals/Base";
import AvatarPanel from "components/AvatarPanel";
import { PlusFill } from "components/Icons";
import Dropzone from 'react-dropzone'
import GalleryImg from "../../assets/images/auth/gallery.png";
import ImagePanel from "components/ImagePanel";
import cloudinary from "cloudinary/lib/cloudinary";
import axios from "axios";

import { createRoom } from "../../redux/slices/chatSlice";
import { models } from "data/experience";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_API_SECRET
});

const CreateRoomModal: FC<any> = ({
  open,
  title,
  type,
  roomNo,
  onClose,
}: {
  open: boolean;
  title: string;
  type: boolean;
  roomNo: number;
  onClose: () => void;
}) => {
  const dispatch = useDispatch();
  const { profileData } = useSelector((state: RootStateOrAny) => ({
    profileData: state.profile.data,
  }));

  const [roomName, setRoomName] = useState("");
  const [modelIndex, setModelIndex] = useState(0);
  const [addOnsIndex, setAddOnsIndex] = useState(0);

  ///////////////////////////////////////-Load and Upload-////////////////////////////////////

  const [step, setStep] = useState<Number>(0);
  const [files, setFiles] = useState<File[]>([]);
  const [loadedFiles, setLoadedFiles] = useState<any[]>([]);
  const [imageUrls, setImageUrls] = useState<any[]>([]);
  const [imageIndex, setImageIndex] = useState<number>(0);
  var tmpImageUrls: any[] = [];
  
  const onLoadAvatar = async (files: any) => {
    setFiles(files);
    tmpImageUrls = [...imageUrls];
    for(let i = 0; i < files.length; i ++) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          let listFiles = loadedFiles;
          listFiles.push({ no: listFiles.length, file: reader.result });
          setLoadedFiles([...listFiles]);
        }
      };

      uploadImage(files[i], imageIndex + i);
      reader.readAsDataURL(files[i]);
    }
    setImageIndex(imageIndex + files.length);
  }

  const uploadImage = async (img: any, index: number) => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", process.env.NEXT_PUBLIC_PRESET_NAME + "");
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME + "" );
    data.append("folder", "assets/presentation");
    try {
      const resp = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, data);  
      tmpImageUrls.push({ no: index, url: resp.data.url, public_id: resp.data.public_id });
      tmpImageUrls.sort((a, b) => {
        return a.no - b.no;
      })
      console.log(tmpImageUrls);
      setImageUrls([...tmpImageUrls]);
    } catch(err) {
      console.log("errr : ", err);
    }
  }

  const deleteImage = async (index: number) => {
    // choose imageUrl for removing from cloud storage
    const imageUrlIndex = imageUrls.findIndex(s => s.no == index);
    if(imageUrlIndex == -1) {
      alert("there is no image for presentation.");
      return;
    }
    
    try {
      await cloudinary.v2.uploader.destroy(imageUrls[imageUrlIndex].public_id, (error: any, result: any) => {})
      tmpImageUrls = [...imageUrls];
      tmpImageUrls.splice(imageUrlIndex, 1);
      setImageUrls([...tmpImageUrls]);
  
      // remove loadingImages array
      var loadingImages = [...loadedFiles];
      var selectedIndex = loadingImages.findIndex(s => s.no == index);
      loadingImages.splice(selectedIndex, 1);
      setLoadedFiles(loadingImages);
      
    } catch (error) {
      console.error("Something went wrong, please try again later.")
    }
  }

  const moveUrlListItem = useCallback(
    (dragIndex, hoverIndex) => {
        const dragItem = imageUrls[dragIndex]
        const hoverItem = imageUrls[hoverIndex]
        // Swap places of dragItem and hoverItem in the pets array
        setImageUrls((urls: any[]) => {
            const updatedUrls = [...urls]
            updatedUrls[dragIndex] = hoverItem
            updatedUrls[hoverIndex] = dragItem
            return updatedUrls
        })
    },
    [imageUrls],
  )

  ///////////////////////////////////////////////////////////////////////////////////////////////

  const createRoomFunc = () => {
    if (!roomName || (title == "Plaza" && imageUrls.length == 0)) {
      toast.error("The name of room is required.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    console.log('create room: ', imageUrls);
    dispatch(
      createRoom({
        title,
        type,
        roomNo,
        roomName,
        userName: profileData.username,
        slideUrls: imageUrls,
        modelIndex,
        avatarUrl: profileData.profileImageLink || "",
      })
    );
    onClose();
  };

  return (
    <Base open={open} onClose={onClose} title={title}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
        <div className="col-span-1">
          <div className="flex justify-between py-4 px-4 bg-primary rounded-xl h-[200px]">
            <AvatarPanel
              modelPath={models[modelIndex].modelUrl}
              position={models[modelIndex].position}
              rotation={models[modelIndex].rotation}
              scale={models[modelIndex].scale}
            />
          </div>
          <div className="avatarlist mt-2">
            <div className="flex gap-1 avatar-2d-list">
              {!!models &&
                models.length != 0 &&
                models.map((model, index) => (
                  <div
                    className={
                      `avatar-2d-item hover:border border border-transparent hover:border-gray-400 ` +
                      (modelIndex == index ? `border-gray-100` : ``)
                    }
                    onClick={() => setModelIndex(index)}
                    key={index}
                  >
                    <img
                      src={model.imageUrl}
                      width={50}
                      height={50}
                      alt={model.name}
                    />
                  </div>
                ))}
            </div>
          </div>
          {/* <div className="addOnslist mt-2">
            <div className="flex gap-1 addOns-2d-list">
              {[0, 1, 2, 3, 4, 5].map((num, index) => (
                <div
                  className={
                    `addOns-2d-item hover:border border border-transparent hover:border-gray-400 ` +
                    (addOnsIndex == num ? `border-gray-100` : ``)
                  }
                  onClick={() => setAddOnsIndex(num)}
                  key={index}
                >
                  <img
                    src="/images/addOns/addOn.jpg"
                    width={40}
                    height={40}
                    alt="AddOns"
                  />
                </div>
              ))}
            </div>
          </div> */}
        </div>
        <div className="col-span-1 flex justify-between py-4 px-0 sm:px-7 rounded-xl">
          <div className="gap-2">
            <div className="text-xs text-gray-950 mt-6">
              Please type a room name.
            </div>
            <div className="mt-2">
              <div className="relative w-full text-gray-600 focus-within:text-gray-400">
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full py-2 pl-6 text-[15px] font-light text-white border-transparent border rounded-md bg-primary focus:outline-none focus:border-gray-500 focus:border focus:text-white placeholder:text-gray-950Í"
                  placeholder="Room Name"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="text-xs text-gray-950 mt-6">your name</div>
            <div className="mt-2">
              <div className="relative w-full text-gray-100 focus-within:text-gray-400">
                <h3>{profileData.username}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      {title == "Plaza" && (
        <div className="mt-7">
          <h2>Prepare Images for Presentation</h2>
          <div className="relative p-[2px] lg:pt-2 flex-auto">
            <div className="mb-10">
              <Dropzone onDrop={(acceptedFiles: any) => { onLoadAvatar(acceptedFiles);}}>
                {({getRootProps, getInputProps}) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <label
                        className="flex w-full h-24 px-4 transition bg-transparent border-2 border-white/20 border-dashed rounded-md appearance-none cursor-pointer hover:border-white/30 focus:outline-none">
                        <span className="flex items-center space-x-2 mr-3">
                          <Image src={GalleryImg} />
                        </span>
                        <span className="flex items-center space-x-2">
                            {files?<span className="font-medium text-[#f3f3f3]">
                                <label className="text-primary">{files.length}</label> Please select files
                                <br></br>
                                <label className="text-[14px] text-white/30">Supports&#58; JPEG, JPEG2000, PNG</label>
                            </span>:<span className="font-medium text-[#f3f3f3]">
                                Drop image here or&nbsp;<label className="text-primary">browse</label>
                                <br></br>
                                <label className="text-[14px] text-white/30">Supports&#58; JPEG, JPEG2000, PNG</label>
                            </span>}
                        </span>
                    </label>
                  </div>
                )}
              </Dropzone>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-3 mt-5 max-h-[35vh] overflow-auto">
              {imageUrls.map((imageUrl, index1) => {
                return (
                  <ImagePanel 
                    key={imageUrl.no}
                    index={index1}
                    imageSrc={imageUrl.url} 
                    title="RESSURECTION..." 
                    moveListItem={moveUrlListItem}
                    onClick={() => deleteImage(imageUrl.no)} 
                  />
                )
              })}
            </div>  
          </div>
        </div>
      )}
      <div className="mt-7">
        <button
          className="rounded-full btn btn-sm btn-secondary float-right px-8"
          onClick={createRoomFunc}
        >
          <PlusFill />
          &nbsp;<span>Create</span>
        </button>
      </div>
    </Base>
  );
};

export default CreateRoomModal;
