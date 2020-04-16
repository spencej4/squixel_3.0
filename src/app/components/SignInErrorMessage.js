import React, {Component} from 'react';

class SignInErrorMessage extends Component {
    
    render() {
        return (
            <div className='form-error'>
                <h1 className='error'>Unable to Authenticate</h1>
            </div>
        )
    }
}

export default SignInErrorMessage;