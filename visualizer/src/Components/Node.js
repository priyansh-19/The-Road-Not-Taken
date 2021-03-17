import React from 'react';
import '../Styles/Node.css';
import tree1 from '../images/tree4.png';
import tree2 from '../images/tree4.png';
import tree3 from '../images/tree4.png';
import tree4 from '../images/tree4.png'
import tree5 from '../images/tree4.png';

class Node extends React.Component {
 

    render(){
      
        const {sideLength,
            isStart,
            isEnd,
            isVisited,
            row,
            col,
            onMouseEnter,
            onMouseLeave,
            onMouseDown,
            onMouseUp,
            isWall,
            isShortestPathNode,
            isWeighted 
            } = this.props;

        const addClass = 
            isStart ? 'isStart' :
                isEnd ? 'isEnd' :
                    isWall ? 'isWall' :
                        isWeighted && isVisited? 'isWeighted visited' :
                            isWeighted && isShortestPathNode ? 'isWeighted shortestPathNode':
                                isWeighted ? 'isWeighted' :
                                    isVisited ?  'visited' :
                                        isShortestPathNode ? 'shortestPathNode': ''
        const divStyle = {
            height : `${sideLength}px`,
            width : `${sideLength}px`,
        }
        let treeNumber = (((row*col) % 5)*row)%5;
  
        return(
            <td 
            className = {`node ${addClass}`} 
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
                        <img className = 'weightImage' src = {isWeighted ? 
                            treeNumber === 1 ? tree1 : treeNumber == 2 ? tree2 : treeNumber == 3 ? tree3 : treeNumber == 4 ? tree4 : tree5
                        : ''} onError = {(e) => {e.target.style.display='none'}}/>
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