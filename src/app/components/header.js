import React, {Component} from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import SearchBar from './searchbar';
import CenteredSearchBar from './CenteredSearchBar';
import DisplaySearchInput from './displaySearchInput';


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

                        {/* delete DisplaySearchInput after integrating SearchBar as only means of search */}
                        {/* {this.props.showInputInHeader ? 
                            <DisplaySearchInput
                                inputValue={this.props.inputValue}
                            /> : null } */}

                        <div className='searchButton' 
                            onClick={this.props.onSearchClick}>
                        </div>   

                        {/* original header from 03/31/20 */}
                        {/* needed to have search icon clicked to appear...see newer SearchBar below... */}
                        {/* {this.props.showSearchInput ? 
                            <SearchBar 
                                onCloseSearchClick={() => this.props.onCloseSearchClick()}
                                closeSearch={() => this.props.closeSearch()}
                                handleChange={(event) =>this.props.handleChange(event)}
                                onInputSubmit={(event) => this.props.onInputSubmit(event)}
                                onClearSearchInputClick={() => this.props.onClearSearchInputClick()}
                            /> 
                            : null
                        } */}

                        {/* new header searchbar 03/31/20 */}
                        <SearchBar 
                            inputValue={this.props.inputValue}
                            // onCloseSearchClick={() => this.props.onCloseSearchClick()}
                            closeSearch={() => this.props.closeSearch()}
                            handleChange={(event) =>this.props.handleChange(event)}
                            onInputSubmit={(event) => this.props.onInputSubmit(event)}
                            onClearSearchInputClick={(event) => this.props.onClearSearchInputClick(event)}
                        /> 


                        {/* keep CenteredSearchBar around for mobile only... */}
                        {/* {(this.props.showSearchInput && this.props.showLandingSearchBar && !this.props.showCard && !this.props.showSignInPage && !this.props.showRegisterPage && !this.props.showUserCard) ? (  */}
                            {(this.props.showSearchInput) ? ( 
                        <CenteredSearchBar
                            handleChange={(e) => this.props.handleChange(e)}
                            onInputSubmit={(e) => this.props.onInputSubmit(e)}
                            onCloseSearchClick={() => this.props.onCloseSearchClick()}
                        /> ) : (null)
                        }


                        <div className='dd-login-title'>
                            <div className='dd-login-button'
                            onClick={this.props.toggleLoginMenu}></div>
                        </div>
                       

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