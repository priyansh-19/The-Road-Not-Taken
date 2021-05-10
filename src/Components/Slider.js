import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../Styles/Slider.css'

const Slider = (props) =>{
    
    const {setSpeed} = props
    const [sliderVal,setSliderVal] = useState(50);
    const[mouseState, setMouseState] = useState('up');

    const onChange = (e) =>{
        e.preventDefault();
        setSliderVal(e.target.value);
    }
    const onMouseUp = (e)=>{
        e.preventDefault();
        setMouseState('up');
        setSpeed(parseInt(sliderVal));
    }
    return (
        <form class = 'slider-form'>
            <input class = 'slider-input' min = '1' max = '100'  type = "range" 
                onChange = {(e)=>{onChange(e)}}
                onMouseDown = {(e)=>{setMouseState('down')}}
                onMouseUp = { (e) => { onMouseUp(e)} }
            />
         </form>
    )
}
export default Slider
