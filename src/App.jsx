import React from 'react'
import{Route,Switch,BrowserRouter} from 'react-router-dom'
import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'

export default class App extends React.Component{

    render(){
        return(
            <BrowserRouter>
            <Switch>
                <Route path = '/admin' component = {Admin}/>
                <Route path = '/login' component = {Login}/>
            </Switch>
            </BrowserRouter>
        )
    }

}