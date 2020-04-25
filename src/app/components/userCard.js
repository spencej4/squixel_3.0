import React, {Component} from 'react';

class UserCard extends Component   {

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
                      onClick={() => {
                        let image = this.props.userCollectionData[id].image;
                        let photo_ID = this.props.userCollectionData[id].photo_ID;
                        let imageID= this.props.userCollectionData[id].imageID;
                        this.props.showFullScreenImage(image, photo_ID, imageID);
                      }}
                      // new 01/24/20... not needed but left incase I want to build around this ability
                      // onMouseEnter={() => {
                      //   this.props.mouseEnter(this.props.image, this.props.smallImage, this.props.fullscreen_data_id, this.props.photo_id)
                      // }}
                      // onMouseLeave={this.props.mouseLeave}
                      // end new
                  >
                    <img src={this.props.userCollectionData[id].smallImage} 
                        key={id} 
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