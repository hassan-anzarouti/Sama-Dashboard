import React, { useContext, useEffect } from "react";
import { Form, Input, Button, Image } from "antd";
import classes from "./style.module.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { HOME_PAGE } from "../paths";
import AuthContext from "../../contexts/auth/context";

const Login: React.FC = () => {
  const { actions, loading, isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    actions.login({ ...data });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(HOME_PAGE, { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Image
          preview={false}
          src={`/images/logo.png`}
          width={100}
          alt={"logo"}
          style={{ marginBottom: "1rem" }}
        />
        <span
          dir="rtl"
          style={{
            position: "relative",
            color: "black",
            fontSize: "1.5rem",
            top: "5px",
            right: "0px",
            fontWeight: "600",
            margin: "0px 50px",
          }}
        >
          SAMA
        </span>
        <span
          style={{
            color: "black",
            opacity: "0.5",
            position: "relative",
            top: "5px",
            right: "7px",
            fontSize: "0.7rem",
            fontWeight: "400",
          }}
        >
          لوحة التحكم
        </span>
        <Form
          layout="vertical"
          onFinish={onSubmit}
          className={classes.form}
          aria-autocomplete="none"
          scrollToFirstError
          autoComplete="none"
          validateMessages={{
            required: "هذا الحقل مطلوب",
          }}
        >
          <Form.Item
            name="employee_name"
            label="اسم المستخدم"
            rules={[
              {
                type: "string",
              },
              {
                required: true,
              },
            ]}
          >
            <Input
              type="text"
              className={classes.input}
              prefix={<UserOutlined className={classes.prefixIcon} />}
              placeholder="اسم المستخدم"
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: "1rem" }}
            label="كلمة السر"
            name="password"
            rules={[
              {
                required: true,
              },
              {
                max: 32,
                message: "كلمة السر غير صحيحة",
              },
            ]}
          >
            <Input.Password
              className={classes.input}
              prefix={<LockOutlined className={classes.prefixIcon} />}
              placeholder="password"
            />
          </Form.Item>

          <Form.Item
            style={{ padding: "0", margin: "0" }}
            className={classes.footer}
          >
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              className={styles.submitButton}
              loading={loading.includes("login")}
            >
              تسجيل الدخول
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
