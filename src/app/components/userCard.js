import React, {Component} from 'react';
import ImageInfoOverlay from './ImageInfoOverlay'

class UserCard extends Component   {
  constructor(props) {
    super(props);
    this.state = {
        log_email: this.props.log_email,
        user_ID: this.props.user_ID,
        // isMouseInside: false
    } 
  }


  getInitialState() {
    return {
      isMouseInside: false
    };
  }

  mouseEnter = () => {    
    // works...
    // let imageID= this.props.imageID
    // alert(imageID);
    this.setState({ isMouseInside: true });
  }


  mouseLeave = () => {
    // allows imageInfoOverlay time to fade out using css opacity
    setTimeout(function(){ 
      this.setState({ 
        isMouseInside: false 
      }); 
    }, 250);
  }

  render () {
    // reset window to top
    if (!this.props.showSearchInput) {
      // window.scrollTo(0, 0) 
    }

    if (this.props.userCardLoading === false) {
        let userCollectionArray = this.props.userCollectionData;
        // to reverse order of images
        // let userCollectionArray = this.props.userCollectionData.reverse();
        let userCollection = userCollectionArray.map((val, index) => userCollectionArray[userCollectionArray.length - 1 - index])

        return (
            userCollection.map((item, id) => {
              return (       
                <div className='imgSmall' 
                      key={id}
                      imageID={this.props.userCollectionData[id].imageID}
                      onClick={() => {
                        let image = this.props.userCollectionData[id].image;
                        let photo_ID = this.props.userCollectionData[id].photo_ID;
                        let imageID= this.props.userCollectionData[id].imageID;
                        this.props.showFullScreenImage(image, photo_ID, imageID);
                      }}
                      onMouseEnter={() => this.mouseEnter()} 
                      onMouseLeave={this.mouseLeave}
                      createUserImageIDArray={this.props.createUserImageIDArray}
                      imageMatchesArrayUser={this.props.imageMatchesArrayUser}
                      showUserCard={this.props.showUserCard}
                      log_email={this.props.log_email}
                      user_ID={this.props.user_ID}
                      onViewCollectionClick={this.props.onViewCollectionClick}
                      
                      removedImageUpdateState={this.props.removedImageUpdateState}

                  >
                    {this.state.isMouseInside && this.props.showCardOverlay ? (
                      <ImageInfoOverlay
                        photographerProfileImageSmall={this.props.photographerProfileImageSmall}
                        photographerUsername={this.props.photographerUsername}
                        isAuthenticated={this.props.isAuthenticated}
                        redirectedOnSignInClick={this.props.redirectedOnSignInClick}
                        imageID={this.props.userCollectionData[id].imageID}
                        log_email={this.props.log_email}
                        user_ID={this.props.user_ID}
                        image = {this.props.image}
                        smallImage = {this.props.smallImage}
                        value={this.props.photo}
                        src={this.props.photo}
                        createUserImageIDArray={this.props.createUserImageIDArray}
                        imageMatchesArrayUser={this.props.imageMatchesArrayUser}
                        showUserCard={this.props.showUserCard}
                        onViewCollectionClick={this.props.onViewCollectionClick}

                        removedImageUpdateState={this.props.removedImageUpdateState}
                      ></ImageInfoOverlay> 
                    ) : null}

                    <img src={this.props.userCollectionData[id].smallImage} 
                        key={id} 
                        imageID={this.props.userCollectionData[id].imageID}
                        photo_id={this.props.userCollectionData[id].photo_ID}
                        width={this.props.userCollectionData[id].width}
                        height={this.props.userCollectionData[id].height}
                        alt={this.props.userCollectionData[id].description}
                        className='landscape'
                    />
                </div>
              )
          })
        )   
    }  
  }
}

export default UserCard;