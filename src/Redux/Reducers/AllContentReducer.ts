import {contentAPI, ImgApiType} from '../../API/api';
import { BaseThunkType, InferActionsTypes } from '../Store';


let InitialState = {
   img:[] as Array<ImgApiType>,
   pageSize:15,
   totalItems:0,
   currentPage:1,
   error:true,
   preloader:false,
};
type InitialStateType = typeof InitialState
const AllContentReducer = (State = InitialState,action:ActionsType):InitialStateType => {
    switch (action.type) {
        case 'Set_Img' : 
            return {...State, img:action.img};
        ;
        case 'Set_Current_Page' : 
            return {...State, currentPage: action.currentPage}
        ;
        case 'Set_Total_Count' : 
            return {...State, totalItems: action.count}
        ;
        case 'Set_Error':
            return {...State, error:action.error};
        case 'SET_PRELOADER' :
            return {...State,preloader:action.preloader}    
        default:
            return State;
    }
} 
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>

export const actions = {
    SetPreloaderAC:(preloader:boolean)=>({type:'SET_PRELOADER',preloader}as const),
    SetImgAC:(img:Array<ImgApiType>)=>({type:'Set_Img',img} as const),
    SetCurrentPage:(currentPage:number)=>({type:'Set_Current_Page',currentPage}as const),
    SetTotalCountAC:(totalItems:number)=>({type:'Set_Total_Count',count:totalItems}as const),
    SetErrorAC:()=>({type:'Set_Error',error:true}as const)
}


export const getImgNew =(currentPage:number,pageSize:number):ThunkType=> async (dispatch) =>{ 
    dispatch(actions.SetPreloaderAC(true))
    try{
        let response= await contentAPI.content(currentPage,pageSize,true,false);
        dispatch(actions.SetImgAC(response.data.data));
        dispatch(actions.SetTotalCountAC(response.data.totalItems));
        dispatch(actions.SetCurrentPage(currentPage));
        dispatch(actions.SetPreloaderAC(false))
    }
    catch{
        dispatch(actions.SetPreloaderAC(false))
        dispatch(actions.SetErrorAC());
    }
     
}
export const getImgPopular =(currentPage:number ,pageSize:number):ThunkType=> async (dispatch) =>{ 
    dispatch(actions.SetPreloaderAC(true))
    try{
        let response= await contentAPI.content(currentPage,pageSize,false,true);
        dispatch(actions.SetImgAC(response.data.data));
        dispatch(actions.SetTotalCountAC(response.data.totalItems));
        dispatch(actions.SetCurrentPage(currentPage));
        dispatch(actions.SetPreloaderAC(false))
    }
    catch{
        dispatch(actions.SetPreloaderAC(false))
        dispatch(actions.SetErrorAC());
    }
     
}

export default AllContentReducer;