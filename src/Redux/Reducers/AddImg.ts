import { AddImgAPI,tokenAPI } from "../../API/api";
import { ValuesAddImgType } from "../../Components/AddImg/addImg";
import { BaseThunkType, InferActionsTypes } from "../Store";

let InitialState = {
    ImageAddInServer:false,
    error:false,
    preloader:false,
}
type InitialStateType = typeof InitialState
const AddImgReducer  = (State=InitialState, action:ActionsType):InitialStateType => {
    switch (action.type) {  
        case 'SET_IMAGE_IN_SERVER':
            return {...State,ImageAddInServer:action.ImageAddInServer}  
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
    SetErrorAC:()=>({type:'Set_Error',error:true}as const),
    SetImageInServerAC:()=>({type:'SET_IMAGE_IN_SERVER',ImageAddInServer:true}as const),
    SetPreloaderAC:(preloader:boolean)=>({type:'SET_PRELOADER',preloader} as const),
}

export const AddImg = (values:ValuesAddImgType,New:boolean,Popular:boolean):ThunkType =>async (dispatch) =>{
    //@ts-ignore
    const file = values.file[0].originFileObj;
    const nameImg = values.ImageName;
    const description = values.Desc;

    dispatch(actions.SetPreloaderAC(true))
   try{ 
       let data = await AddImgAPI.postImg(file,nameImg);
   
        let idPers=localStorage.getItem('IdClient');
        let refreshtoken = localStorage.getItem('refreshtoken');
        let secret = localStorage.getItem('secret')
        let tokens = await tokenAPI.getNewToken(idPers,refreshtoken,secret);
        let accesstoken = tokens.data.access_token;
        let refreshToken=tokens.data.refresh_token;
        localStorage.removeItem('accesstoken');
        localStorage.removeItem('refreshtoken');
        localStorage.setItem('accesstoken',accesstoken);
        localStorage.setItem('refreshtoken',refreshToken);
   

    
        try {
            await AddImgAPI.postNewImg(nameImg,description,New,Popular,data.data.id);
            dispatch(actions.SetPreloaderAC(false))
            dispatch(actions.SetImageInServerAC())
        }
        catch{
            dispatch(actions.SetPreloaderAC(false))
            dispatch(actions.SetErrorAC());
        }
    }
    catch{
        dispatch(actions.SetPreloaderAC(false))
        dispatch(actions.SetErrorAC());
    }
}

export default AddImgReducer;