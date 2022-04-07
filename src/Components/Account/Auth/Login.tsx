import React from "react";
import { Navigate, NavLink, } from "react-router-dom";
import {login} from "../../../Redux/Reducers/LoginReducer"
import { useDispatch, useSelector } from "react-redux";
import style from './Login.module.css'
import NoConnection from "../../Error/NoConnection";
import Preloader from "../../Preloader/Preloader";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; 
import { AppStateType } from "../../../Redux/Store";

const Login:React.FC = () => {
    const dispatch=useDispatch()
    const preloader=useSelector((State:AppStateType)=>State.loginPage.preloader);
    const error=useSelector((State:AppStateType)=>State.loginPage.error);
    const onFinish = (values:{username:string,password:string}) => {
        dispatch(login( values.username,
            values.password));
    };
    if (preloader) {
        return <Preloader/>
    }
    if (error) {
        return  <NoConnection/>
    }
    return (
            <div className={style.Login}>
                {sessionStorage.getItem('Auth') && <Navigate to='New'/>}
                <h1 className={style.LoginName}>Авторизация</h1>
                <div className={style.LoginPage}>
                 <Form name="login" onFinish={onFinish} className={style.login_form}>
                    <Form.Item name="username" className={style.formItem}  rules={[{required: true, message: 'Please input your Username!',},]}>        
                            <Input size="large" prefix={<UserOutlined/>}  placeholder="Username" />
                    </Form.Item><br/>
                    <Form.Item name="password"  rules={[{required: true,message: 'Please input your Password!',},]}>
                            <Input size="large" prefix={<LockOutlined/>}  type="password" placeholder="Password"/>
                     </Form.Item>
                        <Form.Item>
                                <Button type="primary" htmlType="submit" >
                                 Войти
                                </Button>
                        </Form.Item>
                </Form>
                </div><br/>
                <div className={style.RegistrationPage}>
                    У вас еще нет аккаунта? <br/><NavLink to='/Registration'>Зарегистрироваться</NavLink>
                </div>
            </div>
    )
}

export default Login