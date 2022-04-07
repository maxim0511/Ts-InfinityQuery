import { loginAPI,tokenAPI } from "../../API/api";
import { BaseThunkType, InferActionsTypes } from "../Store";


let InitialState = {
    id:null as number|null|string,
    name:null as string|null,
    randomId:null as number|null,
    secret:null as string|null,
    access_token:null as string|null,
    refresh_token:null as string|null,
    preloader:false as boolean,
    isAuth:null as null | string | boolean,
    error:false as boolean,
}
type InitialStateType = typeof InitialState
const loginReducer  = (State=InitialState, action:ActionsType):InitialStateType => {
    switch (action.type) {           
        case 'SET_FIRST_ENTRANCE':
            return {...State, ...action.data}
        case 'Set_Error':
            return {...State, error:action.error}   
        case 'SET_USERS_DATA':
            return {...State, isAuth:action.isAuth}
        case 'SET_TOKEN' :
            return {...State, access_token:action.access_token , refresh_token:action.refresh_token}
        case 'SET_PRELOADER' :
            return {...State,preloader:action.preloader}
        default :
            return State
    }
}
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>

const actions = {
    SetAuthAC:(isAuth:null | string | boolean)=>({type:'SET_USERS_DATA',isAuth}as const),
    SetFirstEntrance:(id:number|string|null,secret:string|null,password:string|null,refresh_token:string|null)=>({type:'SET_FIRST_ENTRANCE',data:{id,secret,password,refresh_token}}as const),
    SetErrorAC:()=>({type:'Set_Error',error:true}as const),
    SetTokenAC:(access_token:string | null,refresh_token:string | null)=>({type:'SET_TOKEN',access_token,refresh_token}as const),
    SetPreloaderAC:(preloader:boolean)=>({type:'SET_PRELOADER',preloader}as const)
}

export const login = (Username:string,password:string):ThunkType =>async (dispatch) =>{
    dispatch(actions.SetPreloaderAC(true))
    try{
        let response = await loginAPI.firstEntrance();
            localStorage.clear();
            sessionStorage.clear();
            const id=response.data.id + '_' + response.data.randomId;
            localStorage.setItem('IdClient',id);
            const idPers = response.data.id
            localStorage.setItem('id',idPers);
            const secret =response.data.secret;
            localStorage.setItem('secret',secret);
            const Password = response.data.allowedGrantTypes[0]
            const refreshtoken = response.data.allowedGrantTypes[1];

            dispatch(actions.SetFirstEntrance(id,Password,refreshtoken,secret));
            
             try {
                let data = await loginAPI.login(id,Username,password,secret);
                 const accesstoken = data.data.access_token;
                 const refreshtoken = data.data.refresh_token;
                 localStorage.setItem('accesstoken',accesstoken);
                 localStorage.setItem('refreshtoken',refreshtoken);
                 //@ts-ignore
                 sessionStorage.setItem('Auth',true);
                 dispatch(actions.SetTokenAC(accesstoken,refreshtoken));
                 dispatch(actions.SetPreloaderAC(false))
                dispatch(actions.SetAuthAC(sessionStorage.getItem('Auth')));
             }
             catch(e){
                 localStorage.clear();
                 let tokens = await tokenAPI.getNewToken(idPers,refreshtoken,secret);
                 let accessToken = tokens.data.access_token;
                 let refreshToken=tokens.data.refresh_token;
                 dispatch(actions.SetTokenAC(accessToken,refreshToken));
                 localStorage.setItem('accesstoken',accessToken);
                 localStorage.setItem('refreshtoken',refreshToken);
                 dispatch(actions.SetPreloaderAC(false))
                 dispatch(actions.SetErrorAC());
             }
    }
    catch{
        dispatch(actions.SetPreloaderAC(false))
        dispatch(actions.SetErrorAC());
    }
}
export const logout = ():ThunkType=> async (dispatch) =>{
    localStorage.clear();
    sessionStorage.clear();
        try {
            const accesstoken=null;
            const refreshtoken = null
            dispatch(actions.SetTokenAC(accesstoken,refreshtoken))
            dispatch(actions.SetFirstEntrance(null,null,null,null));
            dispatch(actions.SetAuthAC(false));
        }
        catch{
            dispatch(actions.SetErrorAC())
        }
}
export default loginReducer