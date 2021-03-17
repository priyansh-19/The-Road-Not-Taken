import React from 'react';
import Node from './Node';
import '../Styles/Board.css'
import Header from './Header'
import AlgorithmList from './AlgorithmList';
import {algorithmBFS} from '../Algorithms/BFS';
import {algorithmDFS} from '../Algorithms/DFS';
import { algorithmDijkstras } from '../Algorithms/Dijkstras';
import {algorithmAstar} from '../Algorithms/Astar';

const algorithmList = {
Dijkstras:algorithmDijkstras,
BFS:algorithmBFS,
DFS:algorithmDFS,
Astar:algorithmAstar,
};

class Board extends React.Component {

    constructor(){
        super();
        const {startX,startY,endX,endY,xNodes,yNodes,sideLength} = this.precomputation();
        this.state = ({ 
            startX,
            startY,
            endX,
            endY,
            sideLength,
            xNodes,
            yNodes,
            selectedWeight:4,
            isMouseClicked:false,
            isMouseClickedFor:'',
            moveStart:false,
            moveEnd:false,
            isSelectedAlgorithm:'Astar',
            viewPortWidth:window.innerWidth,
            viewPortHeight:window.innerHeight,
            pathFoundState : -1,
            nodes:[]
        });
    }
   
    getViewport = () =>{
      const width = window.innerWidth;
      const height = window.innerHeight;
      return [height, width];
    }

    componentDidMount(){

        const {xNodes,yNodes,startX,startY,endX,endY} = this.state;
        const nodes = this.getInitialGrid(xNodes,yNodes,startX,startY,endX,endY);

        window.addEventListener('resize',() =>{
            this.setState({viewPortWidth:window.innerWidth,viewPortHeight:window.innerHeight},()=>{this.recomputation()});
        });
        //cannot make a call to another function that uses updated state
        this.setState({nodes});
    }

