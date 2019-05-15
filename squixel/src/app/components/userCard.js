import React, {Component} from 'react';

class UserCard extends Component   {

  componentDidMount(){
  }


// here need to figure how to access width/height of images before or after they've loaded so that 
// these if checks can run and return images.

  render () {
    if (this.props.userCardLoading === false) {
      return (
        this.props.userCollectionData.map((item, id) => {
            console.log(this.props.userCollectionData[id]);
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
    }else {
        return ( 
          <div>
           {/* empty div  */}
          </div>
        )
    }  
  }
}

export default UserCard;