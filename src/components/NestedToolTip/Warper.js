import React from "react";

function Warper(Comp) {
  return ({ link }) => (
    <div className="example-warper">
      <Comp link={link} />
    </div>
  );
}
export default Warper;
