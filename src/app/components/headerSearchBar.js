import React, { Component } from 'react';

class HeaderSearchBar extends Component {

    constructor(props) {
        super(props);
        this.escFunction = this.escFunction.bind(this);
        this.state={
            input: this.props.inputValue
        }
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
        let clearInputFieldButton;
        // conditional rendering of clearInputbutton
        // cool!
        if (this.props.inputValue !== "") {
            clearInputFieldButton = <button className='clearSearchInputButton' type='button' onClick={(event) =>
                this.props.onClearSearchInputClick(event)}>X
            </button>
        } else {
            clearInputFieldButton = "";
        }

            return (
                // orignal <div className='searchScreen'>
                <div className='headerSearch'>
                    <form id="form-header"
                          className='search-form-header'
                          action = " "
                          method = " "
                          onSubmit={(event) => this.props.onInputSubmit(event)}
                    >
                        <div className='icon icon-search'></div>
                        <input className='header-search-input' 
                            autoFocus='autofocus'
                            type='text'
                            placeholder="Search free high-resolution photos"
                            // value={this.props.value}
                            value={this.props.inputValue}
                            onChange={(event) => this.props.handleChange(event)}
                        />
                        {clearInputFieldButton}
                    </form>
                </div>
                
            )
    }
}

export default HeaderSearchBar;