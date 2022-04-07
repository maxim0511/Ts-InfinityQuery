import React, { Suspense } from "react";
import Preloader from "../Preloader/Preloader";



const PopularPage = React.lazy(()=>import('./Popular'))

const PopularContainer:React.FC = ()=>{
        return (
            <Suspense fallback={<Preloader/>}>
                <PopularPage/>
             </Suspense>
        )
}

export default PopularContainer


/*let mapStateToProps = (state:AppStateType) => ({
    preloader:state.popularPage.preloader,
    isAuth: state.loginPage.isAuth,
    img:state.popularPage.img,
    pageSize:state.popularPage.pageSize,
    totalItems:state.popularPage.totalItems,
    currentPage:state.popularPage.currentPage,
    error:state.popularPage.error
})
export type PropsType = {
    pageSize:number,
    totalItems:number,
    currentPage:number,
    img:Array<ImgApiType>,
    preloader:boolean,
    error:boolean,
}
export type PropsDispatchType = {
    getImgPopular:(Page:number,pageSize:number)=>void,
}
type AllProps = PropsType & PropsDispatchType
export default compose(connect(mapStateToProps,{
    getImgPopular
}))(PopularContainer)*/