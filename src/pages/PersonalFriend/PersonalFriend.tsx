import React, { useContext, useEffect, useState } from "react";
import { api, setAuthToken } from "../../utils/setAuthToken";
import { useRecoilValue, useRecoilState } from "recoil";
import { fetchPost } from "../../../redux/features/post/postSlice";
import { tokenState } from "../../recoil/initState";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { ChatContext } from "../../context/ChatContext";
// import { Skeleton } from "react-loading-skeleton";
import { CiMap } from "react-icons/ci";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
interface Comment {
  content: string;
  images: { linkImage: string; createDate: string }[]; // Đặt kiểu cho mảng images
  linkImage?: string;
  createDate: string;
  userId: string;
  id: string;
  countLike: any;
  islike: boolean;
  videos: { link: string; createDate: string }[]; //
}
interface Info {
  content: string;
  images: { linkImage: string; createDate: string }[]; // Đặt kiểu cho mảng images
  linkImage?: string;
  createDate: string;
  userId: string;
  id: string;
  countLike: any;
  islike: boolean;
  firebaseData: [];
  address: string;
}
interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}
interface ResponseDataInfo {
  data: Info[];
  success: boolean;
  message: string;
}
const PersonalFriend = () => {
  const { id } = useParams();
  const currentUser = useSelector((state: RootState) => state.info.info);
  const navigate = useNavigate();
  const [, setLoadCmt1] = useState(false);
  const [loadSearch1, setLoadSearch1] = useState(false);
  const [loadSearch2, setLoadSearch2] = useState(false);
  const [loadData, setLoadData] = useState(false);
  const token = useRecoilValue(tokenState);
  const [data, setData] = useState<ResponseDataInfo>({
    data: [],
    success: false,
    message: "",
  });
  const [dataPost, setDataPost] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });
  const loadDataInfo = async () => {
    // Gọi API để lấy dữ liệu

    await api
      .get(`https://www.socialnetwork.somee.com/api/infor/user/${id}`)
      .then((response) => {
        // Cập nhật dữ liệu vào state
        if (response.status === 200) {
          setLoadCmt1(true);
          setLoadSearch1(false);
          setLoadSearch2(false);
          setData(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handleAddF = async (idfriend: any) => {
    setAuthToken(token);
    try {
      const id = idfriend;
      const response = await api.post(
        `https://www.socialnetwork.somee.com/api/Friend/send/${id}`
      );

      if (response.status == 200) {
        loadDataInfo();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleAcceptF = async (idfriend: any) => {
    try {
      const id = idfriend;
      console.log(1);
      const response = await api.post(
        `https://www.socialnetwork.somee.com/api/Friend/accept/${id}`
      );
      if (response.status == 200) {
        loadDataInfo();
      }
    } catch (error) {
      console.log("Login failed", error);
    }
  };
  const handleUpLevelF1 = async (idfriend: any) => {
    try {
      const response = await api.post(
        `https://www.socialnetwork.somee.com/api/Friend/updateFriendLevel`,
        {
          user2: idfriend,
          level: "4",
        }
      );

      if (response.status == 200) {
        console.log(response);
        loadDataInfo();
      }
    } catch (error) {
      console.log("Login failed", error);
    }
  };
  const handleUpLevelF = async (idfriend: any) => {
    // setLoadSearch1(true);
    // setAuthToken(token);
    try {
      const id = idfriend;
      console.log(1);
      const response = await api.post(
        `https://www.socialnetwork.somee.com/api/Friend/updateFriendLevel`,
        {
          user2: idfriend,
          level: "5",
        }
      );
      console.log(response);
      if (response.status == 200) {
        loadDataInfo();
      }
    } catch (error) {
      console.log("Login failed", error);
    }
  };
  const handleRemoveF = async (idfriend: any) => {
    setLoadSearch2(true);
    setAuthToken(token);
    try {
      const id = idfriend;
      const response = await api.post(
        `https://www.socialnetwork.somee.com/api/Friend/refuseFriend/${id}`
      );
      console.log(response);
      if (response.status == 200) {
        loadDataInfo();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  const [sb, setSb] = useState(false);

  // Truy cập thuộc tính "firebaseData"

  const handleConfirm = async () => {
    setAuthToken(token);
    try {
      const response = await api.delete(
        `https://www.socialnetwork.somee.com/api/Friend/unfriend/${id}`
      );
      if (response.status == 200) {
        loadDataInfo();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
    // Xử lý khi nhấn xác nhận
    setSb(false);
  };

  const handleCancel = () => {
    // Xử lý khi nhấn hủy
    setSb(false);
  };
  useEffect(() => {
    setAuthToken(token);
    const fetchData = async () => {
      try {
        const response = await api.get<ResponseData>(
          `https://www.socialnetwork.somee.com/api/post/user/${id}`
        );

        // setLengthPost(response.data.data.length);
        // setTotal(response.data.data.length);
        setDataPost(response.data);
        setLoadData(true);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    loadDataInfo();
    // loadDataUserCmt();
  }, []);
  const { dispatch } = useContext(ChatContext);
  const handleMessage = async () => {
    const combinedId =
      currentUser.data.firebaseData.uid > data.data.firebaseData.uid
        ? currentUser.data.firebaseData.uid + data.data.firebaseData.uid
        : data.data.firebaseData.uid + currentUser.data.firebaseData.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(combinedId);
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        console.log(
          "u:",
          data.data.firebaseData.uid,
          "di:",
          data.data.firebaseData.displayName,
          "pho:",
          data.data.firebaseData.photoURL
        );

        await updateDoc(
          doc(db, "userChats", currentUser.data.firebaseData.uid),
          {
            [combinedId + ".userInfo"]: {
              uid: data.data.firebaseData.uid,
              displayName: data.data.firebaseData.displayName,
              photoURL: data.data.firebaseData.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          }
        );
        console.log(
          "u:",
          currentUser.data.firebaseData.uid,
          "di:",
          currentUser.data.firebaseData.displayName,
          "pho:",
          currentUser.data.firebaseData.photoURL
        );
        await updateDoc(doc(db, "userChats", data.data.firebaseData.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.data.firebaseData.uid,
            displayName: currentUser.data.firebaseData.displayName,
            photoURL: currentUser.data.firebaseData.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        console.log(456);
      }
    } catch (error) {
      console.log("Loi r");
    }
    dispatch({ type: "CHANGE_USER", payload: data.data.firebaseData });
    navigate("/chat");
  };
  console.log(data.data, currentUser.data);

  return (
    <>
      <div className="insta-clone w-full">
        {/* <!--body start-->
    <!--profile data--> */}
        <div className=" h-auto px-36">
          <div className="flex md:flex-row-reverse flex-wrap">
            <div className="w-full md:w-3/4 p-4 text-center">
              <div className="text-left pl-4 pt-3 flex items-center">
                {loadData == false ? (
                  <Skeleton className="h-[20px] w-[80px] mr-2" />
                ) : (
                  <span className="text-base text-gray-700 text-2xl mr-2">
                    {data?.data?.nickname}
                  </span>
                )}

                <span className="text-base font-semibold text-gray-700 mr-2">
                  {loadData == false ? (
                    <Skeleton className="h-[40px] w-[90px] mr-2" />
                  ) : (
                    <>
                      {data.data.statusFriend === "Thêm bạn bè" ? (
                        <>
                          {loadSearch1 == false ? (
                            <div className="ml-6 bg-[#456fe6] text-white px-4 py-2 rounded-[8px]">
                              <button
                                onClick={() => {
                                  handleAddF(data.data.userId);
                                }}
                                className="text-[15px] font-medium "
                              >
                                Thêm bạn bè
                              </button>
                            </div>
                          ) : (
                            <div className="loaderSe"></div>
                          )}
                        </>
                      ) : data.data.statusFriend === "Phản Hồi" ? (
                        <div className="flex ">
                          <>
                            {loadSearch1 == false ? (
                              <div className="ml-6 bg-[#456fe6] text-white px-4 py-2 rounded-[8px]">
                                <button
                                  onClick={() => {
                                    handleAcceptF(data.data.userId);
                                  }}
                                  className="text-[15px] font-medium "
                                >
                                  Chấp nhận
                                </button>
                              </div>
                            ) : (
                              <div className="loaderSe"></div>
                            )}
                          </>
                          <>
                            {loadSearch2 == false ? (
                              <div className="ml-6 bg-[#456fe6] text-white px-4 py-2 rounded-[8px]">
                                <button
                                  onClick={() => {
                                    handleRemoveF(data.data.userId);
                                  }}
                                  className="text-[15px] font-medium "
                                >
                                  Từ chối
                                </button>
                              </div>
                            ) : (
                              <div className="loaderSe"></div>
                            )}
                          </>
                        </div>
                      ) : data.data.statusFriend === "Hủy lời mời" ? (
                        <div className="ml-6 bg-[#456fe6] text-white px-4 py-2 rounded-[8px]">
                          {" "}
                          <button className="text-[15px] font-medium ">
                            Chờ xác nhận
                          </button>
                        </div>
                      ) : (
                        <>
                          <label className="popup ml-6 bg-[#456fe6] text-white px-4 py-2 rounded-[8px]">
                            <input type="checkbox" />
                            <div className="burger" tabindex="0">
                              <>
                                {data.data.statusFriend == "Bạn thường" ? (
                                  <>Bạn bè</>
                                ) : (
                                  <>Bạn thân</>
                                )}
                              </>
                            </div>
                            <nav className="popup-window">
                              <ul>
                                <li>
                                  <button>
                                    <svg
                                      stroke-linejoin="round"
                                      stroke-linecap="round"
                                      stroke-width="2"
                                      stroke="currentColor"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      height="14"
                                      width="14"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                      <circle r="4" cy="7" cx="9"></circle>
                                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                    <span>
                                      {" "}
                                      <>
                                        {data.data.statusFriend ==
                                        "Bạn thường" ? (
                                          <div
                                            onClick={() => {
                                              handleUpLevelF(data.data.userId);
                                            }}
                                          >
                                            Bạn thân
                                          </div>
                                        ) : (
                                          <div
                                            onClick={() => {
                                              handleUpLevelF1(data.data.userId);
                                            }}
                                          >
                                            Bạn bè
                                          </div>
                                        )}
                                      </>
                                    </span>
                                  </button>
                                </li>

                                <hr />
                                <li onClick={() => setSb(true)}>
                                  <button>
                                    <svg
                                      stroke-linejoin="round"
                                      stroke-linecap="round"
                                      stroke-width="2"
                                      stroke="currentColor"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      height="14"
                                      width="14"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <line
                                        y2="18"
                                        x2="6"
                                        y1="6"
                                        x1="18"
                                      ></line>
                                      <line
                                        y2="18"
                                        x2="18"
                                        y1="6"
                                        x1="6"
                                      ></line>
                                    </svg>
                                    <span>Delete</span>
                                  </button>
                                </li>
                              </ul>
                            </nav>
                          </label>
                        </>
                      )}
                    </>
                  )}
                </span>
                <div
                  className="ml-6 bg-[#456fe6] text-white px-4 py-2 rounded-[8px]"
                  onClick={handleMessage}
                >
                  {" "}
                  <button className="text-[15px] font-medium ">Nhắn tin</button>
                </div>
              </div>

              <div className="text-left pl-4 pt-3 flex">
                <span className="text-base font-semibold text-gray-700 mr-2">
                  {loadData == false ? (
                    <Skeleton className="h-[15px] w-[70px] " />
                  ) : (
                    <b>0 post</b>
                  )}
                </span>
                <span className="text-base font-semibold text-gray-700 mr-2">
                  {loadData == false ? (
                    <Skeleton className="h-[15px] w-[70px] " />
                  ) : (
                    <b>0 friends</b>
                  )}
                </span>
              </div>

              <div className="text-left pl-4 pt-3">
                {loadData == false ? (
                  <Skeleton className="h-[15px] w-[50px] " />
                ) : (
                  <span className="text-lg font-bold text-gray-700 mr-2">
                    {data?.data?.fullName}
                  </span>
                )}
              </div>

              <div className="text-left pl-4 pt-3">
                {loadData == false ? (
                  <Skeleton className="h-[15px] w-[90px] " />
                ) : (
                  <p className="text-base font-medium text-blue-700 mr-2">
                    #{data.data.career}
                  </p>
                )}
                {loadData == false ? (
                  <Skeleton className="h-[15px] w-[600px] " />
                ) : (
                  <div className="flex items-center">
                    <CiMap />
                    <p className="text-base font-medium text-gray-700 mr-2 ml-2">
                      {data.data.address}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full md:w-[20%] p-4 text-center">
              <div className="w-full relative text-center mt-8">
                {loadData == false ? (
                  <Skeleton className="h-40 w-40 rounded-full" />
                ) : (
                  <img
                    className="h-40 w-40 rounded-[50%]"
                    src={data.data.image || ""}
                    alt="avatart"
                  />
                )}
              </div>
            </div>
          </div>
          {/* 
      
                
          {/* <hr className="border-gray-500 mt-6" /> */}
          <div className="grid grid-cols-6 mt-16 px-4  ml-36">
            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto h-20 w-20 -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1502164980785-f8aa41d53611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                Fun
              </h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto h-20 w-20 -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1456415333674-42b11b9f5b7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                Travel
              </h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto h-20 w-20 -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1494972308805-463bc619d34e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                Food
              </h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto h-20 w-20 -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1516834474-48c0abc2a902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                Sketch
              </h1>
            </div>

            <div className="flex-1 text-center px-4 py-2 m-2">
              <div className="relative shadow-xl mx-auto h-20 w-20 -my-12 border-white rounded-full overflow-hidden border-4">
                <img
                  className="object-cover w-full h-full"
                  src="https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
                />
              </div>
              <h1 className="pt-16 text-base font-semibold text-gray-900">
                My Work
              </h1>
            </div>
          </div>
          {/* <hr className="border-gray-500 w-20 border-t-1 ml-64 border-gray-800 " /> */}

          {/* <!--post icon and title--> */}
          <div className="flex flex-row mt-4 justify-center mr-16 w-full">
            <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
              <div className="flex inline-flex">
                <button
                  className="border-transparent text-gray-800 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div className="flex inline-flex ml-2 mt-1">
                <h3 className="text-sm font-bold text-gray-800 mr-2">POSTS</h3>
              </div>
            </div>

            <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
              <div className="flex inline-flex">
                <button
                  className="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
              <div className="flex inline-flex ml-2 mt-1">
                <h3 className="text-sm font-medium text-gray-700 mr-2">IGTV</h3>
              </div>
            </div>

            <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
              <div className="flex inline-flex">
                <button
                  className="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
              </div>
              <div className="flex inline-flex ml-2 mt-1">
                <h3 className="text-sm font-medium text-gray-700 mr-2">
                  SAVED
                </h3>
              </div>
            </div>

            <div className="flex text-gray-700 text-center py-2 m-2 pr-5">
              <div className="flex inline-flex">
                <button
                  className="border-transparent text-gray-600 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                  aria-label="Notifications"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </button>
              </div>
              <div className="flex inline-flex ml-2 mt-1">
                <h3 className="text-sm font-medium text-gray-700 mr-2">
                  TAGGED
                </h3>
              </div>
            </div>
          </div>

          {/* <!--post images--> */}

          <div className="grid grid-cols-3 pt-4">
            {loadData == false ? (
              <div className="flex">
                <Skeleton className="h-[160px] w-[320px] flex-1 text-center px-4 py-2 m-2" />
                <Skeleton className="h-[160px] w-[320px] flex-1 text-center px-4 py-2 m-2" />
                <Skeleton className="h-[160px] w-[320px] flex-1 text-center px-4 py-2 m-2" />
              </div>
            ) : (
              <>
                {dataPost.data.map((item: Comment, index: number) => (
                  <div className="flex-1 text-center px-4 py-2 m-2">
                    {item.images.length > 0 ? (
                      <div className="img-container cursor-pointer">
                        <img
                          src={
                            item.images && item.images.length > 0
                              ? item.images[0].linkImage
                              : ""
                          }
                          onClick={() => {
                            navigate(`/post/${item.id}`);
                          }}
                        />
                      </div>
                    ) : (
                      <div className="custom-video-container  w-[320px] h-[200px] cursor-pointer">
                        <video
                          src={
                            item.videos && item.videos.length > 0
                              ? item.videos[0].link
                              : ""
                          }
                          className="custom-video"
                        />
                        <button className="buttonVideo play-pause-button">
                          <svg
                            viewBox="0 0 448 512"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            width="26px"
                          >
                            <path
                              d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      {sb && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            height: "100%",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "25px 20px",
              borderRadius: "16px",
              textAlign: "center",
              width: "20%",
            }}
          >
            {/* Nội dung form đặt lịch */}
            <h2
              style={{
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "25.2px",
                textAlign: "center",
                color: "#111111",
              }}
            >
              Xác nhận hủy kết bạn
            </h2>
            <p
              style={{
                marginBottom: "0",
                fontFamily: "Plus Jakarta Sans",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "17.64px",
                textAlign: "center",
                color: "#78828A",
              }}
            >
              Bạn có muốn chắc chắn hủy kết bạn?
            </p>
            <div
              style={{
                marginTop: "20px",
                width: "80%",
                display: "flex",
                justifyContent: "space-around",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <button
                onClick={handleCancel}
                style={{
                  marginBottom: "0",
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "17.64px",
                  textAlign: "center",
                  color: "#456fe6",
                  border: "0",
                  background: "transparent ",
                }}
              >
                Hủy
              </button>{" "}
              <button
                onClick={handleConfirm}
                style={{
                  borderRadius: "20px",
                  padding: "12px 24px 12px 24px",
                  border: 0,
                  background: "#456fe6",
                  color: "#FEFEFE",
                  fontFamily: "Plus Jakarta Sans",
                  fontWeight: 600,
                  fontSize: "14px",
                  lineHeight: "17.64px",
                  textAlign: "center",
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalFriend;
