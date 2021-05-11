import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../Styles/Slider.css'

const Slider = (props) =>{
    
    const {setSpeed} = props
    const [sliderVal,setSliderVal] = useState(50);
    const[mouseState, setMouseState] = useState('up');
    const[showSlider,setShowSlider] = useState(false);
    const maxSpeed = 300;
    const minSpeed = 1;
    const onChange = (e) =>{
        e.preventDefault();
        setSliderVal(e.target.value);
    }
    const onMouseUp = (e)=>{
        e.preventDefault();
        setMouseState('up');
        setSpeed(maxSpeed - parseInt(sliderVal));
    }
    const toggleSlider = () =>{
        let ele =  document.getElementById("fetchme");
        if(!showSlider){
            ele.className = 'slider-input-open'
        }
        else{
            ele.className = 'slider-input-closed'
        }
        setShowSlider(!showSlider);
    }
    return (
        <form class = 'slider-form'>
            <div class = 'slider-button' onClick = {toggleSlider}>Speed</div>
            <input id = 'fetchme' className = 'slider-input-closed' min = {minSpeed} max = {maxSpeed}  type = "range" 
                value = {maxSpeed -props.currentSpeed}
                onChange = {(e)=>{onChange(e)}}
                onMouseDown = {(e)=>{setMouseState('down')}}
                onMouseUp = { (e) => { onMouseUp(e)} }
            />
         </form>
    )
}
export default Slider
