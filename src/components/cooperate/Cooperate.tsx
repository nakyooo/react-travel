import {FC} from 'react'
import {Divider, Col, Row, Typography} from 'antd'
import image1 from '../../assets/images/facebook-807588_640.png'
import image2 from '../../assets/images/follow-826033_640.png'
import image3 from '../../assets/images/icon-720944_640.png'
import image4 from '../../assets/images/microsoft-80658_640.png'
import styles from './Cooperate.module.css'
import {useTranslation} from 'react-i18next'

export const Cooperate:FC=()=>{
  const {t} = useTranslation()
  return (
    <div>
      <Divider orientation='left'>
        <Typography.Title level={3}>{t("home_page.joint_venture")}</Typography.Title>
      </Divider>
      <Row>
        <Col span={6}>
          <img src={image1} alt='facebook合作商' className={styles.image} loading='lazy'/>
        </Col>
        <Col span={6}>
          <img src={image2} alt='ins合作商' className={styles.image} loading='lazy'/>
        </Col>
        <Col span={6}>
          <img src={image3} alt='youtube合作商' className={styles.image} loading='lazy'/>
        </Col>
        <Col span={6}>
          <img src={image4} alt='microsoft合作商' className={styles.image} loading='lazy'/>
        </Col>
      </Row>
    </div>
  )
}