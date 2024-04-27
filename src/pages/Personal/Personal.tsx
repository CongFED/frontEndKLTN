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
import ListFriendPersonal from "../../components/ListFriendPersonal/ListFriendPersonal";
import ListFriendPersonalRQ from "../../components/ListFriendPersonalRQ/ListFriendPersonalRQ";
// import { Skeleton } from "react-loading-skeleton";
import ImgEdit from "../../assets/icons/edit.svg";
import ProfileModal from "../../components/ProfileModal/ProfileModal";
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
  const [modalOpened, setModalOpened] = useState(false);
  console.log(dataPost);
  return (
    <>
      <div className=" w-full relative  top-[50px]">
        {/* <!--body start-->
    <!--profile data--> */}
        <div className=" h-auto  flex justify-around ">
          {/* <div className="flex md:flex-row-reverse flex-wrap ml-36">
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
          </div> */}
          {/* 
      <!--status show icon--> */}
          <ListFriendPersonal />

          <div className="flex-auto w-[60%]  left-[20%]   rounded-xl  ">
            <div className="w-[100%] mx-auto ">
              <div>
                <div className="relative py-4">
                  <img
                    className="h-96 w-full rounded-md object-cover"
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
                  <div className="absolute top-10 right-6">
                    <img
                      src={ImgEdit}
                      alt=""
                      className="h-8 w-8 cursor-pointer"
                      onClick={() => setModalOpened(true)}
                    />
                    <ProfileModal
                      modalOpened={modalOpened}
                      setModalOpened={setModalOpened}
                    />
                  </div>
                  <div className="flex flex-col absolute right-6 bottom-10">
                    <div className="flex items-center">
                      <div className="h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          id="map-marker"
                        >
                          <path
                            fill="#456FE6"
                            d="M12,2a8,8,0,0,0-8,8c0,5.4,7.05,11.5,7.35,11.76a1,1,0,0,0,1.3,0C13,21.5,20,15.4,20,10A8,8,0,0,0,12,2Zm0,17.65c-2.13-2-6-6.31-6-9.65a6,6,0,0,1,12,0C18,13.34,14.13,17.66,12,19.65ZM12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z"
                          ></path>
                        </svg>
                      </div>

                      <span className="ml-2 py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
                        From {info.data.provinces}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          data-name="Layer 1"
                          viewBox="0 0 24 24"
                          id="house-user"
                        >
                          <path
                            fill="#456FE6"
                            d="m21.664 10.252-9-8a.999.999 0 0 0-1.328 0l-9 8a1 1 0 0 0 1.328 1.496L4 11.449V21a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9.551l.336.299a1 1 0 0 0 1.328-1.496ZM9.184 20a2.982 2.982 0 0 1 5.632 0Zm1.316-5.5A1.5 1.5 0 1 1 12 16a1.502 1.502 0 0 1-1.5-1.5ZM18 20h-1.101a5 5 0 0 0-2.259-3.228 3.468 3.468 0 0 0 .86-2.272 3.5 3.5 0 0 0-7 0 3.468 3.468 0 0 0 .86 2.272A5 5 0 0 0 7.1 20H6V9.671l6-5.333 6 5.333Z"
                          ></path>
                        </svg>
                      </div>
                      <span className="ml-2 py-2 font-roboto font-medium text-sm text-white no-underline tracking-normal leading-none">
                        Lives in {info.data.workPlace}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 pt-4  w-full">
              {loadData == false ? (
                <div className="flex">
                  <Skeleton className="h-[150px] w-[280px] flex-1 text-center px-4 py-2 m-2" />
                  <Skeleton className="h-[150px] w-[280px] flex-1 text-center px-4 py-2 m-2" />
                  <Skeleton className="h-[150px] w-[280px] flex-1 text-center px-4 py-2 m-2" />
                </div>
              ) : (
                <>
                  {dataPost.data.map((item: Comment) => (
                    <div className="flex-1 text-center py-2 m-2 max-h-[200px]">
                      {item.images.length > 0 ? (
                        <>
                          {item.images.length !== 0 && (
                            <div className="cursor-pointer h-full">
                              <img
                                className="h-full object-cover"
                                style={{ width: "100%" }}
                                src={
                                  item.images && item.images.length > 0
                                    ? item.images[0].linkImage
                                    : "https://marketinghaiphong.com/wp-content/uploads/2019/06/content-975x523-1.png"
                                }
                                onClick={() => {
                                  navigate(`/post/${item.id}`);
                                }}
                              />
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="cursor-pointer h-full">
                          <video
                            src={
                              item.videos && item.videos.length > 0
                                ? item.videos[0].link
                                : ""
                            }
                            className="h-full object-cover"
                            style={{ width: "100%" }}
                            onClick={() => {
                              navigate(`/post/${item.id}`);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className=" w-[20%] h-[fit-content] mt-4 flex justify-end px-4 "></div>
          {/* <!--post images--> */}
        </div>
      </div>
    </>
  );
};

export default Personal;
