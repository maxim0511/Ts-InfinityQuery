import React,{useEffect, useState} from "react";
import style from "./New.module.css"
import NoConnection from "../Error/NoConnection";
import ComponentContent from '../ComponentContent/ComponentContent'
import 'antd/dist/antd.css'; 
import Preloader from "../Preloader/Preloader";
import { useInfiniteQuery } from 'react-query'
import axios, { AxiosResponse } from "axios";


const New:React.FC  = () => {
    const [fetching,SetFetching]=useState(true);
    useEffect(()=>{
        if (fetching){
            fetchNextPage()
         }
        SetFetching(false);
    },[fetching])
    useEffect(()=>{
        document.addEventListener('scroll',scrollHandler)
            return function () {
              document.removeEventListener('scroll',scrollHandler)
    }
    },[])
    const scrollHandler = (e:any )=>{
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight)<120){
            SetFetching(true)
        }
    } 

    const FetchImages= ({pageParam=1}):Promise<AxiosResponse> =>axios.get(`api/photos?new=true&popular=false&page=${pageParam}&limit=20`).then((res)=>res.data);

    const {data,error,fetchNextPage,hasNextPage,isFetching,isFetchingNextPage,status} = useInfiniteQuery('imagesTrue', async ( {pageParam=1} ) => {
        return await FetchImages({pageParam})
    }, {
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage, allPages) => allPages.length + 1,
    })
    return (
        status === 'loading'?(<Preloader/>):status === 'error'?(<NoConnection/>):
            <React.Fragment>
                <div className={style.Page}>
                     <ComponentContent img={data?.pages}/>
                </div>
                <div className={style.Page_paginator}>
                    {isFetching && !isFetchingNextPage ? '' : null}
                </div>
            </React.Fragment>
    )
}
export default New;



//                <button onClick={async () => await fetchNextPage()}>123</button>
// <Pagination showSizeChanger={false} className={style.Pagination} onChange={props.onPageChanged} total={props.totalItems} current={ props.currentPage} pageSize={props.pageSize}/>