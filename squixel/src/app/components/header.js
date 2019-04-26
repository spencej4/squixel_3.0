import React, {Component} from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
// import SearchBar from './searchbar';
import DisplaySearchInput from './displaySearchInput';


class Header extends Component {
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
                        {/* <button className='searchButton' 
                            onClick={this.props.onSearchClick}>Search
                        </button>   */}
                            {/* {this.props.showSearchInput ? 
                                <SearchBar onCloseSearchClick={() =>
                                                this.props.onCloseSearchClick()
                                            }
                                            closeSearch={() => 
                                                this.props.closeSearch()
                                            }
                                            handleChange={(e) =>
                                                this.props.handleChange(e)
                                            }
                                            onInputSubmit={(event) => 
                                             this.props.onInputSubmit()
                                            }
                                /> : null
                            } */}
                </div>
            </Router>
        )
    }
}

export default Header;