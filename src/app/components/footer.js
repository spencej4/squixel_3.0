import React, { Component } from 'react';

class Footer extends Component {
    
    render() {
        return (
            <div className='footer'>
                <div className='footer-container'>
                    <button className='loadMoreButton left'
                            onClick={this.props.onPreviousClick}>Load Prev
                    </button>
                    <button className='loadMoreButton right'
                            onClick={this.props.onNextClick}>Load Next
                    </button>
                </div>
            </div>
        )
    }
}

export default Footer