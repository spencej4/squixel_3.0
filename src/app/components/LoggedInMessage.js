import React, {Component} from 'react';

class LoggedInMessage extends Component {
    
    render() {
        let source = 'loggedInMessage';

        return (
            <div className='sign-in-success left'>
                <div className='sign-in-title'>You're logged in!</div>

                {/* // building login option 04/17/20 */}
                <div className='view-collection-button-container'>
                    <div className='form-row'>
                        <button type='button' 
                                className='action-btn' 
                                onClick={() => this.props.onViewCollectionClick(source)}>View Collection
                        </button>
                    </div> 
                </div> 
            </div>  



        )
    }
}

export default LoggedInMessage