import React, {Component} from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import SearchBar from './searchbar';
import CenteredSearchBar from './centeredSearchBar';
import DisplaySearchInput from './displaySearchInput';


class Header extends Component {
    // constructor(props) {
    //     super(props);
    // }

    
    render() {
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
                        <div className='searchButton' 
                            onClick={this.props.onSearchClick}>
                        </div>   
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
                                            //  right fucking here, forgot to include event param to input submit function
                                            }
                                /> : null
                            }
                        {(!this.props.showSearchInput && !this.props.showCard && !this.props.showSignInPage && !this.props.showRegisterPage && !this.props.showUserCard) ? ( 
                                <CenteredSearchBar
                                    handleChange={(e) => this.props.handleChange(e)}
                                    onInputSubmit={(e) => this.props.onInputSubmit(e)}
                                /> ) : (null)}
                        <div className='dd-login-title'>
                            <div className='dd-login-button'
                            onClick={this.props.toggleLoginMenu}></div>
                        </div>
                        <div className='dd-login-menu hide' id='dd-login-menu'>
                            <ul className='login-options'>
                                {/* user is not logged in */}
                                {(!this.props.isAuthenticated) ? ( 
                                    <li className='login-option' onClick={() =>
                                        this.props.onSignInMenuClick()
                                    }>Sign In</li>
                                ) : (null)} 
                                {(!this.props.isAuthenticated) ? ( 
                                    <hr></hr>
                                ) : (null)} 
                                {(!this.props.isAuthenticated) ? ( 
                                    <li className='login-option' onClick={() => 
                                        this.props.onRegisterMenuClick()
                                    }>Register</li>
                                ) : (null)} 
                                
                                {/*  user is logged in, show appropriate menu options*/}
                                {(this.props.isAuthenticated) ? ( 
                                    <li className='login-option' onClick={() => 
                                        this.props.onViewCollectionClick()
                                    }>View My Collection</li>
                                 ) : (null)} 
                                {(this.props.isAuthenticated) ? ( 
                                    <hr></hr>
                                    ) : (null)} 
                                {(this.props.isAuthenticated) ? ( 
                                    <li className='login-option' onClick={() => 
                                        this.props.onLogoutClick()
                                    }>Logout</li>
                                ) : (null)} 
                            </ul>
                        </div>
                </div>
            </Router>
        )
    }
}

export default Header;