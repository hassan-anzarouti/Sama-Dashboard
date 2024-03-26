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
import SalesRepContext from "../../../contexts/salesRep/context";
import SalesRepContextProvider from "../../../contexts/salesRep/provider";

interface Props {}

const SalesRepDetails: React.FC<Props> = () => {
  const { details, actions, loading } = useContext(SalesRepContext);
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
      <PageHeader title={"تفاصيل المندوب"} subTitle={"تفاصيل المندوب المحدد"} />
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
                  {details?.RepNo}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"اسم المندوب"}>
                  {details?.SalesRepName}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"الهاتف"}>
                  {details?.Phone}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"تغطية المناطق"}>
                  {details?.CoveredRegions}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"SRSN"}>
                  {details?.SRSN}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"كلمة المرور"}>
                  {details?.SRpwd}
                </AntdDescriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

const SalesRepDetailsPage = () => {
  return (
    <SalesRepContextProvider>
      <SalesRepDetails />
    </SalesRepContextProvider>
  );
};
export default SalesRepDetailsPage;
