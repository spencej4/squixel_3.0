import React, {Component} from 'react';

class FullScreen extends Component   {
    constructor(props) {
        super(props);
        this.state = {
            log_email: this.props.log_email
        }
        this.escFunction = this.escFunction.bind(this);
        this.addImageToDatabase = this.addImageToDatabase.bind(this)
    }

    componentDidMount() {
        console.log(this.props.log_email);
    }

    addImageToDatabase (event) {
        event.preventDefault();
        // let email = this.state.log_email;
        // here
        // find how to get user id from response in user.js



        let email = "5cd1cc80e76f6e074c4584f7";
        let image = event.target.value;

        fetch('/api/add-image' + email + image,{
            method: 'PUT',
            mode: "cors",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              content: [image]
            }) 
        }).then(function(){
            console.log('reached end of add image to database function');
        }.bind(this));
    }

    removeImageFromDatabase() {
        alert('remove image clicked');
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
                        value={this.props.photo}
                    >+</button>
                    <button className='remove-from-db'
                        onClick={this.removeImageFromDatabase}
                        value={this.props.photo}
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