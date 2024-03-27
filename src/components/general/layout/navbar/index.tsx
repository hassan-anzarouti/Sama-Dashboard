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

      <img width={70} style={{ objectFit: "contain" }} src="/images/logo.png" />

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
                    <UserOutlined
                      style={{
                        fontSize: "2.0rem",
                        backgroundColor: "lightgray",
                        borderRadius: "999px",
                      }}
                    />
                  )
                }
                // className={styles.avatar}
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
          <Flex justify="center" align="center">
            <Image
              preview={false}
              src={`/images/logo.png`}
              width={70}
              alt={"logo"}
              style={{ marginBottom: "1rem" }}
            />
          </Flex>
        }
        headerStyle={{
          backgroundColor: "white",
          color: "#171A1D",
          placeItems: "flex-end",
        }}
        closable={false}
        placement="right"
        className="drawer"
        width={"17.5rem"}
        bodyStyle={{ padding: 0, backgroundColor: "white" }}
        onClose={() => setVisible(false)}
        open={visible}
        footerStyle={{
          backgroundColor: "white",
          color: "#171A1D",
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
