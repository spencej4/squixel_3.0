import React, {Component} from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import SearchBar from './searchbar';
import DisplaySearchInput from './displaySearchInput';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginMenuVisible: false
        }
        
        this.toggleLoginMenu = this.toggleLoginMenu.bind(this);
    }

    toggleLoginMenu() {
        console.log('dd menu triggered');
        let loginMenu = document.getElementById('dd-login-menu');
        if (this.state.loginMenuVisible === false) {
            this.setState({
                loginMenuVisible: true
            })
            loginMenu.classList.remove('hide');
            loginMenu.classList.add('show');
        }
        else if (this.state.loginMenuVisible === true) {
            this.setState({
                loginMenuVisible: false
            })
            loginMenu.classList.remove('show');
            loginMenu.classList.add('hide');
        }
        
    }

    render() {
        // console.log(`Input from Header: ${this.props.inputValue}`);
        return (
            <Router>
                <div className='header'>
                    <div>
                        <div className='logo'>
                            <li className='logoFont'><Link to='/'>SQUIXEL</Link></li>
                        </div>
                    </div>
                   {this.props.showInputInHeader ? <DisplaySearchInput
                    inputValue={this.props.inputValue}
                    /> : null }
{/* here */}
                        <button className='searchButton' 
                            onClick={this.props.onSearchClick}>Search
                        </button>   
                             {this.props.showSearchInput ? 
                                <SearchBar onCloseSearchClick={() =>
                                                this.props.onCloseSearchClick()
                                            }
                                            closeSearch={() => 
                                                this.props.closeSearch()
                                            }
                                            handleChange={(event) =>
                                                this.props.handleChange(event)
                                            }
                                            onInputSubmit={(event) => 
                                             this.props.onInputSubmit(event)
                                            //  right fucking here, forget to include event param to input submit function
                                            }
                                /> : null
                            }
{/* to here */}
                        <div className='dd-login-title'>
                            <div className='dd-login-button'
                            onClick={this.toggleLoginMenu}></div>
                        </div>
                        <div className='dd-login-menu hide' id='dd-login-menu'>
                            <ul className='login-options'>
                                <li className='login-option'>Sign In</li>
                                <hr></hr>
                                <li className='login-option'>Register</li>
                            </ul>
                        </div>
                </div>
            </Router>
        )
    }
}

export default Header;