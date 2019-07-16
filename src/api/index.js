import ajax from './ajax'
import qs from 'qs'
import jsonp from 'jsonp'   //由于axios 无法发送jsonp 所以引入jsonp包
import {message} from 'antd'

export const reqLogin = (username,password)=>{
    // return ajax({
    //     method:'post',
    //     url:'/login',
    //     data : {
    //         username,
    //         password
    //     }
    // })
    return ajax.post('/login',{username,password})
}
        

// export function reqLogin(username,password){
//     return ajax({
//         method:'post',
//         url:'/login',
//         data : {
//             username,
//             password
//         }
//     })
// }

// let name = 'admin';
// let pwd = 'admin'
// reqLogin(name,pwd).then((msg)=>{
//     console.log(msg)
// } )

//发送jsonp请求给百度天气

export const reqWeather = (city) =>{
    //需要返回的是Promise对象
    return new Promise((resolve,reject)=>{
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(error,data)=>{
            if(!error && data.error === 0){
                const {dayPictureUrl, weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl,weather})
            }else{
                message.error('请求失败')
            }
    
        })
    } )
  


}