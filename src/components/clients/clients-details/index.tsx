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
import ClientContext from "../../../contexts/clients/context";
import ClientContextProvider from "../../../contexts/clients/provider";

interface Props {}

const ClientDetails: React.FC<Props> = () => {
  const { details, actions, loading } = useContext(ClientContext);
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
      <PageHeader title={"تفاصيل العميل"} subTitle={"تفاصيل العميل المحدد"} />
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
                  {details?.CustNo}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"اسم العميل"}>
                  {details?.customername}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"النوع"}>
                  {details?.type}
                </AntdDescriptions.Item>

                <AntdDescriptions.Item label={"التاريخ"}>
                  {details?.ACDate}
                </AntdDescriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

const ClientDetailsPage = () => {
  return (
    <ClientContextProvider>
      <ClientDetails />
    </ClientContextProvider>
  );
};
export default ClientDetailsPage;
