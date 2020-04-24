import React, {Component} from 'react';
import CardImage from './CardImage.js';

class Card extends Component   {
  componentWillMount() {
    window.scrollTo(0, 0) 
  }

  componentDidMount() { 
    window.scrollTo(0, 0);
  }
  
  render () {  
    if (this.props.loading === false) { 
      // console.log(this.props.data);
        return (
              this.props.data.map((item, id) => { 
                // console.log(item.user);
                //For landscape photos
                if (this.props.data[id].width > this.props.data[id].height){
                  return (
                    <CardImage 
                      id={this.props.data[id]}
                      key={item.id}
                      showFullScreenImage={this.props.showFullScreenImage}
                      smallImage={this.props.data[id].urls.small}
                      image={this.props.data[id].urls.full}
                      img_src={this.props.data[id].urls.small} 
                      // this is where we get the image id from unsplash...
                      imageID={this.props.data[id].id}
                      width={this.props.data[id].width}
                      height={this.props.data[id].height}
                      alt={this.props.data[id].description}
                      className='landscape'
                      updateLoaded={this.updateLoaded}
                      log_email={this.props.log_email}
                      user_ID={this.props.user_ID}
                      isAuthenticated={this.props.isAuthenticated}
                      redirectedOnSignInClick={this.props.redirectedOnSignInClick}
                      createUserImageIDArray={this.props.createUserImageIDArray}
                      imageMatchesArray={this.props.imageMatchesArray}
                      photographerProfileImageSmall={this.props.data[id].user.profile_image.small}
                      photographerUsername={this.props.data[id].user.name}
                    />
                  )
                //For Portrait photos
                } else if (this.props.data[id].width < this.props.data[id].height) {
                  return (
                    <CardImage 
                      id={this.props.data[id]}
                      key={item.id}
                      showFullScreenImage={this.props.showFullScreenImage}
                      smallImage = {this.props.data[id].urls.small}
                      image={this.props.data[id].urls.full}
                      img_src={this.props.data[id].urls.small}
                      // this is where we get the image id from unsplash...
                      imageID={this.props.data[id].id} 
                      width={this.props.data[id].width}
                      height={this.props.data[id].height}
                      alt={this.props.data[id].description}
                      className='portrait'
                      updateLoaded={this.updateLoaded}
                      log_email={this.props.log_email}
                      user_ID={this.props.user_ID}
                      isAuthenticated={this.props.isAuthenticated}
                      redirectedOnSignInClick={this.props.redirectedOnSignInClick}
                      createUserImageIDArray={this.props.createUserImageIDArray}
                      imageMatchesArray={this.props.imageMatchesArray}
                      photographerProfileImageSmall={this.props.data[id].user.profile_image.small}
                      photographerUsername={this.props.data[id].user.name}
                    />

                  )
                }
              })
        ) 
    }else {
        return ( 
          null
        )
    }  
  }
}

export default Card;