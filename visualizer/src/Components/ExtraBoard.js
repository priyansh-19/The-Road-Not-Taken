import React from 'react';
import Node from './Node';



class Board extends React.Component {

    state = {
        nodes : [],
        sideLength:1
    }
    getViewport = () =>{

      const width = window.innerWidth;
      const height = window.innerHeight;
      return [width, height];

    }

    componentDidMount(){
        const nodes = [];
        let [viewPortWidth,viewPortHeight] = this.getViewport();
        const ratio = 3/5;
        viewPortHeight *= ratio;
        // 
        // console.log(viewPortHeight,viewPortWidth);
        const sideLength = ((viewPortHeight*8)/100)  ;
        // console.log(sideLength);
        this.setState({sideLength:sideLength});
        // console.log(this.state);
        const xNodes = parseInt(viewPortWidth/sideLength);
        const yNodes = parseInt(viewPortHeight/sideLength);
        // console.log(xNodes,yNodes);

        for(let row = 0 ; row < yNodes ; row++){
            const currentRow = [];
            for(let col = 0; col < xNodes; col++){
                const currentNode = {
                    row:row,
                    col:col
                }
                currentRow.push(currentNode);
            }
            nodes.push(currentRow);
        }
        this.setState({nodes});
    }
    // getInitialBoard();

    render(){
        const {nodes} = this.state;
        // console.log(this.state.sideLength);
        return (
            // <div style ={{width:'100px',height:'10px',backgroundColor:'steelblue'}}>
            <div className = 'mainGrid' style = {{display:'flex',flexWrap:'wrap'}}>
               {
                   nodes.map( (row,rowIndex) => {
                       return row.map((col,colIndex) => {
                           return <Node row = {rowIndex} col = {colIndex} sideLength = {this.state.sideLength}/>
                       });
                   })
               }
            
            </div>
        )
    }
}
export default Board;