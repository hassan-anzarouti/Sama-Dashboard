import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/auth/provider";
import AppContextProvider from "./contexts/app/provider";
import { ConfigProvider } from "antd";
import arEG from "antd/locale/ar_EG";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AppContextProvider>
          <ConfigProvider
            direction="rtl"
            locale={arEG}
            theme={{
              components: {
                DatePicker: {
                  colorLink: "#F5DEB4",
                  colorLinkHover: "#7E4F25",
                  // cellActiveWithRangeBg: "lightgrey",
                },
              },
              token: {
                colorPrimary: "#1DA1F2",
                colorTextSecondary: "#17427A",

                fontFamily: "Cairo",
              },
            }}
          >
            <App />
          </ConfigProvider>
        </AppContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
