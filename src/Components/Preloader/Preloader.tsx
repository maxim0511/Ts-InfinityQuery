import React from "react";
import img from './Preloader.svg'
import style from './Preloader.module.css'

const Preloader = () => {
    return (
        <div className={style.Preloader}>
            <p >Loading...</p>
            <img src={img} alt='Loading' className={style.Preloader_img}/>
        </div>
    )
}

export  default Preloader;