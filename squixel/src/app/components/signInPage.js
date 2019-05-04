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
                    <div className='form-row'>
                        <label>
                            Email:
                            <br></br>
                            <input className='sign-in-input' 
                                id='email'
                                name='email'
                                type='Email'
                                value={this.props.value}
                                placeholder='Email'
                                onChange={(event) => this.props.handleSignInChange(event)}
                            />
                        </label>
                    </div>
                    <br></br>
                    <div className='form-row'>
                        <label>
                            Password: 
                            <br></br>
                            <input className='sign-in-input' 
                                id='password'
                                name='password'
                                type='password'
                                autoComplete='off'
                                value={this.props.value}
                                placeholder='Password'
                                onChange={(event) => this.props.handleSignInChange(event)}
                            />
                        </label>
                    </div>
                    <div className='form-row'>
                        <button type='submit' className='submit-btn'>Sign In</button>
                    </div>
                    </form>
                </div>
                <div className='register right'>
                    <div className='sign-in-title'>Register</div>
                    <div className='float-right-sign-in-page-container'>
                        <button type='submit' className='action-btn'>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignInPage