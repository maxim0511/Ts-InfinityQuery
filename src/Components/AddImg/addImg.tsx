import React from "react";
import style from "./addImg.module.css";
import NoConnection from "../Error/NoConnection";
import Preloader from "../Preloader/Preloader";
import { Radio, Upload } from "antd";
import { Form, Input, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; 
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../Redux/Store";
import {AddImg} from "../../Redux/Reducers/AddImg";

type E = {fileList: []} | [] | undefined

export type ValuesAddImgType = {
    radio_group: string | number;
    Desc:string,
    ImageName: string;
    file: File;
    New: string | boolean;
    Popular: string | boolean;
};

const normFile = (e: E) => {
    if (Array.isArray(e)) {
        return e;
      }
    
      return e && e.fileList;
  };

const AddImgComponent:React.FC = () => {
    const dispatch=useDispatch()
    const preloader=useSelector((State:AppStateType)=>State.addImgPage.preloader);
    const error=useSelector((State:AppStateType)=>State.addImgPage.error);
    const ImageAddInServer=useSelector((State:AppStateType)=>State.addImgPage.ImageAddInServer);

    const onFinish = (values:ValuesAddImgType) => {
        if (values.radio_group == 1) {
            let New = true;
            let Popular = false
            dispatch(AddImg(values,New,Popular))
        } else {
            let New = false;
            let Popular = true
            dispatch(AddImg(values,New,Popular))
        }
    }
    if (preloader) {
        return <Preloader/>
    }
    if (error) {
        return  <NoConnection/>
    }
    return (
            <div className={style.addImg}>
                {ImageAddInServer && <div className={style.ImageAddInServer}>
                    <h2 className={style.h2}>Картинка успешно загружена</h2> 
                </div>}
                <div className={style.AddImgPage}>
                    <Form  onFinish={onFinish} ><br/>
                        <Form.Item name="ImageName"  rules={[{required: true, message: 'Please input your Image name!',},]}>        
                                <Input placeholder="ImageName"  size="large"/>
                        </Form.Item><br/>
                        <Form.Item name="radio_group" label="Категория">
                                <Radio.Group>
                                    <Radio value="1" >New</Radio>
                                    <Radio value="2" >Popular</Radio>
                                </Radio.Group>
                        </Form.Item>
                        <Form.Item name="Desc"  rules={[{required: true,message: 'Please input your Description!',},]}>
                                <Input size="large" placeholder="Description"/>
                        </Form.Item>
                        <Form.Item name="file" label="Upload File"  valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload listType="picture" name="logo" beforeUpload={(file:File, fileList:{})=>false} >
                            <Button icon={<UploadOutlined />}>Click to upload</Button>
                            </Upload>
                        </Form.Item>
                        <div className={style.buttonContainer}>
                            <Form.Item>
                                    <Button  type="primary" htmlType="submit" className={style.button} >
                                        Отправить
                                    </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
    )
}

 

export default AddImgComponent