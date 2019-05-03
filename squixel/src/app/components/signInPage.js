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
                </div>
                <div className='register right'>
                    <div className='sign-in-title'>Register</div>
                </div>
            </div>
        )
    }
}

export default SignInPage