import React, { useEffect, useState } from "react";
import CardPost from "./CardPost/CardPost";
import CardPostShare from "./CardPostShare/CardPostShare";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Empty } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
interface Props {
  data: any;
  isLoading: any;
}

const CardPosts = ({ data, isLoading }: Props) => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setLoad(false); // Set load to false each time component renders
    if (data.success == true) {
      setLoad(true);
    }
  }, [isLoading, data]);
  console.log(data.data);
  return (
    <div className="w-[70%] py-6  ">
      <>
        {load === false ? (
          <div>
            <Skeleton className=" h-[600px] w-[500px] mr-[30%] ml-[0%]" />
          </div>
        ) : (
          <>
            {data.data.length == 0 ? (
              <div className=" w-[500px] h-[500px] flex justify-center items-center border-[1px] border-dashed border-[#b4c7fa] rounded-[10px]">
                <div
                  className="cursor-pointer"
                  onClick={() => navigate("/add-post")}
                >
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </div>
              </div>
            ) : (
              <>
                {" "}
                {data?.data?.map((index, item) => (
                  //  />
                  <>
                    {index.idShare == undefined ? (
                      <CardPost data={index} cmtid="" />
                    ) : (
                      <CardPostShare data={index} />
                    )}
                  </>
                ))}{" "}
              </>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default CardPosts;
