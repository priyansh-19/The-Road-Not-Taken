import React from 'react';
import '../Styles/AlgorithmList.css'


class AlgorithmList extends React.Component {
    renderItems = () =>{
      
        const {algorithmList,isSelectedAlgorithm,selectThisAlgorithm} = this.props;
        const resultList =  Object.keys(algorithmList).map( (algorithm) => {
            const extraClass = isSelectedAlgorithm === algorithm ? 'isSelectedAlgorithm':'';
          
            return <li
            key = {`list-${algorithm}`}
            id = {`list-${algorithm}`}
            className = {`algorithmListItem + ${extraClass}`}
            onClick = { () => {selectThisAlgorithm(algorithm)} }
            >{algorithm}</li>
            
        });
        return resultList;

    }
    render(){
        // console.log(this.props);
        return (
            <div className = 'selectAlgorithmMain'>
                <div className = 'headerAlgorithmList'>Algorithm</div>
                <ul className = 'algorithmList'>
                    {this.renderItems()}
                </ul>
            </div>
        )
    }
}
export default AlgorithmList;