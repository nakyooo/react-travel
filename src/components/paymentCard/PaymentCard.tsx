import { FC} from "react";
import {
  Skeleton,
  Card,
  Button,
  Typography,
  Table,
} from "antd";
import { DeleteOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import {Mask} from '../mask';
import {Portal} from '../portal';
import {useSelector} from '../../redux/hooks'
import {useDispatch} from 'react-redux'
import {changeCheck} from '../../redux/shoppingCart/ShoppingCartSlice'

const { Meta } = Card;
const { Title, Text } = Typography;

interface Item {
  key: number;
  item: string;
  amount: string | number | JSX.Element;
}

const columns: ColumnsType<Item> = [
  {
    title: "项目",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "金额",
    dataIndex: "amount",
    key: "amount",
  },
];

interface PropsType {
  loading: boolean;
  originalPrice: number;
  price: number;
  onShoppingCartClear: () => void;
  onCheckout: () => void;
}

export const PaymentCard: FC<PropsType> = ({
  loading,
  originalPrice,
  price,
  onShoppingCartClear,
  onCheckout,
}) => {
  const paymentData: Item[] = [
    {
      key: 1,
      item: "原价",
      amount: <Text delete>¥ {originalPrice ||0}</Text>,
    },
    {
      key: 3,
      item: "现价",
      amount: (
        <Title type="danger" level={2}>
          ¥ {price || 0}
        </Title>
      ),
    },
  ];
  const {checkClean} = useSelector(state=>state.ShoppingCart)
  const dispatch = useDispatch()
  const refirmDelete=()=>{
    dispatch(changeCheck(true));
  }
  const cancelDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (checkClean) {
      dispatch(changeCheck(false));
    }
  };
  const onConfirm=(e: React.MouseEvent<HTMLDivElement>)=>{
    onShoppingCartClear();
    e.stopPropagation();
    if (checkClean) {
      dispatch(changeCheck(false));
    }
  }
  return (
    <>
    <Card
      style={{ width: 300, marginTop: 16 }}
      actions={[
        <Button type="primary" danger onClick={onCheckout} loading={loading}>
          <CheckCircleOutlined />
          下单支付
        </Button>,
        // <Button onClick={onShoppingCartClear} loading={loading}>
        <Button onClick={refirmDelete} loading={loading}>
          <DeleteOutlined />
          清空
          <Portal selector="#root">{checkClean&&<Mask onCancel={cancelDelete} onConfirm={onConfirm}/>}</Portal>
        </Button>,
      ]}
    >
      <Skeleton loading={loading} active>
        <Meta
          title={<Title level={2}>总计</Title>}
          description={
            <Table<Item>
              columns={columns}
              dataSource={paymentData}
              showHeader={false}
              size="small"
              bordered={false}
              pagination={false}
            />
          }
        />
      </Skeleton>
    </Card>
    </>
  );
};
