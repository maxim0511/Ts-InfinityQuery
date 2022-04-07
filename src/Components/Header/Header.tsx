import React from "react";
import {NavLink } from "react-router-dom";
import style from './Header.module.css'
import img from './Header.png';
import { PropsType } from "./HeaderContainer";



const Header:React.FC<PropsType> = (props) => {
    const Active = ({ isActive }:any) =>({color:isActive ? '#ED5992'  : ''})
    return (
        <header className={style.Header}>
            <div  className={style.Header_img}>
                 <NavLink to='/'><img src={img}/></NavLink>
            </div>
            <nav className={style.Navbar}>
               <div className={style.Navbar_item} >
                   <NavLink style={Active} to='/New' >New</NavLink>
                </div>
                <div className={style.Navbar_item1}>
                    <NavLink style={Active} to='/Popular'>Popular</NavLink>
                </div>
                <div className={style.Navbar_item1}>
                    <NavLink style={Active} to='/AddImg'>NewImg</NavLink>
                </div>
                <div className={style.Navbar_item} >
                {props.isAuth ?
                    <button onClick={props.logout} className={style.button}>Выйти</button>
                    :    
                    <NavLink to={'/'} style={Active}>Login</NavLink>
                }
                </div>
            </nav>
        </header>
    )
}
export default Header