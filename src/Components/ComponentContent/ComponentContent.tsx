import React,{useState} from "react";
import style from "../New/New.module.css"
import { Modal } from "antd";
import 'antd/dist/antd.css'; 
import { ImgApiType } from "../../API/api";
import Preloader from "../Preloader/Preloader";


type img = {
    countOfPages:number,
    data:ImgApiType[],
    itemsPerPage:number,
    totalItems:number
}

type ImgPropsType = Array<img>

const ComponentContent:React.FC<ImgPropsType | any> =React.memo((props) => {
    const [modal,setModal] = useState(false);
    const [SrcInfo,setSrc] = useState('');
    const [AltkeyInfo,setAltkey] = useState('');
    const [NameInfo,setName] = useState('');
    const [DescInfo,setDesc] = useState('');
    const modalStyle = {
        padding:25,
        height:700,
    }
    
    const modalOpen = (event:HTMLImageElement)=>{
         setSrc(event.src);
         //@ts-ignore
         setAltkey(event.key);
         setDesc(event.alt);
         setName(event.id);
         setModal(true)
    }
    if (!props.img) {
        return <Preloader/>
    }
    return (
        <div className={style.Page_content}>
        {props.img.map((element:{data: ImgApiType[]},i:number) => (
            <React.Fragment key={i}>
                {element.data.map((u:ImgApiType) => (
                    <div className={style.content__item}  key={u.id} >
                    <img src={'http://gallery.dev.webant.ru/media/' + u.image.name} id={u.name} key={u.desription} alt={u.image.name} onClick={(event) =>//@ts-ignore
                    modalOpen(event.target)}/>
                    <Modal bodyStyle={modalStyle}  centered={true} visible={modal} footer={null}  onCancel={() => setModal(false)}  width={700} > 
                            <div className={style.container_modal_img}>
                                <img className={style.modal_img} src={SrcInfo} alt={AltkeyInfo}/>
                            </div><br/><br/>
                            <div className ={style.modal_img_info}>
                                <h1 className={style.modal_img_name}>{DescInfo}</h1><br/>
                                <p className={style.modal_img_desc}>{NameInfo}</p>
                            </div>
                    </Modal>
            </div>
                ))}
            </React.Fragment>
        ))}
        </div>   
    )
})
export default ComponentContent;