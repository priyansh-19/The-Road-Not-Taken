import React, { Component, useState } from 'react';
import '../Styles/Tutorial.css'

const Tutorial = () => {
    const [open,setOpen] = useState(true)
    return(
        open ? 
        <div className = 'tutorial'>
            <button class = 'buttonTutorial' onClick = {()=>{setOpen(false)}}>X</button>
            <div className = "container">
                <div class = "description">This is an interactive simulation that visualizes and compares pathfinding algorithms in graphs.</div>
                <div class = "description">The selected algorithm will find the path between the source and the destination</div>
                <div class = "description">The grid is customizable, you can add weights and walls to change the state of the grid</div>
                <div class = "description">Click on the Go button to simulate process</div>
            </div>
            <div class = 'commands'>
                <div>Add Wall : Click + Drag</div>
                <div>Add Weight : Ctrl + Click </div>
            </div>
        </div>
        : null
    )
}

export default Tutorial;