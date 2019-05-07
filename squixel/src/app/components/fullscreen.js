import React, {Component} from 'react';

class FullScreen extends Component   {
    constructor(props) {
        super(props);
        this.escFunction = this.escFunction.bind(this);
    }

    addImageToDatabase () {
        alert('image add clicked');

        fetch('/api/add-image',{
            method: 'POST',
            mode: "cors",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.state.log_email,
              password: this.state.log_password
            }) 
        }).then(function(){
          //update this line to remove the form
          // this.setState({ displayForm: false });    
    
          // set local storage
          let key = this.state.log_email;
          localStorage.setItem("key", key); 
    
          console.log(`You're signed in! ${this.state.log_email}`);
    
          //update state
          this.setState({
            isAuthenticated: true
          })
    
          let localStorageKey = localStorage.getItem("key");
          console.log(`Local Storage Key: ${localStorageKey}`);
        }.bind(this));
    }

    removeImageFromDatabase() {
        alert('remove image cliced');
    }

    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.closeFullScreen();
        }
    }

    componentDidMount() {
        window.addEventListener('keydown', this.escFunction, false);
    }  

    componentWillUnmount() {
        window.removeEventListener('keydown', this.escFunction, false);
    }
    
    render () { 
        return (
            <div className='fullscreen'>
                <div className='fullscreenAside'>
                    <button className='closeFullScreenButton'
                        onClick={this.props.closeFullScreen}>X
                    </button>
                    <button className='add-to-db'
                        onClick={this.addImageToDatabase}
                    >+</button>
                    <button className='remove-from-db'
                        onClick={this.removeImageFromDatabase}
                    >-</button>
                </div>
                <img src={this.props.photo}
                    className='fullScreenImage'
                    alt={this.props.photo.description}
                />
            </div>
        )
    }
}

export default FullScreen;