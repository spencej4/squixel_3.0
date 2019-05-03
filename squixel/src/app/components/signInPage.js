import React, { Component } from 'react';

class SignInPage extends Component {

    componentDidMount() {
        // does nothing??
    }
   
    render() {
        return (
            <div className='sign-in-page'>
                <div className='sign-in left'>
                    <div className='sign-in-title'>Sign In</div>
                    <form id="sign-in-form"
                          action = " "
                          method = " "
                          onSubmit={(event) => this.props.onSignInSubmit(event)}
                    >   
                        <label>
                            Username: 
                            <br></br>
                            <input className='sign-in-input' 
                                type='text'
                                value={this.props.value}
                                onChange={(event) => this.props.handleSignInChange(event)}
                            />
                            Email: 
                            <br></br>
                            <input className='sign-in-input' 
                                type='text'
                                value={this.props.value}
                                onChange={(event) => this.props.handleSignInChange(event)}
                            />
                        </label>
                    </form>
                </div>
                <div className='register right'>
                    <div className='sign-in-title'>Register</div>
                </div>
            </div>
        )
    }
}

export default SignInPage