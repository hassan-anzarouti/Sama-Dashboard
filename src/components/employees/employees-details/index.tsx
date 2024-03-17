import {
  Col,
  Descriptions as AntdDescriptions,
  Descriptions,
  Image,
  Row,
  Spin,
  Tag,
} from "antd";
import { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import PageHeader from "../../general/page-header";
import styles from "./style.module.scss";
import EmployeeContext from "../../../contexts/employees/context";
import EmployeeContextProvider from "../../../contexts/employees/provider";

interface Props {}

const EmployeeDetails: React.FC<Props> = () => {
  const { details, actions, loading } = useContext(EmployeeContext);
  const { id } = useParams();
  const { state } = useLocation();

  useEffect(() => {
    const getDetails = async () => {
      id && (await actions.getDetails(state));
    };
    getDetails();
  }, []);

  return (
    <>
      <PageHeader title={"تفاصيل الموظف"} subTitle={"تفاصيل الموظف المحدد"} />
      <div className={styles.container}>
        {loading.includes("details") ? (
          <div className={styles.spinner}>
            <div>
              <Spin />
            </div>
          </div>
        ) : (
          <Row gutter={[12, 12]}>
            <Col span={24}>
              <Descriptions size="middle" column={1} bordered>
                <AntdDescriptions.Item label={"المعرف"}>
                  {details?.EmployeeID}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"اسم الموظف"}>
                  {details?.EmployeeName}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"الاسم الكامل"}>
                  {details?.EmployeeName}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"كلمة المرور"}>
                  {details?.Password}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"الصلاحية"}>
                  {details?.Privilege}
                </AntdDescriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

const EmployeeDetailsPage = () => {
  return (
    <EmployeeContextProvider>
      <EmployeeDetails />
    </EmployeeContextProvider>
  );
};
export default EmployeeDetailsPage;
