import store from 'store'
export default{
    saveUser(user){
        // localStorage.setItem('user_all',JSON.stringify(user));
        store.set('user_all',user)
    },

    getUser(){
        // return JSON.parse(localStorage.getItem('user_all')|| '{}')
        return store.get('user_all') || {}
    },

    removeUser(){
        // localStorage.removeItem('user_all')
        store.remove('user_all')

    }

}