import React from 'react';
import '../Styles/Node.css';
import tree1 from '../images/tree4.png';
import tree3 from '../images/tree4.png';
import flag from '../images/red-flag.png';
import levi from '../images/levi.png'


class Node extends React.Component {
 

    render(){
        const {sideLength,
            isStart,
            isEnd,
            isVisited,
            isVisitedTarget,
            row,
            col,
            onMouseEnter,
            onMouseLeave,
            onMouseDown,
            onMouseUp,
            isWall,
            isShortestPathNode,
            isWeighted,
            animation,
            weight,
            } = this.props;
        
        
        const classOf = {
            isWall : `isWall${animation}`,
            isVisited : `visited${animation}`,
            isShortestPathNode : `shortestPathNode${animation}`,
            isWeighted : `isWeighted${weight}x`,
            isVisitedTarget : `visitedTarget${animation}`,
        }
        // const imgSource = weight == 2 ? tree1 : tree3 ;
        // isEnd && isShortestPathNode? `isEnd ${classOf['isShortestPathNode']}` :

        const addClass = 
        isStart && isShortestPathNode? `isStart ${classOf['isShortestPathNode']}` :
            isStart ? 'isStart' :
                isEnd && isShortestPathNode? `isEnd ${classOf['isShortestPathNode']}` :
                    isEnd ? 'isEnd' :
                        isWall ? classOf['isWall'] :
                            isWeighted && isShortestPathNode ? `${classOf['isShortestPathNode']}`:
                                isVisitedTarget ? classOf['isVisitedTarget']:
                                                isVisited ?  classOf['isVisited'] :
                                                        isShortestPathNode ? classOf['isShortestPathNode']: ''
        const divStyle = {
            height : `${sideLength}px`,
            width : `${sideLength}px`,
        }
  
        return(
            <td 
            className = {`node ${addClass} .selectDisable`} 
            id = {`${row}${col}`}
            style = {divStyle}
            onMouseEnter = {(e) => onMouseEnter(row,col,e)}
            onMouseDown = {(e) => onMouseDown(row,col,e)}
            onMouseLeave = {(e) => onMouseLeave(row,col,e)}
            onMouseUp = {() => onMouseUp(row,col)}
            >
           
            {   
                <div className = { (isEnd  || isStart) ? `imageContainerSE` : `imageContainer ${isWeighted ? classOf['isWeighted'] : ''}`}>
                {(isWeighted && !isWall && !isStart && !isEnd && animation!='Low' && !isShortestPathNode) ? 
                        <img 
                        draggable = "false" 
                        className = {`weightImage${animation} selectDisable`} 
                        src = {
                            isWeighted  ? weight === 2 ? tree1 : tree3 : ''
                        } 
                        />
                : null}
                 { isEnd ? <img src = {flag} className = 'isEndImage'/> : ''}
                 { isStart ? <img src = {levi} className = 'isStartImage'/> : ''}
                    
                </div>
            }    
        </td>
        )
    }
}
export default Node;
// how to render an imported component
// can we render just the cell component in react