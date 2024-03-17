import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "antd";
import { ErrorMessage } from "@hookform/error-message";

import styles from "./style.module.scss";
import FormItem from "../../general/form-item";

const ChangePasswordForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useFormContext();
  const onSubmit = async (data: any) => {};
  return (
    <>
      {/* Old Password */}
      <FormItem label={"كلمة السر القديمة"}>
        <Controller
          render={({ field }) => {
            return <Input type="password" {...field} />;
          }}
          name="oldPassword"
          control={control}
          rules={{
            required: `هذا الحقل مطلوب`,
            minLength: {
              value: 6,
              message: "كلمة السر يجب ان تتالف من 6 حروف",
            },
          }}
        />
        <ErrorMessage
          errors={errors}
          name="oldPassword"
          render={({ message }) => <p className={styles.alert}>{message}</p>}
        />
      </FormItem>
      {/* </FormItem> */}

      {/* New Password */}
      <FormItem label={"كلمة السر الجديدة"}>
        <Controller
          control={control}
          name="password"
          render={({ field }) => {
            return <Input type="password" {...field} />;
          }}
          rules={{
            required: `هذا الحقل مطلوب`,
            minLength: {
              value: 6,
              message: "كلمة السر يجب أن تتألف من 6 حروف",
            },
            maxLength: {
              value: 32,
              message: "كلمة السر لا يجب أن تتعدى الـ 32 حرف",
            },
          }}
        />

        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p className={styles.alert}>{message}</p>}
        />
      </FormItem>

      {/* Confirm New Password */}
      <FormItem label={"تأكيد كلمة السر الجديدة"}>
        <Controller
          render={({ field }) => {
            return <Input type="password" {...field} />;
          }}
          name="confirmPassword"
          control={control}
          rules={{
            required: `هذا الحقل مطلوب`,
            minLength: {
              value: 6,
              message: "كلمة السر يجب أن تتألف من 6 حروف",
            },
            maxLength: {
              value: 32,
              message: "كلمة السر لا يجب أن تتعدى الـ 32 حرف",
            },
            validate: (value) => {
              return (
                value === getValues("password") ||
                `لم يتم التطابق مع كلمة السر الجديدة`
              );
            },
          }}
        />

        <ErrorMessage
          errors={errors}
          name="confirmPassword"
          render={({ message }) => <p className={styles.alert}>{message}</p>}
        />
      </FormItem>
    </>
  );
};

export default ChangePasswordForm;
