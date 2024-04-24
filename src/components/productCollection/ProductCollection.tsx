import {FC} from 'react'
import styles from './ProductCollection.module.css'
import { Row, Col, Divider} from 'antd'
import {ProductImage} from './ProductImage'

interface PropsType {
  title: JSX.Element
  sideImage: string
  products: any[]
}

export const ProductCollection:FC<PropsType>=({title, sideImage, products})=>{
  return (
    <div className={styles.content}>
      <Divider orientation='left'>{title}</Divider>
      <Row>
        <Col span={4}>
          <img src={sideImage} className={styles['side-image']} alt="" />
        </Col>
        <Col span={20}>
          <Row>
            <Col span={12}>
              <ProductImage
                 id={products[0].id}
                 size={"large"}
                 title={products[0].attributes.title}
                 imageSrc={products[0].attributes.touristRoutePictures}
                 price={products[0].attributes.price}
              />
            </Col>
            <Col span={12}>
              <Row>
                <Col span={12}>
                <ProductImage
                 id={products[1].id}
                 size={"small"}
                 title={products[1].attributes.title}
                 imageSrc={products[1].attributes.touristRoutePictures}
                 price={products[1].attributes.price}
              />
                </Col>
                <Col span={12}>
                <ProductImage
                 id={products[2].id}
                 size={"small"}
                 title={products[2].attributes.title}
                 imageSrc={products[2].attributes.touristRoutePictures}
                 price={products[2].attributes.price}
              />
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                <ProductImage
                 id={products[3].id}
                 size={"small"}
                 title={products[3].attributes.title}
                 imageSrc={products[3].attributes.touristRoutePictures}
                 price={products[3].attributes.price}
              />
                </Col>
                <Col span={12}>
                <ProductImage
                 id={products[4].id}
                 size={"small"}
                 title={products[4].attributes.title}
                 imageSrc={products[4].attributes.touristRoutePictures}
                 price={products[4].attributes.price}
              />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
            <ProductImage
                 id={products[5].id}
                 size={"small"}
                 title={products[5].attributes.title}
                 imageSrc={products[5].attributes.touristRoutePictures}
                 price={products[5].attributes.price}
              />
            </Col>
            <Col span={6}>
            <ProductImage
                 id={products[6].id}
                 size={"small"}
                 title={products[6].attributes.title}
                 imageSrc={products[6].attributes.touristRoutePictures}
                 price={products[6].attributes.price}
              />
            </Col>
            <Col span={6}>
            <ProductImage
                 id={products[7].id}
                 size={"small"}
                 title={products[7].attributes.title}
                 imageSrc={products[7].attributes.touristRoutePictures}
                 price={products[7].attributes.price}
              />
            </Col>
            <Col span={6}>
            <ProductImage
                 id={products[8].id}
                 size={"small"}
                 title={products[8].attributes.title}
                 imageSrc={products[8].attributes.touristRoutePictures}
                 price={products[8].attributes.price}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}