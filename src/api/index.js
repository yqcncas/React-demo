import ajax from './ajax'
import qs from 'qs'

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