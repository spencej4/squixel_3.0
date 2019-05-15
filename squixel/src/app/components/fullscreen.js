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
        window.addEventListener('keydown', this.escFunction, false);
    }  


    componentWillUnmount() {
        window.removeEventListener('keydown', this.escFunction, false);
    }


    addImageToDatabase (event) {
        event.preventDefault();
        let email = this.state.log_email;
        let image = event.target.value;
        let smallImage = this.props.smallImage;

        fetch('/api/add-image/',{
            method: 'PUT',
            mode: "cors",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              image: image,
              smallImage: smallImage
            }) 
        }).then(function(){
            // enter message if you feel so inclined
        });
    }


    removeImageFromDatabase() {
        alert('remove image clicked');
    }


    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.closeFullScreen();
        }
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