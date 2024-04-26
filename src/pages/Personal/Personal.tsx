import React, { useEffect, useState } from "react";
import { api, setAuthToken } from "../../utils/setAuthToken";
import { useRecoilValue, useRecoilState } from "recoil";
import { fetchPost } from "../../../redux/features/post/postSlice";
import { tokenState } from "../../recoil/initState";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CiMap } from "react-icons/ci";
import CustomVideo from "../../components/CustomVideo/CustomVideo";
import { fetchInfo } from "../../redux/features/info/infoSlice";
import Logo2 from "../../assets/LogoLoad.png";
import { useNavigate } from "react-router-dom";
// import { Skeleton } from "react-loading-skeleton";

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
interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}
const Personal = () => {
  const { info, isLoading, isError, error } = useSelector(
    (state: RootState) => state.info
  );
  console.log(info);
  const token = useRecoilValue(tokenState);
  const navigate = useNavigate();
  const [loadData, setLoadData] = useState(false);
  const [lengthFriend, setLengthFriend] = useState(0);
  const [lengthPost, setLengthPost] = useState(0);
  const [dataPost, setData] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });

  const loadDataFriend = async () => {
    // Gọi API để lấy dữ liệu

    await api
      .get<ResponseData>(
        `https://www.socialnetwork.somee.com/api/Friend/getAll`
      )
      .then((response) => {
        // Cập nhật dữ liệu vào state
        if (response.status === 200) {
          setLengthFriend(response.data.data.length);
          //setLoadData(true);
          console.log(response.data.data.length);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  useEffect(() => {
    setAuthToken(token);
    const fetchData = async () => {
      try {
        const id = info.data.userId;
        const response = await api.get<ResponseData>(
          `https://www.socialnetwork.somee.com/api/post/user/${id}`
        );
        console.log(response);
        setLengthPost(response.data.data.length);
        // setTotal(response.data.data.length);
        setData(response.data);
        setLoadData(true);
      } catch (error) {
        console.error("Get post failed", error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    loadDataFriend();
  }, []);
  return (
    <>
      <div className="insta-clone w-full relative  top-[50px] bg-linear-gradient(98.63deg, #f9a225 0%, #f95f35 100%)">
        {/* <!--body start-->
    <!--profile data--> */}
        <div className=" h-auto px-36 ">
          <div className="flex md:flex-row-reverse flex-wrap ml-36">
            <div className="w-full md:w-3/4 p-4 text-center">
              <div className="text-left pl-4 pt-3 flex items-center">
                {loadData == false ? (
                  <Skeleton className="h-[20px] w-[80px] mr-2" />
                ) : (
                  <span className="text-base text-gray-700 text-2xl mr-2">
                    {info.data.nickname}
                  </span>
                )}

                <span className="text-base font-semibold text-gray-700 mr-2">
                  {loadData == false ? (
                    <Skeleton className="h-[40px] w-[90px] mr-2" />
                  ) : (
                    <button className="bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded">
                      Edit Profile
                    </button>
                  )}
                </span>
                <span className="text-base font-semibold text-gray-700">
                  <button
                    className="p-1 border-transparent text-gray-700 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                    aria-label="Notifications"
                  >
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </span>
              </div>

              <div className="text-left pl-4 pt-3 flex">
                <span className="text-base font-semibold text-gray-700 mr-2">
                  {loadData == false ? (
                    <Skeleton className="h-[15px] w-[70px] " />
                  ) : (
                    <b>{lengthPost} post</b>
                  )}
                </span>
                <span className="text-base font-semibold text-gray-700 mr-2">
                  {loadData == false ? (
                    <Skeleton className="h-[15px] w-[70px] " />
                  ) : (
                    <b>{lengthFriend} friends</b>
                  )}
                </span>
              </div>

              <div className="text-left pl-4 pt-3">
                {loadData == false ? (
                  <Skeleton className="h-[15px] w-[50px] " />
                ) : (
                  <span className="text-lg font-bold text-gray-700 mr-2">
                    {info.data.fullName}
                  </span>
                )}
              </div>

              <div className="text-left pl-4 pt-3">
                {loadData == false ? (
                  <Skeleton className="h-[15px] w-[90px] " />
                ) : (
                  <p className="text-base font-medium text-blue-700 mr-2">
                    #{info.data.career || "User"}
                  </p>
                )}
                {loadData == false ? (
                  <Skeleton className="h-[15px] w-[600px] " />
                ) : (
                  <div className="flex items-center">
                    <CiMap />
                    <p className="text-base font-medium text-gray-700 mr-2 ml-2">
                      {info.data.address || "User"}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full md:w-[20%] p-4 text-center">
              <div className="w-full relative text-center mt-8">
                <button
                  className="flex rounded-full"
                  id="user-menu"
                  aria-label="User menu"
                  aria-haspopup="true"
                >
                  {loadData == false ? (
                    <Skeleton className="h-40 w-40 rounded-full" />
                  ) : (
                    <img
                      className="h-40 w-40 rounded-full"
                      src={info.data.image || Logo2}
                      alt="avatart"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* 
      <!--status show icon--> */}
          {/* <div className="flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl">
            <div className="w-[80%] mx-auto">
              <div>
                <div className="relative py-4">
                  <img
                    className="h-96 w-full rounded-md"
                    src={info.data.background || Logo2}
                    alt="profilePic"
                  ></img>
                  <div className="absolute bottom-10 left-6">
                    <img
                      className="h-28 w-28 rounded-full"
                      src={info.data.image || Logo2}
                      alt="avatart"
                    />
                    <p className="py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
                      {info.data.fullName}
                    </p>
                    <p className="py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
                      @{info.data.nickname}
                    </p>
                  </div>
                  <div className="flex flex-col absolute right-6 bottom-10">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#fff"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>

                      <span className="ml-2 py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
                        From {info.data.provinces}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#fff"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                        />
                      </svg>

                      <span className="ml-2 py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
                        Lives in {info.data.workPlace}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="grid grid-cols-6 ml-36 mt-16">
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
          </div> */}

          {/* <hr className="border-gray-500 mt-6" /> */}
          {/* <hr className="border-gray-500 w-20 border-t-1 ml-64 border-gray-800" /> */}

          {/* <!--post icon and title--> */}
          {/* <div className="flex flex-row mt-4 justify-center mr-16">
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
          </div> */}

          {/* <!--post images--> */}

          <div className="grid grid-cols-3 pt-4  w-full">
            {loadData == false ? (
              <div className="flex">
                <Skeleton className="h-[160px] w-[320px] flex-1 text-center px-4 py-2 m-2" />
                <Skeleton className="h-[160px] w-[320px] flex-1 text-center px-4 py-2 m-2" />
                <Skeleton className="h-[160px] w-[320px] flex-1 text-center px-4 py-2 m-2" />
              </div>
            ) : (
              <>
                {dataPost.data.map((item: Comment) => (
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
                      <div className="custom-video-container w-[320px] h-[200px] cursor-pointer">
                        <video
                          src={
                            item.videos && item.videos.length > 0
                              ? item.videos[0].link
                              : ""
                          }
                          className="custom-video"
                          onClick={() => {
                            navigate(`/post/${item.id}`);
                          }}
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
    </>
  );
};

export default Personal;
