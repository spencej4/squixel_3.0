import React, {Component} from 'react';

class UserCard extends Component   {

  render () {
    // reset window to top
    // window.scrollTo(0, 0);
    if (!this.props.showSearchInput) {
      window.scrollTo(0, 0) 
    }

    if (this.props.userCardLoading === false) {
      if(this.props.data === null) {
        return ( 
          <div className='emptyCollectionMessage'>Your collection is empty</div>
        )
      }
      else {
        return (
          this.props.userCollectionData.map((item, id) => {
            //For landscape photos
          //   if (this.props.userCollectionData[id].width > this.props.userCollectionData[id].height){
              return (
                <div className='imgSmall' 
                      key={id}
                      onClick={() => {
                        let image = this.props.userCollectionData[id].image;
                        let width = this.props.userCollectionData[id].width;
                        let height = this.props.userCollectionData[id].height;
                        let fullscreenData = this.props.userCollectionData[id];
                        this.props.showFullScreenImage(image, width, height, fullscreenData)
                      }}
                  >
                    <img src={this.props.userCollectionData[id].smallImage} 
                        key={id} 
                        width={this.props.userCollectionData[id].width}
                        height={this.props.userCollectionData[id].height}
                        alt={"temp description"}
                        className='landscape'
                    />
                </div>
              )
            //For Portrait photos
          //   } 
          //   else if (this.props.userCollectionData[id].width < this.props.userCollectionData[id].height) {
          //     return (
          //       <div className='imgSmall' 
          //             key={id}
          //             onClick={() => {
          //               let image = this.props.userCollectionData[id].urls.full;
          //               let width = this.props.userCollectionData[id].width;
          //               let height = this.props.userCollectionData[id].height;
          //               let fullscreenData = this.props.userCollectionData[id];
          //               this.props.showFullScreenImage(image, width, height, fullscreenData)
          //             }}
          //         >
          //           <img src={this.props.userCollectionData[id].urls.small} 
          //             key={id} 
          //             width={this.props.userCollectionData[id].width}
          //             height={this.props.userCollectionData[id].height}
          //             alt={this.props.userCollectionData[id].description}
          //             className='portrait'
          //           />
          //       </div>
          //     )
          //   }
          })
        )
      }
    }  
  }
}

export default UserCard;