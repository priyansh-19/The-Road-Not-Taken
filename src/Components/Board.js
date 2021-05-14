import React from 'react';
import Node from './Node';
import '../Styles/Board.css'
import Header from './Header'
import AlgorithmList from './AlgorithmList';
import Stats from './Stats';
import CustomsLane from '../Components/CustomsLane';
import {algorithmBFS} from '../Algorithms/BFS';
import {algorithmDFS} from '../Algorithms/DFS';
import { algorithmDijkstras } from '../Algorithms/Dijkstras';
import {algorithmAstar} from '../Algorithms/Astar';
import {algorithmBellmanFord} from '../Algorithms/BellmanFord';
import {algorithmSPFA} from '../Algorithms/SPFA';
import {algorithmBFS2D} from '../Algorithms/BFS2D';


const algorithmList = {
Dijkstras:algorithmDijkstras,
BFS:algorithmBFS,
DFS:algorithmDFS,
Astar:algorithmAstar,
BellmanFord : algorithmBellmanFord,
SPFA : algorithmSPFA,
BFS2D : algorithmBFS2D,
};
const cellSizeMap = {
    Small: 1,
    Medium : 1.25,
    Large : 1.7
}
const speedMap = {
    'Slow' : 50,
    'Medium' : 35,
    'Fast' : 10,
    'Instant' : -1,
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
            isSelectedAlgorithm:'BFS',
            viewPortWidth:window.innerWidth,
            viewPortHeight:window.innerHeight,
            pathFoundState : -1,
            message:'',

            nodesVisited : 0,
            pathNodes : 0,
            numberOfCells : xNodes*yNodes,
            pathWeight:0,
            isThereWeight : false,
            isThereNegativeWeight:false,
            renderInstantPath : false,
            isPathVisualized : false,
            isSpeedCustom : false,
            isVisualizing : false,
            isTableFlipped : false,
            darkMode : false,


            cellSize : 'Medium',
            animation : 'Max',
            weight : 2,
            speed : 20,
            shortestPathSpeed : 30,
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
            nodes[row][col].weight = this.state.weight;
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
        // e.preventDefault();
        const {startY,endY,startX,endX} = this.state;
        if(!this.state.isMouseClicked ){return;}
        const {nodes} = this.state;

        if(this.state.moveStart && !nodes[row][col].isWeighted && !nodes[row][col].isEnd){
            // nodes[row][col].isWeighted = false;
            // nodes[row][col].weight = 1;
            nodes[row][col].isStart = true;
            if(this.state.isPathVisualized){
                this.setState({nodes,startY:row,startX:col,renderInstantPath:true});
                this.visualizeAlgorithm(true,true);
            }
            else{
                this.setState({nodes,startY:row,startX:col});
            }
        }
        else if(this.state.moveEnd){
            nodes[row][col].isWeighted = false;
            nodes[row][col].weight = 1;
            nodes[row][col].isEnd = true;
            if(this.state.isPathVisualized){
                this.setState({nodes,endY:row,endX:col,renderInstantPath:true});
                this.visualizeAlgorithm(true,true);
            }
            else{
                this.setState({nodes,endY:row,endX:col});
            }

        }
        else if( (row === startY && col === startX) || (row === endY && col === endX) ){
            // do nothing
        }
        else if(e.ctrlKey && this.state.isMouseClickedFor === 'weight'){

            nodes[row][col].isWall = false;
            nodes[row][col].isVisited = false;
            nodes[row][col].weight = this.state.weight;
            nodes[row][col].isWeighted = true;
        }
        else{
            if(this.state.isMouseClickedFor === 'wall'){
                nodes[row][col].isWall = true;
                nodes[row][col].isWeighted = false;
            }
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
            isVisitedTarget:false,
            isWall:false,
            isShortestPathNode:false,
            isWeighted:false,
            weight: 1,
        }
        return node;
    }

    createNewGrid = async (path,renderState,comparisons, renderAtOnce = false) =>{
        let {nodes,nodesVisited,pathNodes,pathWeight} = this.state;


            for(let node of path){
                let i = node[0];
                let j = node[1];
                const type = node.length == 3 ? node[2] : 0;

                    if(this.state.isVisualizing === false){return ;}
                    if(renderState === 0 ) { if(type == 0)nodes[i][j].isVisited = true; if(type == 1) nodes[i][j].isVisitedTarget = true; nodes[i][j].isShortestPathNode = false; nodesVisited++; }
                    else if(renderState === 1) {nodes[i][j].isShortestPathNode = true; nodes[i][j].isVisited = false; nodes[i][j].isVisitedTarget = false;pathNodes++; pathWeight += nodes[i][j].weight;}
                    if(comparisons!=-1)nodesVisited = comparisons;

                    if(!renderAtOnce){
                        let delayPath = this.state.speed;
                        let delayShortestPath = this.state.shortestPathSpeed;
                        let delay = renderState === 0 ? delayPath : delayShortestPath;
                        this.setState({nodes,nodesVisited,pathNodes,pathWeight});
                        await new Promise(r => setTimeout(r,delay));
                    }
            }
            this.setState({nodes,nodesVisited,pathNodes,pathWeight,isPathVisualized:true});
            return (renderState === 1);
    
    }

    visualizeAlgorithm = async (event, isMoved) =>{
        

        await this.clearPath('Path');
        if(!isMoved) this.setState({pathFoundState:-1,renderInstantPath:false,isVisualizing:false});
        const {isSelectedAlgorithm} = this.state;
        const paths = algorithmList[isSelectedAlgorithm](this.state);
        const path = paths[0];
        const shortestPath = paths[1]; 
        const pathFoundState = paths[2] ? 1 : 0;
        const comparisons = paths.length == 4 ? paths[3] : -1;
        if(pathFoundState){shortestPath.push([this.state.endY,this.state.endX]);shortestPath.unshift([this.state.startY,this.state.startX]); }

            this.setState({isVisualizing:true});
            await this.createNewGrid(path,0,comparisons,this.state.renderInstantPath || this.state.speed == -1);
            let res = await this.createNewGrid(shortestPath,1,comparisons,this.state.renderInstantPath || this.state.speed === -1);
            // if(res) this.setState({pathFoundState:1})
            this.setState({isVisualizing:false,pathFoundState:res})
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
        let x ;

        if(typeof(weight) === 'string'){
            x = parseInt(weight.slice(0,-1));
        }
        else{
            x = weight;
        }
        this.setState({weight:x});
    }
    setSpeed = (speed) =>{
        if(speed === 'Custom'){
            this.setState({isSpeedCustom:true,})
        }
        else{
            let x = speed;
            x = (typeof(speed) === 'number') ? speed : speedMap[speed];
            let y = typeof(speed) !== 'string' ;
            let z = speed === 'Instant' ? 'None' : 'Max';
            this.setState({speed:x,isSpeedCustom : y,animation : z})
        }
        
    }
    stopVisualizing = () =>{
        this.setState({isVisualizing:false})
    }
    toggleDarkMode = () =>{
        this.setState({darkMode:!this.state.darkMode});
    }
    setFlippedState = (isFlipped) =>{
        this.setState({isTableFlipped:isFlipped});
    }
    clearPath =  async (value) =>{
        let {nodes} = this.state;
        nodes.forEach( (row)=>{
            row.forEach((node)=>{
                if(value === 'Path') { node.isVisited = false; node.isVisitedTarget = false; node.isShortestPathNode = false; }
                if(value === 'Walls') node.isWall = false;
                if(value === 'Weights') {node.isWeighted = false; node.weight = 1;}
                if(value === 'All'){node.isWall = false;node.isWeighted =false;node.weight =1;node.isVisited = false;node.isVisitedTarget = false;node.isShortestPathNode=false;}
            })
        });
        this.setState({nodes,nodesVisited:0,pathNodes:0,pathWeight:0,isPathVisualized:false,isVisualizing:false});
        
       if(this.state.speed === -1 && (!this.state.renderInstantPath)) await new Promise(r => setTimeout(r,));
    }
    render(){
        const {nodes} = this.state;
        const classForGrid = (this.state.darkMode) ? 'mainGrid-dark' : 'mainGrid';
        return (
            <div className="screen">
            <Header 
                onClickVisualize = {this.visualizeAlgorithm}
                clear = {this.clearPath}
                animation = {this.state.animation}
                setCellSize = {this.setCellSize}
                setAnimation = {this.setAnimation}
                setWeight = {this.setWeight}
                setSpeed = {this.setSpeed}
                stopVisualizing = {this.stopVisualizing}
                isVisualizing = {this.state.isVisualizing}
            >Visualize</Header>
            {/* <div onClick = {()=>{this.setState({isTableFlipped:!(this.state.isTableFlipped)})}}>FLIP</div> */}
            <CustomsLane 
                setSpeed = {this.setSpeed}
                setWeight = {this.setWeight}
                setFlippedState = {this.setFlippedState}
                speed = {this.state.speed}
                weight = {this.state.weight}
                darkMode = {this.state.darkMode}
                toggleDarkMode = {this.toggleDarkMode}
            />
           
            <div className="mainArea">
                
                <AlgorithmList
                    algorithmList = {algorithmList}
                    isSelectedAlgorithm = {this.state.isSelectedAlgorithm}
                    selectThisAlgorithm = {this.selectThisAlgorithm}
                />
                <table className = {`${classForGrid}  ${this.state.pathFoundState === true ? 'onPathFound' : this.state.pathFoundState === 0 ? 'onPathNotFound' : ''}`}>
                    {/* <div class = 'messageToUser' >{this.state.message}</div> */}
                    <tbody className = "table-body">
                        {nodes.map( (row,i) => {
                            return <tr key = {i}>
                                {row.map((node,j) => {
                                    const {row,col,isStart,isEnd,isVisited,isVisitedTarget,isWall,isShortestPathNode,weight,isWeighted} = node;
                                    return<Node 
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
                                        isVisitedTarget = {isVisitedTarget}
                                        isShortestPathNode = {isShortestPathNode}
                                        onMouseDown = {this.onMouseDown}
                                        onMouseEnter = {this.onMouseEnter}
                                        onMouseLeave = {this.onMouseLeave}
                                        onMouseUp = {this.onMouseUp}
                                        animation = {this.state.renderInstantPath ? 'None' : this.state.animation}
                                        isTableFlipped = {this.state.isTableFlipped}
                                        darkMode = {this.state.darkMode }
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