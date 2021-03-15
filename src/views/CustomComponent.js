import { notification } from "antd";

export const notify = {
  success: (message, description = null) => {
    notification.success({
      message,
      description,
      top: 100,
      style: { backgroundColor: "#efffe2" },
    });
  },
  error: (message, description) => {
    notification.error({
      message,
      description,
      top: 100,
      style: { backgroundColor: "#ffb5b5" },
    });
  },
};
