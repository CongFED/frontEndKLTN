import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokenState } from "../../recoil/initState";
import { useRecoilValue } from "recoil";
import { api } from "../../utils/setAuthToken";
import { Empty } from "antd";
interface Comment {
  content: string;
  images: { linkImage: string; createDate: string }[]; // Đặt kiểu cho mảng images
  linkImage?: string;
  image: string;
  createDate: string;
  userTo: string;
  id: string;
  userNotify: any;
  islike: boolean;
  videos: { link: string; createDate: string }[]; //
  postId: string;
  commentId: string;
}
interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}
const Notifications = () => {
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
        `https://www.socialnetwork.somee.com/api/Notify/getNotifies`
      )
      .then((response) => {
        // Cập nhật dữ liệu vào state
        if (response.status === 200) {
          console.log(response);
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
  useEffect(() => {
    loadData(); // Gọi fetchData khi component được mount

    // Thiết lập interval để gọi fetchData mỗi giây
    const intervalId = setInterval(() => {
      loadData();
    }, 1000);

    // Clear interval khi component bị unmount để tránh memory leak
    return () => clearInterval(intervalId);
  }, []);
  const handleGetPostNoti = (postId: string, commentId: string) => {
    if (commentId !== undefined) {
      localStorage.setItem("cmtId", commentId);
      navigate(`/post/${postId}/${commentId}`);
    } else {
      localStorage.setItem("cmtId", "sss");
      navigate(`/post/${postId}`);
    }
  };
  return (
    <div className="flex flex-row">
      <div className="  ">
        <div className="w-[80vw] py-4 pl-[150px] ">
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
                Notifications
              </h2>
            </div>
          </div>
          <div>
            <div className="lg:bg-verylightgb lg:flex lg:align-middle lg:flex-col">
              <div className="xs:mx-3 bg-white lg:mx-auto lg:mt-16 lg:rounded-xl lg:p-8  ">
                <div className="xs:mt-2 flex justify-between">
                  <h1 className="text-xl font-bold">
                    Notifications
                    <span
                      id="notifications-counter"
                      className="ml-2 bg-blue text-white rounded-md px-3"
                    ></span>
                  </h1>
                  <span
                    id="mark-all-as-read"
                    className="text-sm font-bold text-gb cursor-pointer hover:text-blue"
                  >
                    Mark all as read
                  </span>
                </div>
                <>
                  {data.data.length == 0 ? (
                    <div className="mt-6  w-[600px] h-[100px] flex justify-center items-center">
                      <div className="cursor-pointer">
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      </div>
                    </div>
                  ) : (
                    <>
                      {data.data.map((item: Comment, index: number) => (
                        <div
                          id="notification-card-1"
                          className="mt-3 bg-verylightgb rounded-md flex justify-between p-3  w-[600px] cursor-pointer "
                          onClick={() => {
                            handleGetPostNoti(item?.postId, item?.commentId);
                          }}
                        >
                          <img
                            src={item.image}
                            alt="notification user avatar"
                            className="w-12 h-12 rounded-full"
                          />
                          <div className=" text-sm flex-auto mx-6 text-left">
                            <a
                              href="#"
                              className="font-bold hover:text-blue text-left"
                            >
                              {item.content}
                            </a>

                            <p className="text-gb mt-1 text-left text-[#b6b5b5]">
                              1m ago
                            </p>
                          </div>
                          <span id="notification-ping" className="ml-2">
                            <span className="absolute inline-block rounded-full mt-2 ml-1 p-1 bg-red">
                              {" "}
                            </span>
                            <span className="relative inline-block animate-ping rounded-full ml-1 p-1 bg-red">
                              {" "}
                            </span>
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
