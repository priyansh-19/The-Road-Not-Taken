import React from 'react';
import { useState, useEffect, useRef } from 'react';
import '../../Styles/Form.css';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const CustomInputForm = (props) =>{
    const [weight,setWeightLocal] = useState(20);
    const [showForm,setShowForm] = useState(false);

    const {setWeight} = props;
    const click = (e) =>{
        e.preventDefault();
        setWeight(parseInt(weight));
    }
    const openForm = () =>{
        // console.log(showForm)
        let ele =  document.getElementById("form-container");
        if(!showForm){
            ele.className = 'container-open-form'
        }
        else{
            ele.className = 'container-closed-form'
        }
        setShowForm(!showForm);
    }

    return (
        <form className = 'custom-input-form'>
            <div   className = 'label' onClick = {openForm}>Weight</div>
            <div className =  'container-closed-form ' id = 'form-container'>
                <input onChange = { e => {setWeightLocal(e.target.value)}}/>
                <div className = 'custom-input-form-button' onClick = {click}>Set</div>
            </div>
        </form>
    )
}
export default CustomInputForm
