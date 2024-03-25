import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { tokenState, ReloadLike } from "../../recoil/initState";
import { useRecoilValue } from "recoil";
import { api, setAuthToken } from "../../utils/setAuthToken";
import API from "../../services/API";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchPost, reloadPost } from "../../redux/features/post/postSlice";
import CardPosts from "../../components/CardPosts/CardPosts";
import home from "../../assets/home.svg";
import RightHome from "../../components/RightHome/RightHome";
import { fetchFriend } from "../../redux/features/Not-Friend/friendSlice";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const ReloadLike1 = useRecoilValue(ReloadLike);
  useEffect(() => {
    const hasInfor = localStorage.getItem("hasInfor");
    if (hasInfor == "false") {
      // Kiểm tra nếu hasInfor không tồn tại hoặc có giá trị rỗng
      navigate("/add-info");
    }
  }, []);

  useEffect(() => {
    dispatch(fetchPost());
    dispatch(fetchFriend());
  }, [dispatch]);
  useEffect(() => {
    dispatch(reloadPost()); // Khi ReloadLike1 thay đổi, dispatch action reloadPost để fetch dữ liệu mới
  }, [ReloadLike1, dispatch]);
  const { post, isLoading, isError, error } = useSelector(
    (state: RootState) => state.post
  );
  const { friend, isLoadingfriend, isErrorfriend, errorfriend } = useSelector(
    (state: RootState) => state.getFrined
  );
  return (
    <>
      <div className="flex flex-row">
        <div className="w-[70vw]  overflow-y-auto ">
          {/* */}
          <div className="flex justify-between pl-[150px] mt-6 ">
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
          </div>{" "}
          <div className="flex justify-end">
            <CardPosts data={post} isLoading={isLoading} />
          </div>
        </div>
        <div className="w-[20vw]   h-[100vh] fixed top-0 right-0 px-4 border-l-[1px] border-solid border-white">
          <RightHome data={friend} />
        </div>
      </div>

      <Toaster />
    </>
  );
};

export default Home;
