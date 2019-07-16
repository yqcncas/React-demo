import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon} from 'antd';

import logo from '../../assets/img/logo.png'
import './LeftNav.less'
import menuConfig from '../../config/menuConfig'


const { SubMenu } = Menu;

 class LeftNav extends Component {
   
    getMenuNodes = (menuConfig)=>{
      const path = this.props.location.pathname;
        return menuConfig.reduce((pre,item)=>{
            if (!item.children) {
                pre.push((
                  <Menu.Item key={item.key}>
                    <Link to={item.key}>
                      <Icon type={item.icon} />
                      <span>{item.title}</span>
                    </Link>
                  </Menu.Item>
                ))
            }else{
                const cItem = item.children.find((cItem)=>{
                  if(cItem.key === path){
                    this.openKey = item.key
                  }

                } )
                pre.push((
                    <SubMenu
                      key={item.key}
                      title={
                        <span>
                          <Icon type={item.icon} />
                          <span>{item.title}</span>
                        </span>
                      }
                    >
                      {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        },[])
    }

    // getMenuNodes = (menuConfig)=>{
    //     return menuConfig.map((item)=>{
    //         if(!item.children){
    //             return (
    //                 <Menu.Item key={item.key}>
    //                     <Link to = {item.key}>
    //                         <Icon type={item.icon}/>
    //                         <span>{item.title}</span>
    //                     </Link>
                    
    //                 </Menu.Item>
    //             )
    //         }else{
    //            return  (
    //            <SubMenu
    //            key={item.key}
    //            title={
    //              <span>
    //                <Icon type={item.icon} />
    //                <span>{item.title}</span>
    //              </span>
    //            }
    //          >  
    //          {this.getMenuNodes(item.children)}
    //          </SubMenu>
    //          )
    //         }

    //     } )

    // }

    componentWillMount(){ //即将挂载时
        this.menuNodes = this.getMenuNodes(menuConfig)  //不放在render里，避免重复执行

    }

    render() {
      // const menuNodes = this.getMenuNodes(menuConfig) //保存存储二级路由操作
      const selectKey = this.props.location.pathname
      
        return (
            <div className = 'left-nav'>
                <Link className = 'left-nav-link' to='/home'>
                <img src={logo} alt="Logo"/>
                <h1>后台管理</h1>
                </Link>
                <Menu
                  selectedKeys={[selectKey]}
                  defaultOpenKeys={[this.openKey]}  //访问二级路由，而存储的在下面，所以把下面的提上来了
                  mode="inline"
                  theme="dark"
        >

            {
                // this.getMenuNodes(menuConfig)  //由于是打开二级路由的，但是二级路由访问在前，所以要放到前面
                this.menuNodes
            }
            
          {/* <Menu.Item key="/home">
              <Link to = '/home'>
                 <Icon type="home" />
                 <span>首页</span>
              </Link>
           
          </Menu.Item>
     
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="mail" />
                <span>商品</span>
              </span>
            }
          >
            <Menu.Item key="/category">
            <Link to = '/category'>
                 <Icon type="heart" />
                 <span>品类管理</span>
              </Link>

            </Menu.Item>
            <Menu.Item key="/product">
            <Link to = '/product'>
                 <Icon type="filter" />
                 <span>商品管理</span>
              </Link>

            </Menu.Item>
           
          </SubMenu> */}
         
        </Menu>
               
            </div>
        )
    }
}
export default withRouter(LeftNav)