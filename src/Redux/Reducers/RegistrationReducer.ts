import { loginAPI, regAPI } from "../../API/api";
import { BaseThunkType, InferActionsTypes } from "../Store";


let InitialState = {
    id:null as number | null,
    email:null as string | null,
    login:null as string | null,
    isAuth:false as boolean ,
    error:false as boolean ,
    preloader:false  as boolean ,
}
type InitialStateType = typeof InitialState;;

const RegistrationReducer  = (State=InitialState, action:ActionsType):InitialStateType => {
    switch (action.type) {
        case 'SET_USERS_DATA' : 
            return {...State, isAuth:action.isAuth}
        case 'Set_Error':
            return {...State, error:action.error}   
        case 'SET_PRELOADER' :
            return {...State,preloader:action.preloader}
        default :
            return State
    }
}
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType>

const actions = {
    SetAuthAC:()=>({type:'SET_USERS_DATA',isAuth:true} as const),
    SetPreloaderAC:(preloader:boolean)=>({type:'SET_PRELOADER',preloader} as const),
    SetErrorAC:()=>({type:'Set_Error',error:true} as const)
}

export const Regist = (email:string,phone:string,fullname:string,password:string,Username:string):ThunkType =>async (dispatch) =>{
    dispatch(actions.SetPreloaderAC(true))
        try {
            let response = await regAPI.registration(email,phone,fullname,password,Username);
            dispatch(actions.SetAuthAC());
            dispatch(actions.SetPreloaderAC(false))
        }
        catch{
            dispatch(actions.SetPreloaderAC(false))
            dispatch(actions.SetErrorAC());
        } 
}

export default RegistrationReducer