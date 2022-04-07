import axios from "axios";


const instance = axios.create({
    withCredentials:true,
})

export type ImgApiType = {
    id:number,
    name:string,
    dateCreate:string,
    desription:string,
    new:boolean ,
    popular:boolean ,
    image: {
        id:number,
        name:string
    },
    user:null
}
type contentImgType = {
    totalItems:number,
    itemsPerPage:number,
    countOfPages:number,
    data : Array<ImgApiType>
}
export const contentAPI = {
    content: (currentPage:number,pageSize:number,New:boolean,popular:boolean)=> {
        return instance.get<contentImgType>(`api/photos?new=${New}&popular=${popular}&page=${currentPage}&limit=${pageSize}`)
                
    }
}



type firstEntranceType = {
    id: string,
    name: string,
    randomId: string,
    secret: string,
    allowedGrantTypes: [
      string,string
    ]
}
type loginType = {
    access_token:string,
    refresh_token:string
}
export const loginAPI ={ 
    firstEntrance () {
        return instance.post<firstEntranceType>(`api/clients`,{
            name:'string',
            "allowedGrantTypes": [
                "password", "refresh_token"
              ]           
        })
    },
    login (id:number | string,Username:string,password:string,secret:string ) {
        return instance.get<loginType>('oauth/v2/token',{
            params:{
              'grant_type':'password',
              'client_id':id,
              'client_secret':secret,
              'username':Username,
              'password':password
            }
          })
    },
}

export type valuesRegType = {
    email: string;
    phone: string;
    fullname: string;
    password: string;
    username: string;
};
export const regAPI = {
    registration(email:string,phone:string,fullName:string,password:string,username:string) {
        return instance.post<valuesRegType>(`api/users`, {
            email,
            phone,
            fullName,
            password,
            username,
            birthday: "2022-02-20T11:49:36.135Z",
            roles: [
              ''
            ]
        })
    }
}

type postImgType = {
    file:string
    name:string
    id:number
}

export const AddImgAPI = {
    postImg (file:File,nameImg:string){
        const formData = new FormData();
        formData.append('file',file)
        return instance.post<postImgType>(`api/media_objects`,
                formData,{
                    headers:{ Authorization:`Bearer ${localStorage.getItem('accesstoken')} `}
                }
        )
    },
    postNewImg (nameImg:string,description:string,New:boolean,Popular:boolean,idFile:number) {
        const data={
            'name':nameImg,
            'description':description,
            'new':New,
            'popular':Popular,
            image:`/api/media_objects/${idFile}`
            };
        return instance.post<ImgApiType>(`api/photos`,
            data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('accesstoken')} `,
                }
            }
        )
    },
}
type GetNewTokenAPItype= {
    resultCode:number,
    refresh_token:string,
    access_token:string
    client_secret:string,
    error: string | null
}
export const tokenAPI = {
    getNewToken (idPers:string | null,refreshtoken:string | null,secret:string | null) {
        return instance.get<GetNewTokenAPItype>('oauth/v2/token',{
            params : {
                'client_id':idPers,
                'grant_type':'refresh_token',
                'refresh_token':refreshtoken,
                'client_secret':secret
            }
        })
    }
}