import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Form, Icon, Input, Button,message } from 'antd';
import {reqLogin} from '../../api'
import logo from './img/logo.png'
import './Login.less'
 class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async(err, {username,password}) => {
          if (!err) {
            // alert(`username = ${username},password = ${password}`);
          const result = await reqLogin(username,password);
          if(result.status === 0){
              const user = result.data;
              // localStorage.setItem('user_all',JSON.stringify(user));
              storageUtils.saveUser(user)
              memoryUtils.user = user
              this.props.history.replace('/')
              message.success('登录成功')
          }else{
            message.error(result.msg)
          }
          }
        });
      };

      /*所有表单验证 */
  

      /*密码验证 */
      validatorPwd = (rule, value, callback)=>{
        value = value.trim();
        if(!value){
          callback('密码必须输入')
        }else if(value.length < 4){
          callback('密码小于4位数')
        }else if( value.length > 12){
          callback('密码大于12位')
        }else if(!/^[a-zA-z0-9]+$/.test(value)){
          callback('密码必须是英文、数字或下划线组成')
        }else{
          callback(); //通过
        }
      }

    render() {
      const user = memoryUtils.user
        if(user._id){
            // this.props.history.replace('/login')
            return <Redirect to = '/'/>
        }

      const { getFieldDecorator } = this.props.form;
        return (
            <div className = "login">
                <div className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>后台管理项目</h1>
                </div>
                <div className="login-content">
                    <h1>用户登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
        {getFieldDecorator('username', {
          initialValue: '',
            rules: [
              { required: true, message: '用户名不能为空' },
              {min:4,message:'不能小于4位数'},
              {max:12,message:'不能超过12位数'},
              {pattern: /^[a-zA-Z0-9]+$/,message: '用户名必须是英文、数字或下划线组成'}
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
        {getFieldDecorator('password', {
          initialValue:'',
            rules: [
              { validator : this.validatorPwd }
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
    
          <Button type="primary" htmlType="submit" className="login-form-button">
           登录
          </Button>
          
        </Form.Item>
      </Form>
                </div>
            </div>
        )
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default WrappedNormalLoginForm