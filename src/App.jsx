import React from 'react'
import { message, Button } from 'antd';

export default class App extends React.Component{
     success = () => {
        message.success('This is a success message');
      };
    render(){
        return(
       <div>
           <Button onClick={this.success}>Success</Button>
       </div>
       
        )
    }

}