import React from 'react';
import Node from './Node';
import '../Styles/Board.css'
import {algorithmBFS} from '../Algorithms/BFS'

class Board extends React.Component {

    constructor(){
        super();
        const {startX,startY,endX,endY,xNodes,yNodes,sideLength} = this.precomputation();
        this.state = ({ startX,startY,endX,endY,sideLength,xNodes,yNodes,isMouseClicked:false,moveStart:false,moveEnd:false,nodes:[]});
        
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
        viewPortWidth *= (0.7);

        const sideLength = ((viewPortHeight*(6.5))/100)  ;
        const xNodes = parseInt(viewPortWidth/sideLength);
        const yNodes = parseInt(viewPortHeight/sideLength);

        const startX = parseInt(xNodes*(0.3));
        const startY = parseInt(yNodes*(0.5)); 
        const endX = parseInt(xNodes*(0.7));
        const endY = parseInt(yNodes*(0.5));
        return {startX,startY,endX,endY,xNodes,yNodes,sideLength};
    }

    getInitialGrid(xNodes,yNodes){
    
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
    
    onMouseDown = (row,col) =>{
        const nodes = this.state.nodes;
       
        if(nodes[row][col].isStart){
            this.setState({nodes,isMouseClicked:true,moveStart:true});

        }
        else if(nodes[row][col].isEnd){
            this.setState({nodes,isMouseClicked:true,moveEnd:true});
        }
        else{
        nodes[row][col].isWall = true;
        this.setState({nodes,isMouseClicked:true});
        }
    }

    onMouseEnter = (row,col) =>{
        if(!this.state.isMouseClicked){return;}
        const {nodes} = this.state;
        if(this.state.moveStart){
            nodes[row][col].isStart = true;
        }
        else if(this.state.moveEnd){
            nodes[row][col].isEnd = true;
        }
        else{
        nodes[row][col].isWall = true;
        }
        this.setState({nodes})
    }

    onMouseLeave = (row,col) =>{
        if(!this.state.isMouseClicked ){return;}
        const {nodes} = this.state;
        if(this.state.moveStart){
            nodes[row][col].isStart = false;
            this.setState({nodes});
        }
        else if(this.state.moveEnd){
            nodes[row][col].isEnd = false;
            this.setState({nodes});
        }
    }

    onMouseUp = (row,col) =>{
        if(this.state.moveStart){
            this.setState({isMouseClicked:false,moveStart:false,moveEnd:false,startY:row,startX:col})
        }
        else if (this.state.moveEnd){
            this.setState({isMouseClicked:false,moveStart:false,moveEnd:false,endY:row,endX:col})
        }
        else{
            this.setState({isMouseClicked:false,moveStart:false,moveEnd:false})
        }
    }
    
    visualizeAlgorithm = () =>{

        const path = algorithmBFS(this.state);
        for(let i = 0;i<path.length;i++){
            setTimeout( () =>{
                this.createNewGrid(path[i]);
                //could also fetch element and make changes in dom
            }, i*(20))
        }
    }

    createNewGrid = (value) =>{
        const i = value[0];
        const j = value[1];
        const {nodes,yNodes,xNodes,startX} = this.state;
        
        if(i < yNodes && j< xNodes && i>=0 && j>=0 && !nodes[i][j].isStart){
            
            nodes[i][j].isVisited = true;
        }
        this.setState({nodes});
    }
    
    createNode = (i,j) =>{
        const {startX,startY,endX,endY} = this.state;
        const isStart = (j === startX && i === startY ? true : false);
        const  isEnd = j === endX && i === endY ? true : false
        const node = {
            row:i,
            col:j,
            isStart:isStart,
            isEnd:isEnd,
            isVisited:false,
            isWall:false
        }
        return node;
}

    render(){

       
        const {nodes} = this.state;
        return (
            <div>
            <button onClick = {this.visualizeAlgorithm}>Visualize</button>
            <table className = 'mainGrid'>
                <tbody>
                    {nodes.map( (row,i) => {
                        return <tr key = {i}>
                            {row.map((node,j) => {
                                const {row,col,isStart,isEnd,isVisited,isWall} = node;
                                return <Node 
                                    key = {`${i} + ${j}`}
                                    row = {row}
                                    col = {col}
                                    sideLength = {this.state.sideLength}
                                    isStart = {isStart}
                                    isEnd = {isEnd}
                                    isWall = {isWall}
                                    isVisited = {isVisited}
                                    onMouseDown = {this.onMouseDown}
                                    onMouseEnter = {this.onMouseEnter}
                                    onMouseLeave = {this.onMouseLeave}
                                    onMouseUp = {this.onMouseUp}
                                />
                                })
                            }
                        </tr>
                    })}
                </tbody>
            </table>
            </div>
        )
    }
}
export default Board;
// can we not call funcions containing setState inside componentDidMount