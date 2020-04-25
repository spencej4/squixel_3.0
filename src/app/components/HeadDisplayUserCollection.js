import React, {Component} from 'react';

class HeadDisplayUserCollection extends Component {
    render() {
        if (this.props.loading) {
            return (
                // <div className='inputContainer'>
                //     <div className='input-term'>
                //         <p><span className='display-input-value'>{this.props.userCollectionName}</span></p>
                //     </div>
                // </div>
                null
            )
        } else if (this.props.userCollectionData.length === 0) {
            return (
                <div className='inputContainer'>
                    <div className='input-term'>
                        <p><span className='display-input-value'>{this.props.userCollectionName}</span></p>
    
                        <div className='noResultsContainer'>
                            <h1 className='no-results-message'>...is empty</h1>
                        </div>
                    </div>
                </div>
            )
        }else {
            return (
                <div className='inputContainer'>
                    <div className='input-term'>
                        <p><span className='display-input-value'>{this.props.userCollectionName}</span></p>
                    </div>
                </div>
            )
        }
    }
}

export default HeadDisplayUserCollection ;