import { Button, ButtonProps, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";

interface Props extends ButtonProps {
  reports?: boolean;
}

const ViewBtn: React.FC<Props> = (props) => {
  return (
    <Tooltip title={props.reports ? "التقارير" : "عرض"}>
      <Button shape="circle" icon={<EyeOutlined />} {...props} />
    </Tooltip>
  );
};

export default ViewBtn;
