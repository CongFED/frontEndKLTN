import React, { useEffect, useState } from "react";
import { api, setAuthToken } from "../../utils/setAuthToken";
import { useRecoilValue, useRecoilState } from "recoil";
import { fetchPost } from "../../../redux/features/post/postSlice";
import { tokenState } from "../../recoil/initState";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import addPosts from "../../assets/";
import { useNavigate, useParams } from "react-router-dom";
import { Empty } from "antd";
// import { Skeleton } from "react-loading-skeleton";
interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}
const ListFriend = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadInfo, setLoadCmt1] = useState(false);
  const [loadSearch, setLoadSearch] = useState(false);
  const [loadSearch1, setLoadSearch1] = useState(false);
  const [loadSearch2, setLoadSearch2] = useState(false);
  const [load, setLoad] = useState(false);
  const token = useRecoilValue(tokenState);
  const [data, setData] = useState<ResponseData>({
    data: [],
    success: false,
    message: "",
  });

  const loadData = async () => {
    // Gọi API để lấy dữ liệu

    await api
      .get<ResponseData>(
        `https://www.socialnetwork.somee.com/api/Friend/getAll`
      )
      .then((response) => {
        // Cập nhật dữ liệu vào state
        if (response.status === 200) {
          setLoadCmt1(true);
          setLoad(true);
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
      console.log(response);
      if (response.status == 200) {
        loadData();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  const handleAcceptF = async (idfriend: any) => {
    // setLoadSearch1(true);
    // setAuthToken(token);
    try {
      const id = idfriend;
      console.log(1);
      const response = await api.post(
        `https://www.socialnetwork.somee.com/api/Friend/accept/${id}`
      );
      console.log(2);
      console.log(response);
      if (response.status == 200) {
        loadData();
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
        loadData();
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  const [sb, setSb] = useState(false);
  const handleConfirm = async () => {
    setAuthToken(token);
    try {
      const response = await api.delete(
        `https://www.socialnetwork.somee.com/api/Friend/unfriend/${id}`
      );
      if (response.status == 200) {
        loadData();
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
    loadData();
    // loadDataUserCmt();
  }, []);
  const myArray = [1, 2, 3, 4, 5, 6, 7, 8];
  console.log(data);
  return (
    <>
      <div className="flex flex-row">
        <div className="  ">
          <div className="w-[80vw] py-6 pl-[150px] ">
            <div className="flex justify-between ">
              <div className=" flex justify-start items-center">
                <img
                  src="https://snapgram-sand.vercel.app/assets/icons/people.svg"
                  alt=""
                />
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
                  List Friends
                </h2>
              </div>
            </div>
            <div className=" mt-2 grid grid-cols-4 ">
              {load == false ? (
                <>
                  {myArray.slice(0, 10).map((item, index) => (
                    <div className="card mb-8">
                      <div className="tools flex">
                        <Skeleton className="h-[10px] w-[10px] rounded-[50%] mr-2" />
                        <Skeleton className="h-[10px] w-[10px] rounded-[50%]  mr-2" />
                        <Skeleton className="h-[10px] w-[10px] rounded-[50%]" />
                      </div>
                      <div className="card__content  h-[80%] flex justify-center items-center">
                        <div className="flex flex-col justify-between items-center cursor-pointer">
                          <Skeleton className="h-[50px] w-[50px] rounded-[50%] mb-3" />
                          <Skeleton className="h-[10px] w-[100px]" />

                          <Skeleton className="h-[10px] w-[60px]" />
                          <Skeleton className="h-[30px] w-[60px]" />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {data.data.length == 0 ? (
                    <div className="mt-6  w-[1000px] h-[500px] flex justify-center items-center border-[1px] border-dashed border-[#b4c7fa] rounded-[10px]">
                      <div className="cursor-pointer">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-6">
                      {data.data.map((item: Comment, index: number) => (
                        <div className="card mb-8">
                          <div className="tools">
                            <div className="circle">
                              <span className="red box"></span>
                            </div>
                            <div className="circle">
                              <span className="yellow box"></span>
                            </div>
                            <div className="circle">
                              <span className="green box"></span>
                            </div>
                          </div>
                          <div className="card__content  h-[80%] flex justify-center items-center">
                            <div className="flex flex-col justify-between items-center cursor-pointer">
                              <img
                                src={data.data[index].image}
                                alt="avatar"
                                className="h-[50px] w-[50px] rounded-[50%] mb-3"
                                onClick={() =>
                                  navigate(
                                    `/personal-user/${data.data[index].userId}`
                                  )
                                }
                              />
                              <span
                                className="text-[12px] font-bold mb-3"
                                style={{ lineHeight: "140%" }}
                                onClick={() =>
                                  navigate(
                                    `/personal-user/${data.data[index].userId}`
                                  )
                                }
                              >
                                {data.data[index].fullName}
                              </span>
                              <span
                                className="text-[10px]  mb-3"
                                style={{ lineHeight: "140%" }}
                                onClick={() =>
                                  navigate(
                                    `/personal-user/${data.data[index].userId}`
                                  )
                                }
                              >
                                Web developer
                              </span>
                              <button className="bg-[#f0f2f5] text-[10px] px-6 py-1 font-bold rounded-[5px]   duration-500">
                                {data.data[index].levelFriend}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
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

export default ListFriend;
