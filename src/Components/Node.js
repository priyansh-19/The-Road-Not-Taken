import React from 'react';
import '../Styles/Node.css';
import tree1 from '../images/tree4.png';
import tree3 from '../images/tree4.png'


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
            isWeighted,
            animation,
            weight
            } = this.props;

        const classOf = {
            isWall : `isWall${animation}`,
            isVisited : `visited${animation}`,
            isShortestPathNode : `shortestPathNode${animation}`,
            isWeighted : `isWeighted${weight}x`
        }
        // const imgSource = weight == 2 ? tree1 : tree3 ;
        const addClass = 
            isStart ? 'isStart' :
                isEnd ? 'isEnd' :
                    isWall ? classOf['isWall'] :
                        isWeighted && isVisited? `${classOf['isWeighted']} ${classOf['isVisited']}` :
                            isWeighted && isShortestPathNode ? `${classOf['isWeighted']} ${classOf['isShortestPathNode']}`:
                                isWeighted ? classOf['isWeighted'] :
                                    isVisited ?  classOf['isVisited'] :
                                        isShortestPathNode ? classOf['isShortestPathNode']: ''
        const divStyle = {
            height : `${sideLength}px`,
            width : `${sideLength}px`,
        }
  
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
                <div className = {`imageContainer`}>
                {(isWeighted && !isWall && !isStart && !isEnd && animation!='Low') ? 
                        <img 
                        className = {`weightImage${animation}`} 
                        src = {
                            isWeighted ? weight === 2 ? tree1 : tree3 : ''
                        } 
                        // style ={ isWeighted ? weight === 4 ? {transform:scale(1.2)} :{}: {}}
                        onError = {(e) => {e.target.style.display='none'}}/>
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