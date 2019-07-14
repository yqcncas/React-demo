import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter,BrowserRouter} from 'react-router-dom'
import App from './App'

ReactDOM.render(
    <BrowserRouter>
     <App/>
    </BrowserRouter> 
,document.querySelector('#root') )
