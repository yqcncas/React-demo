import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import './Header.less'

import LinkButton from '../../components/link-button/LinkButton'
import {reqWeather} from '../../api/index'
import menuConfig from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {formateDate} from '../../utils/dateUtils'
import { Modal, Button } from 'antd';

const { confirm } = Modal;

 class Header extends Component {

    state = {
        currentTime: formateDate(Date.now()),
        dayPictureUrl : '',
        weather:''
    }


    //退出按钮对话框方法
    logout = ()=>{
        confirm({
            title: '确定退出么',
            
            onOk:()=> {
              console.log('OK');
              storageUtils.removeUser() //删除localStorage数据
              memoryUtils.user = {}     //删除内存中的数据
              this.props.history.replace('/login')   //跳转到Login   不需要回退使用replace
            },
            onCancel() {
              console.log('Cancel');
            },
          });

    }

    // 动态获取title方法
    getTitle = ()=>{
        let title = ''
        const path = this.props.location.pathname
        menuConfig.forEach( (item)=>{
            if(item.key === path){
                title = item.title;
                console.log(title)
            }else if(item.children){
                const cItem = item.children.find((cItem)=>{
                    if(cItem.key === path){
                        title = cItem.title
                        console.log(title)
                    }
                } )
            }
            
        })
        return title    
    }


    getWeather = async() =>{
        const {dayPictureUrl,weather} = await reqWeather('北京')
        this.setState({
            dayPictureUrl,
            weather
        })
    }


    componentDidMount(){
        this.timerId = setInterval( ()=>{
            this.setState({
                currentTime:formateDate(Date.now())

            })

        },1000)
        this.getWeather();

    }

    componentWillUnmount(){
        clearInterval(this.timerId)

    }


    render() {
        //拿到用户名
        const user = memoryUtils.user
        //定义title方法
        const title = this.getTitle()   
        //拿到状态里的时间
        const { currentTime, dayPictureUrl, weather } = this.state 
        return (
            <div className = 'header'>
                    <div className="header-top">
                  欢迎, {user.username} &nbsp;&nbsp;

          {/* 组件的标签体作为标签的children属性传入 */}
                 <LinkButton onClick={this.logout}>退出</LinkButton>
            </div>

                 <div className="header-bottom">
                                              {/* 动态获取title  */}
                    <div className="header-bottom-left">{title}</div>   
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                    </div>
                
            </div>
        )
    }
}

export default withRouter(Header)