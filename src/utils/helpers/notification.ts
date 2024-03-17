import { notification } from "antd";

export const errorNotification = (message: string, description?: string) => {
  return notification.error({
    message: message,
    description: description,
    placement: "bottomLeft",
    style: { direction: "rtl" },
  });
};

export const successNotification = (message: string, description?: string) => {
  return notification.success({
    message: message,
    description: description,

    placement: "bottomLeft",
    style: { direction: "rtl" },
  });
};
