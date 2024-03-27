import React, { useContext, useEffect, useState } from "react";
import { Drawer, Button, Image, Popover, Avatar, Badge, Flex } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import "./style.css";
import MenuSide from "../menu";
// import ProfileCard from "../../../auth/profile-card";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AppContext from "../../../../contexts/app/context";
import AuthContext from "../../../../contexts/auth/context";
import { UserOutlined } from "@ant-design/icons";
import ProfileCard from "../../../auth/profile-card";

const NavBar = () => {
  const { screenSize } = useContext(AppContext);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (screenSize === "laptopOrDesktop" || screenSize === "mobileOrTablet") {
      setVisible(false);
    }
  }, [screenSize]);

  // User Popover
  const [userPopoverVisible, setUserPopoverVisible] = useState(false);

  // Auth context
  const { authUser: user } = useContext(AuthContext);

  return (
    <nav className="navbar" dir="rtl">
      <Button
        className="menu"
        type="primary"
        style={{ marginInlineStart: "0.8rem" }}
        icon={<MenuOutlined />}
        onClick={() => setVisible(true)}
      />

      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.2rem",
          }}
        >
          <span className="bell-icon-tablet">
            {/* <FiBell
              color="white"
              size="20"
              onClick={() => {
                navigate("/notifications");
              }}
            /> */}
          </span>

          <Popover
            trigger="click"
            open={userPopoverVisible}
            onOpenChange={setUserPopoverVisible}
            placement="bottomRight"
            content={
              <ProfileCard toogleUserPopoverVisible={setUserPopoverVisible} />
            }
          >
            <div className={"avatarContainer"}>
              <Avatar
                size="large"
                src={
                  user?.photo?.url ?? (
                    <UserOutlined style={{ fontSize: "1.5rem" }} />
                  )
                }
              />

              <div className={"username"}>
                <div dir="rtl">{`${
                  user?.EmployeeName ?? "Administrator"
                }`}</div>
                <small dir="rtl" style={{ opacity: "0.5" }}>
                  {`${user?.FullName ?? "email"}`}
                </small>
              </div>
            </div>
          </Popover>
        </div>
      </div>

      <Drawer
        title={
          <Flex justify="space-between" align="center">
            <Image
              preview={false}
              src={`/images/logo.png`}
              width={60}
              alt={"logo"}
              style={{ marginBottom: "1rem" }}
            />
            <span
              dir="rtl"
              style={{
                color: "white",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              SAMA
            </span>
            <span
              style={{
                color: "white",
                opacity: "0.5",
                fontSize: "0.895rem",
                fontWeight: "400",
                position: "relative",
                right: "5px",
              }}
            >
              لوحة التحكم
            </span>
          </Flex>
        }
        headerStyle={{
          backgroundColor: "#c6e1fa",
          color: "white",
          placeItems: "flex-end",
        }}
        closable={false}
        placement="right"
        className="drawer"
        width={"17.5rem"}
        bodyStyle={{ padding: 0, backgroundColor: "#c6e1fa" }}
        onClose={() => setVisible(false)}
        open={visible}
        footerStyle={{
          backgroundColor: "#c6e1fa",
          color: "white",
        }}
        footer={
          <>
            <h5
              style={{
                opacity: "0.8",
              }}
            >
              SAMA
            </h5>
            <h5 style={{ opacity: "0.7" }}>الحفوق محفوظة © 2024</h5>
          </>
        }
      >
        <MenuSide />
      </Drawer>
    </nav>
  );
};
export default NavBar;
