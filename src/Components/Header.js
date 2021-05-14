import React from 'react';
import '../Styles/Header.css';
import Dropdown from './Dropdown'

class Header extends React.Component {
    render(){
        // console.log(this.props)

        return <div className = 'header'>
            <div className = 'headerOptions'>
                <div className = 'headerTitle'>  The Road Not Taken</div>
            </div>
            <ul className = 'headerOptions2'>

               <div className = 'leftHeader2'>
                    <li
                        onClick = { () => {this.props.clear('Path')}}
                        className = 'clearButton'
                        > Clear Path </li>

                    {/* <li
                        onClick = {() =>{this.props.clear('Walls')}}
                        className = 'clearButton'
                        > Clear Walls </li> */}

                        <Dropdown
                            functions = {{setSpeed:this.props.setSpeed,}}
                            values = {{header:'Speed',list:['Slow','Medium','Fast','Instant']}}
                            selectedItem = 'Fast'
                            class = 'clearButton'
                        />

                        <Dropdown
                            functions = {{clear:this.props.clear}}
                            values = {{header:'Clear',list:['All','Path','Walls','Weights']}}
                            selectedItem = 'Path'
                            class = 'clearButton'
                        />
               </div>
                
                <li 
                    onClick = {this.props.isVisualizing ? this.props.stopVisualizing : this.props.onClickVisualize}
                    className = {`${ this.props.isVisualizing ? 'X' : 'go'}Button`}
                > {this.props.isVisualizing ? 'X' : 'Go'} </li>

                <div className = 'rightHeader2'>

                        <Dropdown
                            functions = {{setCellSize : this.props.setCellSize,}} 
                            values = {{header:'Cell Size', list:['Small','Medium','Large'] } }
                            selectedItem = 'Medium'
                            class = 'clearButton'
                        />
                        <Dropdown
                            functions = {{setWeight : this.props.setWeight,}} 
                            values = {{header:'Weight', list:['2x','4x','6x','10x'] } }
                            selectedItem = '2x'
                            class = 'clearButton'
                        />
                        <Dropdown
                            functions = {{setAnimation : this.props.setAnimation,}} 
                            values = {{header:'Animation', list:['Low','Medium','Max','None'] } }
                            selectedItem = {this.props.animation}
                           
                        />

                       
                 </div>

            </ul>
        </div>
    }
}
export default Header;