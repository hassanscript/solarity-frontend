import React from "react";
import Warper from "./Warper";
import Popup from "reactjs-popup";
import { Copy } from "components/Icons";
//

const NestedToolTip = ({link}) => {
  return(
  <Popup
    trigger={<div className="cursor-pointer"><div onClick={() =>navigator.clipboard.writeText(link)}><Copy /></div></div>}
    position="top center"
    closeOnDocumentClick
  >
    <div className="bg-gray-100 text-gray-900 text-sm px-2 py-1">
      Copied
    </div>
  </Popup>
  )
};

export default Warper(NestedToolTip);