    precomputation(){
        let [viewPortHeight,viewPortWidth] = this.getViewport();
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

    recomputation(){
        let {viewPortHeight,viewPortWidth} = this.state;
        viewPortHeight *= (0.6);
        viewPortWidth *= (0.7);

        const sideLength = ((viewPortHeight*(6.5))/100)  ;
        const xNodes = parseInt(viewPortWidth/sideLength);
        const yNodes = parseInt(viewPortHeight/sideLength);

        const startX = parseInt(xNodes*(0.3));
        const startY = parseInt(yNodes*(0.5)); 
        const endX = parseInt(xNodes*(0.7));
        const endY = parseInt(yNodes*(0.5));
        const nodes = this.getInitialGrid(xNodes,yNodes,startX,startY,endX,endY);
        this.setState({startX,startY,endX,endY,xNodes,yNodes,sideLength,nodes});
    }
    
    onMouseDown = (row,col,e) =>{
        const nodes = this.state.nodes;
        if(nodes[row][col].isStart){
            this.setState({nodes,isMouseClicked:true,moveStart:true});
        }
        else if(nodes[row][col].isEnd){
            this.setState({nodes,isMouseClicked:true,moveEnd:true});
        }
        else if(e.ctrlKey){
            nodes[row][col].isWall = false;
            nodes[row][col].isVisited = false;
            nodes[row][col].weight = this.state.selectedWeight;
            nodes[row][col].isWeighted ^= 1;
            this.setState({nodes,isMouseClicked:true,isMouseClickedFor:'weight'});

        }
        else{
        nodes[row][col].isWall ^= 1;
        nodes[row][col].isWeighted = false;
        nodes[row][col].isVisited = false;
        this.setState({nodes,isMouseClicked:true,isMouseClickedFor:'wall'});
        }
    }

    onMouseEnter = (row,col,e) =>{
        const {startY,endY,startX,endX} = this.state;
        if(!this.state.isMouseClicked ){return;}
        const {nodes} = this.state;

        if(this.state.moveStart){
            nodes[row][col].isStart = true;
        }
        else if(this.state.moveEnd){
            nodes[row][col].isEnd = true;
        }
        else if(row == startY && col == startX || row == endY && col == endX){
            // do nothing
        }
        else if(e.ctrlKey && this.state.isMouseClickedFor === 'weight'){

            nodes[row][col].isWall = false;
            nodes[row][col].isVisited = false;
            nodes[row][col].weight = this.state.selectedWeight;
            nodes[row][col].isWeighted = true;
        }
        else{
        if(this.state.isMouseClickedFor !== 'wall'){return;}
        nodes[row][col].isWall = true;
        nodes[row][col].isWeighted = false;

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

    getInitialGrid(xNodes,yNodes,startX,startY,endX,endY){
        const nodes = [];
        for(let row = 0 ; row < yNodes ; row++){
            const currentRow = [];
            for(let col = 0; col < xNodes; col++){
                const currentNode = this.createNode(row,col,startX,startY,endX,endY);
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        return nodes;
    }
   
    createNode = (i,j,startX,startY,endX,endY) =>{
        
        const isStart = (j === startX && i === startY ? true : false);
        const  isEnd = j === endX && i === endY ? true : false
        const node = {
            row:i,
            col:j,
            isStart:isStart,
            isEnd:isEnd,
            isVisited:false,
            isWall:false,
            isShortestPathNode:false,
            isWeighted:false,
            weight:1,
        }
        return node;
    }

    createNewGrid = (node,renderState) =>{
        const i = node[0];
        const j = node[1];
        const {nodes,yNodes,xNodes} = this.state;
        
        if(i < yNodes && j< xNodes && i>=0 && j>=0 && !nodes[i][j].isStart){
            
            if(renderState == 0 ) { nodes[i][j].isVisited = true; nodes[i][j].isShortestPathNode = false; }
            else if(renderState == 1) {nodes[i][j].isShortestPathNode = true; nodes[i][j].isVisited = false; }
        }
        this.setState({nodes});
    }

    visualizeAlgorithm = () =>{
        this.clearPath('path');
        this.setState({pathFoundState:-1});
        const {isSelectedAlgorithm} = this.state;
        const paths = algorithmList[isSelectedAlgorithm](this.state);
        const path = paths[0];
        const shortestPath = paths[1];
        const pathFoundState = paths[2] ? 1 : 0;
        const ms = 40;
        const ms2 = 20;
        for(let i = 0;i<path.length;i++){
            setTimeout( () =>{
                this.createNewGrid(path[i],0);
            }, i*(ms));
        }
        const timeElaspsed = path.length*ms;
        for(let i = 0;i<shortestPath.length;i++){
            setTimeout( () =>{
                this.createNewGrid(shortestPath[i],1);
            }, timeElaspsed + i*(ms2));
        }
        setTimeout( ()=>{
            this.setState({pathFoundState});
        },timeElaspsed + (ms2*shortestPath.length))
    }

    selectThisAlgorithm = (algorithm) =>{

        this.setState({isSelectedAlgorithm:algorithm});
    }

    clearPath = (value) =>{
        const {nodes} = this.state;
        nodes.forEach( (row)=>{
            row.forEach((node)=>{
                if(value === 'path') { node.isVisited = false; node.isShortestPathNode = false; }
                if(value === 'walls') node.isWall = false;
                if(value === 'weights') node.isWeighted = false;
            })
        })
        this.setState({nodes});
    }

    render(){
        console.log(this.state.pathFoundState);
        const {nodes} = this.state;
        return (
            <div className="screen">
            <Header 
            onClickVisualize = {this.visualizeAlgorithm}
            clear = {this.clearPath}
            >Visualize</Header>
            <div className="mainArea">
                <AlgorithmList
                    algorithmList = {algorithmList}
                    isSelectedAlgorithm = {this.state.isSelectedAlgorithm}
                    selectThisAlgorithm = {this.selectThisAlgorithm}
                />
                <table className = {`mainGrid ${this.state.pathFoundState === 1 ? 'onPathFound' : this.state.pathFoundState === 0 ? 'onPathNotFound' : '' }`}>
                    <tbody>
                        {nodes.map( (row,i) => {
                            return <tr key = {i}>
                                {row.map((node,j) => {
                                    const {row,col,isStart,isEnd,isVisited,isWall,isShortestPathNode,weight,isWeighted} = node;
                                    return <Node 
                                        key = {`${i} + ${j}`}
                                        row = {row}
                                        col = {col}
                                        weight = {weight}
                                        isWeighted = {isWeighted}
                                        sideLength = {this.state.sideLength}
                                        isStart = {isStart}
                                        isEnd = {isEnd}
                                        isWall = {isWall}
                                        isVisited = {isVisited}
                                        isShortestPathNode = {isShortestPathNode}
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
            </div>
        )
    }
}
export default Board;
// can we not call funcions containing setState inside componentDidMount