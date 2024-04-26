import React from "react";
import FooterRightChat from "../../components/RightChat/FooterRightChat";
import BodyRightChat from "../../components/RightChat/BodyRightChat";
import RightChatHome from "../../components/RightChat/RightChatHome";

const BodyChatHome = () => {
  return (
    <div className="absolute z-10 w-[21rem] h-[28rem] bg-white bottom-[60px] right-24 rounded-t-[10px]">
      <RightChatHome />
    </div>
  );
};

export default BodyChatHome;
