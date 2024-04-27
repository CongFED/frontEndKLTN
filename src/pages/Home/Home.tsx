import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { RootState } from "../../redux/store";
import {
  tokenState,
  ReloadLike,
  ViewHome,
  isUpdatePost,
} from "../../recoil/initState";
import { useRecoilState, useRecoilValue } from "recoil";
import { api, setAuthToken } from "../../utils/setAuthToken";
import API from "../../services/API";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchPost, reloadPost } from "../../redux/features/post/postSlice";
import CardPosts from "../../components/CardPosts/CardPosts";
import home from "../../assets/home.svg";
import RightHome from "../../components/RightHome/RightHome";
import { fetchFriend } from "../../redux/features/Not-Friend/friendSlice";
import getPost from "../../redux/features/post/getPostAPI";
import getReels from "../../redux/features/reels/getReelsAPI";
import ChatHome from "./ChatHome";
import CardReels from "../../components/CardReelss/CardReels";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const currentUser1 = useSelector((state: RootState) => state.info.info);
  const [isUpdatePostR, setSsUpdatePost] = useRecoilState(isUpdatePost);
  console.log(currentUser1, currentUser);
  const ReloadLike1 = useRecoilValue(ReloadLike);
  const ViewHomeR = useRecoilValue(ViewHome);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const { info, isLoading, isError, error } = useSelector(
    (state: RootState) => state.info
  );
  const [loadChat, setLoadChat] = useState(true);
  useEffect(() => {
    const hasInfor = localStorage.getItem("hasInfor");
    if (hasInfor == "false") {
      // Kiểm tra nếu hasInfor không tồn tại hoặc có giá trị rỗng
      navigate("/add-info");
    }
  }, []);
  const [numberPost, setNumberPost] = useState(2);
  const [post, setPost] = useState([]);
  const [reels, setReels] = useState([]);
  useEffect(() => {
    // Gọi hàm getPost mỗi giây và cập nhật dữ liệu vào state
    // const interval = setInterval(() => {
    getPost(numberPost).then((data) => setPost(data));
    // }, 1000);

    // return () => clearInterval(interval); // Clear interval khi component unmount
  }, [numberPost]);
  useEffect(() => {
    // Gọi hàm getPost mỗi giây và cập nhật dữ liệu vào state
    // const interval = setInterval(() => {
    if (isUpdatePostR == false) {
      getPost(numberPost).then((data) => setPost(data));
      setSsUpdatePost(true);
    }
    // }, 1000);

    // return () => clearInterval(interval); // Clear interval khi component unmount
  }, [isUpdatePostR]);
  useEffect(() => {
    // Gọi hàm getPost mỗi giây và cập nhật dữ liệu vào state
    // const interval = setInterval(() => {
    getReels().then((data) => setReels(data));
    // }, 1000);

    // return () => clearInterval(interval); // Clear interval khi component unmount
  }, []);
  useEffect(() => {
    dispatch(fetchFriend());
  }, [dispatch]);
  useEffect(() => {
    console.log(currentUser1.success);
    if (currentUser1.success !== undefined) {
      setLoadChat(false);
    }
  }, [currentUser1.success]);
  // useEffect(() => {
  //   const currentTime = Date.now();
  //   if (currentTime - lastFetchTime > 1000) {
  //     dispatch(fetchPost());
  //     setLastFetchTime(currentTime);
  //   }
  // }, [dispatch, lastFetchTime]);
  // const { post, isLoading, isError, error } = useSelector(
  //   (state: RootState) => state.post
  // );

  // console.log(post);

  const [isEndOfPage, setIsEndOfPage] = useState(false);
  const handleIntersection: IntersectionObserverCallback = ([entry]) => {
    if (entry.isIntersecting) {
      setNumberPost((prevNumberPost) => prevNumberPost + 1);
    } else {
      setIsEndOfPage(false);
    }
  };

  const observer = useRef(
    new IntersectionObserver(
      handleIntersection,
      { threshold: 1 } // Kích hoạt khi toàn bộ phần tử mục tiêu là nhìn thấy
    )
  );

  const bottomOfPageRef = useRef(null);
  console.log(currentUser);
  useEffect(() => {
    const currentObserver = observer.current;
    if (bottomOfPageRef.current) {
      currentObserver.observe(bottomOfPageRef.current);
    }
    return () => {
      if (bottomOfPageRef.current) {
        currentObserver.unobserve(bottomOfPageRef.current);
      }
    };
  }, []);
  useEffect(() => {
    if (post.length >= numberPost) {
      setAllPostsLoaded(true); // Nếu đã tải hết, set biến state allPostsLoaded thành true
    }
  }, [post, numberPost]);
  console.log(reels);
  return (
    <>
      <>
        {ViewHomeR == true ? (
          <div className=" overflow-y-auto relative left-[20.5rem] top-[50px] w-[58vw]">
            {/* */}
            {/* <div className="flex justify-between pl-[150px] mt-6 ">
          <div className=" flex justify-start items-center">
            <img src={home} alt="" />
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "140%",
                letterSpacing: "-0.05em",
                color: "#456fe6",
                marginLeft: "10px",
              }}
            >
              Home Feed
            </h2>
          </div>{" "}
        </div>{" "} */}
            <div className="flex flex-col justify-center pl-16 items-center mt-6">
              <div className="bg-white w-[61%] h-[45px] mr-[10%] rounded-[20px] flex justify-around items-center ">
                <img
                  src={info?.data?.image}
                  alt=""
                  className="rounded-[50px] w-[30px] h-[30px]"
                />
                <input
                  type="text"
                  className="w-[60%] h-full outline-none"
                  placeholder={`What's on your mind, ${info?.data?.fullName}`}
                />
                <div className="w-[15%]  bg-[#456fe6] py-1 text-white  rounded-[20px] cursor-pointer hover:bg-[#458be6]">
                  <p>Post</p>
                </div>
              </div>
              <CardPosts data={post} />
            </div>

            <div className="">
              {" "}
              <div className=" h-[280px] w-[500px] ml-[21%] bg-white  rounded-[10px]">
                <div className="py-4 px-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Skeleton className="h-[45px] w-[45px] rounded-[50%]" />
                    <div className=" ml-4 text-left">
                      <Skeleton className="h-[10px] w-[70px]" />
                      <div className="flex justify-start items-center ">
                        <Skeleton className="h-[10px] w-[50px]" />
                        <>
                          <Skeleton className="ml-2 h-[13px] w-[13px] rounded-[50%]" />
                        </>
                      </div>
                    </div>
                  </div>
                  <div className="text-[25px] p-2 ">
                    <Skeleton className="h-[30px] w-[30px] rounded-[50%]" />
                  </div>
                </div>
                <div ref={bottomOfPageRef}>
                  {" "}
                  <Skeleton className=" h-[180px] w-[500px] mr-[30%] ml-[0%]" />
                </div>
              </div>
            </div>
            {/* <div ref={bottomOfPageRef} className="">
          ss
        </div> */}
          </div>
        ) : (
          <>
            <div className=" overflow-y-auto relative left-[23rem] top-[50px] w-[58vw]">
              {" "}
              <div className="flex justify-center pl-16">
                <CardReels data={reels} />
              </div>
            </div>
          </>
        )}
        <div className="w-[24vw]   h-[100vh] fixed top-[60px] right-0 px-4 ">
          {/* <RightHome data={friend} /> */}
          {loadChat == false ? <ChatHome /> : <></>}
        </div>
      </>

      <Toaster />
    </>
  );
};

export default Home;
