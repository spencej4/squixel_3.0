import React, { Component } from 'react';

class CenteredSearchBar extends Component {

    componentDidMount() {
        // does nothing??
    }
   
    render() {
        //  console.log(`Input from Centered Search: ${this.props.inputValue}`);
        return (
            <div className='centered-search-bar'>
                <form id='form' className='search-form'
                    action = ""
                    method = ""
                    onSubmit={(event) => this.props.onInputSubmit(event)}
                >
                    <div className='icon icon-search'></div>
                    <input className='centered-search-input' 
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