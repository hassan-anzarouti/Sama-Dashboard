import { useContext, useState } from "react";
import { Avatar, Badge, Layout, Menu, Popover } from "antd";
import "./style.css";
import MenuSide from "../menu";
import { UserOutlined } from "@ant-design/icons";
// import ProfileCard from "../../../auth/profile-card";
import { FiBell } from "react-icons/fi";
import AppContext from "../../../../contexts/app/context";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../../contexts/auth/context";
import ProfileCard from "../../../auth/profile-card";

const SideBar = () => {
  const navigate = useNavigate();
  const { screenSize } = useContext(AppContext);

  const [collapsed, setCollapsed] = useState(false);

  // User Popover
  const [userPopoverVisible, setUserPopoverVisible] = useState(false);

  // Auth context
  const { authUser: user } = useContext(AuthContext);

  return (
    <Layout.Sider
      className="sidebar"
      width={"17.5rem"}
      theme="light"
      collapsed={screenSize === "mobileOrTablet" || collapsed}
      collapsible={screenSize !== "mobileOrTablet"}
      onCollapse={setCollapsed}
      trigger={null}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <a
            style={{
              marginBottom: "2px",
              padding: "0.5rem",
              display: "flex",
              justifyContent: "center",
              textAlign: screenSize === "mobileOrTablet" ? "center" : "initial",
              width: "100%",
            }}
          >
            <img
              width={60}
              style={{ objectFit: "contain" }}
              src="/images/logo.png"
            />
            {screenSize !== "mobileOrTablet" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                  gap: "4px",
                }}
              >
                <div className="logo-title">SAMA</div>
                <div
                  style={{
                    color: "white",
                    opacity: "0.5",
                    fontSize: "0.7rem",
                    fontWeight: "400",
                  }}
                >
                  لوحة التحكم
                </div>
              </div>
            ) : (
              ""
            )}
          </a>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent:
                  screenSize !== "mobileOrTablet" ? "space-between" : "center",
                alignItems: "center",
              }}
            >
              <Popover
                trigger="click"
                open={userPopoverVisible}
                onOpenChange={setUserPopoverVisible}
                placement="bottomLeft"
                content={
                  <ProfileCard
                    toogleUserPopoverVisible={setUserPopoverVisible}
                  />
                }
              >
                <div className={"avatarContainer"}>
                  <Avatar
                    size="large"
                    src={
                      user?.photo?.url ?? (
                        <UserOutlined
                          style={{
                            fontSize: "1.5rem",
                            // backgroundColor: "lightgray",
                            borderRadius: "999px",
                          }}
                        />
                      )
                    }
                  />

                  {screenSize !== "mobileOrTablet" && (
                    <div className={"username"}>
                      <div dir="ltr">{`${user?.EmployeeName ?? "Admin"}`}</div>
                      <small style={{ opacity: "0.5" }}>
                        {`${user?.FullName ?? "admin"}`}
                      </small>
                    </div>
                  )}
                </div>
              </Popover>
              {screenSize !== "mobileOrTablet" && (
                <div className="bell-icon">
                  {/* <FiBell
                    color="white"
                    size="20"
                    onClick={() => {
                      navigate("/notifications");
                    }}
                  /> */}
                </div>
              )}
            </div>
          </div>
          {screenSize === "mobileOrTablet" && (
            <div className="bell-icon-tablet">
              {/* <FiBell
                color="white"
                size="20"
                onClick={() => {
                  navigate("/notifications");
                }}
              /> */}
            </div>
          )}
          <MenuSide />
        </div>
        {/* Footer */}
        <div style={{ color: "white", textAlign: "center" }}>
          <h5
            style={{
              opacity: "0.8",
            }}
          >
            SAMA
          </h5>
          <h5 style={{ opacity: "0.7" }}>الحقوق محفوظة © 2024</h5>
        </div>
      </div>
    </Layout.Sider>
  );
};
export default SideBar;
