import React, { useEffect, useState } from 'react';
import Switch from './Customs/Switch';
import CustomInputForm from './Customs/Form';
import Slider from './Customs/Slider';
import DarkMode from '../Components/Customs/DarkMode';

import '../Styles/CustomsLane.css';

const CustomsLane = (props)=>{
    const {setFlippedState,setWeight,setSpeed,speed,weight,darkMode,toggleDarkMode} = props;
    const [isLaneOpen,setIsLaneOpen] = useState(false);

    const openLane = ()=>{
        let ele = document.getElementById('container-custom-lane');
        if(!isLaneOpen){
            ele.className = 'container-open';
        }
        else{
            ele.className = 'container-closed';
        }
        setIsLaneOpen(!isLaneOpen);
    }
    return (
        <div className = 'mid-area-div'>
            <div className = 'button' onClick = {openLane}>Customize</div>
            <div className = 'container-closed' id = 'container-custom-lane'>
                <Switch
                    setFlippedState = {setFlippedState}
                />
                <CustomInputForm
                    setWeight = {setWeight}
                    currentWeight = {weight}
                />
                <Slider
                    setSpeed = {setSpeed}
                    currentSpeed = {speed}
                />
            </div>
                <DarkMode
                    darkMode = {darkMode}
                    toggleDarkMode = {toggleDarkMode}
                />
        </div>
    );
}
export default CustomsLane