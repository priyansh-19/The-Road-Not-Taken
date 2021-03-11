import React from 'react';
import Node from './Node';
import '../Styles/Board.css'


class Board extends React.Component {


    constructor(){
        super();
        const {startX,startY,endX,endY,xNodes,yNodes,sideLength} = this.precomputation();
        this.state  = ({ startX,startY,endX,endY,sideLength,xNodes,yNodes,nodes:[]});
        
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
            }
            return node;
    }
    
    createNewGrid = (value) =>{
        const i = value[0];
        const j = value[1];
        const {nodes,yNodes,xNodes,startX} = this.state;
        
        if(i < yNodes && j< xNodes){
            nodes[i][j].isVisited = true;
        }
        this.setState({nodes});
    }
    algorithmBFS = () =>{
        const {startX,startY,endX,endY,xNodes,yNodes} = this.state;
        const path = [];
        const q1 = [];
        const vis = new Array(yNodes).fill(0).map(() => new Array(xNodes).fill(0));
         //implement queue using a vector/array
        q1.push([startY,startX]);
        q1.push([-1,-1])

        while(q1.length !== 0){
            const currentNodeIndex = q1[0];
            q1.shift();

            if(currentNodeIndex[0] === -1){
                if(q1.length === 0){break;}
                q1.push([-1,-1]);
                continue;
            }
            const i = currentNodeIndex[0];
            const j = currentNodeIndex[1];
            if(i === endY && j === endX){break;}
            path.push([i,j]);
            vis[i][j] = 1;

            const adj = [
                [1,0],[0,1],[-1,0],[0,-1]
            ]
            for(let k=0;k<4;k++){
                const newY = adj[k][0] + i;
                const newX = adj[k][1] + j;
                if(newX < xNodes && newX >=0 && newY < yNodes && newY >=0 && !vis[newY][newX]){
                    q1.push([newY,newX]);
                    vis[newY][newX] = 1;
                }
            }
        }
        return path;
        
    }
    visualizeAlgorithm = () =>{

        const path = this.algorithmBFS();
        for(let i = 0;i<path.length;i++){
            setTimeout( () =>{
                this.createNewGrid(path[i]);
                //could also fetch element and make changes in dom
            }, i*(25))
        }
    }

    render(){

        // console.log(this.state,'render  ');
        const {nodes} = this.state;
        // this.visualizeAlgorithm();
        return (
            <div>
            <button onClick = {this.visualizeAlgorithm}>Visualize</button>
            <table className = 'mainGrid'>
                <tbody>
                    {nodes.map( (row,i) => {
                        return <tr key = {i}>
                            {row.map((node,j) => {
                                const {row,col,isStart,isEnd,isVisited} = node;
                                return <Node 
                                    key = {`${i} + ${j}`}
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
            </div>
        )
    }
}
export default Board;
// can we not call funcions containing setState inside componentDidMount