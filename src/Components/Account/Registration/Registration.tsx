import React from "react";
import { Navigate, NavLink } from "react-router-dom";
import {Regist} from "../../../Redux/Reducers/RegistrationReducer"
import { useDispatch, useSelector } from "react-redux";
import style from './Registration.module.css'
import NoConnection from "../../Error/NoConnection";
import Preloader from "../../Preloader/Preloader";
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css'; 
import { AppStateType } from "../../../Redux/Store";
import { valuesRegType } from "../../../API/api";

const Registration:React.FC = () => {
    const dispatch = useDispatch();
    const isAuth=useSelector((State:AppStateType)=>State.regPage.isAuth);
    const error=useSelector((State:AppStateType)=>State.regPage.error);
    const preloader=useSelector((State:AppStateType)=>State.regPage.preloader);

    const onFinish = (values:valuesRegType) => {
        dispatch(Regist(values.email, 
            values.phone,
            values.fullname , 
            values.password,
            values.username ))
    }
    if (error) {
        return <NoConnection/>
    }
    if (preloader) {
        return <Preloader/>
    }
    return (
        <div className={style.Reg}>
            {isAuth && <Navigate to='/'/>}
           <h1 className={style.RegName}>Регистрация</h1>
            <div className={style.RegPage}><br/>
             <Form name="Registration" onFinish={onFinish} >
                    <Form.Item name="email"  rules={[{required: true, message: 'Please input your E-mail!',},]}>        
                            <Input size="large" type="email" placeholder="E-mail" />
                    </Form.Item><br/>
                    <Form.Item name="phone"  rules={[{required: true, message: 'Please input your Phone!',},]}>        
                            <Input size="large" placeholder="Phone" />
                    </Form.Item><br/>
                    <Form.Item name="fullname"  rules={[{required: true, message: 'Please input your Fullname!',},]}>        
                            <Input size="large" placeholder="Fullname" />
                    </Form.Item><br/>
                    <Form.Item name="password"  rules={[{required: true,message: 'Please input your Password!',},]}>
                            <Input size="large" type="password" placeholder="Password"/>
                     </Form.Item><br/>
                     <Form.Item name="username"  rules={[{required: true, message: 'Please input your Username!',},]}>        
                            <Input size="large" placeholder="Username" />
                    </Form.Item>
                     <div className={style.buttonContainer}>
                        <Form.Item>
                                <Button type="primary" htmlType="submit"  >
                                Зарегистрироваться
                                </Button>
                        </Form.Item>
                     </div>
                </Form>
            </div><br/>
            <div className={style.AuthPage}>
                <NavLink to='/'>Авторизоваться</NavLink>
            </div>
        </div>
    )
}


export default Registration;