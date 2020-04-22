import React, {Component} from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import HeaderSearchBar from './headerSearchBar';
import CenteredSearchBarMobile from './CenteredSearchBarMobile';


class Header extends Component {

    
    render() {

        let source = 'loginMenu';

        return (
            <Router>
                <div className='header'>
                    <div>
                        <div className='logo'>
                            <li className='logoFont'><Link to='/'>SQUIXEL</Link></li>
                        </div>
                    </div>

                    <div className='searchButton' 
                        onClick={this.props.onSearchClick}>
                    </div>   

                    <HeaderSearchBar 
                        inputValue={this.props.inputValue}
                        closeSearch={() => this.props.closeSearch()}
                        handleChange={(event) =>this.props.handleChange(event)}
                        onInputSubmit={(event) => this.props.onInputSubmit(event)}
                        onClearSearchInputClick={(event) => this.props.onClearSearchInputClick(event)}
                    /> 

                    {(this.props.showSearchInput) ? ( 
                    <CenteredSearchBarMobile
                        handleChange={(e) => this.props.handleChange(e)}
                        onInputSubmit={(e) => this.props.onInputSubmit(e)}
                        onCloseSearchClick={() => this.props.onCloseSearchClick()}
                    /> ) : (null)
                    }

                        {(!this.props.isAuthenticated) ? ( 
                            <div className='dd-login-title'>
                                <div className='dd-login-button'
                                    onClick={this.props.toggleLoginMenu}>
                                </div>
                            </div>
                        ) : (null)}
                          

                        {(this.props.isAuthenticated) ? ( 
                            <div className='dd-login-title'>
                                <div className='dd-login-button-logged-in'
                                    onClick={this.props.toggleLoginMenu}>
                                </div>
                            </div>
                        ) : (null)}
                       

                        <div className='dd-login-menu hide' id='dd-login-menu' >
                            <ul className='login-options hide' id='login-options' onMouseLeave={() => this.props.closeLoginMenu()}>
                                {/* user is not logged in */}
                                {(!this.props.isAuthenticated) ? ( 
                                    <li className='login-option' onClick={() => this.props.onSignInMenuClick()}>Sign In</li>
                                ) : (null)} 
                                {(!this.props.isAuthenticated) ? ( 
                                    <hr></hr>
                                ) : (null)} 
                                {(!this.props.isAuthenticated) ? ( 
                                    <li className='login-option' onClick={() => this.props.onRegisterMenuClick()}>Register</li>
                                ) : (null)} 
                            </ul>
                            <ul className='user-options hide' id='user-options' onMouseLeave={() => this.props.closeLoginMenu()}>
                                {(this.props.isAuthenticated) ? ( 
                                    <li className='user-card' 
                                        id='user-card' 
                                        onClick={() => this.props.onViewCollectionClick()}>Logged In As: <br></br><br></br>{this.props.log_email}</li>
                                 ) : (null)} 
                                {(this.props.isAuthenticated) ? ( 
                                    <hr></hr>
                                    ) : (null)} 
                                {(this.props.isAuthenticated) ? ( 
                                    <li className='login-option' onClick={() => this.props.onViewCollectionClick(source)}>View My Collection</li>
                                 ) : (null)} 
                                {(this.props.isAuthenticated) ? ( 
                                    <hr></hr>
                                    ) : (null)} 
                                {(this.props.isAuthenticated) ? ( 
                                    <li className='login-option' onClick={() => this.props.onLogoutClick()}>Logout</li>
                                ) : (null)}
                            </ul>
                        </div>
                </div>
            </Router>
        )
    }
}

export default Header;