import React, {Component} from 'react';

class DisplaySearchInput extends Component {

    render() {
        // console.log(`Input value from DisplaySearchInput: ${this.props.inputValue}`);
        return (
            <div>
                <div className='inputTerm'>
                    <p>showing results for: <span className='inputValue'>{this.props.inputValue}</span></p>
                </div>
            </div>
        )
    }
}

export default DisplaySearchInput;