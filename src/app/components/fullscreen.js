import React, {Component} from 'react';
import AddToDBFullscreen from './AddToDBFullscreen';

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

    // add image to user database
    addImageToDatabase (event) {
        event.preventDefault();

        let email = this.state.log_email;
        let image = event.target.value;
        let smallImage = this.props.smallImage;
        // let imageID =this.props.fullscreenImage_ID;
        let imageID =this.props.imageID;
        

        fetch('/api/add-image/',{
            method: 'PUT',
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
              image: image,
              smallImage: smallImage,
              imageID: imageID
            }) 
        }).then(response => {
            // close full screen
            this.props.closeFullScreen();
            this.props.createUserImageIDArray();
            return response.json();
        })
    }


    // delete image from user database
    removeImageFromDatabase (event) {
        event.preventDefault();

        let email = this.state.log_email;
        let image = event.target.value;
        let imageID = this.props.imageID;

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
                imageID: imageID,
              }) 
          }).then(response => {
            // render user collection
            this.props.onPhotoAdd_Or_Remove_Click();
            this.props.createUserImageIDArray();

            return response.json();
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
                    {/* original */}
                    {/* <button className='closeFullScreenButton'
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
                    ) : (null)} */}
                    {/* end original */}

                    {/* testing 04/27/20 */}
                    <button className='closeFullScreenButton'
                            onClick={this.props.closeFullScreen}>X
                    </button>

                    <AddToDBFullscreen
                        isAuthenticated={this.props.isAuthenticated}
                        redirectedOnSignInClick={this.props.redirectedOnSignInClick}
                        imageID = {this.props.imageID}
                        log_email={this.props.log_email}
                        user_ID={this.props.user_ID}
                        image = {this.props.image}
                        smallImage = {this.props.smallImage}
                        value={this.props.photo}
                        src={this.props.photo}
                        createUserImageIDArray={this.props.createUserImageIDArray}
                        imageMatchesArray={this.props.imageMatchesArray}
                        showUserCard={this.props.showUserCard}
                        imageMatchesArrayUser={this.props.imageMatchesArrayUser}
                        removedImageUpdateState={this.props.removedImageUpdateState}
                        closeFullScreen={this.props.closeFullScreen}
                    ></AddToDBFullscreen>

                </div>
                <img 
                    src={this.props.photo}
                    className='fullScreenImage'
                    alt={this.props.photo.description}
                    imageID = {this.props.imageID}
                />
            </div>
        )
    }
}

export default FullScreen;