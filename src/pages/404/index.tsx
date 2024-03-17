import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import ErrorLayout from "../../components/general/layout/error-layout";

interface Props {}

const Error404: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  return (
    <ErrorLayout>
      <Result
        status="404"
        title="404"
        subTitle={"الصفححة غير موجودة"}
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate("/");
            }}
          >
            العودة الى الصفحة الرئيسية
          </Button>
        }
      />
    </ErrorLayout>
  );
};

export default Error404;
