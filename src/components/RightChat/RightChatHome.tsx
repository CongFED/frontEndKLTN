import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import BodyRightChat from "./BodyRightChat";
import FooterRightChat from "./FooterRightChat";
import { useRecoilState, useRecoilValue } from "recoil";
import { api, setAuthToken } from "../../utils/setAuthToken";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZIM } from "zego-zim-web";
import { isChatR, tokenState } from "../../recoil/initState";
import ChatScreen from "./ChatScreen";
import { IoIosVideocam, IoMdClose } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import BodyRightChatHome from "./BodyRightChatHome";
const RightChatHome = () => {
  const { data } = useContext(ChatContext);
  console.log(data);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [name2, setName2] = useState("");
  const [username2, setUserName2] = useState("");
  const token = useRecoilValue(tokenState);
  useEffect(() => {
    const fetchData = async () => {
      setAuthToken(token);
      try {
        const fullName = data.user?.displayName;
        const responseInfo = await api.get(
          "https://www.socialnetwork.somee.com/api/infor/searchuser",
          {
            params: { fullname: fullName },
          }
        );
        console.log(responseInfo.data.data?.[0].userId);
        setName(responseInfo.data.data?.[0]?.userId.slice(0, 10));
        setUserName(responseInfo.data.data?.[0]?.fullName);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    const fetchData1 = async () => {
      setAuthToken(token);
      // setUserName(data.user.displayName);
      // setName(updateUserName(data.user.uid));
      try {
        const responseInfo = await api.get(
          "https://www.socialnetwork.somee.com/api/infor/myinfor"
        );
        setName2(responseInfo.data.data.userId.slice(0, 10));
        setUserName2(responseInfo.data.data.fullName);
        console.log(name2);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };

    const initChat = async () => {
      await fetchData();
      await fetchData1();
      await init();
    };

    initChat();
  }, [data.chatId]);
  useEffect(() => {
    if (name && name2) {
      init();
    }
  }, [name, name2]);
  ///
  const removeVietnameseDiacritics = (str: string) => {
    const diacriticsMap = {
      á: "a",
      à: "a",
      ả: "a",
      ã: "a",
      ạ: "a",
      ă: "a",
      ắ: "a",
      ằ: "a",
      ẳ: "a",
      ẵ: "a",
      ặ: "a",
      â: "a",
      ấ: "a",
      ầ: "a",
      ẩ: "a",
      ẫ: "a",
      ậ: "a",
      đ: "d",
      é: "e",
      è: "e",
      ẻ: "e",
      ẽ: "e",
      ẹ: "e",
      ê: "e",
      ế: "e",
      ề: "e",
      ể: "e",
      ễ: "e",
      ệ: "e",
      í: "i",
      ì: "i",
      ỉ: "i",
      ĩ: "i",
      ị: "i",
      ó: "o",
      ò: "o",
      ỏ: "o",
      õ: "o",
      ọ: "o",
      ô: "o",
      ố: "o",
      ồ: "o",
      ổ: "o",
      ỗ: "o",
      ộ: "o",
      ơ: "o",
      ớ: "o",
      ờ: "o",
      ở: "o",
      ỡ: "o",
      ợ: "o",
      ú: "u",
      ù: "u",
      ủ: "u",
      ũ: "u",
      ụ: "u",
      ư: "u",
      ứ: "u",
      ừ: "u",
      ử: "u",
      ữ: "u",
      ự: "u",
      ý: "y",
      ỳ: "y",
      ỷ: "y",
      ỹ: "y",
      ỵ: "y",
    };

    return str.replace(/[^A-Za-z0-9]/g, (char) => diacriticsMap[char] || char);
  };
  const removeSpaces = (str: string) => {
    return str.replace(/\s+/g, "");
  };
  // const [calleeId, setCalleeId] = useState(name);
  const zeroCloudInstance = useRef<ZegoUIKitPrebuilt | null>(null);
  async function init() {
    const userName = removeSpaces(removeVietnameseDiacritics(username2));
    const userId =
      removeSpaces(removeVietnameseDiacritics(username2)).slice(1, 5) +
      "_" +
      name;

    const appID = 2006450489; // fill your appID here
    const serverSecret = "86689832e7ca0c38051798682eac4a50"; // fill your serverSecret here
    console.log("ban dau", userId, userName);
    const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      "cong",
      userId,
      userName
    );

    zeroCloudInstance.current = ZegoUIKitPrebuilt.create(KitToken);
    console.log(zeroCloudInstance.current);
    // add plugin
    if (zeroCloudInstance.current) {
      zeroCloudInstance.current.addPlugins({ ZIM });
    } else {
      console.error("zeroCloudInstance.current is null or undefined");
    }
  }

  const handleSend = (callType: any) => {
    const callee =
      removeSpaces(removeVietnameseDiacritics(username)).slice(1, 5) +
      "_" +
      name2;
    const usercallee = removeSpaces(removeVietnameseDiacritics(username));
    console.log("xu ly", callee, usercallee);
    if (!callee) {
      alert("userID cannot be empty!!");
      return;
    }
    console.log(callee, usercallee);
    // send call invitation
    if (zeroCloudInstance.current) {
      console.log(zeroCloudInstance.current, callType);
      zeroCloudInstance.current
        .sendCallInvitation({
          callees: [{ userID: callee, userName: usercallee }],
          callType: callType,
          timeout: 60,
        })
        .then((res) => {
          console.log(callee, usercallee);
          console.warn(res);
          if (res.errorInvitees.length) {
            alert("The user dose not exist or is offline.");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // Handle the case when zeroCloudInstance.current is null
      console.error("zeroCloudInstance.current is null");
    }
  };
  const [isChat1, setIsChat1] = useRecoilState(isChatR);
  return (
    <>
      {data.chatId === "null" ? (
        <ChatScreen />
      ) : (
        <section className="flex flex-col flex-auto border-l  ">
          <div className="chat-header px-2 py-2 flex flex-row flex-none justify-between items-center border-b-[1px]">
            <div className="flex justify-center items-center">
              <div className="w-8 h-18 mr-2 relative flex justify-center items-center">
                <img
                  className=" rounded-full w-full h-full object-cover"
                  src={data.user?.photoURL}
                  alt=""
                />
              </div>
              <div className="text-[12px]">
                <p className="font-[600] text-black">
                  {data.user?.displayName}
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="block rounded-full  w-8 h-8 p-2 cursor-pointer">
                <FaPhone />
              </div>
              <div
                onClick={() => {
                  handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall);
                }}
                className="block rounded-full  w-8 h-8 p-2  cursor-pointer"
              >
                <IoIosVideocam />
              </div>
              <div
                className="block rounded-full  w-8 h-8 p-2  cursor-pointer"
                onClick={() => setIsChat1(true)}
              >
                {/* <svg
                  aria-label="Thông tin về cuộc trò chuyện"
                  className="x1lliihq x1n2onr6 x5n08af"
                  fill="currentColor"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>Thông tin về cuộc trò chuyện</title>
                  <circle
                    cx="12.001"
                    cy="12.005"
                    fill="none"
                    r="10.5"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></circle>
                  <circle cx="11.819" cy="7.709" r="1.25"></circle>
                  <line
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    x1="10.569"
                    x2="13.432"
                    y1="16.777"
                    y2="16.777"
                  ></line>
                  <polyline
                    fill="none"
                    points="10.569 11.05 12 11.05 12 16.777"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  ></polyline>
                </svg> */}
                <IoMdClose />
              </div>
            </div>
          </div>
          <BodyRightChatHome />
          <FooterRightChat />
        </section>
      )}
    </>
  );
};

export default RightChatHome;
