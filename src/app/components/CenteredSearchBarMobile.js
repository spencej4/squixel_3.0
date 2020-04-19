import React, { Component } from 'react';

class CenteredSearchBarMobile extends Component {
    
    constructor(props) {
        super(props);
        this.escFunction = this.escFunction.bind(this);
    }
    
    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.closeSearch();
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.escFunction, false);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.escFunction, false);
    }
    
    render() {
        return (
            <div className='centered-search-bar-mobile'>
                <button className='closeSearchButton' onClick={() =>
                        this.props.onCloseSearchClick()}>X
                </button>

                <form id='form-mobile' className='search-form-mobile'
                    action = ""
                    method = ""
                    onSubmit={(event) => this.props.onInputSubmit(event)}
                >
                    <div className='icon icon-search'></div>
                    <input className='centered-search-input-mobile' 
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

export default CenteredSearchBarMobile