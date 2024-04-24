import styles from './mask.module.css';
import {Button,Typography} from "antd";

type propsType={
  onCancel:(event: React.MouseEvent<HTMLDivElement>) => void;
  onConfirm:(event: React.MouseEvent<HTMLDivElement>) => void;
}

export const Mask = (props:propsType)=>{

  return (
    <div className={styles.mask}>
      <div className={styles.container}>
        <Typography.Paragraph strong className={styles.text}>是否确认清空？</Typography.Paragraph>
        <div className={styles.buttonContainer}>
          <Button type="primary" danger onClick={props.onConfirm}>
            确定
          </Button>
          <Button onClick={props.onCancel}>
            取消
          </Button>
        </div>
      </div>
    </div>
  )

}
