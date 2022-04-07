import React from "react";
import { connect } from "react-redux";
import {  logout } from "../../Redux/Reducers/LoginReducer";
import Header from "./Header";


export type PropsType = {
    isAuth:string | null,
    logout:()=>Promise<void>,
}
const HeaderContainer:React.FC<PropsType>=(props)=>{    
    return (
            <Header isAuth={props.isAuth} logout={props.logout}/>
        )
}

let mapStateToProps = () => ({
    isAuth:sessionStorage.getItem('Auth'),
});


export default connect(mapStateToProps,{logout})(HeaderContainer);