import React,{useState,useEffect} from 'react';
import '../Styles/Dropdown.css'

const Dropdown = (props) =>{
    const [flag,setFlag] = useState(false);
    const [selectedItem,setSelectedItem] = useState('Medium');
    const {header,list} = props.values;
    const {setCellSize} = props.functions;
    // console.log(setCellSize);
    return(
        <div className = 'dd-wrapper '>
            <div className = 'dd-header '>
                <div 
                onClick = {()=>{setFlag(!flag)}}
                className = 'dd-header-button clearButton'>{header}</div>
            </div>
            <div 
            className = {`dd-list-wrapper ${flag ? 'openList' : 'closeList'}`}>
               { 
               list.map((item)=>{
                   return(
                    <div
                    onClick ={()=>{setSelectedItem(item);setFlag(!flag);setCellSize(item)}}
                    className = 'dd-list-item-wrapper'>
                        <li className = {`dd-list-item ${selectedItem === item ? 'isSelectedItem' : ''}`}>{item}</li>
                    </div>
                   )
               })
              }
            </div>
        </div>
    )
}
export default Dropdown