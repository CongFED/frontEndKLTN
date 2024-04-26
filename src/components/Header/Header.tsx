import React, { useEffect } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Logo2 from "../../assets/LogoLoad.png";
import { fetchInfo } from "../../redux/features/info/infoSlice";
import { useNavigate } from "react-router-dom";
import {
  CiChat2,
  CiHeart,
  CiSearch,
  CiSquarePlus,
  CiUser,
  CiVideoOn,
  CiLogout,
} from "react-icons/ci";
import { GoHome } from "react-icons/go";
import ButtonHeader from "../Button/ButtonHeader";
import { IoLogOutOutline } from "react-icons/io5";
import LogoLog from "../../assets/icons/logout.svg";
import LogoF from "../../assets/icons/people.svg";
import LogoCal from "../../assets/icons/file-upload.svg";
import LogoP from "../../assets/icons/follow.svg";
import Logobookmark from "../../assets/icons/bookmark.svg";
import { Link } from "react-router-dom";
import { logoutSuccess } from "../../redux/features/login/loginSlice";
import LogoHome from "../../assets/icons/home.svg";
import LogoWa from "../../assets/icons/wallpaper.svg";
import LogoCreate from "../../assets/icons/gallery-add.svg";
import { useRecoilState } from "recoil";
import { ViewHome } from "../../recoil/initState";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { info, isLoading, isError, error } = useSelector(
    (state: RootState) => state.info
  );
  // useEffect(() => {
  //   dispatch(fetchInfo());
  // }, []);
  const isHome = location.pathname === "/";
  const isS = location.pathname === "/add-post";
  const isNo = location.pathname === "/notification";
  const isHomeR = true;
  const isRR = false;
  const isLF = location.pathname === "/list-friend";
  const isCG = location.pathname === "/call-group";
  const [viewHomeR, setViewHomeR] = useRecoilState(ViewHome);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hasInfor");
    dispatch(logoutSuccess());
    navigate("/login");
  };
  console.log(info);
  const hanldeNaviHome = () => {
    navigate("/");
    setViewHomeR(true);
  };
  const hanldeNaviReels = () => {
    navigate("/");
    setViewHomeR(false);
  };
  return (
    <div className="fixed top-[60px] h-[100vh]  w-[23rem] border-white bg-[#f0f2f5]">
      <div className="px-2 py-2 flex flex-col justify-end items-end">
        <Link
          to="/personal"
          className="w-[70%]  h-auto rounded-[10px] flex justify-start items-center mb-2 bg-white py-2"
        >
          <img src={info?.data?.image || Logo2} alt="" className="tab-img" />
          <div>
            {" "}
            <p className="font-bold text-[14px] text-[#050505]">
              {info?.data?.fullName}
            </p>
            <p className=" text-[14px] text-[#c1c0c0] text-start">
              @{info?.data?.nickname}
            </p>
          </div>
        </Link>

        <div className="w-[70%]  h-auto  mt-2  rounded-[10px] flex flex-col justify-start items-center mb-2 bg-white py-2">
          <div
            onClick={hanldeNaviHome}
            className={`w-full  h-[50px] flex justify-start items-center  mb-2 hover:bg-slate-50  px-2 ${
              isHome && isHomeR == viewHomeR
                ? "border-l-[2px] border-solid border-[#456fe6] bg-slate-50"
                : ""
            }`}
          >
            <img src={LogoHome} alt="" className="tab-img12" />
            <p className=" text-[14px]  font-[600]">Home</p>
          </div>
          <div
            onClick={hanldeNaviReels}
            className={`w-full  h-[50px]  flex justify-start items-center  mb-2 hover:bg-slate-50  px-2 ${
              isHome && isRR == viewHomeR
                ? "border-l-[2px] border-solid border-[#456fe6] bg-slate-50"
                : ""
            }`}
          >
            <img src={LogoWa} alt="" className="tab-img12" />
            <p className=" text-[14px]  font-[600]">Reels</p>
          </div>
          <Link
            to="/list-friend"
            className={`w-full  h-[50px]  flex justify-start items-center  mb-2 hover:bg-slate-50  px-2 ${
              isLF
                ? "border-l-[2px] border-solid border-[#456fe6] bg-slate-50"
                : ""
            }`}
          >
            <img src={LogoF} alt="" className="tab-img12" />
            <p className=" text-[14px]  font-[600]">List friend</p>
          </Link>
          <Link
            to="/list-friend"
            className="w-full  h-[50px]  flex justify-start items-center  mb-2 hover:bg-slate-50  px-2"
          >
            <img src={LogoP} alt="" className="tab-img12" />
            <p className=" text-[14px]  font-[600]">Send a friend request</p>
          </Link>
          <Link
            to="/notification"
            className={`w-full  h-[50px]  flex justify-start items-center  mb-2 hover:bg-slate-50  px-2 ${
              isNo
                ? "border-l-[2px] border-solid border-[#456fe6] bg-slate-50"
                : ""
            }`}
          >
            <img src={Logobookmark} alt="" className="tab-img12" />
            <p className=" text-[14px]  font-[600]">Notification</p>
          </Link>
          <Link
            to="/call-group"
            className={`w-full  h-[50px]  flex justify-start items-center  mb-2 hover:bg-slate-50  px-2 ${
              isCG
                ? "border-l-[2px] border-solid border-[#456fe6] bg-slate-50"
                : ""
            }`}
          >
            <img src={LogoCal} alt="" className="tab-img12" />
            <p className=" text-[14px]  font-[600]">Call group</p>
          </Link>
          {/* <Link
            to="/create-reels"
            className="w-full  h-[50px] rounded-[6px] flex justify-start items-center mb-2 hover:bg-slate-50  px-2"
          >
            <img src={LogoCrR} alt="" className="tab-img12" />
            <p className=" text-[14px]  font-[600]">Create Reels</p>
          </Link> */}
          <div
            onClick={handleLogout}
            className="w-full  h-[50px] rounded-[6px] flex justify-start items-center  mb-2 hover:bg-slate-50  px-2 cursor-pointer"
          >
            <img src={LogoLog} alt="" className="tab-img12" />
            <p className=" text-[14px] font-[600]">Log out</p>
          </div>
        </div>
        <div
          onClick={() => navigate("/create-reels")}
          className="w-[70%]  h-[40px] mt-2 flex justify-center items-center mb-2 bg-[#456fe6] py-2 rounded-[20px] cursor-pointer hover:bg-[#458be6] font-[500] text-white"
        >
          <p>Create Reels</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
