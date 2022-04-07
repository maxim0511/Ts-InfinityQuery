import React, { Suspense } from "react";
import Preloader from "../Preloader/Preloader";


const NewPage = React.lazy(()=>import('./New'))


const NewContainer:React.FC=()=>{
    return(
        <Suspense fallback={<Preloader/>}>
                <NewPage/>
         </Suspense>
    )
}




export default NewContainer







/*let mapStateToProps = (state:AppStateType) => ({
    preloader:state.newPage.preloader,
    img:state.newPage.img,
    pageSize:state.newPage.pageSize,
    totalItems:state.newPage.totalItems,
    currentPage:state.newPage.currentPage,
    error:state.newPage.error
})
componentDidMount() {
    this.props.getImgNew(1, this.props.pageSize);
}
onPageChanged= (PageNumber:number) => {
    this.props.getImgNew(PageNumber, this.props.pageSize);
}
type PropsDispatchType = {
    getImgNew:(Page:number,pageSize:number)=>void,
}
type AllPropsType = PropsType & PropsDispatchType
export default compose(
    connect(mapStateToProps,{
        getImgNew
    }),
)(NewContainer)*/
