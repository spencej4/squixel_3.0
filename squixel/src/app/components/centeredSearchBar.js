import React, { Component } from 'react';

class CenteredSearchBar extends Component {
   
    render() {
        return (
            <div className='centered-search-bar'>
                <form id='form' className='search-form'
                    action = ""
                    method = ""
                    onSubmit={(event) => this.props.onInputSubmit(event)}
                >
                    <div className='icon icon-search'></div>
                    <input className='centered-search-input' 
                        autoFocus='autofocus'
                        type='text'
                        value={this.props.value}
                        onChange={this.props.handleChange}
                    />
                </form>
            </div>
        )
    }
}

export default CenteredSearchBar