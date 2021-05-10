import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../Styles/Form.css'

const CustomInputForm = (props) =>{
    const [delay,setDelay] = useState(20);
    const {setSpeed} = props;
    // const click = () =>{
    //     console.log('clicked');
    // }

    return (
        <form class = 'custom-input-form'>
            <div class = 'custom-input-form-label'>Custom Delay</div>
            <input onChange = { e => {setDelay(e.target.value);console.log(delay)}}/>
            {/* <div class = 'identifier form'>ms</div> */}
            <div class = 'custom-input-form-button' onClick = {()=>{setSpeed(parseInt(delay));}}>Set</div>
        </form>
    )
}
export default CustomInputForm
