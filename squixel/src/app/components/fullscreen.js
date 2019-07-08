import React, {Component} from 'react';
// import ReactImageAppear from 'react-image-appear';

class FullScreen extends Component   {

    constructor(props) {
        super(props);
        this.state = {
            log_email: this.props.log_email,
            user_ID: this.props.user_ID
        }
        this.escFunction = this.escFunction.bind(this);
        this.addImageToDatabase = this.addImageToDatabase.bind(this);
        this.removeImageFromDatabase = this.removeImageFromDatabase.bind(this);
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
        let user_ID = this.state.user_ID;
        let image = event.target.value;
        let smallImage = this.props.smallImage;

        fetch('/api/add-image/',{
            method: 'PUT',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              user_ID: user_ID,
              image: image,
              smallImage: smallImage
            }) 
        }).then(response => {
            // close full screen
            this.props.closeFullScreen();
        })
    }


    // new / untested
    removeImageFromDatabase (event) {
        event.preventDefault();

        let email = this.state.log_email;
        let image = event.target.value;
        let photo_ID = this.props.photo_ID.photo_ID;

        fetch('/api/delete-image',{
            method: 'PUT',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                image: image,
                photo_ID: photo_ID,
              }) 
          }).then(response => {
            // render user collection
            this.props.onPhotoAdd_Or_Remove_Click();
          })
    }
    

    escFunction(event) {
        if (event.keyCode === 27) {
            this.props.closeFullScreen();
        }
    }
    
    
    render () { 
        return (
            <div id='fullscreen'>
                <div className='fullscreenAside'>
                    <button className='closeFullScreenButton'
                            onClick={this.props.closeFullScreen}>X
                    </button>
                    {this.props.isAuthenticated ? (
                        <button 
                            className='add-to-db'
                            onClick={this.addImageToDatabase}
                            value={this.props.photo}>+
                        </button>
                    ) : (null)}
                    {this.props.isAuthenticated ? (
                        <button 
                            className='remove-from-db'
                            onClick={this.removeImageFromDatabase}
                            value={this.props.photo}>-
                        </button>
                    ) : (null)}
                </div>
                <img 
                    src={this.props.photo}
                    className='fullScreenImage'
                    alt={this.props.photo.description}
                />
                {/* <ReactImageAppear 
                        src={this.props.photo}
                        animation="blurIn"
                        animationDuration="1s"
                        alt={this.props.alt}
                        class = "fullScreenImage"
                        loader = ""
                    /> */}
            </div>
        )
    }
}

export default FullScreen;