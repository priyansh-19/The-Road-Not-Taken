import React from 'react';
import '../Styles/Stats.css';


const Stats = (props) =>{
    const {nodesVisited,pathNodes,numberOfCells,pathWeight} = props.state1;
    return (
        <div class = 'stats'>
            <ul className = 'stats-ul'>
                <div className = 'stats-heading'>STATS</div>  

                <div className = 'list-item-div'>
                    <li className = 'item-label'>Total Nodes</li>
                    <li className = 'item-value'>{numberOfCells}</li>
                </div>   
                
                <div className = 'list-item-div'>
                    <li className = 'item-label'>Nodes Visited</li>
                    <li className = 'item-value'>{nodesVisited}</li>
                </div>

                <div className = 'list-item-div'>
                    <li className = 'item-label'>Path Nodes</li>
                    <li className = 'item-value'>{pathNodes}</li>
                </div>  

                <div className = 'list-item-div'>
                    <li className = 'item-label'>Path Weight</li>
                    <li className = 'item-value'>{pathWeight}</li>
                </div>  

              
            </ul>
        </div>
    )
}
export default Stats;