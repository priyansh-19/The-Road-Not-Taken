import React from 'react';
import '../Styles/Node.css'
class Node extends React.Component {
    render(){
      
        const {sideLength,isStart,isEnd,isVisited} = this.props;

        const divStyle = {
            height : `${sideLength}px`,
            width : `${sideLength}px`,
            backgroundColor:`${isStart?'#66c2ff':isEnd?'#ff4d94':''}`
        }

        return(
            <td 
            className = {`node ${isVisited ? 'visited' : ''}`}
            style = {divStyle}>
            </td>
        )
    }
}
export default Node;
// how to render an imported component
// can we render just the cell component in react