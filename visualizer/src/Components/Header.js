import React from 'react';
import '../Styles/Header.css';

class Header extends React.Component {
    render(){

        return <div className = 'header'>
            <div className = 'headerOptions'>
                <div className = 'headerTitle'>  VISUALIZER</div>
            </div>
            <div className = 'headerOptions2'>
                <button onClick = {this.props.onClickVisualize}
                    className = 'goButton'
                >
                GO
                </button>
            </div>
        </div>
    }
}
export default Header;