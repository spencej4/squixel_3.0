import React, {Component} from 'react';


class RegisterForm extends Component {
    
    render() {
        return (
            <div className='sign-in left'>
                <div className='sign-in-title'>Register</div>
                <form id="sign-in-form"
                    action = " "
                    method = " "
                    onSubmit={(event) => this.props.onRegisterSubmit(event)}
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
                    <br></br>
                    <div className='form-row'>
                        <label>
                            Confirm Password: 
                            <br></br>
                            <input className='sign-in-input' 
                                id='password_confirm'
                                name='password_confirm'
                                type='password'
                                autoComplete='off'
                                value={this.props.value}
                                placeholder='Please confirm your password'
                                onChange={(event) => this.props.handleSignInChange(event)}
                            />
                        </label>
                    </div>
                    <div className='form-row'>
                        <button type='submit' className='submit-btn'>Register</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default RegisterForm;
