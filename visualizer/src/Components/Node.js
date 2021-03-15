import React from 'react';
import '../Styles/Node.css';
import lowWeight from '../images/tree.png';

class Node extends React.Component {
 

    render(){
      
        const {sideLength,isStart,isEnd,isVisited,row,col,onMouseEnter,onMouseLeave,onMouseDown,onMouseUp,isWall,isShortestPathNode,isWeighted} = this.props;
        const addClass = (isStart) ? 'isStart' : isEnd ? 'isEnd' : isWall ? 'isWall' : isWeighted ? '' : ''
        const divStyle = {
            height : `${sideLength}px`,
            width : `${sideLength}px`,
        }
    //    console.log(imgSrcLowWeight);
        return(
            <td 
            className = {`node ${isVisited ? 'visited' : isShortestPathNode ? 'shortestPathNode':''} ${addClass}`}
            id = {`${row}${col}`}
            style = {divStyle}
            onMouseEnter = {(e) => onMouseEnter(row,col,e)}
            onMouseDown = {(e) => onMouseDown(row,col,e)}
            onMouseLeave = {(e) => onMouseLeave(row,col,e)}
            onMouseUp = {() => onMouseUp(row,col)}
            >
            {
                <div className = 'imageContainer'>
                {(isWeighted && !isWall && !isStart && !isEnd) ? 
                        <img className = 'weightImage' src = {isWeighted ? lowWeight: ''} onError = {(e) => {e.target.style.display='none'}}/>
                : null}
                </div>
            }    
        </td>
        )
    }
}
export default Node;
// how to render an imported component
// can we render just the cell component in react