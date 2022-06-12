import React from "react";
import Warper from "./Warper";
import Popup from "reactjs-popup";
//

const NestedToolTip = ({link, content}) => {
  return(
  <Popup
    trigger={<div className="cursor-pointer"><div onClick={() =>navigator.clipboard.writeText(link)}>{content}</div></div>}
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
