import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import { publicRoutes } from "./routes";
import Logo2 from "../src/assets/LogoLoad.png";
import Logo from "../src/assets/LogoSN.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../src/redux/store";
import VerifyCode from "./pages/VerifyCode/VerifyCode";
import AddInfo from "./pages/AddInfo/AddInfo";
import { Toaster } from "react-hot-toast";
import BadNotFound from "./components/BadNotFound/BadNotFound";
import Chat from "./pages/Chat/Chat";
import Register from "./pages/Register/Register";
import Personal from "./pages/Personal/Personal";
// import { Toaster } from "react-hot-toast";
// import { successToast } from "./utils/getToast";
function App() {
  const [loading, setLoading] = useState(true);
  const { info, isLoading, isError, error } = useSelector(
    (state: RootState) => state.info
  );
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Kết thúc trạng thái loading
    }, 3000);
  }, []);
  return (
    <>
      {loading ? (
        <div
          className="duration-700 transition-all fixed w-full bottom-0 overflow-hidden z-[9999999]"
          style={{
            height: "100vh",
            width: "100vw",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={Logo2} style={{ height: "300px", width: "300px" }} alt="" />

          <div
            className="loader2"
            style={{
              position: "absolute",

              bottom: "30px",
            }}
          ></div>
        </div>
      ) : (
        <>
          <Router>
            <div className="App ">
              <Routes>
                <Route
                  path="/login"
                  element={<Login />}
                  //  element={currentUser ? <Navigate to="/" /> : <Login />}
                />
                <Route
                  path="/register"
                  element={<Register />}
                  //  element={currentUser ? <Navigate to="/" /> : <Login />}
                />
                <Route path="/verify" element={<VerifyCode />} />

                <Route path="/chat" element={<Chat />} />
                <Route path="/add-info" element={<AddInfo />} />
                <Route path="/bad-not-found" element={<BadNotFound />} />

                {publicRoutes.map((publicRoute, index) => {
                  const Layout = publicRoute.layout;

                  const Page = publicRoute.component;

                  return (
                    <Route
                      key={index}
                      path={publicRoute.path}
                      element={
                        <Layout>
                          <Page />
                        </Layout>
                      }
                    />
                  );
                })}
              </Routes>{" "}
            </div>
          </Router>
        </>
      )}
      <Toaster />
    </>
  );
}

export default App;
