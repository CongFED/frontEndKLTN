import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";
import { RecoilRoot } from "recoil";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// import { AuthContextProvider } from "src/context/AuthContext";
// import { ChatContextProvider } from "src/context/ChatContext";
root.render(
  // <AuthContextProvider>
  //   <ChatContextProvider>
  <Provider store={store}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </Provider>
  //   </ChatContextProvider>
  // </AuthContextProvider>
);
