import React from "react";

function Warper(Comp) {
  return ({ link, content }) => (
    <div className="example-warper">
      <Comp link={link} content={content} />
    </div>
  );
}
export default Warper;
