import React,{useState,useEffect} from 'react';
import '../Styles/Dropdown.css';
import dropDownArrow from '../images/drop-down-arrow.svg'

const Dropdown = (props) =>{
    const [flag,setFlag] = useState(false);
    const [selectedItem,setSelectedItem] = useState(props.selectedItem);
    const {header,list} = props.values;
    const {setCellSize} = props.functions;
    const {setAnimation} = props.functions;
    const {setWeight} = props.functions;

    const activeFunction = header === 'Cell Size' ? setCellSize : header === 'Animation' ? setAnimation : header === 'Weight' ? setWeight : '';
    return(
        <li 
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
                    onClick ={()=>{setSelectedItem(item);setFlag(!flag);activeFunction(item)}}
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