import React from 'react';
import '../Styles/Header.css';
import Dropdown from './Dropdown'

class Header extends React.Component {
    render(){
        // console.log(this.props)

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

                        <Dropdown
                            functions = {{setCellSize : this.props.setCellSize,}} 
                            values = {{header:'Cell Size', list:['Small','Medium','Large'] } }
                            class = 'clearButton'
                        />
                        <Dropdown
                            functions = {{setCellSize : this.props.setCellSize,}} 
                            values = {{header:'Weight', list:['Small','Medium','Large'] } }
                            class = 'clearButton'
                        />
                        <Dropdown
                            functions = {{setCellSize : this.props.setCellSize,}} 
                            values = {{header:'Animation', list:['Small','Medium','Large'] } }
                            class = 'clearButton'
                        />

                       
                 </div>

            </ul>
        </div>
    }
}
export default Header;