import React, { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import BodyRightChat from "./BodyRightChat";
import FooterRightChat from "./FooterRightChat";
import { useRecoilValue } from "recoil";
import { api, setAuthToken } from "../../utils/setAuthToken";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ZIM } from "zego-zim-web";
import { tokenState } from "../../recoil/initState";
import ChatScreen from "./ChatScreen";
const RightChat = () => {
  const { data } = useContext(ChatContext);
  console.log(data);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [name2, setName2] = useState("");
  const [username2, setUserName2] = useState("");
  console.log(data);
  const token = useRecoilValue(tokenState);
  function updateUserName(displayName: string) {
    if (displayName) {
      return displayName.slice(0, 5);
    }
    return ""; // hoặc giá trị mặc định khác tùy thuộc vào trường hợp của bạn
  }
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
  }, []);
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
  const getLastNCharacters = (str: string, n: number) => {
    if (n >= str.length) {
      return str;
    }
    return str.slice(-n);
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
  if (data.chatId === "null") {
    return <ChatScreen />;
  }

  return (
    <>
      <section className="flex flex-col flex-auto border-l  ">
        <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center border-b-[1px]">
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 mr-4 relative flex justify-center items-center">
              <img
                className=" rounded-full w-full h-full object-cover"
                src={data.user?.photoURL}
                alt=""
              />
            </div>
            <div className="text-sm">
              <p className="font-[600] text-black">{data.user?.displayName}</p>
            </div>
          </div>

          <div className="flex">
            <div className="block rounded-full  w-10 h-10 p-2 cursor-pointer">
              <svg
                aria-label="Gọi thoại"
                className="x1lliihq x1n2onr6 x5n08af"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Gọi thoại</title>
                <path d="M18.227 22.912c-4.913 0-9.286-3.627-11.486-5.828C4.486 14.83.731 10.291.921 5.231a3.289 3.289 0 0 1 .908-2.138 17.116 17.116 0 0 1 1.865-1.71 2.307 2.307 0 0 1 3.004.174 13.283 13.283 0 0 1 3.658 5.325 2.551 2.551 0 0 1-.19 1.941l-.455.853a.463.463 0 0 0-.024.387 7.57 7.57 0 0 0 4.077 4.075.455.455 0 0 0 .386-.024l.853-.455a2.548 2.548 0 0 1 1.94-.19 13.278 13.278 0 0 1 5.326 3.658 2.309 2.309 0 0 1 .174 3.003 17.319 17.319 0 0 1-1.71 1.866 3.29 3.29 0 0 1-2.138.91 10.27 10.27 0 0 1-.368.006Zm-13.144-20a.27.27 0 0 0-.167.054A15.121 15.121 0 0 0 3.28 4.47a1.289 1.289 0 0 0-.36.836c-.161 4.301 3.21 8.34 5.235 10.364s6.06 5.403 10.366 5.236a1.284 1.284 0 0 0 .835-.36 15.217 15.217 0 0 0 1.504-1.637.324.324 0 0 0-.047-.41 11.62 11.62 0 0 0-4.457-3.119.545.545 0 0 0-.411.044l-.854.455a2.452 2.452 0 0 1-2.071.116 9.571 9.571 0 0 1-5.189-5.188 2.457 2.457 0 0 1 .115-2.071l.456-.855a.544.544 0 0 0 .043-.41 11.629 11.629 0 0 0-3.118-4.458.36.36 0 0 0-.244-.1Z"></path>
              </svg>
            </div>
            <div
              onClick={() => {
                handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall);
              }}
              className="block rounded-full  w-10 h-10 p-2 ml-4 cursor-pointer"
            >
              <svg
                aria-label="Gọi video"
                className="x1lliihq x1n2onr6 x5n08af"
                fill="currentColor"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <title>Gọi video</title>
                <rect
                  fill="none"
                  height="18"
                  rx="3"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  width="16.999"
                  x="1"
                  y="3"
                ></rect>
                <path
                  d="m17.999 9.146 2.495-2.256A1.5 1.5 0 0 1 23 8.003v7.994a1.5 1.5 0 0 1-2.506 1.113L18 14.854"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                ></path>
              </svg>
            </div>
            <div className="block rounded-full  w-10 h-10 p-2 ml-4 cursor-pointer">
              <svg
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
              </svg>
            </div>
          </div>
        </div>
        <BodyRightChat />
        <FooterRightChat />
      </section>
    </>
  );
};

export default RightChat;
