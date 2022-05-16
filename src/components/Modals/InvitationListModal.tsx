import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import Image from "next/image";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Base from "components/Modals/Base";
import BlackInput from "components/Inputs/BlackInput";
import { setName } from "redux/slices/chatSlice";
import { Join, Cancel } from "components/Icons";
import ACTIONS from "config/actions";
import { setModel } from "../../redux/slices/chatSlice";

const InvitationListModal: FC<any> = ({
    invitations,
    open,
    onClose,
}: {
    invitations: any[];
    open: boolean;
    onClose: () => void;
}) => {
  const [modelIndex, setModelIndex] = useState(0);
  const [userlist, setUserlist] = useState<any[]>([]);
  const { rooms } = useSelector((state: RootStateOrAny) => ({
    rooms: state.chat.rooms
  }));
  const dispatch = useDispatch();
  const router = useRouter();

  const acceptInvitation = (username: string, roomId: number) => {
    window.socket.emit(ACTIONS.ACEEPT_INVITATION, {roomId, username});
    dispatch(setModel(1));
    router.push('experience/room?rid=' + roomId);
  }

  const denyInvitation = (username: string, roomId: number) => {
    window.socket.emit(ACTIONS.ACEEPT_INVITATION, {roomId, username});
  }

  return (
    <Base open={open} onClose={onClose} title={"Invitation Panel"}>
      <div className="grid gap-8 mt-8 min-h-[250px]">
        <table className="w-full">
            <thead className="text-secondary text-center">
                <tr className="py-2 border-b border-gray-500">
                    <td className="w-1/6">No</td>
                    <td className="w-1/6">Name</td>
                    <td className="w-1/6">Room Name</td>
                    <td className="w-3/6">Action</td>
                </tr>
            </thead>
            <tbody className="text-center h-[220px] overflow-auto">
                {invitations && invitations.map((invitation, index) => (
                    <tr className="py-2 border-b border-gray-800" key={index}>
                        <td>{index + 1}</td>
                        <td>{invitation.name}</td>
                        <td>{invitation.roomName}</td>
                        <td>
                            <button className="rounded-full btn btn-sm btn-secondary px-8" onClick={() => acceptInvitation(invitation.name, invitation.roomId)}>
                                <Join />&nbsp;<span>Accept</span>
                            </button>
                            <button className="rounded-full btn btn-sm btn-secondary px-8" onClick={() => denyInvitation(invitation.name, invitation.roomId)}>
                                <Cancel />&nbsp;<span>Deny</span>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </Base>
  );
};

export default InvitationListModal;
