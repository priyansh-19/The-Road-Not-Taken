import React from 'react';
import Node from './Node';
import '../Styles/Board.css'
import Header from './Header'
import AlgorithmList from './AlgorithmList';
import Stats from './Stats'
import {algorithmBFS} from '../Algorithms/BFS';
import {algorithmDFS} from '../Algorithms/DFS';
import { algorithmDijkstras } from '../Algorithms/Dijkstras';
import {algorithmAstar} from '../Algorithms/Astar';
import {algorithmBellmanFord} from '../Algorithms/BellmanFord';
import {algorithmSPFA} from '../Algorithms/SPFA';


const algorithmList = {
Dijkstras:algorithmDijkstras,
BFS:algorithmBFS,
DFS:algorithmDFS,
Astar:algorithmAstar,
BellmanFord : algorithmBellmanFord,
SPFA : algorithmSPFA,
};
const cellSizeMap = {
    Small: 1,
    Medium : 1.25,
    Large : 1.7
}
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
            isMouseClicked:false,
            isMouseClickedFor:'',
            moveStart:false,
            moveEnd:false,
            isSelectedAlgorithm:'BellmanFord',
            viewPortWidth:window.innerWidth,
            viewPortHeight:window.innerHeight,
            pathFoundState : -1,
            message:'',

            nodesVisited : 0,
            pathNodes : 0,
            numberOfCells : xNodes*yNodes,
            pathWeight:0,

            cellSize : 'Medium',
            animation : 'Max',
            weight : '2x',
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
        viewPortWidth *= (0.6);
        const Multiplier = cellSizeMap['Medium'];
        const maxValue = Math.max(viewPortHeight,viewPortWidth);
        const sideLength = ((maxValue*(3.2))/100)*Multiplier  ;
        const xNodes = parseInt(viewPortWidth/sideLength);
        const yNodes = parseInt(viewPortHeight/sideLength);

        const startX = parseInt(xNodes*(0.3)) ;
        const startY = parseInt(yNodes*(0.5)) -1; 
        const endX = parseInt(xNodes*(0.7)) ;
        const endY = parseInt(yNodes*(0.5)) -1;
        return {startX,startY,endX,endY,xNodes,yNodes,sideLength};
    }

    recomputation(){
        console.log(this.state.animation)
        let {viewPortHeight,viewPortWidth,cellSize,numberOfCells} = this.state;
        const Multiplier = cellSizeMap[cellSize];
        viewPortHeight *= (0.6);
        viewPortWidth *= (0.6);
        const maxValue = Math.max(viewPortHeight,viewPortWidth);
        const sideLength = ((maxValue*(3.2))/100)*Multiplier  ;
        const xNodes = parseInt(viewPortWidth/sideLength);
        const yNodes = parseInt(viewPortHeight/sideLength);

        const startX = parseInt(xNodes*(0.3));
        const startY = parseInt(yNodes*(0.5)) -1; 
        const endX = parseInt(xNodes*(0.7));
        const endY = parseInt(yNodes*(0.5)) -1;
        const nodes = this.getInitialGrid(xNodes,yNodes,startX,startY,endX,endY);
        numberOfCells = xNodes*yNodes;

        this.setState({startX,startY,endX,endY,xNodes,yNodes,sideLength,nodes,cellSize,numberOfCells});
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
            nodes[row][col].weight = parseInt(this.state.weight.slice(0,-1));
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
        else if( (row === startY && col === startX) || (row === endY && col === endX) ){
            // do nothing
        }
        else if(e.ctrlKey && this.state.isMouseClickedFor === 'weight'){

            nodes[row][col].isWall = false;
            nodes[row][col].isVisited = false;
            nodes[row][col].weight = parseInt(this.state.weight.slice(0,-1));
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
            weight: 1,
        }
        return node;
    }

    createNewGrid = (node,renderState,comparisons) =>{
        const i = node[0];
        const j = node[1];
        let {nodes,yNodes,xNodes,nodesVisited,pathNodes,pathWeight} = this.state;
        
        if(i < yNodes && j< xNodes && i>= 0 && j>=0 ){
            
            if(renderState === 0 ) { nodes[i][j].isVisited = true; nodes[i][j].isShortestPathNode = false; nodesVisited++; }
            else if(renderState === 1) {nodes[i][j].isShortestPathNode = true; nodes[i][j].isVisited = false; pathNodes++; pathWeight += nodes[i][j].weight;}
            if(comparisons!=-1)nodesVisited = comparisons;

        }
        this.setState({nodes,nodesVisited,pathNodes,pathWeight});
    }

    visualizeAlgorithm = () =>{
        this.clearPath('path');
        this.setState({pathFoundState:-1});
        const {isSelectedAlgorithm} = this.state;
        const paths = algorithmList[isSelectedAlgorithm](this.state);
        const path = paths[0];
        const shortestPath = paths[1]; 
        const pathFoundState = paths[2] ? 1 : 0;
        // const comparisons = (isSelectedAlgorithm == 'BellmanFord' && pathFoundState) ? paths[3] : 0;
        const comparisons = paths.length == 4 ? paths[3] : -1;
        if(pathFoundState){shortestPath.push([this.state.endY,this.state.endX]); }
        const ms = 40;
        const ms2 = 30;
        for(let i = 0;i<path.length;i++){
            setTimeout( () =>{
                this.createNewGrid(path[i],0,comparisons);
            }, i*(ms));
        }
        const timeElaspsed = path.length*ms;
        for(let i = 0;i<shortestPath.length;i++){
            setTimeout( () =>{
                this.createNewGrid(shortestPath[i],1,comparisons);
            }, timeElaspsed + i*(ms2));
        }
        setTimeout( ()=>{
            const message = pathFoundState ? 'Target is Reachable' : 'Target is Unreachable';
            this.setState({pathFoundState,message});
        },timeElaspsed + (ms2*shortestPath.length))
    }

    selectThisAlgorithm = (algorithm) =>{

        this.setState({isSelectedAlgorithm:algorithm});
    }

    setMessage = (message) =>{
        this.setState({message});
    }
    setCellSize = (cellSize) =>{
       this.recomputation(cellSize);
    // if(cellSize == 'Small')
    //     this.setState({cellSize,animation:'Low'},()=>{this.recomputation()})
    // else
    this.setState({cellSize},()=>{this.recomputation()})
    }
    setAnimation = (animation) => {
        this.setState({animation});
    }
    setWeight = (weight) =>{
        this.setState({weight});
    }

    clearPath = (value) =>{
        const {nodes} = this.state;
        nodes.forEach( (row)=>{
            row.forEach((node)=>{
                if(value === 'path') { node.isVisited = false; node.isShortestPathNode = false; }
                if(value === 'walls') node.isWall = false;
                if(value === 'weights') {node.isWeighted = false; node.weight = 1;}
            })
        })
        
        this.setState({nodes,nodesVisited:0,pathNodes:0,pathWeight:0,message:''});
    }

    render(){
        // console.log('full rerender');
        const {nodes} = this.state;
        return (
            <div className="screen">
            <Header 
            onClickVisualize = {this.visualizeAlgorithm}
            clear = {this.clearPath}
            animation = {this.state.animation}
            setCellSize = {this.setCellSize}
            setAnimation = {this.setAnimation}
            setWeight = {this.setWeight}
            >Visualize</Header>
            <div className="mainArea">
                <AlgorithmList
                    algorithmList = {algorithmList}
                    isSelectedAlgorithm = {this.state.isSelectedAlgorithm}
                    selectThisAlgorithm = {this.selectThisAlgorithm}
                />
                <table className = {`mainGrid onChangeMainGrid ${this.state.pathFoundState === 1 ? 'onPathFound' : this.state.pathFoundState === 0 ? 'onPathNotFound' : ''}`}>
                    {/* <div class = 'messageToUser' >{this.state.message}</div> */}
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
                                        animation = {this.state.animation}
                                    />
                                    })
                                }
                            </tr>
                        })}
                    </tbody>
                </table>
                <Stats state1 = {this.state} />
            </div>
            </div>
        )
    }
}
export default Board;
// can we not call funcions containing setState inside componentDidMount