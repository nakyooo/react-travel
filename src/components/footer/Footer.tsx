import {FC} from "react";
import { Layout, Typography} from "antd"
import {useTranslation} from 'react-i18next'
export const Footer:FC=()=>{
  const {t} = useTranslation()
  return (
    <Layout.Footer>
    <Typography.Title level={3} style={{textAlign:'center'}}>
      {t("footer.detail")}
    </Typography.Title>
  </Layout.Footer>
  )
}