import { tokenState } from "../../recoil/initState";
import Skeleton from "react-loading-skeleton";

import { Link, useNavigate } from "react-router-dom";
import { Empty } from "antd";
import { api } from "../../utils/setAuthToken";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
// import { Skeleton } from "react-loading-skeleton";
interface ResponseData {
  data: Comment[];
  success: boolean;
  message: string;
}
const ListFriendPersonalRQ = () => {
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
        `https://www.socialnetwork.somee.com/api/Friend/getAllNotFriend`
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
  useEffect(() => {
    loadData();
    // loadDataUserCmt();
  }, []);
  const myArray = [1, 2, 3, 4, 5, 6, 7, 8];
  console.log(data);
  return (
    <div className=" w-[20%] h-[fit-content] mt-4 flex justify-end px-4 ">
      <div className="bg-white w-[100%]  rounded-lg py-2">
        <div>
          <p className="font-[600]">Friendship suggestions</p>
          {data.data.map((item: Comment, index: number) => (
            <Link
              to={`/personal-user/${data.data[index].userId}`}
              className="w-[100%] h-auto rounded-[10px] flex justify-start items-center mb-2 bg-white py-2 hover:bg-slate-50"
            >
              <img src={data.data[index].image} alt="" className="tab-img" />
              <div>
                {" "}
                <p className="font-bold text-[14px] text-[#050505]">
                  {data.data[index].fullName}
                </p>
                <p className=" text-[14px] text-[#c1c0c0] text-start">
                  @ {data.data[index].nickname}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListFriendPersonalRQ;
