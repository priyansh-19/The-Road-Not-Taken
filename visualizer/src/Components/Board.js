import React from 'react';
import Node from './Node';
import '../Styles/Board.css'


class Board extends React.Component {


    constructor(){
        super();
        const {startNodeX,endNodeX,nodeY,xNodes,yNodes,sideLength} = this.precomputation();
        this.state  = ({ startNodeX,endNodeX,nodeY,sideLength,xNodes,yNodes,nodes:[]});
        
    }
   
    getViewport = () =>{

      const width = window.innerWidth;
      const height = window.innerHeight;
      return [width, height];

    }
  
    componentDidMount(){
   
        const {xNodes,yNodes} = this.state;
        const nodes = this.getInitialGrid(xNodes,yNodes);
        //cannot make a call to another function that uses updated state
        this.setState({nodes});
    
    }
    precomputation(){
        let [viewPortWidth,viewPortHeight] = this.getViewport();
        viewPortHeight *= (0.6);
        viewPortWidth *= (0.8);

        const sideLength = ((viewPortHeight*8)/100)  ;
        const xNodes = parseInt(viewPortWidth/sideLength);
        const yNodes = parseInt(viewPortHeight/sideLength);

        const startNodeX = parseInt(xNodes*(0.3));
        const endNodeX = parseInt(xNodes*(0.7));
        const nodeY = parseInt(yNodes*(0.5));
        return {startNodeX,endNodeX,nodeY,xNodes,yNodes,sideLength};
    }

    getInitialGrid(xNodes,yNodes){
        console.log(this.state);

        const nodes = [];
        for(let row = 0 ; row < yNodes ; row++){
            const currentRow = [];
            for(let col = 0; col < xNodes; col++){
                const currentNode = this.createNode(row,col);
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        return nodes;
    }
    
    createNode = (i,j) =>{
            const {startNodeX,endNodeX,nodeY} = this.state;
            const isStart = (j === startNodeX && i === nodeY ? true : false);
            const  isEnd = j === endNodeX && i === nodeY ? true : false
            const node = {
                row:i,
                col:j,
                isStart:isStart,
                isEnd:isEnd,
                isVisited:false
            }
            return node;
    }
    
    // getInitialBoard();

    render(){

        console.log(this.state,'render  ');
        const {nodes} = this.state;
        return (
            <table className = 'mainGrid'>
                <tbody>
                    {nodes.map( (row,i) => {
                        return <tr>
                            {row.map((node,j) => {
                                const {row,col,isStart,isEnd,isVisited} = node;
                                return <Node 
                                    row = {row}
                                    col = {col}
                                    sideLength = {this.state.sideLength}
                                    isStart = {isStart}
                                    isEnd = {isEnd}
                                    isVisited = {isVisited}
                                />
                                })
                            }
                        </tr>
                    })}
                </tbody>
            </table>
        )
    }
}
export default Board;
// can we not call funcions containing setState inside componentDidMount