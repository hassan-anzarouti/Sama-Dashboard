import React, { useContext, useState } from "react";
import { Avatar, Button, Divider, Modal, Row, message } from "antd";
import {
  PoweroffOutlined,
  LockOutlined,
  EditOutlined,
  UserOutlined,
} from "@ant-design/icons";

import styles from "./style.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import ChangePasswordForm from "../../general/change-password-form";
import { errorNotification } from "../../../utils/helpers/notification";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../contexts/auth/context";

interface IProps {
  toogleUserPopoverVisible: (visible: boolean) => void;
}

const ProfileCard: React.FC<IProps> = ({ toogleUserPopoverVisible }) => {
  const { actions, loading, authUser: user } = useContext(AuthContext);

  const [changePasswordVisible, setChangePasswordVisible] = useState(false);

  const [isChangePasswordModalVisible, setIsChangedPasswordModalVisible] =
    useState(false);

  const showChangePasswordModal = () => {
    setIsChangedPasswordModalVisible(true);
  };

  const handleChangePasswordOk = () => {
    setIsChangedPasswordModalVisible(false);
  };

  const handleChangePasswordCancel = () => {
    setIsChangedPasswordModalVisible(false);
  };

  const methods = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await actions.changePassword({
        password: data.password,
        oldPassword: data.oldPassword,
      });
    } catch (err) {}
  };

  return (
    <div>
      <div>
        <Row className={styles.contentContainer} align="middle">
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
            className={styles.avatar}
          />
          <div>
            <div>{`${user?.EmployeeName ?? "Administrator"}`}</div>
            <small>{`${user?.FullName}`}</small>
          </div>
        </Row>
      </div>
      <Divider className={styles.divider} />
      <div>
        <div>
          <Button
            className={styles.button}
            type="text"
            onClick={() => {
              // Open Change Password Modal
              setIsChangedPasswordModalVisible(true);
              toogleUserPopoverVisible(false);
            }}
            size="small"
            icon={<LockOutlined />}
          >
            تغيير كلمة السر
          </Button>
        </div>

        <div>
          <Button
            className={styles.button}
            type="text"
            onClick={() => {
              navigate(`profile`);
            }}
            size="small"
            icon={<EditOutlined />}
            loading={loading.includes("logout")}
          >
            تعديل الحساب
          </Button>
        </div>

        <div>
          <Button
            className={styles.button}
            type="text"
            onClick={() => {
              actions.logout();
            }}
            size="small"
            icon={<PoweroffOutlined />}
            loading={loading.includes("logout")}
          >
            تسجيل الخروج
          </Button>
        </div>
      </div>
      <Modal
        title={<span>تغيير كلمة السر</span>}
        open={isChangePasswordModalVisible}
        onOk={methods.handleSubmit(onSubmit)}
        onCancel={handleChangePasswordCancel}
        okText={"تغيير كلمة السر وتسجيل الخروج"}
        cancelText="الغاء"
        confirmLoading={loading.includes("change_password")}
      >
        <FormProvider {...methods}>
          <ChangePasswordForm />
        </FormProvider>
      </Modal>
    </div>
  );
};

export default ProfileCard;
