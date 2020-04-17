import React, { Component } from 'react';
import SignInForm from './SignInForm';
import LoggedInMessage from './LoggedInMessage';

class SignInPage extends Component {
   
    render() {
        return (
            <div className='sign-in-page'>
                { (!this.props.isAuthenticated && !this.props.loading) ? 
                    (<SignInForm
                        handleSignInChange = {this.props.handleSignInChange}
                        onLoginSubmit = {this.props.onLoginSubmit}
                        loginError= {this.props.loginError}
                        // building 04/17/20
                        onViewCollectionClick= {this.props.onViewCollectionClick}
                        loading={this.props.loading}
                        >
                    </SignInForm>) : <LoggedInMessage
                                        onViewCollectionClick={this.props.onViewCollectionClick}
                                     >
                                    </LoggedInMessage>}
                <div className='register right'>
                    <div className='sign-in-title'>Register</div>
                    <div className='float-right-sign-in-page-container'>
                        <button onClick={this.props.toggleLoginPage} className='action-btn'>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignInPage