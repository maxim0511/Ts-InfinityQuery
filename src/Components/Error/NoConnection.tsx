import React from "react";
import style from './NoConnection.module.css';
import img from './LogoError.svg';

const NoConnection = () => {
    return (
        <div className={style.ErrorConnect}>
            <img className={style.ErrorConnect_logo} src= {img} />
            <div className={style.ErrorConnect_h}>Ошибка</div>
            <p className={style.ErrorConnect_desc}>Произошла ошибка.<br/>Пожалуйста проверьте свое интернет подключение,авторизованность,<br/>правильность введенных данных или попробуйте позже</p>
        </div>
    )
}
export default NoConnection;