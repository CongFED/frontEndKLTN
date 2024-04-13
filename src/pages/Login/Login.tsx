import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState, useRecoilValue } from "recoil";
import { schemaLogin } from "../../schema/schemaLogin";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ImgA1 from "../../assets/login/img1.svg";
import ImageMain1 from "../../assets/login/log.svg";
import "./style.css";
import toast, { Toaster } from "react-hot-toast";
import {
  Email,
  EmailRegis,
  Password,
  tokenState,
} from "../../recoil/initState";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import API from "../../services/API";
import { login } from "../../redux/features/login/loginAPI";
import { fetchInfo } from "../../redux/features/info/infoSlice";

const Login = () => {
  const history = useNavigate();
  // const [signIn, toggle] = React.useState(true);
  const [emailRecoil, setEmailRecoil] = useRecoilState(Email);
  const [emailRegisRecoil, setEmailRegisRecoil] = useRecoilState(EmailRegis);
  const [passwordRecoil, setPasswordRecoil] = useRecoilState(Password);

  // Register
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password1, setPassword] = useState("");
  const [comFirmPassword, setComFirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setToken] = useRecoilState(tokenState);
  useEffect(() => {
    const user = localStorage.getItem("token");

    if (user) history("/");
  }, [history]);

  const handleRegister = async () => {
    try {
      setComFirmPass(true);
      setIsLoading(true);
      if (password1 === comFirmPassword) {
        const data = {
          email: email,
          password: password1,
        };

        fetch(API.REGISTER, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Đặt cookie vào header
            // Cookie: cookieJar.getCookieStringSync(API.REGISTER),
          },
          body: JSON.stringify(data),

          credentials: "include",
        })
          .then((response) => {
            // Xử lý cookie từ response nếu cần thiết
            console.log(response);
            const cookies = response.headers.get("set-cookie");

            return response.json();
          })
          .then((data) => {
            console.log(data);
            if (data?.message == "Email is exist") {
              toast.error("Tài khoản đã được đăng ký!");
              setIsLoading(false);
            } else {
              setEmailRegisRecoil(email);
              navigate("/verify");
            }
          })
          .catch((error) => {
            // Xử lý lỗi ở đâ
          });
      } else {
        setComFirmPass(false);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login failed", error);
    }
  };
  // Login

  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const isFetching = useSelector((state: RootState) => state.user.isFetching);
  useEffect(() => {
    console.log(currentUser);
    if (currentUser?.data.success === true) {
      console.log(currentUser);
      toast.success("Đăng nhập thành công!");
      setToken(currentUser?.data?.data?.jwtToken);
      localStorage.setItem("token", currentUser?.data?.data?.jwtToken);
      localStorage.setItem("hasInfor", currentUser?.data?.data?.hasInfor);
      dispatch(fetchInfo());
      // Ẩn toast
      if (currentUser?.data?.data?.hasInfor == false) {
        navigate("/add-info");
      } else {
        navigate("/");
      }
    }
    if (error == true && isFetching == false) {
      setIsLoading(false);
      toast.error("Đăng nhập thất bại!");
    }
  }, [currentUser, error, isFetching]);

  const handleLogin = async () => {
    setIsLoading(true);
    console.log(email, password1);
    try {
      const data = {
        email: email,
        password: password1,
      };

      login(dispatch, data);
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleLogin();
    }
  };
  const handleKeyRe = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleRegister();
    }
  };
  const [trans, setTrans] = useState(true);
  const [comFirmPass, setComFirmPass] = useState(true);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${ImgA1})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          position: "fixed", // hoặc position: "absolute"
          zIndex: "-100",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
        }}
      ></div>
      <div className="w-[auto] h-[100vh] flex flex-col justify-around items-center lg:grid lg:grid-cols-2">
        <div className="flex justify-center">
          <img src={ImageMain1} className="button w-[60%]" />
        </div>
        <>
          {trans ? (
            <>
              <div className="container1">
                <div className="heading">Sign In</div>
                <div action="" className="form">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    className="input"
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    onKeyDown={handleKey}
                  />
                  <div className="flex  justify-between">
                    <span className="forgot-password">
                      <a href="#">Don't have account ?</a>{" "}
                      <span
                        onClick={() => setTrans(false)}
                        className="underline text-[#11a6d1]"
                      >
                        Sign Up
                      </span>
                    </span>
                    <span
                      className="forgot-password"
                      onClick={() => navigate("/fgpw")}
                    >
                      <p>Forgot Password ?</p>
                    </span>
                  </div>
                  <div
                    className="login-button flex justify-center"
                    onClick={handleLogin}

                    // disabled={isFetching}
                  >
                    {isLoading ? <div className="loader"></div> : "Sign in"}
                  </div>
                </div>
                <div className="social-account-container">
                  <span className="title">Or Sign in with</span>
                  <div className="social-accounts">
                    <button className="social-button google">
                      <svg
                        className="svg"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 488 512"
                      >
                        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                      </svg>
                    </button>
                    <button className="social-button apple">
                      <svg
                        className="svg"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 384 512"
                      >
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                      </svg>
                    </button>
                    <button className="social-button twitter">
                      <svg
                        className="svg"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <span className="agreement">
                  <a href="#">Learn user licence agreement</a>
                </span>
              </div>
            </>
          ) : (
            <div className="container1">
              <div className="heading">Sign Up</div>
              <div action="" className="form">
                <input
                  className="input"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="E-mail"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="input"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyRe}
                  placeholder="Password"
                />
                <input
                  className="input"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setComFirmPassword(e.target.value)}
                  placeholder="Confirm password"
                />

                <>
                  {comFirmPass == false ? (
                    <div className="flex  justify-between">
                      <span className="forgot-password">
                        <span
                          onClick={() => setTrans(true)}
                          className="text-red"
                        >
                          (*) Mật khẩu không trùng nhau
                        </span>
                      </span>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </>
                <div className="flex  justify-between">
                  <span className="forgot-password">
                    <a href="#">Already have a password!</a>{" "}
                    <span
                      onClick={() => setTrans(true)}
                      className="underline text-[#11a6d1]"
                    >
                      Sign up
                    </span>
                  </span>
                </div>
                <button
                  className="login-button flex justify-center"
                  onClick={handleRegister}
                >
                  {isLoading ? <div className="loader"></div> : "Sign up"}
                </button>
              </div>
              <div className="social-account-container">
                <span className="title">Or Sign in with</span>
                <div className="social-accounts">
                  <button className="social-button google">
                    <svg
                      className="svg"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 488 512"
                    >
                      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                    </svg>
                  </button>
                  <button className="social-button apple">
                    <svg
                      className="svg"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 384 512"
                    >
                      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path>
                    </svg>
                  </button>
                  <button className="social-button twitter">
                    <svg
                      className="svg"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                    >
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <span className="agreement">
                <a href="#">Learn user licence agreement</a>
              </span>
            </div>
          )}
        </>
      </div>
      <Toaster />
    </>
  );
};

export default Login;
