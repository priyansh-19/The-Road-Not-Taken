import React,{useState,useEffect,useRef} from 'react';
import '../Styles/Dropdown.css';
import dropDownArrow from '../images/drop-down-arrow.svg'
import Slider from './Customs/Slider'

const Dropdown = (props) =>{
    const [flag,setFlag] = useState(false);
    const [selectedItem,setSelectedItem] = useState(props.selectedItem);
    const {header,list} = props.values;
    const {setCellSize} = props.functions;
    const {setAnimation} = props.functions;
    const {setSpeed} = props.functions;
    const {clear} = props.functions;
    const {setWeight} = props.functions;
    const ref = useRef(null);
   
    //event bubbling has been used here
    useEffect( ()=>{
        document.body.addEventListener('click',(event)=>{
            if(ref.current && ref.current.contains(event.target)){return;}
            setFlag(false);
        })
    },[flag]);

    const activeFunction = header === 'Cell Size' ? setCellSize : header === 'Animation' ? setAnimation : header === 'Weight' ? setWeight : header == 'Clear' ? clear : header ==='Speed'? setSpeed : '';
    return(
        <li 
        ref = {ref}
        onClick = {()=>{setFlag(!flag)}}
        className = 'clearButton dd-wrapper'>
               {header}
               <img class = 'drop-down-svg' src = {dropDownArrow}/>
            <div
            className = {`dd-list-wrapper ${flag ? 'openList' : 'closeList'}`}>
               { 
               list.map((item)=>{
                  
                   return(
                    <div
                    //set selection takes time, hence used props.selectedItem == item 
                    onClick ={()=>{setSelectedItem(item); activeFunction(item)}}
                    className = 'dd-list-item-wrapper'>
                        <li className = {`dd-list-item ${selectedItem === item ? 'isSelectedItem' : ''}`}>{item}</li>       
                    </div>
                   )
               })
              }
            </div>
        </li>
    )
}
export default Dropdown