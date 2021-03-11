import React from 'react';
import Node from './Node';
import '../Styles/Board.css'


class Board extends React.Component {

    state = {
        nodes : [],
        sideLength:1,
        startNodeX:0,
        endNodeX:0,
        nodeY:0
    }
    getViewport = () =>{

      const width = window.innerWidth;
      const height = window.innerHeight;
      return [width, height];

    }

    componentDidMount(){
        const nodes = [];
        let [viewPortWidth,viewPortHeight] = this.getViewport();
        viewPortHeight *= (0.6);
        viewPortWidth *= (0.8);

        const sideLength = ((viewPortHeight*8)/100)  ;
        this.setState({sideLength:sideLength});
     ;
        const xNodes = parseInt(viewPortWidth/sideLength);
        const yNodes = parseInt(viewPortHeight/sideLength);

        const startNodeX = parseInt(xNodes*(0.3));
        const endNodeX = parseInt(xNodes*(0.7));
        const nodeY = parseInt(yNodes*(0.5));
        console.log(startNodeX,endNodeX,nodeY);
        this.setState({startNodeX,endNodeX,nodeY});

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
            <table className = 'mainGrid'>
                <tbody>
                    {nodes.map( (row,i) => {
                        return <tr>
                            {row.map((node,j) => {
                                return <Node row = {i} 
                                    col = {j}
                                    sideLength = {this.state.sideLength}
                                    isStart = {j==this.state.startNodeX && i == this.state.nodeY ? true : false}
                                    isEnd = { j ==this.state.endNodeX && i == this.state.nodeY ? true : false}
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