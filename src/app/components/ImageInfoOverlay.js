import React, {Component} from 'react';
import HoverButtonAddToDB from './HoverButtonAddToDB';

class ImageInfoOverlay extends Component   {
    render() {
        return (
            <div className='image_info_overlay_container fade'>

                <HoverButtonAddToDB
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
                ></HoverButtonAddToDB>

                <div className='photographer_profile_photo_container'>
                    <img className='photographer_profile_photo' src={this.props.photographerProfileImageSmall}></img>
                </div>
                <p className='photographer_userName'>{this.props.photographerUsername}</p>
            </div>
        )
    }
}

export default ImageInfoOverlay;