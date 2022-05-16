import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import Image from "next/image";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Base from "components/Modals/Base";
import BlackInput from "components/Inputs/BlackInput";
import { setName } from "redux/slices/chatSlice";
import { Join } from "components/Icons";
import ACTIONS from "config/actions";
import { apiCaller } from "utils/fetcher";
import NestedToolTip from "components/NestedToolTip";
const InviteFriendModal: FC<any> = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [modelIndex, setModelIndex] = useState(0);
  const [userlist, setUserlist] = useState<any[]>([]);
  const { rooms } = useSelector((state: RootStateOrAny) => ({
    rooms: state.chat.rooms,
  }));
  const dispatch = useDispatch();
  const router = useRouter();
  const { rid } = router.query;

  useEffect(() => {
      if(open)
        getUsers();
  }, [open, rooms])

    const getUsers = async () => {
      const {
        data: { data },
      } = await apiCaller.get(`/users/getUsers`);
      var users = data;
      if(!!rooms && rooms.length != 0) {
          var roomIndex = rooms.findIndex((s: any) => s.roomId == rid);
          var userFilter: any = [];
          users.map((user: any, index: number) => {
            if(user.username != localStorage.getItem('name')) {
              if(rooms[roomIndex].speakers.findIndex((s: String) => s == user.username) == -1) {
                let stateIndex = rooms[roomIndex].states.findIndex((s: String) => s == user.username);
                if( stateIndex > -1) {
                  users[index].state = "Pending";
                  users[index].link = rooms[roomIndex].links[stateIndex];
                }
                userFilter.push(users[index]);
              } else {
                users[index].state = undefined;
              }
            }
          });
          setUserlist(userFilter);
      }
    }

    const inviteFriend = (username: string) => {
        var userIndex = userlist.findIndex(s => s.username == username);
        var userData = userlist.concat([]);
        setUserlist(userData);
        window.socket.emit(ACTIONS.INVITE_FRIEND, {username, invitor: localStorage.getItem('name'), roomId: rid});
    }

  return (
    <Base open={open} onClose={onClose} title={"Invitation Panel"}>
      <div className="grid gap-8 mt-8 min-h-[250px] h-[220px] max-h-[220px] overflow-auto">
        <table className="w-full">
            <thead className="text-secondary text-center">
                <tr className="py-2 border-b border-gray-500">
                    <td className="w-1/6">No</td>
                    <td className="w-1/6">Name</td>
                    <td className="w-1/6">State</td>
                    <td className="w-3/6">Action</td>
                </tr>
            </thead>
            <tbody className="text-center">
                {userlist && userlist.map((user, index) => (
                    <tr className="py-2 border-b border-gray-800" key={index}>
                        <td>{index + 1}</td>
                        <td>{user.username}</td>
                        <td>{!user.state ? 'idle': user.state}</td>
                        <td>{!user.state ? (
                          <button className="rounded-full btn btn-sm btn-secondary px-8" onClick={() => inviteFriend(user.username)}>
                                <Join />&nbsp;<span>Invite</span>
                          </button>
                        ): (
                          <div className="flex" >
                            {process.env.NODE_ENV === "development" ? "http://localhost:3000/" + 'experience/invitation/' + user.link : "https://solarity-web-git-master-hassan-sk.vercel.app/" + 'experience/invitation/' + user.link}&nbsp;
                            <NestedToolTip link={process.env.NODE_ENV === "development" ? "http://localhost:3000/" + 'experience/invitation/' + user.link : "https://solarity-web-git-master-hassan-sk.vercel.app/" + 'experience/invitation/' + user.link}/>
                          </div>)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </Base>
  );
};

export default InviteFriendModal;
