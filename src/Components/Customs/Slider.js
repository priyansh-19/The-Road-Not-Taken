import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../..//Styles/Slider.css';
import Typography from '@material-ui/core/Typography';
import Slider1 from '@material-ui/core/Slider';
import { nativeTouchData } from 'react-dom/cjs/react-dom-test-utils.development';


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
            {/* <Typography id="slider-always" gutterBottom>
                Speeed
             </Typography> */}
            <input id = 'fetchme' className = 'slider-input-closed' min = {minSpeed} max = {maxSpeed}  type = "range" 
                defaultValue = {maxSpeed -props.currentSpeed}
                onChange = {(e)=>{onChange(e)}}
                onMouseDown = {(e)=>{setMouseState('down')}}
                onMouseUp = { (e) => { onMouseUp(e)} }
            />
         </form>
    )
}
export default Slider
