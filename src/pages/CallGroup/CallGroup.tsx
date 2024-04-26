import React, { useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useParams } from "react-router-dom";
function randomID(len: any) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}
const CallGroup = () => {
  const roomID = getUrlParams().get("roomID") || randomID(5);
  let myMeeting = async (element: any) => {
    // generate Kit Token
    const appID = 2006450489;
    const serverSecret = "86689832e7ca0c38051798682eac4a50";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );
    console.log(234);
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    console.log(zp);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Coppy link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  };

  return (
    <div
      // ref={elementRef}
      className="relative left-[23rem]"
      ref={myMeeting}
      style={{ width: "75vw", height: "100vh" }}
    ></div>
  );
};

export default CallGroup;
