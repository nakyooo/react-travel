import { Button, Form, Input } from 'antd';
import {FC} from 'react';
import styles from './RegisterForm.module.css'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import md5 from 'js-md5'

export const RegisterForm: FC = () => {
  const {t} = useTranslation()
  const nav= useNavigate()
  const onFinish = async(values: any) => {
    const salt = 'dhf8a9e7rh';
    
    // console.log('Success:', values);
    try{
      const {data:res} = await axios.post('http://localhost:1337/api/auth/local/register',{
        "email":values.email,
        "username":values.Username,
        "password":md5(values.Password+salt)
        // "password":values.Password
    })
        await axios.post('http://localhost:1337/api/shopping-carts',{
          "data": {
            "userId": res.user.id+'',
            "user": +res.user.id
          }
        })
        
    nav('/signIn')
    }catch(e:any){
      console.log(e);
      alert(t("register.register_failed"))
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
            message:'输入的邮箱不合法',
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
        name="Username"
        label={t("register.username")}
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="Password"
        label={t("register.password")}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item> 

      <Form.Item
        name="Confirm Password"
        label={t("register.confirm_password")}
        hasFeedback
        rules={[
          { required: true, message: '请输入确认密码' },
          (({getFieldValue})=>({
            validator(_,value){
              if(!value||getFieldValue("Password")===value)
              {
                return Promise.resolve()
              } 
              
              return Promise.reject("密码确认不一致")
            }
          }))
      ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
        {t("register.register")}
        </Button>
      </Form.Item>
    </Form>
    <Link to='/signIn'>{t("register.already_have_id")}</Link>
    </>
  );
};