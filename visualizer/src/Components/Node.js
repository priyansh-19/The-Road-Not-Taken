import React from 'react';
import '../Styles/Node.css'
class Node extends React.Component {
 

    render(){
      
        const {sideLength,isStart,isEnd,isVisited,row,col,onMouseEnter,onMouseLeave,onMouseDown,onMouseUp,isWall} = this.props;
        const addClass = (isStart) ? 'isStart' : isEnd ? 'isEnd' : isWall ? 'isWall' : '';
        const divStyle = {
            height : `${sideLength}px`,
            width : `${sideLength}px`,
        }
       
        return(
            <td 
            className = {`node ${isVisited ? 'visited' : ''} ${addClass}`}
            id = {`${row}${col}`}
            style = {divStyle}
            onMouseEnter = {() => onMouseEnter(row,col)}
            onMouseDown = {() => onMouseDown(row,col)}
            onMouseLeave = {() => onMouseLeave(row,col  )}
            onMouseUp = {() => onMouseUp(row,col)}
            >
            </td>
        )
    }
}
export default Node;
// how to render an imported component
// can we render just the cell component in react