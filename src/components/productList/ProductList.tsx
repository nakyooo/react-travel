import {FC} from "react";
import { Link,useNavigate} from "react-router-dom";
import { List, Rate, Image, Tag, Typography } from "antd";


const { Text } = Typography;


interface Product {
  id: string;
  attributes:{
    title: string;
    description: string;
    price: number;
    originalPrice: number;
    discountPresent: number;
    rating: number;
    travelDays: string;
    tripType: string;
    departureCity: string;
    touristRoutePictures:string;
  }
}
interface PropsType {
  data: Product[];
}

const listData = (productList: Product[]) =>
  productList?.map((p) => ({
    id: p.id,
    title: p.attributes.title,
    description: p.attributes.description,
    tags: (
      <>
        {p.attributes.departureCity && <Tag color="#f50">{p.attributes.departureCity}出发</Tag>}
        {p.attributes.travelDays && <Tag color="#108ee9">{p.attributes.travelDays} 天 </Tag>}
        {p.attributes.discountPresent && <Tag color="#87d068">超低折扣</Tag>}
        {p.attributes.tripType && <Tag color="#2db7f5">{p.attributes.tripType}</Tag>}
      </>
    ),
    imgSrc: p.attributes.touristRoutePictures,
    price: p.attributes.price,
    originalPrice: p.attributes.originalPrice,
    discountPresent: p.attributes.discountPresent,
    rating: p.attributes.rating,
  }));


export const ProductList: FC<PropsType> = ({data}) => {
  const nav=useNavigate()
  const products = listData(data);
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
      }}
      dataSource={products}
      footer={
        <div>
          搜索总路线: <Text strong>{products?.length || 0}</Text> 条
        </div>
      }
      renderItem={(item) => (
        <List.Item
          key={item.title}
          actions={[
            <>
              <Rate defaultValue={item.rating} />
              <Text strong className="ant-rate-text">
                {item.rating}
              </Text>
            </>,
          ]}
          extra={
            <Image width={272} height={172} alt="image" src={item.imgSrc} onClick={()=>{nav(`/detail/${item.id}`)}}/>
          }
        >
          <List.Item.Meta
            title={
              <>
                {item.discountPresent ? (
                  <>
                    <Text style={{ fontSize: 20, fontWeight: 400 }} delete>
                      ¥ {item.originalPrice}
                    </Text>
                    <Text
                      type="danger"
                      style={{ fontSize: 20, fontWeight: 400 }}
                    >
                      {" "}
                      ¥ {item.price}
                    </Text>
                  </>
                ) : (
                  <Text style={{ fontSize: 20, fontWeight: 400 }}>
                    ¥ {item.price}
                  </Text>
                )}
                <Link to={"/detail/" + item.id}> {item.title}</Link>
              </>
            }
            description={item.tags}
          />
          {item.description}
        </List.Item>
      )}
    />
  );
};
