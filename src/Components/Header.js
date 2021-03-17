import React from 'react';
import '../Styles/Header.css';

class Header extends React.Component {
    render(){

        return <div className = 'header'>
            <div className = 'headerOptions'>
                <div className = 'headerTitle'>  VISUALIZER</div>
            </div>
            <ul className = 'headerOptions2'>

               <div className = 'leftHeader2'>
               <li
                onClick = { () => {this.props.clear('path')}}
                className = 'clearButton'
                > Clear Path </li>

               <li
                onClick = {() =>{this.props.clear('walls')}}
                className = 'clearButton'
                > Clear Walls </li>

                <li
                onClick = {() =>{this.props.clear('weights')}}
                className = 'clearButton'
                > Clear Weights </li>
               </div>
                
                <li 
                onClick = {this.props.onClickVisualize}
                className = 'goButton'
                > GO </li>

                <div className = 'rightHeader2'>
                    
                </div>

            </ul>
        </div>
    }
}
export default Header;