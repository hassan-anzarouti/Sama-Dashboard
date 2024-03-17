import { Button, ButtonProps, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined, QuestionCircleTwoTone } from "@ant-design/icons";

import { TooltipPlacement } from "antd/es/tooltip";

interface Props extends ButtonProps {
  onConfirm: () => void;
  placement?: TooltipPlacement;
}

const DeleteBtn: React.FC<Props> = ({ onConfirm, ...props }) => {
  return (
    <Popconfirm
      title={"تأكيد الحذف"}
      okText="تأكيد"
      cancelText="الغاء"
      placement={props.placement}
      okButtonProps={{ danger: true, loading: props.loading }}
      icon={<QuestionCircleTwoTone twoToneColor="red" />}
      onConfirm={onConfirm}
    >
      <Tooltip title={"حذف"}>
        <Button
          type="primary"
          danger
          shape="circle"
          icon={<DeleteOutlined />}
          {...props}
        />
      </Tooltip>
    </Popconfirm>
  );
};

export default DeleteBtn;
