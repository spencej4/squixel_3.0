import React, {Component} from 'react';
import SignInErrorMessage from './SignInErrorMessage';

class SignInForm extends Component {
    
    render() {
        return (
            <div className='sign-in left'>
                    <div className='sign-in-title'>Sign In</div>
                    <form id="sign-in-form"
                          action = " "
                          method = " "
                          onSubmit={(event) => this.props.onLoginSubmit(event)}
                    >   
                        <div className='form-row'>
                            <label>
                                Email:
                                <br></br>
                                <input className='sign-in-input' 
                                    id='log_email'
                                    name='log_email'
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
                                    id='log_password'
                                    name='log_password'
                                    type='password'
                                    autoComplete='off'
                                    value={this.props.value}
                                    placeholder='Password'
                                    onChange={(event) => this.props.handleSignInChange(event)}
                                />
                            </label>
                        </div>

                        { this.props.loginError ? 
                            <SignInErrorMessage></SignInErrorMessage>
                        : null }

                        <div className='form-row'>
                            <button type='submit' className='submit-btn'>Sign In</button>
                        </div>
                    </form>         
            </div>
        )
    }
}

export default SignInForm;