import React, {Component} from 'react';

class FullScreen extends Component   {
    constructor(props) {
        super(props);
        this.escFunction = this.escFunction.bind(this);
    }

    addImageToDatabase () {
        alert('image add clicked');
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