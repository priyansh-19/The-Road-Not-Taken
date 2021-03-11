import React from 'react';
import '../Styles/Node.css'
class Node extends React.Component {
    render(){
      
        const {sideLength,isStart,isEnd} = this.props;

        const divStyle = {
            height : `${sideLength}px`,
            width : `${sideLength}px`,
            margin:'1px',
            backgroundColor:`${isStart?'#66c2ff':isEnd?'#ff4d94':''}`
        }

        return(
            <td className = 'node' style = {divStyle}>
            </td>
        )
    }
}
export default Node;