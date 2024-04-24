import styles from './SignInForm.module.css'
import { Button, Checkbox, Form, Input } from 'antd';
import {FC, useEffect, useMemo} from 'react';
import {SignIn} from '../../redux/user/UserSlice'
import {useDispatch} from 'react-redux'
import {useSelector} from '../../redux/hooks'
import {useNavigate, Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

export const SignInForm: FC = () => {
  const {t} = useTranslation()
  const {token, error} = useSelector(state=>state.User)
  const memoizedToken = useMemo(() => token, [token])
  const dispatch = useDispatch()
  const nav=useNavigate()

  useEffect(()=>{
    if(memoizedToken!==null)
    nav('/')
  },[memoizedToken])

  const onFinish = (values: any) => {
    // console.log('Success:', values);
      dispatch(SignIn({
      email:values.email,
      password:values.password
    }) as any)
    
    if(error)
    {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log('Failed:', errorInfo);
  };


  return (
    <>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles['register-form']}
    >

      <Form.Item
        name="email"
        label={t("register.email")}
        rules={[
          {
            type: 'email',
            message: '请输入有效邮箱',
          },
          {
            required: true,
            message: '请输入邮箱',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={t("register.password")}
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>{t("register.remember_me")}</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
        {t("register.signin")}
        </Button>
      </Form.Item>
    </Form><Link to='/register'>{t("register.no_id")}</Link>
    </>
  );
};
