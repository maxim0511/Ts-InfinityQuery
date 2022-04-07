import React,{ Suspense } from "react";
import Preloader from "../Preloader/Preloader";

const AddImgPage = React.lazy(()=>import("./addImg"))

const AddImgContainer:React.FC = ()=>{
    return (
        <Suspense fallback={<Preloader/>}>
                <AddImgPage />
        </Suspense>
    )
}

export default AddImgContainer;